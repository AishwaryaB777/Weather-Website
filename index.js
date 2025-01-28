const apikey = "eefe0fcb01cd9542e9fe0e1185c34e3f";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value.trim(); 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); 
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></img>`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = `
            <div>Feels like: ${feelsLike}°C</div>
            <div>Humidity: ${humidity}%</div>
            <div>Wind Speed: ${windSpeed} m/s</div>`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error occurred, please try again later.";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
});
