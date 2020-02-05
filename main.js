//jshint esversion:6

window.addEventListener("load", () => {

  let temperatureDescription = document.querySelector(".temperature-desc");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/9283cb509348c34bd712decd8622a319/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {
            temperature,
            summary,
            icon
          } = data.currently;

          //Set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Celcius Conversion
          let cel = (temperature - 32) * (5 / 9);
          let celcius = cel.toFixed(2);

          //Calling SetIcon funstion to change the skycon
          setIcons(icon, document.querySelector(".icon"));

          //Change Temperature to Celcius or Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = celcius;
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = temperature;
            }
          });

        });
    });
  }

  // Function to get Skycons through ID
  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: "white"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});
