const nodemailer = require("nodemailer");
const html_template = require("../authentication/email-html-template");

module.exports = (email,message)=>{

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "singhanimesh689@gmail.com",
      pass: "xgprgrbjspjguqoh",
    },
  });

  const SENDMAIL = async (mailDetails,callback)=>{
    try {
        const info = await transporter.sendMail(mailDetails);
        callback(info);
    }
    catch(err){
        console.log(err);
    }
  }

  const options = {
    from: "singhanimesh689@gmail.com", // sender address
    to: email, // receiver email
    subject: "OTP-verification || myShop.com", // Subject line
    text: message,
    html: html_template(message),
}

SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
});

}