import './style.css';

//hardcoded city and information
    const content = document.getElementById('content');

    const div = document.createElement('div');
      
    const input = document.createElement('input');
    input.classList.add = ('countryInput');

    const country = document.createElement('div');

    const hours = document.createElement('div');

    const changeMetrics = document.createElement('button');
    changeMetrics.textContent = 'Display °F'; 
    let isMetric = true; 
    
    changeMetrics.addEventListener('click', () => {
        isMetric = !isMetric;
        let currentCountry = document.getElementById('countryName').innerText;
        if (isMetric) {
            changeMetrics.textContent = 'Display °F';
            weatherCountry(currentCountry, 'metric');
            forecastCountry(currentCountry, 'metric');
            
        } else {
            changeMetrics.textContent = 'Display °C';
            weatherCountry(currentCountry, 'imperial');
            forecastCountry(currentCountry, 'imperial');
        } 
    });
    content.appendChild(div);
    div.appendChild(input);
    div.appendChild(changeMetrics);
    div.appendChild(country);
    div.appendChild(hours);

    
    function handleInput() {
        let countryName = input.value;
        weatherCountry(countryName, isMetric ? 'metric' : 'imperial');
        forecastCountry(countryName, isMetric ? 'metric' : 'imperial')
        input.value = '';
      }
      
      input.addEventListener('keyup', function(e){
          if (13 == e.keyCode){
              handleInput();
          }
      });

async function weatherCountry(c,units){
    country.innerHTML = '';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=c94b932deb6c53642941413f335e1d8c&units=${units}`);
    const countryData = await response.json();
    let newone = document.createElement('div');
    newone.innerHTML = `
      <p id='countryName'>${countryData.name}</p>
      <p>${countryData.main.temp} ${isMetric ? '°C' : '°F'}</p>
      <p>${countryData.wind.speed}${isMetric ? 'm/s' : 'mph'}</p>
    `;
    country.appendChild(newone);
  } catch (error) {
    console.error(error);
  }

}

async function forecastCountry(c,units){
    hours.innerHTML = '';
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${c}&appid=c94b932deb6c53642941413f335e1d8c&units=${units}`);
    const countryData = await response.json();

    const hourlyCast = document.createElement('div')
    
    for (let i = 0; i < 8; i++) {
        const time = countryData.list[i].dt;
        const date = new Date(time * 1000);
        const hours = date.getHours();
        const formattedTime = hours < 10 ? `0${hours}:00` : `${hours}:00`;
        const temperature = Math.round(countryData.list[i].main.temp);
        hourlyCast.innerHTML += `<div>${formattedTime}</div><p>${temperature} ${units === 'metric' ? 'ºC' : 'ºF'}</p>`;

    }
    hours.appendChild(hourlyCast);

    }catch(e){
        console.error(e)
    }
}


const weatherDefault = (async () => {
    await weatherCountry('Maracay', 'metric');
    await forecastCountry('Maracay','metric')
})();
