import axios from 'axios'
import emailjs from 'emailjs-com';

export default async function send(request, response) {
    const { form } = request.body

    const mail = {
        service_id: 'client_contact',
        template_id: 'CONTACT_FORM',
        user_id: 'user_l59sCh4Xn57hN4RUhJoJT',
        template_params: {'message': form},
        acessToken: '143f81696c12e03407d0de84c2c90642'
    };
    
    // emailjs.init('user_l59sCh4Xn57hN4RUhJoJT')
    // emailjs.sendForm('client_contact', 'CONTACT_FORM', form, 'user_l59sCh4Xn57hN4RUhJoJT').then(result => {
    //     return response.status(200)
    // }, err => {
    //     return response.status(400)
    // })

    await axios({
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data: mail,
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        return response.status(200)
    }).catch(err => {
        return response.status(400)
    })
}