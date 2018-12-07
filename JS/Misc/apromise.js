///
// .catch(err => {
//     if (err.message == 'Failed to fetch')
//         return { error: true, message: 'Unable to connect to API servers' };
//     else return { error: true, message: err.message };
//     // console.log(err.message)
// });

// getWeatherData('Brisbane QLD');


console.log('Weather loading!');

// Construct URL
// Fetch weather data from darkSky API.

// Process data
// let address = "4000"

// const weather = new Promise(resolve, reject)
const Weather = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const base_uri = 'http://www.mapquestapi.com/geocoding/v1/address?key=ZTpz5E7GnsGuRLXiGXjL3WlBgT8434UJ&location=';
    const geocodeUrl = base_uri + encodedAddress;
    console.log(geocodeUrl);

    return fetch(geocodeUrl)
        .then((res) => res.json())
        .then((data) => callback(data))
        .catch((error) => {
            if (error.message === 'Failed to fetch')
                console.log('Unable to connect to API servers.');
            console.log(error)
        })
}

// http://api.openweathermap.org/data/2.5/weather?lat=-27.56934&lon=153.09216&units=metric&APPID=a2093eaf549745e40a98a3927fd34c47
// api.openweathermap.org/data/2.5/weather?lat=-27.56934&lon=153.09216&APPID=a2093eaf549745e40a98a3927fd34c47
const getWeather = function(lat, long, callback) {
    const baseUrl = '//api.openweathermap.org/data/2.5/weather?';
    const APPID = 'a2093eaf549745e40a98a3927fd34c47';
    const units = 'metric';
    const weatherURL = `${baseUrl}lat=${lat}&lon=${long}&units=${units}&appid=${APPID}`;

    // console.log(weatherURL);

    return fetch(weatherURL)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(error => {
            if (error.message === 'Failed to fetch')
                console.log('Unable to connect to API servers.');

        })
}

// http://openweathermap.org/img/w/01n.png
function fetchWeather(defaultLocation) {
    Weather(defaultLocation, (res) => {
        // console.log(JSON.stringify(res, undefined, 2))
        // console.log(res.info.statuscode)
        if (res.info.statuscode == 400)
            throw new Error('Unable to find that address.');

        let lat = res.results[0].locations[0].displayLatLng.lat;
        let long = res.results[0].locations[0].displayLatLng.lng;

        const userLocation = res.results[0].providedLocation.location
            // console.log(userLocation);
            // console.log(lat, long);
        return getWeather(lat, long, (resp) => {
            // console.log(resp)
            if (resp.cod == 400) throw new Error('Unable to find that location.');
            else if (resp.cod === 200) return [resp, userLocation];
        }).then(weatherData => {
            // console.log(weatherData);
            let currWeather = {
                    currentLocation: weatherData[1],
                    temp: weatherData[0].main.temp,
                    temp_max: weatherData[0].main.temp_max,
                    temp_min: weatherData[0].main.temp_min,
                    humidity: weatherData[0].main.humidity,
                    oppacity: weatherData[0].weather[0].description,
                    icon: weatherData[0].weather[0].icon
                }
                // console.log(currWeather);

            displayWeather(currWeather);

        })
    }).catch(err => console.log(err));
}