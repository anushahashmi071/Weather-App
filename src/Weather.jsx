import React, { useEffect, useRef, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(false);

  const allIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "05d": "https://openweathermap.org/img/wn/05d@2x.png",
    "05n": "https://openweathermap.org/img/wn/05n@2x.png",
    "06d": "https://openweathermap.org/img/wn/06d@2x.png",
    "06n": "https://openweathermap.org/img/wn/06n@2x.png",
    "07d": "https://openweathermap.org/img/wn/07d@2x.png",
    "07n": "https://openweathermap.org/img/wn/07n@2x.png",
    "08d": "https://openweathermap.org/img/wn/08d@2x.png",
    "08n": "https://openweathermap.org/img/wn/08n@2x.png",
    "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    "10n": "https://openweathermap.org/img/wn/10n@2x.png",
  };

  const inputRef = useRef();
  const apiKey = import.meta.env.VITE_API_KEY;
  const getWeather = async (city) => {
    if (city === "") {
      alert("Enter a City");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    // if (!response.ok) {
    //   alert(data.message)      
    // }

    const data = await response.json();
    console.log(data);
    
    const icon = allIcons[data.weather[0].icon];
    setWeather({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      tempurature: Math.floor(data.main.temp),
      loction: data.name,
      code: data.sys.country,
      icon: icon,
    });
  };

  useEffect(() => {
    getWeather();
  });

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <div className="searchBar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          className="searchIcon"
          src="./src/assets/search.png"
          onClick={() => getWeather(inputRef.current.value)}
        />
      </div>
      {weather ? (
        <>
          <img src={weather.icon} alt="" className="weatherIcon" />
          <p className="tempurature">{weather.tempurature} C</p>
          <p className="location">{weather.loction} , {weather.code}</p>
          <div className="weatherData">
            <div className="col">
              <img src="./src/assets/humidity.png" alt="" />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src="./src/assets/windy.png" alt="" />
              <div>
                <p>{weather.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
