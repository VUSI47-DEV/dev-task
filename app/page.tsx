"use client";
import CurrentDateAndTime from "./components/CurrentDateAndTime";
import axios from "axios";
import { useEffect, useState } from "react";
import HourlyForecast from "./components/HourlyForecast";
import FiveDayForecast from "./components/FiveDayForecast";
import CurrentWeather from "./components/CurrentWeather";
import Image from "next/image";
import Switch from "@mui/material/Switch";

interface City {
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface Weather {
  id: number;
  description: string;
  icon: string;
  main: string;
}

interface WeatherInformation {
  dt_txt: string;
  dt: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  visibility: number;
  pop: number;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherInformation[]>([]);
  const [cityInformation, setCityInformation] = useState<City>();
  const [isDark, setIsDark] = useState<boolean>(false);

  const [city, setCity] = useState<string>("cape town");

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=02364c7373ab65999334aa6c3121e0fd`
      );
      setWeatherData(res.data.list);
      setCityInformation(res.data.city);
    } catch (error) {
      console.log("error", error);
    }
  };

  const convertUnixTimeStamp = (time: number) => {
    const date = new Date(time * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const getCurrentTime = (currTime: string) => {
    if (!currTime) return "";
    const time = currTime?.split(" ");
    return time[1];
  };

  const getDateNoTime = (date: string) => {
    const dt = date.split(" ");
    const newDate = new Date(dt[0]).toString().split(" ");

    return `${newDate[0]}, ${newDate[2]} ${newDate[1]} `;
  };

  const getHour = (time: string) => {
    const hour = time.split(" ");
    return hour[1];
  };

  const getFiveDayForecast = () => {
    return weatherData.filter((forecast) => forecast.dt_txt.includes("12:00:00"));
  };

  useEffect(() => {
    if (city) {
      getData();
    }
  }, [city]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className={`p-10 h-screen w-full ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {/* Creating search */}
        <div className=" px-10">
          <form
            className="flex justify-between items-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <Switch
                sx={{ backgroundColor: "transparent" }}
                {...label}
                size="medium"
                color="default"
                checked={isDark}
                onChange={(e) => setIsDark(e.target.checked)}
              />
              {isDark ? (
                <p className="font-bold text-lg">Dark Mode</p>
              ) : (
                <p>Light Mode</p>
              )}
            </div>
            <div className="flex items-center ">
              <Image
                width={30}
                height={30}
                src={"/light/search 1.png"}
                alt="search-icon"
                className="absolute left-64 cursor-pointer"
                onClick={getData}
              />
              <input
                type="text"
                className="border-slate-950 w-[803px] h-[62px] rounded-[40px] px-20"
                placeholder="Search for your preferred city..."
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <button className="dark text-white font-bold w-[292px] h-[62px] rounded-[40px] flex items-center justify-center gap-5">
              <Image
                src={"/current location icon.png"}
                width={35}
                height={35}
                alt=""
              />
              <p className="font-bold text-2xl">Current Weather</p>
            </button>
          </form>
        </div>

        <div className="h-screen w-full flex items-center justify-center mx-auto ">
          {weatherData.length > 0 ? (
            <div className="grid h-full w-full grid-cols-10 grid-rows-5 gap-6 p-5">
              <div className="col-span-3 row-span-2 bg-gray-300 dark:bg-gray-700 shadow-box-custom rounded-[30px] flex justify-center items-center flex-col text-center drop-shadow-md">
                {cityInformation && (
                  <CurrentDateAndTime
                    city={cityInformation.name}
                    date={getDateNoTime(weatherData[0].dt_txt)}
                    time={getCurrentTime(weatherData[0]?.dt_txt)}
                  />
                )}
              </div>
              <div className="col-span-6 row-span-3 bg-layout-gradient dark:bg-gray-800 shadow-box-custom rounded-[30px] flex relative">
                <CurrentWeather
                  currentDesc={weatherData[0].weather[0].description}
                  temp={weatherData[0]?.main.temp}
                  weatherIcon={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
                  date=""
                  feelsLike={weatherData[0]?.main.feels_like}
                  hummidity={weatherData[0]?.main.humidity}
                  hummidityIcon=""
                  pressure={weatherData[0]?.main.pressure}
                  pressureIcon=""
                  windSpeed={weatherData[0].wind.speed}
                  windSpeedIcon=""
                  uv={2}
                  uvIcon=""
                  sunrise={convertUnixTimeStamp(cityInformation?.sunrise)}
                  sunset={convertUnixTimeStamp(cityInformation?.sunset)}
                />
              </div>

              {/* Five Days Forecast */}
              <div className="col-span-3 row-span-5 bg-gray-300 dark:bg-gray-700 rounded-[30px] flex flex-col justify-center items-center text-[#292929] shadow-box-custom">
                <h4 className="text-md text-2xl font-bold">5 Days Forecast:</h4>
                <div>
                  {getFiveDayForecast().map((weather, index) => (
                    <FiveDayForecast
                      key={index}
                      date={getDateNoTime(weather.dt_txt)}
                      temp={weather.main.temp}
                      weatherIcon={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    />
                  ))}
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="col-span-6 row-span-7 bg-gray-300 dark:bg-gray-700 shadow-box-custom rounded-[30px] pl-12 pr-12 py-3">
                <h3 className="text-center text-[#292929] dark:text-white font-bold text-xl p-2">
                  Hourly Forecast
                </h3>
                <div className="flex justify-evenly">
                  {weatherData.slice(0, 5).map((weather, index: number) => (
                    <div key={index}>
                      <HourlyForecast
                        temp={weather.main.temp}
                        windSpeed={weather.wind.speed}
                        weatherImage={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        time={getHour(weather.dt_txt)}
                        windImage="/navigation 1.png"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>No weather data</div>
          )}
        </div>
      </div>
    </div>
  )}