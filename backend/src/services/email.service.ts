import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export class EmailService {
    constructor() { }

    private static instance = null

    public static getInstance(): EmailService {
        if (!this.instance) {
            this.instance = new EmailService()
        }
        return this.instance
    }

    public async sendMail(email: string, userId: string) {
        try {
            const data = {
                serviceId: process.env.MAILER_SERVICE,
                templateId: process.env.MAILER_TEMPLATE,
                userId: process.env.MAILER_USER,
                template_params: {
                    to: email,
                    link: process.env.DOMAIN_NAME.concat(`users/confirm?userId=${userId}`)
                }
            };
            await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
        }
        catch (err) {
            if(err.response) console.log(err.response.data)
            else console.log(err)
            throw new Error('Cannot send email successfully')
        }
    }

}
