///.............................
// Get geolocation
const geoCode = async function(address) {
    const encodedAddress = encodeURIComponent(address);
    const base_uri = 'http://www.mapquestapi.com/geocoding/v1/address?key=ZTpz5E7GnsGuRLXiGXjL3WlBgT8434UJ&location=';
    const geocodeUrl = base_uri + encodedAddress;
    console.log(geocodeUrl);
    try {
        const results = await fetch(geocodeUrl);
        console.log('-'.repeat(20));
        console.log(results);
        const data = await results.json();
        console.log(data);
        console.log('-'.repeat(20));
        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch')
            return {
                error: 'Unable to connect to mapquest.com'
            };
    }
}
const retrieveGeocode = (data) => {
    try {
        console.log("Results: ", data);
        const retrievedLocation = data.results[0].providedLocation.location;
        if (data.info.statuscode == 400 || ['', ' '].includes(retrievedLocation))
            return null;

        const coordinates = {
            lat: data.results[0].locations[0].displayLatLng.lat,
            long: data.results[0].locations[0].displayLatLng.lng,
            userLocation: data.results[0].providedLocation.location
        }
        return coordinates;
    } catch (error) {
        return {
            error: true,
            message: 'Unable to connect to mapquest.com'
        };
    }

}
const getWeatherData = async(address) => {
    return await geoCode(address)
        .then(res => {
            const geocoords = retrieveGeocode(res);
            if (geocoords === null || geocoords.error == true) {
                throw new Error('Unable to find that address.');
            }

            console.log("Coordinates: ", geocoords);

            // Fetch weather data from darksky
            const baseUrl = '//api.openweathermap.org/data/2.5/weather?';
            const APPID = 'a2093eaf549745e40a98a3927fd34c47';
            const weatherURL = `${baseUrl}lat=${geocoords.lat}&lon=${geocoords.long}&units=metric&appid=${APPID}`;

            console.log(weatherURL);

            const results = fetch(weatherURL).then(res => res.json());
            return results;
        }).then(weatherData => {
            // console.log(weatherData);
            if (weatherData.error)
                throw new Error(weatherData.message);

            // console.log(address);
            let currWeather = {
                currentLocation: address,
                temp: weatherData.main.temp,
                temp_max: weatherData.main.temp_max,
                temp_min: weatherData.main.temp_min,
                humidity: weatherData.main.humidity,
                oppacity: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon
            }
            console.log(currWeather);

            displayWeather(currWeather);
            // console.log("Results: ", weatherData)
        })
        .catch(err => {
            if (err.message == 'Failed to fetch')
                console.log("ERROR...", 'Unable to connect to API servers.');
            else console.log("ERROR: ", err.message);
        });

}

const displayWeather = (data) => {
    // Get DOM Elements
    let maxTemp = document.getElementById('max-temp'),
        minTemp = document.getElementById('min-temp'),
        weatherHeader = document.getElementById('weather-header'),
        weatherContent = document.getElementById('weathers');
    const icon = `http://openweathermap.org/img/w/${data.icon}.png`;

    // display user's weather data
    maxTemp.innerHTML = `Max<br><span class="display-3">${data.temp_max.toFixed(1)}&deg;</span>`;
    minTemp.innerHTML = `<span class="temp">Current </span><br><span class="display-5">${data.temp.toFixed(1)}&deg;<i id="icon-thermometer" class="wi wi-thermometer"></i></span>`;
    weatherHeader.innerHTML = `${data.currentLocation} Weather`;

    weatherContent.innerHTML =
        `<h6 class="d-flex align-items-center align-self-center mx-2">
            Min ${data.temp_min.toFixed(1)}&deg;<i id="icon-thermometer" class="wi wi-thermometer"></i>
        </h6>
        <h6 class="d-flex align-items-center align-self-center mx-2">
            <span> Humidity </span><i class="wi wi-raindrop"> ${ data.humidity.toFixed(1)}</i>
        </h6>
        <h6 class="d-flex align-items-center align-self-center icon mx-2"><img src='${icon}'/> ${data.oppacity} </h6>`;
}