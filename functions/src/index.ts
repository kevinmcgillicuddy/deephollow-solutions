import * as functions from "firebase-functions";
import * as hcaptcha from "hcaptcha";
import * as cors from 'cors';
const corsHandler = cors({ 
    methods: ['POST','OPTIONS'] ,
    origin: 'https://deep-hollow-solutions.web.app',
});

const secret:string = functions.config().hcaptcha.key;

export const sendEmail = functions.https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
        let formBody: formBody = request.body
        try {
            let result: VerifyResponse = await hcaptcha.verify(secret, formBody.hcaptchaResponse)
            functions.logger.info(result);
            if (result.success) {
                //send email to the magic of internet 
                functions.logger.info("Verification Success")
                response.sendStatus(200)
            }
            else {
                response.sendStatus(403)
                throw new Error('Verification Failed')
            }
        }
        catch (err) {
            functions.logger.error(err)
            response.sendStatus(200)
        }
    });
});

interface formBody {
    name: string;
    email: string;
    hcaptchaResponse: string
}
