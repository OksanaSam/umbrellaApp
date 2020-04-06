const umbrellaApp = {};
umbrellaApp.apiKey = '0c68ac7ef4870b7a73e3f57a55e33828';

umbrellaApp.getWeatherInUserCity = function(city) {
$.ajax({
    url: `http://api.weatherstack.com/current`,
    method: 'GET',
    dataType: 'json',
    data: {
        access_key: umbrellaApp.apiKey,
        query: city,
    }
}).then(function(response) {
    let returnedData = response;
    $('.to-add').text(`The current temperature in ${returnedData.request.query} is ${returnedData.current.temperature}°C. The chance of rain now is ${returnedData.current.precip} mm.`);
    console.log(returnedData);
});
};

umbrellaApp.grabUserInputCity = function() {
        const userInputCity = $("#city").val();
        console.log('userInputCity', userInputCity);
        //call getWeatherInUserCity function and pass in the city entered by the user as an argument 
        umbrellaApp.getWeatherInUserCity(userInputCity);
};

umbrellaApp.getFetchedIpWeatherData = function() {
    $.ajax({
        url: `http://api.weatherstack.com/current`,
        method: 'GET',
        dataType: 'json',
        data: {
            access_key: umbrellaApp.apiKey,
            query: 'fetch:ip',
        }
    }).then(function(response) {
        returnedData = response;
        console.log(returnedData);
        $('.to-add').text(`The current temperature in ${returnedData.location.name}, ${returnedData.location.country} is ${returnedData.current.temperature}°C. The chance of rain now is ${returnedData.current.precip}mm`);
    });
    };

// //create an init function
umbrellaApp.init = function() {
    //create an event listener on form submit and call function 
    $('.submit').on('click', umbrellaApp.grabUserInputCity);
    //create an event listener on form submit and call function 
    $('.find-me').on('click', umbrellaApp.getFetchedIpWeatherData);
    console.log('inside init');
};


//create document ready
$(document).ready(function() {
    umbrellaApp.init();
});














// fetch('http://api.weatherstack.com/current?access_key=0c68ac7ef4870b7a73e3f57a55e33828&query=Toronto').then(res => {
//     console.log(res.data);
// });



umbrellaApp.grabCurrentLocation = function() {
    // const coords = umbrellaApp.getCurrentLocation();
    const userLocation = $(`longitude, latitude`);
    // umbrellaApp.getWeatherData(latitude, longitude);
    // umbrellaApp.getWeatherData (userLocation);
    umbrellaApp.getWeatherData ("43.645557249999996, -79.53076971428573");
}; 


latitude = 0;
longitude = 0;

umbrellaApp.getCurrentLocation = function() {
    navigator.geolocation.getCurrentPosition(function(location) {
        if (navigator.geolocation) {
        latitude = location.coords.latitude;
        console.log(location.coords.latitude);
        longitude = location.coords.longitude;
        console.log(location.coords.longitude);
        umbrellaApp.getWeatherInCurrentLocation (latitude, longitude);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
});
};


setTimeout(() => {
    console.log(`Global ${latitude}, ${longitude}`);
}, 5000);


umbrellaApp.getWeatherInCurrentLocation = function(lat = 43.645913799999995, lon = -79.529708) {
    $.ajax({
        url: `http://api.weatherstack.com/current`,
        method: 'GET',
        dataType: 'json',
        data: {
            access_key: umbrellaApp.apiKey,
            query: lat, lon,
        }
    }).then(function(response) {
        let returnedData = response;
        $('.to-add').text(`The current temperature in ${returnedData.location.name}, ${returnedData.location.country} is ${returnedData.current.temperature}°C. The chance of rain now is ${returnedData.current.precip}mm`);
        console.log(`Current location weather ${returnedData}`);
    });
};