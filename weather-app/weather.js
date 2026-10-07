const weatherData = {
  Abuja: {
    country: "Nigeria",
    temperature: 28,
    feels: 29,
    condition: "Clear skies",
    description: "A calm and bright day is unfolding.",
    emoji: "☀️",
    humidity: 62,
    wind: 12,
    visibility: 10,
    pressure: 1012,
    sunrise: "06:20",
    sunset: "18:42",
    mood: "Bright & easy",
    moodIcon: "☀",
    moodText:
      "Perfect conditions for getting outside and making the most of the day."
  },

  London: {
    country: "United Kingdom",
    temperature: 16,
    feels: 15,
    condition: "Partly cloudy",
    description: "A cool breeze moves beneath scattered clouds.",
    emoji: "⛅",
    humidity: 71,
    wind: 18,
    visibility: 9,
    pressure: 1008,
    sunrise: "06:55",
    sunset: "18:15",
    mood: "Soft & calm",
    moodIcon: "☁",
    moodText:
      "A comfortable day for a walk, coffee and taking things at your own pace."
  },

  "New York": {
    country: "United States",
    temperature: 21,
    feels: 20,
    condition: "Clear",
    description: "Clean skies with a gentle afternoon breeze.",
    emoji: "🌤️",
    humidity: 54,
    wind: 14,
    visibility: 12,
    pressure: 1015,
    sunrise: "06:48",
    sunset: "18:51",
    mood: "Fresh & energetic",
    moodIcon: "✨",
    moodText:
      "The atmosphere is inviting. A great excuse to spend some time outdoors."
  }
};

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function renderWeather(city) {
  const data = weatherData[city];

  if (!data) {
    showToast("That city isn't available in the demo yet.");
    return;
  }

  document.getElementById("locationName").textContent =
    `${city}, ${data.country}`;

  document.getElementById("temperature").textContent = data.temperature;
  document.getElementById("feelsLike").textContent = `${data.feels}°`;
  document.getElementById("condition").textContent = data.condition;
  document.getElementById("description").textContent = data.description;
  document.getElementById("weatherEmoji").textContent = data.emoji;

  document.getElementById("humidity").textContent = `${data.humidity}%`;
  document.getElementById("wind").textContent = `${data.wind} km/h`;
  document.getElementById("visibility").textContent = `${data.visibility} km`;
  document.getElementById("pressure").textContent = `${data.pressure} hPa`;

  document.getElementById("sunrise").textContent = data.sunrise;
  document.getElementById("sunset").textContent = data.sunset;

  document.getElementById("moodTitle").textContent = data.mood;
  document.getElementById("moodIcon").textContent = data.moodIcon;
  document.getElementById("moodText").textContent = data.moodText;

  generateTimeline(data.temperature);
  generateForecast(data.temperature);
}

function generateTimeline(baseTemperature) {
  const timeline = document.getElementById("timeline");

  timeline.innerHTML = "";

  const hours = [
    "Now",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];

  hours.forEach((hour, index) => {
    const temperature = baseTemperature + Math.round(Math.sin(index) * 2);

    const item = document.createElement("div");
    item.className = "hour";

    item.innerHTML = `
      <span class="hour-time">${hour}</span>
      <div class="hour-temp">${temperature}°</div>
      <div class="hour-line"></div>
    `;

    timeline.appendChild(item);
  });
}

function generateForecast(baseTemperature) {
  const forecast = document.getElementById("forecast");

  forecast.innerHTML = "";

  const days = [
    ["Today", "☀️", 2],
    ["Tue", "⛅", 1],
    ["Wed", "🌤️", 0],
    ["Thu", "🌧️", -2],
    ["Fri", "⛅", -1],
    ["Sat", "☀️", 2],
    ["Sun", "🌤️", 1]
  ];

  days.forEach(([day, icon, change]) => {
    const high = baseTemperature + change;
    const low = high - 5;

    const item = document.createElement("div");

    item.className = "forecast-day";

    item.innerHTML = `
      <small>${day}</small>
      <span class="icon">${icon}</span>
      <strong>${high}°</strong>
      <span>${low}°</span>
    `;

    forecast.appendChild(item);
  });
}

function searchCity() {
  const city = cityInput.value.trim();

  if (!city) {
    showToast("Enter a city first.");
    return;
  }

  const formattedCity = Object.keys(weatherData).find(
    item => item.toLowerCase() === city.toLowerCase()
  );

  if (!formattedCity) {
    showToast("Try Abuja, London or New York.");
    return;
  }

  renderWeather(formattedCity);
  cityInput.value = "";
}

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchCity();
  }
});

function updateTime() {
  const now = new Date();

  document.getElementById("currentTime").textContent =
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
}

updateTime();
setInterval(updateTime, 60000);

renderWeather("Abuja");