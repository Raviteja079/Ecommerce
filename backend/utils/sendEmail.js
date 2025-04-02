import nodeMailer from 'nodemailer'

export const sendEmail= async(options)=>{
    console.log("SMTP Mail:", process.env.SMTP_MAIL);
    console.log("SMTP Password:", process.env.SMTP_PASSWORD? "Password Exists" : "Password is Missing")
    //createTransport creates object responsible for sending mails
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    }) 
    console.log("Transporter created")
    const mailOptions={
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    try{
       const info = await transporter.sendMail(mailOptions)
       console.log("Email sent: ", info.response);
    }catch(error){
        console.log("Error while sending email:", error)
        throw error
    }
}