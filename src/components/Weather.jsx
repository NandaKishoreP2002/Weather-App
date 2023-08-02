import axios from "axios";
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Weather() {
    const apiKey="";
    const unit="metric";
    const [city, setCity]=useState("");
    const [temp, setTemp]=useState("");
    const [min, setMin]=useState("");
    const [max, setMax]=useState("");
    const [description, setDescription]=useState("");
    const [icon, setIcon]=useState("");
    const [country, setCountry]=useState("");
    const [showMyComponent, setShowMyComponent]=useState(false);
    const getWeatherData = async(city) => {
        await axios({
            method:'GET',
            url:"https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit
        }).then((res) => {
            console.log(res.data);
            setTemp(res.data.main.temp);
            setIcon(res.data.weather[0].icon);
            setDescription(res.data.weather[0].description);
            setMin(res.data.main.temp_min);
            setMax(res.data.main.temp_max);
            setCountry(res.data.sys.country);
            setShowMyComponent(true);
        }).catch((err) => {
            console.log(err);
        })
    }
    function handleChange(event) {
        setCity(event.target.value);
        setShowMyComponent(false);
    }
    function handleKeyPress(event) {
        if(event.key==='Enter') {
            getWeatherData(city);
        }


    }
    return <div>
        <div className="input-wrapper">
        <input className="form-control grand-input"
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Search..." 
            onKeyDown={handleKeyPress}
        />

        </div>
        <button className="unique-button" onClick={() => getWeatherData(city)}>
        <FontAwesomeIcon icon={faSearch} />
        </button>
        {showMyComponent && (
            <div className="display-card" style={{padding:40}}>
                <h1>{city}, {country}</h1>
                <img src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt="weather-icon" style={{width:200, height:200}}/>
                <h1>{temp}°C</h1>
                <h4 className="">Min:{min}°C | Max:{max}°C</h4>
                <h2>{description}</h2>
                <h4 className="">Date: {new Date().toLocaleDateString()}</h4>
            </div>
        )}
    </div>
}

export default Weather;