import { useEffect, useState } from "react";
import axios from "axios";

const WeatherCard = ({ title, value }) => {
  return (
    <div className="weather-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(input);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: "03394addafd0456c9e472730252704",
            q: city,
          },
        }
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      alert("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (city) {
      getWeatherData();
    }
  }, [city]);

  return (
    <div style={{ padding: "16px" }}>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          maxWidth: "400px",
          marginInline: "auto",
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Enter city name"
          onChange={(e) => setInput(e.target.value)}
          style={{
            height: "30px",
            width: "100%",
            border: "1px solide #ddd",
            paddingInline: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "rgb(46, 125, 50)",
            border: "none",
            color: "white",
            paddingInline: "28px",
            height: "30px",
          }}
        >
          Search
        </button>
      </form>

      <div>
        {loading && <p>Loading data...</p>}
        {weatherData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginInline: "auto",
              maxWidth: "400px",
            }}
          >
            {[
              {
                title: "Temperature",
                value: `${weatherData.current.temp_c}°C`,
              },
              { title: "Humidity", value: `${weatherData.current.humidity}%` },
              { title: "Condition", value: weatherData.current.condition.text },
              {
                title: "Wind Speed",
                value: `${weatherData.current.wind_kph} kph`,
              },
            ].map((info, index) => (
              <WeatherCard key={index} title={info.title} value={info.value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
