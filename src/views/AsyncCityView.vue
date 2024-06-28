<template>
  <p>This is the async city view</p>
</template>

<script>
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute(); // takes the current route/url
      const getWeatherData = async () => {
        try { 
          const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lat}&exclude={part}&appid=81964563f5114a0a6db0b760f5b6c159`
          );
          
          //TODO - account for timezone offsets
 
        } catch (err) {
          console.log(err)
        }
      }


      return {}
    }


  }
</script>

