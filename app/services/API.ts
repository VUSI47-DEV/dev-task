import axios from "axios";

const API_KEY = process.env.API_KEY;

const getWeatherData = (city:string) =>{
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=02364c7373ab65999334aa6c3121e0fd`)
}

export default{
    getWeatherData,
};