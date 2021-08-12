import * as functions from "firebase-functions";
// import { response } from "firebase-functions/node_modules/@types/express";
import * as hcaptcha from "hcaptcha";

const secret:string = functions.config().hcaptcha.key;

export const sendEmail = functions.https.onRequest(async (request, response) => {
    console.log(secret)
    let formBody: formBody = request.body
    console.log(typeof(formBody))
    try {

        let result: VerifyResponse = await hcaptcha.verify(secret, formBody.hcaptchaResponse)
        functions.logger.info(result);
        if (result.success) {
            //send email to the magic of internet 
            functions.logger.info("Verification Success")
            response.sendStatus(200)
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
    hcaptchaResponse: string
}
