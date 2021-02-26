const fetchWeather = (address) => {
  return fetch(`/weather?address=${address}`).then(res => {
    return res.json();
  });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#wm-1');
const messageTwo = document.querySelector('#wm-2');
const imgOne = document.querySelector('#wimg-1');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  imgOne.src = '';

  fetchWeather(search.value).then(({ error, forecast, location, icon } = {}) => {
    if (error) {
      messageOne.textContent = error;
      return;
    }
    imgOne.src = icon;
    messageOne.textContent = location;
    messageTwo.textContent = forecast;
  });
});
