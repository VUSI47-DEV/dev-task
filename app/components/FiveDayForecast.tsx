import Image from 'next/image';
import React from 'react'

interface FiveDayForecastProps{
    weatherIcon:string;
    temp:number;
    date:string;
}

const FiveDayForecast = ({weatherIcon,temp,date} : FiveDayForecastProps) => {
  return (
    <div>
          <div className="flex gap-2 justify-between items-center  w-full">
            <Image
              src={weatherIcon}
              width={60}
              height={60}
              alt="weather-icon"
            />
            <p className="font-bold ">{temp}&deg;C</p>
            <p className="font-bold">{date}</p>
          </div>
    </div>
  )
}

export default FiveDayForecast