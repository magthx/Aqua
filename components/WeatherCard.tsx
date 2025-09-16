"use client";
import { useState, useEffect } from "react";

const API_KEY = "4682c02ff92368e5d85b62cb093b61b9";

type WeatherData = {
  main: { temp: number; temp_min: number; temp_max: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
};

type ForecastItem = {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { main: string; description: string }[];
};

type LocationData = { name: string; country: string };

export default function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const geoRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.length > 0) {
            setLocation({ name: geoData[0].name, country: geoData[0].country });
          } else {
            setLocation({ name: "Ubicación desconocida", country: "" });
          }

          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData);

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
          );
          const forecastData = await forecastRes.json();

          const dailyForecast: ForecastItem[] = [];
          const today = new Date().toISOString().split("T")[0];
          const addedDays: Set<string> = new Set();

          forecastData.list.forEach((item: ForecastItem) => {
            const day = item.dt_txt.split(" ")[0];
            if (day !== today && !addedDays.has(day)) {
              dailyForecast.push(item);
              addedDays.add(day);
            }
          });

          setForecast(dailyForecast.slice(0, 4));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      case "Thunderstorm":
        return "⛈️";
      default:
        return "🌈";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-200 to-indigo-400">
        <p className="text-lg font-semibold text-white">Cargando clima...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-400 flex flex-col items-center p-4 gap-4 sm:gap-6">
      {/* Clima actual */}
      {weather && location && (
        <div className="p-4 sm:p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg text-center w-full max-w-xs sm:max-w-sm">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">
            📍 {location.name}, {location.country}
          </h2>
          <div className="text-3xl sm:text-5xl md:text-6xl mt-4 animate-bounce">
            {getWeatherIcon(weather.weather[0].main)}
          </div>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-blue-700 mt-2">
            {Math.round(weather.main.temp)}°C
          </h1>
          <p className="capitalize text-gray-600 text-sm sm:text-base md:text-lg">
            {weather.weather[0].description}
          </p>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Min: {Math.round(weather.main.temp_min)}°C / Max:{" "}
            {Math.round(weather.main.temp_max)}°C
          </p>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            💧 Humedad: {weather.main.humidity}%
          </p>
        </div>
      )}

      {/* Pronóstico próximos días */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 overflow-x-auto py-2">
        {forecast.map((day, index) => {
          const date = new Date(day.dt_txt);
          const dayName = date.toLocaleDateString("es-ES", { weekday: "short" });

          return (
            <div
              key={index}
              className="flex-shrink-0 w-[90px] sm:w-[120px] md:w-[140px] bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg text-center p-3 sm:p-4 flex flex-col items-center hover:bg-amber-50 transition-all 300 cursor-pointer"
            >
              <p className="font-semibold text-xl sm:text-sm md:text-base">{dayName}</p>
              <div className="text-2xl sm:text-3xl md:text-4xl my-1 sm:my-2 animate-bounce">
                {getWeatherIcon(day.weather[0].main)}
              </div>
              <p className="text-gray-700 text-xs sm:text-sm md:text-base">
                {Math.round(day.main.temp_min)}°C / {Math.round(day.main.temp_max)}°C
              </p>
              <p className="capitalize text-gray-600 text-[16px] sm:text-xs md:text-sm">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
