import { Verification_Email_Template, Welcome_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./Email.confiq.js";

export const sendVerificationCode =async(email,verificationCode)=>{
    try {
        const response = await transporter.sendMail({
                    from: '"our website" <nitishchauhan9090@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Verify your Email", // Subject line
                    text: "Verify your Email", // plain text body
                    html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // html body
        });
        console.log("Message sent: %s", response.messageId);
    } catch (error) {
        console.log("email error",error)
    }
}
export const welcomeemail =async(email,name)=>{
    try {
        const response = await transporter.sendMail({
                    from: '"our website" <nitishchauhan9090@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Email verified", // Subject line
                    text: "welcome to website", // plain text body
                    html: Welcome_Email_Template.replace("{name}",name), // html body
        });
        console.log("Message sent: %s", response.messageId);
    } catch (error) {
        console.log("email error",error)
    }
}