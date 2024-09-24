import Image from "next/image";
import React from "react";

interface HourlyForecastProps {
  time: string;
  weatherImage: string;
  temp: number;
  windSpeed: number;
  windImage: string;
}

const HourlyForecast = ({
  time,
  weatherImage,
  temp,
  windSpeed,
  windImage,
}: HourlyForecastProps) => {
  return (
    <div>
      <div className="bg-custom-gradient font-bold w-[130px] h-[270px] rounded-[40px] flex flex-col items-center justify-evenly text-[24px] p-2">
        <p>{time}</p>
        <Image src={weatherImage} width={80} height={80} alt="" className="" />
        <p>{temp}&deg;C</p>
        <Image src={windImage} width={55} height={55} alt="" />
        <p>{windSpeed}km/h</p>
      </div>
    </div>
  );
};

export default HourlyForecast;
