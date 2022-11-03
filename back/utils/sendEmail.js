const nodemailer=require('nodemailer')

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1700e360b2cfe8",
          pass: "c2f7db3ccf1ba7"
        }
      });
      const mensaje={
        from: "Tienda Emplas <noreply@tiendaemplas.com",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
      }

      await transport.sendMail(mensaje)
}

module.exports =sendEmail;