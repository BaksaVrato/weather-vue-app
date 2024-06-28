<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->
    <div v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city. Click the "+" icon to exit preview.
      </p>
    </div>
    <!-- weather data -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ 
          new Date(weatherData.currentTime).toLocaleDateString(
            'en-us', { weekday: 'long', day: '2-digit', month: 'long' }
          )  
        }}
        {{ 
          new Date(weatherData.currentTime).toLocaleTimeString('en-us') 
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;C
      </p>

      <div class="text-center">
        <p>
          Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;C
        </p>
        <p>
          {{ weatherData.current.weather[0].description }}
        </p>
        <img 
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          " 
          alt=""
        />
      </div>

    </div>

    <hr class="border-white border-opacity-10 border w-full"/>
  </div>

</template>

<script>
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  export default {
    async setup() {
      const route = useRoute(); // takes the current route/url
      const getWeatherData = async () => {
        try { 
          const weatherData = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=81964563f5114a0a6db0b760f5b6c159&units=metric`
            //`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude={part}&appid=81964563f5114a0a6db0b760f5b6c159&units=imperial`
          );

          // cal current date & time
          const localOffset = new Date().getTimezoneOffset() * 60000;
          const utc = weatherData.data.current.dt * 1000 + localOffset;
          weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;

          // cal hourly weather offset
          weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
          });

          return weatherData.data;
          
        } catch (err) {
          console.log(err)
        }
      }

      const weatherData = await getWeatherData();
      return {weatherData, route}
    }
  }
</script>

