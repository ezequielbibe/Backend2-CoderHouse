import nodemailer from 'nodemailer'
import { HOST_EMAIL, EMAIL, PASS } from '../../config/environment.js'

export const handleSendMail = async (text, subject, to) => {
    const transporter = nodemailer.createTransport({
        host: HOST_EMAIL,
        port: 587,
        auth: {
            user: EMAIL,
            pass: PASS,
        }
    })

    const info = await transporter.sendMail({
        from: `MyStore <${EMAIL}>`,
        to,
        subject,
        text,
    })

    console.log(`Done ${JSON.stringify(info, null, 2)}`)
    return info
}