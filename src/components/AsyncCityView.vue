<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->
    <div v-if="route.query.preview === 'true'"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city. Click the "+" to add city to front page list.
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
    
    <!-- hourly forecast -->
    <div class="max-w-sreen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Forecast</h2>
        <div class="flex gap-10 overflow-x-scroll no-scrollbar"> 
          <div 
            v-for="hourData in weatherData.hourly" 
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md"> <!-- element won't break line -->
              {{ new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                hour: 'numeric'
              }) }}
            </p>
            <img 
              class="w-auto h-12 object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">
              {{ Math.round(hourData.temp) }}&deg;C
            </p>

          </div>
        </div>
      </div>
    </div>
  
    <hr class="border-white border-opacity-10 border w-full"/>
  
    <!-- weekly forecast -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Weekly Forecast</h2>
        <div 
          v-for="day in weatherData.daily" 
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{ new Date(day.dt * 1000).toLocaleDateString('en-us', {
                weekday: 'long'
              }) 
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>Max: {{ Math.round(day.temp.max) }}&deg;C</p>
            <p>Min: {{ Math.round(day.temp.min) }}&deg;C</p>
          </div>
        </div>
      </div>  
    </div>
    
    <!-- delete city from memory -->
    <div class="flex items-center gap-2 py-12 px-8 text-white cursor-pointer"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import router from '@/router'
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

      const removeCity = () => {
        const savedCities = JSON.parse(localStorage.getItem('savedCities'));
        const updatedCities = savedCities.filter((city) => city.id !== route.query.id);
        localStorage.setItem('savedCities', JSON.stringify(updatedCities));
        router.push({ name: 'home' });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {weatherData, route, removeCity}
    }
  }
</script>

