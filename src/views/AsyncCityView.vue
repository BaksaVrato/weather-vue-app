<template>
  <p>This is the async city view</p>
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
            `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=81964563f5114a0a6db0b760f5b6c159&units=imperial`
            //`https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude={part}&appid=81964563f5114a0a6db0b760f5b6c159&units=imperial`
          );
          
          //TODO - account for timezone offsets
 
          return weatherData;
        } catch (err) {
          console.log(err)
        }
      }

      const weatherData = await getWeatherData();
      return {weatherData}
    }
  }
</script>

