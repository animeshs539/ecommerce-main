const {authenticator} = require("otplib");
const mailer = require("../authentication/mailer");


const secret = authenticator.generateSecret();
authenticator.options = {step:120,window : 60}

const otpGenerated = (email)=>{
    if(email)
    {
        const token = authenticator.generate(secret);
        mailer(email,token);
        return true;
    }
        return false;
}

const otpVerified = (newToken)=>{
    const isValid = authenticator.check(newToken,secret);
    return isValid;
}

module.exports = {
    otpGenerated,
    otpVerified
}




