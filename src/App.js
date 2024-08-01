import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  async function getData(param) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${param}&APPID=104ff35e3e1be02d80ec06cfe96d77d2

`
    );
    const data = await res.json();

    setData(data);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleSearch() {
    getData(city);
  }

  useEffect(() => {
    getData("bangalore");
  }, []);

  console.log(data);
  console.log(city);

  return (
    <main>
      <div className="container">
        <div className="enter">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => handleSearch()}>Search</button>
        </div>
        <div className="main">
          <h3>City: {data.name}</h3>
          <p>{getCurrentDate()}</p>
          <h1>{data.main.feels_like}</h1>
          <p>{data.weather[0].description}</p>
          <div className="later">
            <h3>Speed: {data.wind.speed}</h3>
            <hr />

            <h3>Humidity:{data.main.humidity} </h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
