
export const DOM_EVENTS = (() => {


    
    let changeMetrics = document.getElementById('changeUnits')
    let isMetric = true; 
    console.log(changeMetrics)

    changeMetrics.addEventListener('click', () => {
        isMetric = !isMetric;
        console.log(isMetric)
        let currentCountry = document.getElementById('main-country-title').innerText;
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


    let input = document.getElementById('countrySearch')
    console.log(input)
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

        try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=c94b932deb6c53642941413f335e1d8c&units=${units}`);
        const countryData = await response.json();
        console.log(countryData)
        let mainCountry = document.querySelector('.main-country')
        mainCountry.innerHTML = `
            <figure>${countryData.clouds.all}</figure>
            <h3 id="main-country-title">${countryData.name}</h3>           
            <h2 id="main-country-temperature">${Math.round(countryData.main.temp)}</h2>
            <p>Max.${Math.round(countryData.main.temp_max)}${units === 'metric' ? 'ºC' : 'ºF'} Min.${Math.round(countryData.main.temp_min)}${units === 'metric' ? 'ºC' : 'ºF'}</p>
        `;
        } catch (error) {
        console.error(error);
        }

    }

    async function forecastCountry(c,units){
        let hourlyForecast = document.getElementById('main-forecast-boxes');
        hourlyForecast.innerHTML = '';
        try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${c}&appid=c94b932deb6c53642941413f335e1d8c&units=${units}`);
        const countryData = await response.json();

        
    for (let i = 0; i < 10; i++) {
        const forecastHours = document.createElement('div')
        const time = countryData.list[i].dt;
        const date = new Date(time * 1000);
        const hours = date.getHours();
        const formattedTime = hours < 10 ? `0${hours}:00` : `${hours}:00`;
        const temperature = Math.round(countryData.list[i].main.temp);
        
        
        forecastHours.innerHTML = `<h5>${formattedTime}</h5><figure>${countryData.list[i].clouds.all}</figure><h5>${temperature} ${units === 'metric' ? 'ºC' : 'ºF'}</h5>`;
        hourlyForecast.appendChild(forecastHours);

    }


    }catch(e){
        console.error(e)
    }
    }


    const weatherDefault = (async () => {
        await weatherCountry('Maracay', 'metric');
        await forecastCountry('Maracay','metric')
    })();
})();