import React from 'react'

interface CurrentDateAndTimeProps{
  city:string;
  time:string;
  date:string;
}

const CurrentDateAndTime = ({city,time,date} : CurrentDateAndTimeProps) => {
  return (
    <div className=''>
            <p className='font-bold text-[#292929] text-2xl'>{city}</p>
            <div className="">
                <p className='font-bold text-[#292929] text-7xl'>{time}</p>
                <p className='text-sm'>{date}</p>
            </div>
    </div>
  )
}

export default CurrentDateAndTime