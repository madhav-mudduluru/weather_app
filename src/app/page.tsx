"use client";
import React from "react";
import { useState } from "react";

const ApiKey = "b79e19d8b8cf4731438fd51908dc7198";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");

  const [weatherInfo, setWeatherInfo] = useState<any>({});

  async function getWeatherInfo() {
    console.log("button clicked");

    try {
      const weather = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" +
          "q=" +
          locationInput +
          "&appid=" +
          ApiKey +
          "&units=imperial"
      );
      const data = await weather.json();
      console.log(data);
      if (data?.cod === "400") throw data;
      setWeatherInfo(data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(locationInput);
  return (
    <main>
      <div className="flex justify-center items-center w-screen h-screen static">
        <img
          className="bg-cover"
          src="https://littlevisuals.co/images/a_mile.jpg"
        ></img>
        <div
          className="absolute flex flex-col bg-neutral-800 w-1/3 h-1/3 text-left
         justify-center text-slate-50 rounded-md "
        >
          <h1 className="ml-4 text-sky-400 font-serif font-semibold mb-3 text-center hover:text-xl">
            Get The Weather
          </h1>
          <h2 className="ml-4 mb-2 text-cyan-200">Enter a city name below</h2>
          <label className="ml-4 mb-1">City Name</label>
          <input
            type="text"
            className="mb-2 w-2/4 rounded-sm text-stone-900 ml-4"
            placeholder=" ex- nellore.."
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <div>
            <button
              className="ml-4 bg-teal-600 rounded-lg p-2"
              onClick={() => getWeatherInfo()}
            >
              Get Weather
            </button>
            {Object.keys(weatherInfo).length !== 0 ? (
              <>
                <p className="ml-4">{weatherInfo.name} Weather</p>
                <p className="ml-4">
                  currently: {weatherInfo.main.temp} &deg; F
                </p>
                <p className="ml-4">
                  feels like: {weatherInfo.main.feels_like} &deg; F
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
