import './App.scss';
import SearchEngine from './components/SearchEngine/SearchEngine';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';

function App() {
  return (
    <div className="App">
      <SearchEngine />
      <WeatherDisplay />
    </div>
  );
}

export default App;
