import React, { useEffect, useRef, useState } from "react";
import clearSkyIcon from "./assets/clearSky.png"
import nightSkyIcon from "./assets/nightSky.png"
import fewCloudIcon from "./assets/fewCloud.png"
import cloudIcon from "./assets/cloud.png" 
import rainyIcon from "./assets/rainy.png"
import showerRainIcon from "./assets/showerRain.png"
import searchIcon from "./assets/search.png"
import snowFlakeIcon from "./assets/snowflake.png"
import mistIcon from "./assets/mist.png"
import thunderIcon from "./assets/thunder.png"
import brokenCloudIcon from "./assets/brokenCloud.png"
import windyIcon from "./assets/windy.png"

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const inputRef = useRef("");

  const allIcons = {
    "01d" : clearSkyIcon,
    "01n" : nightSkyIcon,
    "02d" : fewCloudIcon,
    "02n" : fewCloudIcon,
    "03d" : cloudIcon,
    "03n" : cloudIcon,
    "04d" : brokenCloudIcon,
    "04n" : brokenCloudIcon,
    "09d" : showerRainIcon,
    "09n" : showerRainIcon,
    "10d" : rainyIcon,
    "10n" : rainyIcon,
    "11d" : thunderIcon,
    "11n" : thunderIcon,
    "30d" : snowFlakeIcon,
    "30n" : snowFlakeIcon,
    "50d" : mistIcon,
    "50n" : mistIcon
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const getWeather = async (city) => {
    if (city === "") {
      alert("Please!!! Enter the city name. It doesn't accept empty input.. :)");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();

    if(!response.ok){
      alert(data.message)
    }

    const icon = allIcons[data.weather[0].icon] || clearSkyIcon ;
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

  // useEffect(() => {
  //   getWeather("pakistan");
  // },[]);

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
          <img src={weather.icon} alt={weather.icon} className="weatherIcon" width={100} height={100} />
          <p className="tempurature">{weather.tempurature} &#186; C</p>
          <p className="location">
            {weather.loction} , {weather.code}
          </p>
          <p className="description">{weather.description}</p>
          <div className="weatherData">
            <div className="col">
              <img src={mistIcon} alt="" />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windyIcon} alt="" />
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
