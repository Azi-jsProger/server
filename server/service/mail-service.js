const nodemailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true, // Убедитесь, что secure: true, если используется порт 587
            auth: {
                user: "myrzabekov.arsen@mail.ru",
                pass: "9CPXSizdRKQ6hanBtiBe"
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "myrzabekov.arsen@mail.ru",
            to,
            subject:"Активация аккаунта на Remanga",
            text:"",
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href=${link}>${link}</a>
                </div>
                
                `
        })

    }
}

module.exports = new MailService()