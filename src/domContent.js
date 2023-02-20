

export const DOM_CONTENT = (() => {
    
    const element = document.getElementById('content');
    
    //Header
    const createHeader = (() => {
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <input id='countrySearch' placeholder='Search by city name'/>
        `;
        element.appendChild(header)
    })();

    //Main
    const countryMain = (() => {
        const main = document.createElement('main');
        main.innerHTML = `
        <section class="main-country">
        </section>
        
        <section class="main-country-info">
        </section>
        <button id='changeUnits'>Display °F</button>
        
        <section class='main-forecast'>
            <div>
                <h4>Forecast by hours</h4>
                <div id='main-forecast-boxes'>
                </div>
            </div>
        </section>
        `;
        element.appendChild(main)
    })();
})();