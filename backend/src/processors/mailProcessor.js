import mailQueue from "../queues/mailQueue.js";
import mailer from "../config/mailConfig.js";

mailQueue.process(async (job) => {
    const emailData = job.data;
    console.log("Processing Email", emailData);

    try {
        const response = await mailer.sendMail(emailData);
        console.log("Email Sent", response);
    } catch(error) {
        console.log("Error Processing mail: ", error);
    }
});