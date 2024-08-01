import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  async function getData(param) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&APPID=104ff35e3e1be02d80ec06cfe96d77d2`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Fetch error: ", error);
      setError("Failed to fetch data. Please try again.");
    }
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
    if (city.trim()) {
      getData(city);
    }
  }

  useEffect(() => {
    getData("bangalore");
  }, []);

  return (
    <main>
      <div className="container">
        <div className="enter">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        {data && (
          <div className="main">
            <h3>City: {data.name}</h3>
            <p>{getCurrentDate()}</p>
            <h1>{data.main ? data.main.feels_like : "N/A"}</h1>
            <p>{data.weather ? data.weather[0].description : "N/A"}</p>
            <div className="later">
              <h3>Speed: {data.wind ? data.wind.speed : "N/A"}</h3>
              <hr />
              <h3>Humidity: {data.main ? data.main.humidity : "N/A"}</h3>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
