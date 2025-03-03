const nodemailer = require('nodemailer');

const sendEmail = async options=> {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    // 2) define the email options 
    console.log(transporter)
    const mailOptions = {
        from: 'Mohammad Faqusa <mohammad0faq0sa@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    }
    // 3) actually send the email 
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail





