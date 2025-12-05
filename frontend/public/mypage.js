document.addEventListener('DOMContentLoaded', function() {
    // ======================================================================
    // WEATHER API CONFIGURATION - ADD YOUR API KEY HERE
    // ======================================================================
    // Get your FREE API key from: https://openweathermap.org/api
    // Sign up -> Verify email -> Get API key from dashboard
    const WEATHER_API_KEY = 'f4944953f7280b4aa011e9c243eb9d9e'; // REPLACE WITH YOUR ACTUAL API KEY
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function startTestimonialRotation() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    function stopTestimonialRotation() {
        clearInterval(testimonialInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTestimonialRotation();
            showTestimonial(index);
            startTestimonialRotation();
        });
    });

    prevBtn.addEventListener('click', () => {
        stopTestimonialRotation();
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
        startTestimonialRotation();
    });

    nextBtn.addEventListener('click', () => {
        stopTestimonialRotation();
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        startTestimonialRotation();
    });

    // Start auto-rotation
    startTestimonialRotation();

    // Wardrobe Tab System
    const tabButtons = document.querySelectorAll('.tab-btn');
    const wardrobeItems = document.querySelector('.wardrobe-items');

    // Enhanced Wardrobe Data
    const wardrobeData = {
        tops: [
            { id: 1, name: 'White T-Shirt', color: 'white', type: 'casual', season: 'all', weather: 'all', temperature: ['warm', 'hot'], material: 'cotton', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 2, name: 'Blue Button-Up', color: 'blue', type: 'business', season: 'all', weather: 'all', temperature: ['mild', 'warm'], material: 'cotton', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 3, name: 'Black Polo', color: 'black', type: 'casual', season: 'all', weather: 'all', temperature: ['mild', 'warm'], material: 'cotton', image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 4, name: 'Striped Shirt', color: 'multicolor', type: 'casual', season: 'summer', weather: 'sunny', temperature: ['warm', 'hot'], material: 'linen', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 5, name: 'Denim Shirt', color: 'blue', type: 'casual', season: 'fall', weather: 'all', temperature: ['mild', 'cool'], material: 'denim', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 6, name: 'Formal White Shirt', color: 'white', type: 'formal', season: 'all', weather: 'all', temperature: ['mild', 'warm'], material: 'cotton', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 7, name: 'Wool Sweater', color: 'gray', type: 'casual', season: 'winter', weather: 'cold', temperature: ['cool', 'cold'], material: 'wool', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 8, name: 'Tank Top', color: 'black', type: 'casual', season: 'summer', weather: 'hot', temperature: ['hot'], material: 'cotton', image: 'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
        ],
        bottoms: [
            { id: 9, name: 'Blue Jeans', color: 'blue', type: 'casual', season: 'all', weather: 'all', temperature: ['mild', 'warm', 'cool'], material: 'denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 10, name: 'Black Chinos', color: 'black', type: 'business', season: 'all', weather: 'all', temperature: ['mild', 'warm'], material: 'cotton', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 11, name: 'Gray Dress Pants', color: 'gray', type: 'formal', season: 'all', weather: 'all', temperature: ['mild', 'warm'], material: 'wool', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 12, name: 'Beige Khakis', color: 'beige', type: 'casual', season: 'summer', weather: 'sunny', temperature: ['warm', 'hot'], material: 'cotton', image: 'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 13, name: 'Shorts', color: 'navy', type: 'casual', season: 'summer', weather: 'hot', temperature: ['hot'], material: 'cotton', image: 'https://images.unsplash.com/photo-1506629905607-e48b0e67d879?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
        ],
        shoes: [
            { id: 14, name: 'White Sneakers', color: 'white', type: 'casual', season: 'all', weather: 'dry', temperature: ['mild', 'warm'], material: 'canvas', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 15, name: 'Black Dress Shoes', color: 'black', type: 'formal', season: 'all', weather: 'dry', temperature: ['mild', 'warm'], material: 'leather', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 16, name: 'Brown Loafers', color: 'brown', type: 'business', season: 'all', weather: 'dry', temperature: ['mild', 'warm'], material: 'leather', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 17, name: 'Rain Boots', color: 'yellow', type: 'casual', season: 'fall', weather: 'rainy', temperature: ['cool', 'mild'], material: 'rubber', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 18, name: 'Winter Boots', color: 'brown', type: 'casual', season: 'winter', weather: 'snowy', temperature: ['cold'], material: 'leather', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
        ],
        outerwear: [
            { id: 19, name: 'Light Jacket', color: 'beige', type: 'casual', season: 'spring', weather: 'windy', temperature: ['cool'], material: 'cotton', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 20, name: 'Rain Coat', color: 'blue', type: 'casual', season: 'fall', weather: 'rainy', temperature: ['cool', 'mild'], material: 'nylon', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 21, name: 'Winter Coat', color: 'black', type: 'casual', season: 'winter', weather: 'snowy', temperature: ['cold'], material: 'wool', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 22, name: 'Blazer', color: 'navy', type: 'business', season: 'all', weather: 'all', temperature: ['mild', 'cool'], material: 'wool', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
        ],
        accessories: [
            { id: 23, name: 'Leather Belt', color: 'brown', type: 'business', season: 'all', weather: 'all', temperature: ['all'], material: 'leather', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 24, name: 'Baseball Cap', color: 'blue', type: 'casual', season: 'summer', weather: 'sunny', temperature: ['warm', 'hot'], material: 'cotton', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 25, name: 'Silk Tie', color: 'red', type: 'formal', season: 'all', weather: 'all', temperature: ['all'], material: 'silk', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 26, name: 'Scarf', color: 'multicolor', type: 'casual', season: 'winter', weather: 'cold', temperature: ['cool', 'cold'], material: 'wool', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
            { id: 27, name: 'Sunglasses', color: 'black', type: 'casual', season: 'summer', weather: 'sunny', temperature: ['warm', 'hot'], material: 'plastic', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
        ]
    };

    // Enhanced render function
    function renderWardrobeItems(category) {
        wardrobeItems.innerHTML = '';
        const items = wardrobeData[category] || [];
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'wardrobe-item';
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-overlay">
                    <h4>${item.name}</h4>
                    <p>Color: ${item.color}</p>
                    <p>Type: ${item.type}</p>
                    <p>Season: ${item.season}</p>
                    <div class="item-actions">
                        <button class="btn small edit-btn" data-id="${item.id}">Edit</button>
                        <button class="btn small delete-btn" data-id="${item.id}">Delete</button>
                    </div>
                </div>
            `;
            wardrobeItems.appendChild(itemElement);
        });

        // Add event listeners
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(e.target.dataset.id);
                editItem(itemId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(e.target.dataset.id);
                deleteItem(itemId, category);
            });
        });

        // Add selection functionality
        document.querySelectorAll('.wardrobe-item').forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
        });
    }

    function editItem(itemId) {
        let itemToEdit = null;
        let category = '';
        
        for (const cat in wardrobeData) {
            const foundItem = wardrobeData[cat].find(item => item.id === itemId);
            if (foundItem) {
                itemToEdit = foundItem;
                category = cat;
                break;
            }
        }
        
        if (!itemToEdit) return;

        const newName = prompt('Edit item name:', itemToEdit.name);
        if (newName !== null) {
            itemToEdit.name = newName;
            renderWardrobeItems(category);
        }
    }

    function deleteItem(itemId, category) {
        if (confirm('Are you sure you want to delete this item?')) {
            wardrobeData[category] = wardrobeData[category].filter(item => item.id !== itemId);
            renderWardrobeItems(category);
        }
    }

    // Set default tab
    tabButtons[0].classList.add('active');
    renderWardrobeItems('tops');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderWardrobeItems(button.dataset.category);
        });
    });

    // Upload functionality
    const uploadBtn = document.querySelector('.upload-btn');
    const fileInput = document.getElementById('clothing-upload');

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            const file = this.files[0];
            
            if (!file.type.match('image.*')) {
                alert('Please select an image file (JPEG, PNG, etc.)');
                return;
            }
            
            const imageUrl = URL.createObjectURL(file);
            const activeTab = document.querySelector('.tab-btn.active');
            const category = activeTab.dataset.category;
            
            const newItem = {
                id: Date.now(),
                name: `Uploaded ${category.slice(0, -1)}`,
                color: 'unknown',
                type: 'casual',
                season: 'all',
                weather: 'all',
                temperature: ['mild', 'warm'],
                material: 'unknown',
                image: imageUrl
            };
            
            if (!wardrobeData[category]) {
                wardrobeData[category] = [];
            }
            
            wardrobeData[category].push(newItem);
            renderWardrobeItems(category);
            this.value = '';
        }
    });

    // ======================================================================
    // LIVE WEATHER API INTEGRATION
    // ======================================================================

    // Weather API Integration
    const weatherIcon = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const weatherCondition = document.getElementById('weather-condition');
    const locationName = document.getElementById('location-name');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const refreshWeatherBtn = document.querySelector('.refresh-weather');

    let currentWeather = {
        temperature: null,
        condition: null,
        location: null,
        wind: null,
        humidity: null
    };

    // Get user's location and fetch weather
    function getLocationAndWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    await fetchWeatherData(lat, lon);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // If location access denied, use IP-based location
                    fetchWeatherByIP();
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
            fetchWeatherByIP();
        }
    }

    // Fetch weather data using coordinates
    async function fetchWeatherData(lat, lon) {
        try {
            const response = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }
            
            const data = await response.json();
            updateWeatherUI(data);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Fallback to IP-based location
            fetchWeatherByIP();
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
            
            updateWeatherUI(weatherData);
            
        } catch (error) {
            console.error('Error fetching weather by IP:', error);
            // Final fallback to demo data
            useDemoWeatherData();
        }
    }

    // Final fallback: Use demo data
    function useDemoWeatherData() {
        const demoWeatherData = {
            name: 'Your Location',
            main: {
                temp: 22,
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
            }
        };
        
        updateWeatherUI(demoWeatherData);
        alert('Using demo weather data. Please check your API key for live data.');
    }

    // Update weather UI with fetched data
    function updateWeatherUI(data) {
        currentWeather = {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main.toLowerCase(),
            location: data.name,
            wind: data.wind.speed,
            humidity: data.main.humidity
        };

        // Update UI elements
        temperatureElement.textContent = `${currentWeather.temperature}°C`;
        weatherCondition.textContent = data.weather[0].description;
        locationName.textContent = currentWeather.location;
        windSpeed.textContent = currentWeather.wind;
        humidity.textContent = currentWeather.humidity;

        // Update weather icon based on condition
        updateWeatherIcon(currentWeather.condition);
    }

    // Update weather icon based on condition
    function updateWeatherIcon(condition) {
        const iconMap = {
            'clear': 'fa-sun',
            'clouds': 'fa-cloud',
            'rain': 'fa-cloud-rain',
            'drizzle': 'fa-cloud-rain',
            'thunderstorm': 'fa-bolt',
            'snow': 'fa-snowflake',
            'mist': 'fa-smog',
            'smoke': 'fa-smog',
            'haze': 'fa-smog',
            'dust': 'fa-smog',
            'fog': 'fa-smog',
            'sand': 'fa-smog',
            'ash': 'fa-smog',
            'squall': 'fa-wind',
            'tornado': 'fa-tornado'
        };

        const iconClass = iconMap[condition] || 'fa-question';
        weatherIcon.className = `fas ${iconClass}`;
    }

    // Get temperature category for outfit generation
    function getTemperatureCategory(temp) {
        if (temp >= 30) return 'hot';
        if (temp >= 20) return 'warm';
        if (temp >= 10) return 'mild';
        if (temp >= 0) return 'cool';
        return 'cold';
    }

    // Refresh weather data
    refreshWeatherBtn.addEventListener('click', () => {
        refreshWeatherBtn.querySelector('i').classList.add('fa-spin');
        getLocationAndWeather();
        setTimeout(() => {
            refreshWeatherBtn.querySelector('i').classList.remove('fa-spin');
        }, 1000);
    });

    // Initialize weather on page load
    getLocationAndWeather();

    // ======================================================================
    // OUTFIT GENERATION LOGIC
    // ======================================================================

    const generateBtn = document.querySelector('.generate-btn');
    const occasionSelect = document.getElementById('occasion-select');
    const outfitGrid = document.querySelector('.outfit-grid');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Color compatibility rules
    const colorCompatibility = {
        white: ['black', 'blue', 'gray', 'beige', 'brown', 'navy', 'khaki', 'denim', 'red', 'pink'],
        black: ['white', 'gray', 'red', 'blue', 'pink', 'silver', 'gold', 'yellow'],
        blue: ['white', 'black', 'gray', 'beige', 'brown', 'khaki', 'navy', 'yellow'],
        gray: ['white', 'black', 'blue', 'pink', 'red', 'navy', 'yellow'],
        beige: ['white', 'blue', 'brown', 'black', 'navy', 'olive', 'green'],
        brown: ['white', 'blue', 'beige', 'green', 'cream', 'orange'],
        red: ['white', 'black', 'gray', 'navy', 'khaki', 'blue'],
        multicolor: ['white', 'black', 'denim', 'gray'],
        silver: ['black', 'white', 'blue', 'gray', 'purple'],
        unknown: ['white', 'black', 'gray', 'blue', 'beige', 'brown']
    };

    // Style compatibility
    const styleCompatibility = {
        business: ['business', 'formal', 'smart casual'],
        casual: ['casual', 'sport', 'smart casual'],
        formal: ['business', 'formal'],
        'smart casual': ['business', 'casual'],
        sports: ['casual', 'sports']
    };

    // Material properties for weather and temperature
    const materialProperties = {
        cotton: { breathability: 'high', warmth: 'low', waterResistance: 'low' },
        wool: { breathability: 'medium', warmth: 'high', waterResistance: 'medium' },
        linen: { breathability: 'very high', warmth: 'very low', waterResistance: 'low' },
        denim: { breathability: 'medium', warmth: 'medium', waterResistance: 'medium' },
        leather: { breathability: 'low', warmth: 'medium', waterResistance: 'high' },
        nylon: { breathability: 'low', warmth: 'low', waterResistance: 'high' },
        silk: { breathability: 'high', warmth: 'low', waterResistance: 'low' },
        rubber: { breathability: 'none', warmth: 'low', waterResistance: 'very high' },
        unknown: { breathability: 'medium', warmth: 'medium', waterResistance: 'medium' }
    };

    function getCompatibleItems(category, occasion, weather, temperature, colorToMatch = null, styleToMatch = null) {
        let items = [];
        
        if (wardrobeData[category]) {
            items = wardrobeData[category];
        }
        
        // Filter items based on multiple criteria
        let filteredItems = items.filter(item => {
            // Check weather compatibility based on material properties
            let weatherMatch = true;
            if (weather !== 'all') {
                const materialProps = materialProperties[item.material] || materialProperties.unknown;
                if (weather === 'rainy' || weather === 'snowy') {
                    weatherMatch = materialProps.waterResistance === 'high' || materialProps.waterResistance === 'very high';
                } else if (weather === 'sunny') {
                    weatherMatch = materialProps.breathability === 'high' || materialProps.breathability === 'very high';
                } else if (weather === 'cold') {
                    weatherMatch = materialProps.warmth === 'high' || materialProps.warmth === 'medium';
                }
            }
            
            // Check temperature compatibility
            let tempMatch = item.temperature.includes('all') || item.temperature.includes(temperature);
            
            // Check style compatibility
            const styleMatch = !styleToMatch || 
                             (styleCompatibility[item.type] && 
                              styleCompatibility[item.type].includes(styleToMatch)) ||
                             item.type === styleToMatch;
            
            // Check color compatibility
            const colorMatch = !colorToMatch || 
                              (colorCompatibility[colorToMatch]?.includes(item.color) || 
                              colorCompatibility[item.color]?.includes(colorToMatch) ||
                              item.color === 'unknown' || 
                              colorToMatch === 'unknown');
            
            // Check occasion compatibility
            const occasionMatch = item.type === occasion || 
                                (styleCompatibility[item.type] && 
                                 styleCompatibility[item.type].includes(occasion));
            
            return weatherMatch && tempMatch && styleMatch && colorMatch && occasionMatch;
        });
        
        return filteredItems;
    }

    function generateOutfit(occasion, weather, temperature) {
        // Start with a top
        let top = findBestItem('tops', occasion, weather, temperature);
        if (!top) return null;
        
        // Find compatible bottoms
        let bottom = findBestItem('bottoms', occasion, weather, temperature, top.color, top.type);
        if (!bottom) {
            bottom = findBestItem('bottoms', occasion, weather, temperature, null, top.type);
            if (!bottom) return null;
        }
        
        // Find compatible shoes
        let shoes = findBestItem('shoes', occasion, weather, temperature, bottom.color, bottom.type);
        if (!shoes) {
            shoes = findBestItem('shoes', occasion, weather, temperature, null, bottom.type);
            if (!shoes) return null;
        }
        
        // Find outerwear if needed based on weather and temperature
        let outerwear = null;
        if (weather === 'rainy' || weather === 'snowy' || temperature === 'cool' || temperature === 'cold') {
            outerwear = findBestItem('outerwear', occasion, weather, temperature, top.color, top.type);
        }
        
        // Find accessories based on weather and occasion
        let accessories = findBestItem('accessories', occasion, weather, temperature, top.color, top.type);
        
        return {
            name: `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Outfit`,
            description: `Perfect for ${occasion} occasions with ${weather} weather`,
            items: [top, bottom, shoes, outerwear, accessories].filter(Boolean),
            weather: weather,
            temperature: temperature
        };
    }

    function findBestItem(category, occasion, weather, temperature, colorToMatch = null, styleToMatch = null) {
        const items = getCompatibleItems(category, occasion, weather, temperature, colorToMatch, styleToMatch);
        if (items.length === 0) return null;
        
        // Sort by relevance
        const sortedItems = items.sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            
            if (colorToMatch && a.color === colorToMatch) scoreA += 2;
            if (colorToMatch && b.color === colorToMatch) scoreB += 2;
            
            if (styleToMatch && a.type === styleToMatch) scoreA += 2;
            if (styleToMatch && b.type === styleToMatch) scoreB += 2;
            
            return scoreB - scoreA;
        });
        
        return sortedItems[0];
    }

    generateBtn.addEventListener('click', function() {
        const occasion = occasionSelect.value;
        
        // Use current weather data
        const weather = currentWeather.condition || 'clear';
        const temperature = getTemperatureCategory(currentWeather.temperature) || 'mild';
        
        loadingSpinner.style.display = 'block';
        outfitGrid.innerHTML = '';
        
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            
            // Generate 3 outfits
            const outfits = [];
            let attempts = 0;
            const maxAttempts = 15;
            
            while (outfits.length < 3 && attempts < maxAttempts) {
                attempts++;
                const outfit = generateOutfit(occasion, weather, temperature);
                if (outfit) {
                    const outfitKey = outfit.items.map(i => i.id).join('-');
                    const isUnique = !outfits.some(o => o.items.map(i => i.id).join('-') === outfitKey);
                    
                    if (isUnique) {
                        outfits.push(outfit);
                    }
                }
            }
            
            if (outfits.length === 0) {
                outfitGrid.innerHTML = `
                    <div class="no-outfits">
                        <p>No complete outfits found for ${occasion} with current weather conditions.</p>
                        <p>Try adding more clothes to your wardrobe.</p>
                    </div>
                `;
                return;
            }
            
            // Display the generated outfits
            outfits.forEach(outfit => {
                const outfitCard = createOutfitCard(outfit);
                outfitGrid.appendChild(outfitCard);
            });
        }, 1500);
    });

    function createOutfitCard(outfit) {
        const outfitCard = document.createElement('div');
        outfitCard.className = 'outfit-card';
        
        const mainImage = outfit.items[0].image;
        const thumbnails = outfit.items.map(item => 
            `<img src="${item.image}" alt="${item.name}" title="${item.name}" class="outfit-thumbnail">`
        ).join('');
        
        const itemList = outfit.items.map(item => 
            `<li>${item.name} (${item.color}, ${item.type})</li>`
        ).join('');
        
        // Weather icon based on conditions
        let weatherIcon = 'fa-sun';
        if (outfit.weather === 'rainy') weatherIcon = 'fa-cloud-rain';
        else if (outfit.weather === 'snowy') weatherIcon = 'fa-snowflake';
        else if (outfit.weather === 'cloudy') weatherIcon = 'fa-cloud';
        else if (outfit.weather === 'windy') weatherIcon = 'fa-wind';
        
        outfitCard.innerHTML = `
            <img src="${mainImage}" alt="${outfit.name}" class="outfit-main-image">
            <div class="outfit-details">
                <h4>${outfit.name}</h4>
                <div class="weather-info">
                    <i class="fas ${weatherIcon}"></i>
                    <span>${outfit.weather.charAt(0).toUpperCase() + outfit.weather.slice(1)} • ${outfit.temperature.charAt(0).toUpperCase() + outfit.temperature.slice(1)}</span>
                </div>
                <p class="outfit-description">${outfit.description}</p>
                <div class="outfit-items">
                    <p><strong>Includes:</strong></p>
                    <ul>${itemList}</ul>
                    <div class="outfit-thumbnails">${thumbnails}</div>
                </div>
                <div class="outfit-actions">
                    <button class="btn secondary save-outfit">Save</button>
                    <button class="btn primary view-details">View Details</button>
                </div>
            </div>
        `;
        
        outfitCard.querySelector('.save-outfit').addEventListener('click', () => {
            alert(`Outfit "${outfit.name}" saved to your favorites!`);
        });
        
        outfitCard.querySelector('.view-details').addEventListener('click', () => {
            const details = outfit.items.map(item => 
                `${item.name} - Color: ${item.color}, Type: ${item.type}, Material: ${item.material}`
            ).join('\n\n');
            
            alert(`Outfit Details:\n\n${outfit.description}\n\nItems:\n\n${details}`);
        });
        
        return outfitCard;
    }

    // ======================================================================
    // ADDITIONAL FUNCTIONALITY
    // ======================================================================

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                navLinks.classList.remove('active');
            }
        });
    });

    // Get Started button
    document.querySelector('.get-started').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.outfit-generator').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
});