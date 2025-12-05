document.addEventListener('DOMContentLoaded', function() {
    // ======================================================================
    // WEATHER API CONFIGURATION - ADD YOUR API KEY HERE
    // ======================================================================
    const WEATHER_API_KEY = 'f4944953f7280b4aa011e9c243eb9d9e'; // REPLACE WITH YOUR ACTUAL API KEY
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Weather API Integration for Weather Page
    const currentLocation = document.getElementById('current-location');
    const currentTemperature = document.getElementById('current-temperature');
    const currentCondition = document.getElementById('current-condition');
    const currentWind = document.getElementById('current-wind');
    const currentHumidity = document.getElementById('current-humidity');
    const currentFeelsLike = document.getElementById('current-feels-like');
    const currentVisibility = document.getElementById('current-visibility');
    const forecastCards = document.getElementById('forecast-cards');
    const suggestionCards = document.getElementById('suggestion-cards');

    // Get user's location and fetch weather
    function getLocationAndWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    await fetchWeatherData(lat, lon);
                    await fetchForecastData(lat, lon);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    fetchWeatherByIP();
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
            fetchWeatherByIP();
        }
    }

    // Fetch current weather data
    async function fetchWeatherData(lat, lon) {
        try {
            const response = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }
            
            const data = await response.json();
            updateCurrentWeatherUI(data);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            fetchWeatherByIP();
        }
    }

    // Fetch 5-day forecast data
    async function fetchForecastData(lat, lon) {
        try {
            const response = await fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error('Forecast API request failed');
            }
            
            const data = await response.json();
            updateForecastUI(data);
            generateOutfitSuggestions(data);
            
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            useDemoForecastData();
        }
    }

    // Fallback: Get weather by IP location
    async function fetchWeatherByIP() {
        try {
            // First get location by IP
            const ipResponse = await fetch('https://ipapi.co/json/');
            const ipData = await ipResponse.json();
            
            const { latitude, longitude, city, country_name } = ipData;
            
            // Then get weather for that location
            const weatherResponse = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
            const weatherData = await weatherResponse.json();
            
            updateCurrentWeatherUI(weatherData);
            
            // Get forecast
            const forecastResponse = await fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
            const forecastData = await forecastResponse.json();
            
            updateForecastUI(forecastData);
            generateOutfitSuggestions(forecastData);
            
        } catch (error) {
            console.error('Error fetching weather by IP:', error);
            useDemoWeatherData();
        }
    }

    // Final fallback: Use demo data
    function useDemoWeatherData() {
        const demoWeatherData = {
            name: 'Your Location',
            main: {
                temp: 22,
                feels_like: 24,
                humidity: 65
            },
            weather: [
                {
                    main: 'Clear',
                    description: 'clear sky'
                }
            ],
            wind: {
                speed: 3.5
            },
            visibility: 10000
        };
        
        updateCurrentWeatherUI(demoWeatherData);
        useDemoForecastData();
        alert('Using demo weather data. Please check your API key for live data.');
    }

    function useDemoForecastData() {
        const demoForecastData = {
            list: [
                {
                    dt: Date.now() / 1000 + 86400,
                    main: { temp: 23, temp_min: 18, temp_max: 25 },
                    weather: [{ main: 'Clear', description: 'clear sky' }]
                },
                {
                    dt: Date.now() / 1000 + 172800,
                    main: { temp: 20, temp_min: 16, temp_max: 22 },
                    weather: [{ main: 'Clouds', description: 'scattered clouds' }]
                },
                {
                    dt: Date.now() / 1000 + 259200,
                    main: { temp: 18, temp_min: 15, temp_max: 20 },
                    weather: [{ main: 'Rain', description: 'light rain' }]
                },
                {
                    dt: Date.now() / 1000 + 345600,
                    main: { temp: 21, temp_min: 17, temp_max: 23 },
                    weather: [{ main: 'Clear', description: 'clear sky' }]
                },
                {
                    dt: Date.now() / 1000 + 432000,
                    main: { temp: 19, temp_min: 16, temp_max: 21 },
                    weather: [{ main: 'Clouds', description: 'broken clouds' }]
                }
            ]
        };

        updateForecastUI(demoForecastData);
        generateOutfitSuggestions(demoForecastData);
    }

    // Update current weather UI
    function updateCurrentWeatherUI(data) {
        currentLocation.textContent = data.name;
        currentTemperature.textContent = `${Math.round(data.main.temp)}°C`;
        currentCondition.textContent = data.weather[0].description;
        currentWind.textContent = `${data.wind.speed} m/s`;
        currentHumidity.textContent = `${data.main.humidity}%`;
        currentFeelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        currentVisibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }

    // Update forecast UI
    function updateForecastUI(data) {
        forecastCards.innerHTML = '';
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Get unique days (one forecast per day)
        const dailyForecasts = [];
        const processedDays = new Set();
        
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayKey = date.toDateString();
            
            if (!processedDays.has(dayKey) && dailyForecasts.length < 5) {
                processedDays.add(dayKey);
                dailyForecasts.push(forecast);
            }
        });
        
        dailyForecasts.forEach((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = days[date.getDay()];
            
            const weatherIcon = getWeatherIcon(day.weather[0].main);
            
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <div class="day">${index === 0 ? 'Tomorrow' : dayName}</div>
                <div class="weather-icon">
                    <i class="fas ${weatherIcon}"></i>
                </div>
                <div class="condition">${day.weather[0].description}</div>
                <div class="temp-range">
                    <span class="high">${Math.round(day.main.temp_max)}°</span>
                    <span class="low">${Math.round(day.main.temp_min)}°</span>
                </div>
            `;
            
            forecastCards.appendChild(card);
        });
    }

    // Get weather icon based on condition
    function getWeatherIcon(condition) {
        const iconMap = {
            'Clear': 'fa-sun',
            'Clouds': 'fa-cloud',
            'Rain': 'fa-cloud-rain',
            'Drizzle': 'fa-cloud-rain',
            'Thunderstorm': 'fa-bolt',
            'Snow': 'fa-snowflake',
            'Mist': 'fa-smog',
            'Smoke': 'fa-smog',
            'Haze': 'fa-smog',
            'Dust': 'fa-smog',
            'Fog': 'fa-smog',
            'Sand': 'fa-smog',
            'Ash': 'fa-smog',
            'Squall': 'fa-wind',
            'Tornado': 'fa-tornado'
        };

        return iconMap[condition] || 'fa-question';
    }

    // Generate outfit suggestions based on current weather
    function generateOutfitSuggestions(weatherData) {
        const currentTemp = weatherData.list[0].main.temp;
        const condition = weatherData.list[0].weather[0].main.toLowerCase();
        
        let suggestions = [];
        
        if (currentTemp >= 25) {
            suggestions = [
                {
                    title: 'Summer Casual',
                    description: 'Light and breathable for hot weather',
                    image: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Tank Top', 'Shorts', 'Sandals', 'Sunglasses']
                },
                {
                    title: 'Beach Day',
                    description: 'Perfect for sunny outdoor activities',
                    image: 'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Linen Shirt', 'Swim Trunks', 'Flip Flops', 'Sun Hat']
                }
            ];
        } else if (currentTemp >= 15) {
            suggestions = [
                {
                    title: 'Spring Casual',
                    description: 'Comfortable for mild weather',
                    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Light Jacket', 'T-Shirt', 'Jeans', 'Sneakers']
                },
                {
                    title: 'Business Casual',
                    description: 'Professional yet comfortable',
                    image: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Blazer', 'Button-Up', 'Chinos', 'Loafers']
                }
            ];
        } else {
            suggestions = [
                {
                    title: 'Winter Warmth',
                    description: 'Stay cozy in cold weather',
                    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Winter Coat', 'Sweater', 'Warm Pants', 'Boots']
                },
                {
                    title: 'Layered Look',
                    description: 'Perfect for changing temperatures',
                    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    items: ['Jacket', 'Hoodie', 'Jeans', 'Sneakers']
                }
            ];
        }

        // Add rain-specific suggestion if needed
        if (condition.includes('rain')) {
            suggestions.push({
                title: 'Rainy Day',
                description: 'Stay dry and comfortable',
                image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                items: ['Rain Coat', 'Quick-Dry Top', 'Waterproof Pants', 'Rain Boots']
            });
        }

        suggestionCards.innerHTML = '';
        
        suggestions.forEach(suggestion => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <img src="${suggestion.image}" alt="${suggestion.title}">
                <div class="suggestion-content">
                    <h4>${suggestion.title}</h4>
                    <p>${suggestion.description}</p>
                    <ul>
                        ${suggestion.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            suggestionCards.appendChild(card);
        });
    }

    // Initialize weather data on page load
    getLocationAndWeather();
});