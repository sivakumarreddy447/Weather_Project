document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("weather-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const city = document.getElementById("city").value;
      if (city) {
        fetchWeatherData(city);
      }
    });

  function fetchWeatherData(city) {
    const apiKey = "8437aef4d99e31e0b3bbaac30ce1bee5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Moved inside the .then() block
        displayWeatherData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function displayWeatherData(data) {
    if (data.cod === 200) {
      document.getElementById("city-name").innerText = `City: ${data.name}`;
      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${data.main.temp}°C`;
      document.getElementById(
        "humid"
      ).innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById(
        "wind"
      ).innerText = `Wind Speed: ${data.wind.speed} m/s`;
      document.getElementById(
        "pressure"
      ).innerText = `Pressure: ${data.main.pressure}`;
      document.getElementById(
        "descrption"
      ).innerText = `Descrption: ${data.weather[0].description}`;

      let weather_img = document.getElementById("weather-img");

      switch (data.weather[0].main) {
        case "Clouds":
          weather_img.src = "/assets/cloud.png";
          break;
        case "Clear":
          weather_img.src = "/assets/clear.png";
          break;
        case "Rain":
          weather_img.src = "/assets/rain.png";
          break;
        case "Mist":
          weather_img.src = "/assets/mist.png";
          break;
        case "Snow":
          weather_img.src = "/assets/snow.png";
          break;
        default:
          weather_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      }
    } else {
      alert("City not found!");
    }
  }
});
