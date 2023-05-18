import twilio from 'twilio'
import { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER_SMS, PHONE_NUMBER_WP } from '../../config/environment.js'

const handleSendMessage = async (body, to, isWhatsapp) => {
    try{
        const type = isWhatsapp ? `whatsapp:+` : `+`
        const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

        const message = await client.messages.create({
            body,
            from: `${type}${isWhatsapp ? PHONE_NUMBER_WP : PHONE_NUMBER_SMS}`,
            to: `${type}${to}`,
        })

        return {
            result: 'success',
            messageId: message.sid
        }

    }catch(error) {
        return {
            result: 'error',
            message: error.message,
        }
    }
}

export default handleSendMessage