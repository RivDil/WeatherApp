

export const DOM_CONTENT = (() => {
    
    const element = document.getElementById('content');
    
    //Header
    const createHeader = (() => {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
        <div class="search">-</div>
        <input id='countrySearch' class='hidden'/>
        <h4 id='projectTitle'>WeatherNow</h4>
        `;
        element.appendChild(header)
    })();

    //Main
    const countryMain = (() => {
        const main = document.createElement('main');
        main.innerHTML = `
        <section class="main-country">
        </section>
        <section class='main-forecast'>
            <div>
                <h4>Forecast by hours</h4>
                <div id='main-forecast-boxes'>
                </div>
            </div>
        </section>
        <button id='changeUnits'>Display °F</button>
        `;
        element.appendChild(main)
    })();
})();