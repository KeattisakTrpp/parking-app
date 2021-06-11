const nodemailer = require("nodemailer");
let instance = null

class EmailService {
  constructor() {}

  static getInstance() {
    if(!instance) {
      instance = new EmailService()
    }
    return instance
  }

  async sendMail({ from, to, subject, text }) {
    try {
      const testAccount = await nodemailer.createTestAccount()
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        }
      })
      const info = await transporter.sendMail({ from, to, subject, text })
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    catch(err) {
      console.log('Cannot send email successfuly')
      console.log(err)
    }
  }

}

module.exports = EmailService
