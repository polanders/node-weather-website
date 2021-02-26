console.log('executing js file');

// fetch('http://localhost:3000/weather?address=boston').then(res => {
//   return res.json();
// }).then(({ error, forecast, location, address } = {}) => {
  // if (error) {
  //   console.log(error);
  //   return;
  // }
  // console.log(`${location}: ${forecast}`);
// });

const fetchWeather = (address) => {
  
  console.log(`fetchWeather: ${address}`);
  
  return fetch(`/weather?address=${address}`).then(res => {
    return res.json();
  });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#wm-1');
const messageTwo = document.querySelector('#wm-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetchWeather(search.value).then(({ error, forecast, location, address } = {}) => {
    if (error) {
      // console.log(error);
      messageOne.textContent = error;
      return;
    }
    // console.log(`${location}: ${forecast}`);

    messageOne.textContent = location;
    messageTwo.textContent = forecast;
  });
});
