// Listen for document load events to make sure dom elements have been loaded
document.addEventListener("DOMContentLoaded", function(event) {
    console.log('Run loading!');

    // Find submit button by id
    const submitBtn = document.getElementById('submitBtn');
    const searchedLocation = document.getElementById('searchedlocation');

    let defaultLocation = '';

//     // Set default location to user's ip address' location
//     ipLookUp((results) => {
//         if (results !== undefined) {
//             // Get user's current location
//             defaultLocation = `${results.city} ${results.country}`;

//             // Fetch user's weather data
// //             const weather = new Weather(defaultLocation);
// //             weather.getWeatherData();
//         } else
//             defaultLocation = null;
//     });
    
     // Fetch user's weather data
            defaultLocation = 'Brisbane Australia';
            const weather = new Weather(defaultLocation);
            weather.getWeatherData();

    // CONSTRUCT URLS
    const urls = ['https://jsonplaceholder.typicode.com/photos', 'https://github.com/S-Kel/weatherapp/blob/master/data/users.json'];

    // FETCH AND DISPLAY DATA
    const user = new User();
    user.fetchUsers(urls[0], user.createGallery);
    user.fetchUsers(urls[1], user.createUser);

    // Listen for button submit events
    submitBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        let address = searchedLocation.value;

        // console.log(defaultLocation);
        if (searchedLocation.value !== '')
            address = searchedLocation.value;
        else if (searchedLocation.value === '' && defaultLocation == null)
            address = 'Brisbane Qld';
        else
            address = defaultLocation;
        // Fetch user's weather data
        const weather = new Weather(address);
        weather.getWeatherData();


        console.log(address);
    });
});














// fetchWeather(defaultLocation);
// getWeatherData(defaultLocation);
// const weather = new Weather();
// fetchWeather(address);
// getWeatherData(address);
