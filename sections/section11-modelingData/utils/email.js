const nodemailer = require('nodemailer');
const pug = require('pug')
const { convert } = require('html-to-text');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = class Email {
  constructor(user, url){
    this.to = user.email;
    this.firstName = user.name.split(' ')[0]; 
    this.url = url; 
    this.from = `Mohammad Faqusa <${process.env.EMAIL_FROM}>`
    
  }

  createTransport() {
    if(process.env.NODE_ENV === 'production') {
      // sendgrid 
      return 1; 
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }

    })
  }
  async send(template, subject) {
    // 1) Render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`); 
    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html)
    // html:
    }; 

    // 3) Create a transport and send email 
    // await this.createTransport().sendMail(mailOptions)
    await sgMail.send(mailOptions)
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!') 
  }

  async sendResetPassword(){
    await this.send('passwordReset', 'Reset Password Link')
  }
}

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Jonas Schmedtmann <hello@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// module.exports = sendEmail;
