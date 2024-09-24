import Image from "next/image";
import React from "react";

interface CurrentWeatherProps {
  weatherIcon: string;
  temp: number;
  feelsLike: number | undefined;
  date: string;
  hummidityIcon: string;
  hummidity: number;
  windSpeedIcon: string;
  windSpeed: number;
  pressureIcon: string;
  pressure: number;
  uv:number;
  uvIcon:string;
  currentDesc:string;
  sunrise:string | undefined;
  sunset:string | undefined;
}

const CurrentWeather = ({
  weatherIcon,
  temp,
  feelsLike,
  currentDesc,
  hummidity,
  uv,
  windSpeed,
  pressure,
  sunrise,
  sunset,


}: CurrentWeatherProps) => {
  return (
    <div className="flex w-full rounded-lg">
      <div className="col-span-1 flex flex-col justify-center items-center  w-full font-bold">
        <p className=" text-6xl text-[#292929] text-center mt-6">{temp}&deg;C</p>
        <p className="text-xl text0-[#292929] text-center">
          Feels like : {feelsLike}&deg;C
        </p>

        <div className="flex items-center justify-center gap-2 mt-10">
          <Image
            src={"/light/sunrise-white 1.png"}
            width={48}
            height={48}
            alt=""
          />
          <div className="">
            <p className="text-lg">Sunrise</p>
            <p className="text-sm">{sunrise}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          <Image
            src={"/light/sunset-white 1.png"}
            width={48}
            height={48}
            alt=""
          />
          <div className="">
            <p className="text-lg">Sunrise</p>
            <p className="text-sm">{sunset}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 w-full flex flex-col items-center justify-center">
        <Image src={weatherIcon} width={270} height={270} alt="" />
        <p className="font-bold text-2xl capitalize">{currentDesc}</p>
      </div>
      <div className="col-span-1  w-full flex items-center justify-center">
        <div className="grid grid-cols-2 items-center justify-center gap-14">
          <div className="humidity">
            <Image src="/light/humidity 1.png" width={60} height={100} alt="" />
            <p className="font-bold text-sm">{hummidity}</p>
            <p className="font-bold text-sm">Hummidudty</p>
          </div>
          <div className="wind">
            <Image src="/light/wind 1.png" width={60} height={50} alt="" />
            <p className="font-bold text-sm">{windSpeed}</p>
            <p className="font-bold text-sm">Wind Speed</p>
          </div>
          <div className="pressure">
            <Image
              src="/light/pressure-white 1.png"
              width={60}
              height={50}
              alt=""
            />
            <p className="font-bold text-sm">{pressure}</p>
            <p className="font-bold text-sm">Pressure</p>
          </div>
          <div className="uv">
            <Image src="/light/uv-white 1.png" width={60} height={100} alt="" />
            <p className="font-bold text-sm">{uv}</p>
            <p className="font-bold text-sm">UV</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
