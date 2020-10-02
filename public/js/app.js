console.log("client side javascrip file is loaded");

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'loading.......';
    messageTwo.textContent = '';

    fetch('http://localhost:4000/weather?address=' + searchElement.value).then((response) => {
        return response.json();
    }).then((responseJson) => {
        if (responseJson.error) {
            messageOne.textContent = responseJson.error;
        } else {
            messageOne.textContent = responseJson.location;
            messageTwo.textContent = responseJson.forecast;
        }
    })
})