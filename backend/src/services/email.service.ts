import nodemailer from 'nodemailer'


export class EmailService {
    constructor() { }

    private static instance = null

    public static getInstance(): EmailService {
        if (!this.instance) {
            this.instance = new EmailService()
        }
        return this.instance
    }

    public async sendMail({ from, to, subject, text }) {
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
        catch (err) {
            console.log('Cannot send email successfuly')
            console.log(err)
        }
    }

}
