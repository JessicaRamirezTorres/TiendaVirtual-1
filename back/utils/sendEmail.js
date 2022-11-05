const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "jessie.angel.82@hotmail.com",
          pass: "jstwsjymoitdjloa"
        }
      });
    const mensaje={
        from: "Tienda Emplas <jessie.angel.82@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;