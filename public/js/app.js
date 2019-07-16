const weatherForm = document.forms[ 'weather-form' ];
const search = weatherForm.elements[ 'location' ];
const searchBtn = weatherForm.elements[ 'search-btn' ];
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading forecast...';
    message2.textContent = '';
    searchBtn.setAttribute('disabled', true);
    
    const location = search.value;
    fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        searchBtn.removeAttribute('disabled');
        if (data.error) {
            message1.textContent = data.error;
            return;
        }
        message1.textContent = data.location;
        message2.textContent = data.forecast;
    });
})