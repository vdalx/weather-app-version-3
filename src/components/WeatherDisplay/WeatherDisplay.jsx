import { useState } from "react";
import axios from "axios";
import "./WeatherDisplay.scss";

function WeatherDisplay (props) {
    const [temperature, setTemperature] = useState(null);
    
    function showTemperature(response) {
        setTemperature(response.data.main.temp);
    }
    
    const apiKey = "701f06352d61835bc4fc894e7b084629";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
    
    axios
        .get(apiUrl)
        .then((response) => {
            showTemperature(response);
        })
        .catch((error) => {
            console.log(error);
        });
    
    return (
        <div className="weather-display__container">
            <h1 className="weather-display__text">
                The temperature in {props.city} is {Math.round(temperature)}°C
            </h1>
        </div>
  );
}

export default WeatherDisplay;