// New way 
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
        //console.log("Unable to connect to mapquest.com");
    }

}

const retrieveCoordinates = (data) => {
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
            const geocoords = retrieveCoordinates(res);
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
        }).catch(err => {
            if (err.message == 'Failed to fetch')
                return {
                    error: true,
                    message: 'Unable to connect to API servers'
                };
            else return {
                error: true,
                message: err.message
            };
            // console.log(err.message)
        });
}

getWeatherData('Brisbane QLD')
    .then(weatherData => {
        // console.log(weatherData);
        if (weatherData.error)
            throw new Error(weatherData.message);

        // console.log(address);
        let currWeather = {
            temp: weatherData.main.temp,
            temp_max: weatherData.main.temp_max,
            temp_min: weatherData.main.temp_min,
            humidity: weatherData.main.humidity,
            oppacity: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon
        }
        console.log(currWeather);

        displayWeather(currWeather);
        console.log("Results: ", weatherData)
    })
    .catch(err => {
        if (err.message == 'Failed to fetch')
            console.log("ERROR...", 'Unable to connect to API servers.');
        console.log("ERROR: ", err.message);
    });