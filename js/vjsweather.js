window.addEventListener('load', ()=> {
    let long;
    let lat;
    var day;
    var night;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section');

    document.getElementById("temperature-description").className="temperature-description capitalize";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weatherapi = `${proxy}https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${long}&unit_system=us&fields=temp%2Cweather_code&apikey=jKfdwHtjZJIfyZD7wt5b7tipwoMaIKkm`;
            const ipgeoapi = `${proxy}https://api.ipgeolocation.io/ipgeo?apiKey=393cb8d12b144b0086859be6c40d8307`;

            fetch(weatherapi)
            .then(function (response){
                return response.json();
            })
            .then(function (data) {
                temp = data.temp.value;
                weathercode = data.weather_code.value;
                summary = weathercode.replace(/_/g, ' ');
                icon = weathercode.toUpperCase();

                //Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temp) + "°";
                temperatureDescription.textContent = summary;

                //Formula for Celsius
                let celsius = (temp - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

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
            });

            fetch(ipgeoapi)
            .then(function (response){
                return response.json();
            })
            .then(function (data) {
                city = data.city;
                time = data.time_zone.current_time;
                //YYYY-MM-DD HH:MM:SS.XXX-XXXX
                timecheck = time.charAt(11) + time.charAt(12);
                /*
                if (timecheck >= "05" && timecheck <= "20"){
                    day = true;
                    night = false;
                    document.getElementById("application-body").className="gradient-day";
                }else{
                    day = false;
                    night = true;
                    document.getElementById("application-body").className="gradient-night";
                }
                */
                //Set DOM Elements from the API
                locationTimezone.textContent = city;
                
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        var currentIcon = icon.replace(/_/g, '_');

        switch (currentIcon){
            case 'MOSTLY_CLEAR':
                currentIcon = "CLEAR";
                break;
            case "MOSTLY_CLOUDY":
                currentIcon = "CLOUDY";
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
        }

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