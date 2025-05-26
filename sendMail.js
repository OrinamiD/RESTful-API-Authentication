

const nodemailer = require("nodemailer")

const sendForgetPasswordEmail = async ( email, token)=>{

    const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`
        }
      
    })

    const mailDetails = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Reset password notification",
        html: `<h4>Here is the token to reset your password. Please click on the button, <a href="https://www.yourcareerex.com/reset-password/${token}">Reset Password</a>
        
        if the button doest work for any reason, please click the link below <a href="https://www.yourcareerex.com/reset-password/${token}
        </h4>`
    }
}

module.exports = sendForgetPasswordEmail