import React, { useEffect, useRef, useState } from "react";
import humidityIcon from "./assets/humidity.png"
import cloudSunIcon from "./assets/cloud_sun.png"
import cloudIcon from "./assets/cloud.png"
import windSpeedIcon from "./assets/windSpeed.png"
import rainyIcon from "./assets/rainy.png"
import searchIcon from "./assets/search.png"
import snowFlakeIcon from "./assets/snowflake.png"
import sunIcon from "./assets/sun.png"
import thunderIcon from "./assets/thunder.png"
import windyIcon from "./assets/windy.png"

const Weather = () => {
  const [weather, setWeather] = useState(false);
  const inputRef = useRef("");

  const allIcons = {
    icon1 : cloudSunIcon,
    icon2 : cloudIcon,
    icon3 : rainyIcon,
    icon4 : snowFlakeIcon,
    icon5 : sunIcon,
    icon6 : thunderIcon,
    icon7 : windyIcon
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const getWeather = async (city) => {
    if (city === "") {
      alert("It doesn't accept empty input.. :)");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    const icon = allIcons[data.weather[0].icon];
    console.log();
    
    setWeather({
      humidity: data?.main?.humidity,
      windSpeed: data?.wind?.speed,
      tempurature: Math.ceil(data?.main?.temp),
      loction: data?.name,
      code: data?.sys?.country,
      description: data?.weather[0]?.description,
      icon: icon
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page refresh
    getWeather(inputRef.current.value); // Calls function when Enter is pressed
  };

  useEffect(() => {
    getWeather("Pakistan");
  });

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <form className="searchBar" onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" placeholder="Enter a Location" />
        <img
          className="searchIcon"
          src={searchIcon}
          alt="Search Icon"
          onClick={() => getWeather(inputRef.current.value)}
        />
      </form>
      {weather ? (
        <>
          <img src={weather.icon} alt="" className="weatherIcon" />
          <p className="tempurature">{weather.tempurature} &#186; C</p>
          <p className="location">
            {weather.loction} , {weather.code}
          </p>
          <p className="description">{weather.description}</p>
          <div className="weatherData">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windSpeedIcon} alt="" />
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
