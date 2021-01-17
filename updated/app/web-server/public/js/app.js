console.log("client side javascript file is loaded up")


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;


    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';
    if (location !== '') {
        fetch(`/weather?address=${location}`)
            .then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        // console.log(data.error)
                        messageOne.textContent = data.error;
                    } else {

                        // console.log(data.location)
                        messageOne.textContent = data.location
                        // console.log(data.forecast)
                        messageTwo.textContent = data.forecast
                    }
                })
            });

    } else {
        // console.log('You must provide an address')
        messageOne.textContent = 'You must provide an address'
    }
    // console.log(location);
})