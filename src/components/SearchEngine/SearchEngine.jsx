import { useState } from "react";
import "./SearchEngine.scss";
import axios from "axios";

function SearchEngine() {
    const apiKey = "701f06352d61835bc4fc894e7b084629";
    
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
    
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        axios
            .get(apiUrl)
            .then((response) => {
                showWeather(response);
                setLoaded(true);
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
            temp: response.data.main.temp,
            desc: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        });
    }

    return (
        <form className="mb-3 search-engine" onSubmit={handleSubmit}>
            <div className="search-engine__title">
                <h2 className="search-engine__title-text">Weather Search Engine</h2>
            </div>
            <div className="search-engine__wrapper">
                <div className="search-engine__search-field">
                    <input
                        type="search"
                        placeholder="Enter a city..."
                        className="form-control"
                        autoComplete="off"
                        onChange={captureQuery}
                    />
                </div>
                <div className="search-engine__submit-btn>">
                    <input type="submit" value="Search" className="btn" />
                </div>
            </div>
            <div className="search-engine__display-container">
                {loaded && (
                    <ul className="search-engine__display-list">
                        <li className="search-engine__display-item">Temperature: {Math.round(weather.temp)}°C</li>
                        <li className="search-engine__display-item">Description: {weather.desc}</li>
                        <li className="search-engine__display-item">Humidity: {weather.humidity}%</li>
                        <li className="search-engine__display-item">Wind: {weather.wind}km/h</li>
                        <li className="search-engine__display-item search-engine__display-item--icon">
                            <img src={weather.icon} alt={weather.description} />
                        </li>
                    </ul>
                )}
            </div>
        </form>
    );
}

export default SearchEngine;