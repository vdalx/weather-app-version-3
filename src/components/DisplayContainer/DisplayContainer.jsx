import SearchEngine from '../SearchEngine/SearchEngine';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import "./DisplayContainer.scss";


function DisplayContainer () {
    return (
        <div className="display-container__container">
            <SearchEngine />
            <WeatherDisplay />
        </div>
  );
}

export default DisplayContainer;