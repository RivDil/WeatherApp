
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
        console.log(countryData);
        const cloudPercentage = countryData.clouds.all;
        let weatherCondition = '';
        if (cloudPercentage <= 10) {
        weatherCondition = 'Sunny/Clear';
        } else if (cloudPercentage <= 20) {
        weatherCondition = 'Fair';
        } else if (cloudPercentage <= 30) {
        weatherCondition = 'Mostly sunny';
        } else if (cloudPercentage <= 60) {
        weatherCondition = 'Partly cloudy';
        } else if (cloudPercentage <= 70) {
        weatherCondition = 'Partly sunny';
        } else if (cloudPercentage <= 90) {
        weatherCondition = 'Mostly cloudy';
        } else {
        weatherCondition = 'Overcast';
        }
        // I want to change the body depending on the time 
        const utcTime = countryData.dt;
        const timezoneOffset = countryData.timezone;
        const localTime = utcTime + timezoneOffset;
        const date = new Date(localTime * 1000);
        const hours = date.getHours();
        const isDay = hours >= 7 && hours <= 19;
        console.log(isDay)
        const mainCountry = document.querySelector('.main-country')
        mainCountry.innerHTML = `
            <figure>${weatherCondition}</figure>
            <h3 id="main-country-title">${countryData.name}</h3>           
        `;
        const mainCountryInfo = document.querySelector('.main-country-info');
        mainCountryInfo.innerHTML = `
        <h2 id="main-country-temperature">${Math.round(countryData.main.temp)}º</h2>
            <p>Max.${Math.round(countryData.main.temp_max)}${units === 'metric' ? 'ºC' : 'ºF'} Min.${Math.round(countryData.main.temp_min)}${units === 'metric' ? 'ºC' : 'ºF'}</p>
        `
        const body = document.querySelector('body');
        body.style.backgroundImage = `url(${isDay ? 'https://wallpaperaccess.com/full/2752599.jpg' : 'https://images.hdqwalls.com/download/moon-minimal-art-np-1920x1080.jpg'})`;

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
        const cloudPercentage = countryData.list[i].clouds.all;
        let weatherCondition = '';
        if (cloudPercentage <= 10) {
        weatherCondition = 'Sunny/Clear';
        } else if (cloudPercentage <= 20) {
        weatherCondition = 'Fair';
        } else if (cloudPercentage <= 30) {
        weatherCondition = 'Mostly sunny';
        } else if (cloudPercentage <= 60) {
        weatherCondition = 'Partly cloudy';
        } else if (cloudPercentage <= 70) {
        weatherCondition = 'Partly sunny';
        } else if (cloudPercentage <= 90) {
        weatherCondition = 'Mostly cloudy';
        } else {
        weatherCondition = 'Overcast';
        }
        const forecastHours = document.createElement('div')
        const utcTime = countryData.list[i].dt;
        const timezoneOffset = countryData.city.timezone;
        const localTime = utcTime + timezoneOffset;
        const date = new Date(localTime * 1000);
        const hours = date.getHours();
        const formattedTime = hours < 10 ? `0${hours}:00` : `${hours}:00`;
        const temperature = Math.round(countryData.list[i].main.temp);
        
        
        forecastHours.innerHTML = `<h5>${formattedTime}</h5><figure>${weatherCondition}</figure><h5>${temperature} ${units === 'metric' ? 'ºC' : 'ºF'}</h5>`;
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