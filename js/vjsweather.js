window.addEventListener('load', ()=> {
    let long;
    let lat;
    var day;
    var night;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    //let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section');
    
    let feelsLikeValue = document.querySelector('.feelslike-value');
    let humidityValue = document.querySelector('.humid-value');
    let precipValue = document.querySelector('.precip-value');

    let aqiValue = document.querySelector('.aqi-value');
    let aqiDescription = document.querySelector('.aqi-hc');
    //let aqiDetailed = document.querySelector('aqi-detailed');

    let sunriseTime = document.querySelector('.sunrise-value');
    let sunsetTime = document.querySelector('.sunset-value');

    document.getElementById("temperature-description").className="temperature-description capitalize";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weatherapi = `${proxy}https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${long}&unit_system=us&fields=temp%2Cfeels_like%2Cweather_code%2Chumidity%2Cprecipitation%2Csunrise%2Csunset%2Cepa_aqi%2Cepa_health_concern&apikey=jKfdwHtjZJIfyZD7wt5b7tipwoMaIKkm`;
            //fields=temp%2Cweather_code
            const ipgeoapi = `${proxy}https://api.ipgeolocation.io/ipgeo?apiKey=393cb8d12b144b0086859be6c40d8307`;

            fetch(weatherapi,{
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                referrerPolicy: 'same-origin'
            })
            .then(function (response){
                //return response.json();
                if(response.ok){
                    return response.json();
                }
            })
            .then(function (data) {
                console.log(data);
                temp = data.temp.value;
                feelslike = data.feels_like.value;
                humidity = data.humidity.value;
                precipitation = data.precipitation.value;
                sunrisetime = data.sunrise.value;
                sunsettime = data.sunset.value;
                aqi = data.epa_aqi.value;
                aqidesc = data.epa_health_concern.value;
                weathercode = data.weather_code.value;
                summary = weathercode.replace(/_/g, ' ');
                icon = weathercode.toUpperCase();
                //aqidetail = "The air quality is generally acceptable for most individuals. However, sensitive groups may experience minor to moderate symptoms from long-term exposure.";

                //Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temp) + "° F";
                temperatureDescription.textContent = summary;

                feelsLikeValue.textContent = "feels like " + Math.floor(feelslike) + "° F";
                humidityValue.textContent = "humidity " + Math.floor(humidity) + " %";
                precipValue.textContent = "precipitation " + Math.floor(precipitation) + " in/hr";

                aqiValue.textContent = Math.floor(aqi);
                aqiDescription.textContent = aqidesc;
                //aqiDetailed.textContent = aqidetail;

                //YYYY-MM-DD HH:MM:SS.XXX-XXXX
                //SUNRISE
                sunrisehours = sunrisetime.charAt(11)+sunrisetime.charAt(12);
                if(sunrisehours >= "00" && sunrisehours <= "18"){
                    sunhour = " AM";
                }
                else{
                    sunhour = " PM";
                }
                if(sunrisehours >="13" && sunrisehours <="24"){
                    finalsunrisehour = (sunrisehours - 12);
                }
                else{
                    finalsunrisehour = sunrisehours;
                }
                sunriseconversion = finalsunrisehour+":"+sunrisetime.charAt(14)+sunrisetime.charAt(15)+sunhour;
                sunriseTime.textContent = "sunrise at " + sunriseconversion;
                //SUNSET
                sunsethours = sunsettime.charAt(11)+sunsettime.charAt(12);
                if(sunsethours >= "00" && sunsethours <= "18"){
                    sunsethour = " AM";
                }
                else{
                    sunsethour = " PM";
                }
                if(sunsethours >="13" && sunsethours <="24"){
                    finalsunsethour = (sunsethours - 12);
                }
                else{
                    finalsunsethour = sunsethours;
                }
                sunsetconversion = finalsunsethour+":"+sunsettime.charAt(14)+sunsettime.charAt(15)+sunsethour;
                sunsetTime.textContent = "sunset at " + sunsetconversion;

                //Formula for Celsius
                let celsius = (temp - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector(".icon"));
                /*
                //Change temperature to Celsius/Farenheit
                degreeSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(celsius) + "°";
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor(temp) + "°";
                    }
                })
                */
               console.log(data);
            });

            fetch(ipgeoapi,{
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                referrerPolicy: 'same-origin'
            })
            .then(function (response){
                //return response.json();
                if(response.ok){
                    return response.json();
                }
            })
            .then(function (data) {
                city = data.city +', ' + data.state_prov;
                time = data.time_zone.current_time;
                //YYYY-MM-DD HH:MM:SS.XXX-XXXX
                timecheck = time.charAt(11) + time.charAt(12);
                
                if (timecheck >= "05" && timecheck <= "20"){
                    day = true;
                    night = false;
                }else{
                    day = false;
                    night = true;
                }
                
                //Set DOM Elements from the API
                locationTimezone.textContent = city;
                console.log(data);
                console.log(day);
                console.log(night);
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"monochrome": false});
        var currentIcon = icon.replace(/_/g, '_');

        /*switch (currentIcon){
            case 'CLEAR':
                    currentIcon = 'CLEAR_DAY';
                    break;
            case 'MOSTLY_CLEAR':
                currentIcon = "CLEAR_DAY";
                break;
            case "MOSTLY_CLOUDY":
                currentIcon = "CLOUDY";
                break;
            case "RAIN_LIGHT":
                currentIcon = "SHOWERS_DAY";
                break;
            case "DRIZZLE":
                currentIcon = "SHOWERS_DAY";
                break;
            case 'RAIN_HEAVY':
                currentIcon = "RAIN";
                break;
            case 'ICE_PELLETS_LIGHT':
                currentIcon = "SLEET";
                break;
            case 'FREEZING_RAIN':
                currentIcon = "RAIN_SNOW";
                break;
            case 'FREEZING_RAIN_HEAVY':
                currentIcon = "RAIN_SNOW";
                break;
            case 'SNOW_HEAVY':
                currentIcon = "SNOW";
                break;
            case 'FOG_LIGHT':
                currentIcon = "FOG";
                break;
            case 'TSTORM':
                currentIcon = "THUNDER_RAIN";
                break;
            case 'ICE_PELLETS':
                currentIcon = "HAIL";
                break;
            case 'ICE_PELLETS_HEAVY':
                currentIcon = "HAIL";
        }*/

        if(day === true){
            switch (currentIcon){
                case 'CLEAR':
                    currentIcon = 'CLEAR_DAY';
                    break;
                case 'MOSTLY_CLEAR':
                    currentIcon = 'CLEAR_DAY';
                    break;
                case 'PARTLY_CLOUDY':
                    currentIcon = 'PARTLY_CLOUDY_DAY';
                    break;
                case 'DRIZZLE':
                    currentIcon = 'SHOWERS_DAY';
                    break;
                case 'RAIN_LIGHT':
                    currentIcon = 'SHOWERS_DAY';
                    break;
                case 'FREEZING_DRIZZLE':
                    currentIcon = 'RAIN_SNOW_SHOWERS_DAY';
                    break;
                case 'FREEZING_RAIN_LIGHT':
                    currentIcon = 'RAIN_SNOW_SHOWERS_DAY';
                    break;
                case 'FLURRIES':
                    currentIcon = 'SNOW_SHOWERS_DAY';
                    break;
                case 'SNOW_LIGHT':
                    currentIcon = 'SNOW_SHOWERS_DAY';
                    break;
                case 'TSTORM':
                    currentIcon = 'THUNDER_SHOWERS_DAY';
            }
        }

        if(night === true){
            switch (currentIcon){
                case 'CLEAR':
                    currentIcon = 'CLEAR_NIGHT';
                    break;
                case 'MOSTLY_CLEAR':
                    currentIcon = 'CLEAR_NIGHT';
                    break;
                case 'PARTLY_CLOUDY':
                    currentIcon = 'PARTLY_CLOUDY_NIGHT';
                    break;
                case 'DRIZZLE':
                    currentIcon = 'SHOWERS_NIGHT';
                    break;
                case 'RAIN_LIGHT':
                    currentIcon = 'SHOWERS_NIGHT';
                    break;
                case 'FREEZING_DRIZZLE':
                    currentIcon = 'RAIN_SNOW_SHOWERS_NIGHT';
                    break;
                case 'FREEZING_RAIN_LIGHT':
                    currentIcon = 'RAIN_SNOW_SHOWERS_NIGHT';
                    break;
                case 'FLURRIES':
                    currentIcon = 'SNOW_SHOWERS_NIGHT';
                    break;
                case 'SNOW_LIGHT':
                    currentIcon = 'SNOW_SHOWERS_NIGHT';
                    break;
                case 'TSTORM':
                    currentIcon = 'THUNDER_SHOWERS_NIGHT';
            }
        }
        
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});