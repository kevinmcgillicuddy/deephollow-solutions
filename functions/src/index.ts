import * as functions from "firebase-functions";
// import { response } from "firebase-functions/node_modules/@types/express";
import * as hcaptcha from "hcaptcha";

const secret: string = 'env.string';

export const helloWorld = functions.https.onRequest(async (request, response) => {
    let formBody: formBody = request.body
    try {

        let result: VerifyResponse = await hcaptcha.verify(secret, formBody["h-captcha-response"],)
        functions.logger.info(result);
        if (result.success) {
            //send email
            functions.logger.info("Verification Success")
            response.send({ msg: 'Success' })
        }
        else {
            throw new Error('Verification Failed')
        }
    }
    catch (err) {
        functions.logger.error(err)
    }

});

interface formBody {
    name: string;
    email: string;
    "g-recaptcha-response": string;
    "h-captcha-response": string
}
