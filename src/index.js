import './style.css';

//hardcoded city and information
    const content = document.getElementById('content');

    const div = document.createElement('div');
      
    const input = document.createElement('input');
    input.classList.add = ('countryInput');

    const country = document.createElement('div');

    const changeMetrics = document.createElement('button');
    content.appendChild(div);
    div.appendChild(input)
    div.appendChild(country)

    



const weatherDefault = (async () =>{
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Caracas&appid=c94b932deb6c53642941413f335e1d8c&units=metric')
    const countryData = await response.json();
    let newone = document.createElement('div');
    newone.innerHTML = `
      <p>${countryData.name}</p>
      <p>${countryData.main.temp} °C</p>
      <p>${countryData.wind.speed}</p>
    `;
    country.appendChild(newone);
})();

input.addEventListener('keyup', function(e){
    if (13 == e.keyCode){
        let countryName = input.value;
        weatherCountry(countryName)
        input.value = ''
    }
})

async function weatherCountry(c){

    country.innerHTML = '';
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=c94b932deb6c53642941413f335e1d8c&units=metric`);
    const countryData = await response.json();
    let newone = document.createElement('div');
    newone.innerHTML = `
      <p>${countryData.name}</p>
      <p>${countryData.main.temp}°C</p>
      <p>${countryData.wind.speed}</p>
    `;
    country.appendChild(newone);
  } catch (error) {
    console.error(error);
  }

}
//weatherCountry()