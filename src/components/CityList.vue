<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">No locations added yet</p>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import CityCard from './CityCard.vue';
import router from '@/router'

export default {
  components: {
    CityCard
  },
  async setup() {
    const savedCities = ref([]);

    const getCities = async () => {
      console.log(localStorage.getItem('savedCities'));
      if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

        // get weather data for each city saved in local storage
        const requests = [];
        savedCities.value.forEach(city => {
          requests.push(
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=81964563f5114a0a6db0b760f5b6c159&units=metric`
              //`https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.0&appid=81964563f5114a0a6db0b760f5b6c159&units=imperial`
            )
          );
        });

        const weatherData = await Promise.all(requests) // when all promises are resolved

        weatherData.forEach((data, index) => {
          savedCities.value[index].weather = data.data;
        });
      }
    }

    await getCities();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const goToCityView = (city) => {
      router.push({
        name: 'cityView',
        params: { state: city.state, city: city.city },
        query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
      });
    }

    return {
      savedCities, goToCityView
    }
  }

}
</script>
