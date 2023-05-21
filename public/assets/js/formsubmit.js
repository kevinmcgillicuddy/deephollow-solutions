function onSubmit(token) {
    const contactForm = document.querySelector('#myform')
    const params = {
        name: contactForm.elements.name.value,
        email: contactForm.elements.email.value,
        message: contactForm.elements.message.value,
        hcaptchaResponse: token
    };
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    };
    fetch('https://us-central1-deep-hollow-solutions.cloudfunctions.net/sendEmail/', options)
        .then(response => contactForm.reset())
        .catch(err => console.log(err))
}