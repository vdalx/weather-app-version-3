import { useState, useEffect } from "react";
import "./SearchEngine.scss";
import axios from "axios";

function SearchEngine() {
    
    const [city, setCity] = useState("Toronto");
    const [weatherLoaded, setWeatherLoaded] = useState(false);
    const [forecastLoaded, setForecastLoaded] = useState(false);
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState({});

    //const apiKey = "701f06352d61835bc4fc894e7b084629";
    //const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    //const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric`;
    const sheCodesApiKey = "o57fa7t996f351503fc5e6015403efbd";
    const sheCodesApiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${sheCodesApiKey}&units=metric`;
    const sheCodesApiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${sheCodesApiKey}&units=metric`;


    useEffect(() => {
        axios
        .get(sheCodesApiUrlCurrent)
        .then((response) => {
            showWeather(response.data);
            setWeatherLoaded(true)
        })
        .catch((error) => {
            console.log(error);
        });

        axios
        .get(sheCodesApiUrlForecast)
        .then((response) => {
            console.log(response.data)
            showForecast(response.data);
            setForecastLoaded(true)
        })
        .catch((error) => {
            console.log(error);
        });
    },[])

    function formatDate(timestamp) {
        let date = new Date(timestamp);
        let hours = date.getHours();
        if (hours <10) {
            hours = `0${hours}`;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minutes}`;
    }

    function formatDay(timestamp) {
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[day];
        }

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .get(sheCodesApiUrlCurrent)
            .then((response) => {
                showWeather(response.data);
                setWeatherLoaded(true)
            })
            .catch((error) => {
                console.log(error);
            });

            axios
            .get(sheCodesApiUrlForecast)
            .then((response) => {
                showForecast(response.data);
                setForecastLoaded(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function captureQuery(event) {
        setCity(event.target.value);
    }
    
    function showWeather(response) {
        setWeather({
            city: response.city,
            temp: response.temperature.current,
            desc: response.condition.description,
            humidity: response.temperature.humidity,
            wind: response.wind.speed,
            icon: response.condition.icon_url,
            timestamp: response.time
        });
    }

    function showForecast(response) {
        setForecast({
            city: response.city,
            temp: response.temperature.current,
            desc: response.condition.description,
            humidity: response.temperature.humidity,
            wind: response.wind.speed,
            icon: response.condition.icon_url
        });
    }

    return (
        <form className="search-engine__form-container" onSubmit={handleSubmit}>
            <div className="search-engine__title">
                <h2 className="search-engine__title-text"></h2>
            </div>
            <div className="search-engine__wrapper">
                <div className="search-engine__search-field">
                    <input
                        type="search"
                        placeholder="Enter a city..."
                        className="search-engine__form-control"
                        autoComplete="off"
                        onChange={captureQuery}
                    />
                </div>
                <div className="search-engine__btn-container>">
                    <input type="submit" value="Search" className="search-engine__submit-btn" />
                </div>
            </div>
            <div className="search-engine__display-container">
                {weatherLoaded && (
                    <div className="search-engine__display-wrapper">
                        <div className="search-engine__weather-summary">
                            <h1 className="search-engine__city-display">{weather.city}</h1>
                            <ul className="search-engine__location-details">
                                <li className="search-engine__display-item search-engine__date-time">Last updated: {formatDate(weather.timestamp)}</li>
                                <li className="search-engine__display-item search-engine__weather-desc">{weather.desc}</li>
                            </ul>
                        </div>
                        <div className="search-engine__weather-details">
                            <div className="search-engine__icon-temp">
                                <div className="search-engine__weather-icon-container">
                                    <img src={weather.icon} alt={weather.description} className="search-engine__weather-icon"/>
                                </div>
                                <h1 className="search-engine__display-item search-engine__temp">
                                    {Math.round(weather.temp)}
                                    <span className="search-engine__temp-unit-icon">°C</span>
                                </h1>
                            </div>
                            <ul className="search-engine__humidty-wind">
                                <li className="search-engine__display-item">Humidity: {weather.humidity}%</li>
                                <li className="search-engine__display-item">Wind: {weather.wind}km/h</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}

export default SearchEngine;