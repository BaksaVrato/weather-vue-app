<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- v-model - two-way data binding, :value - v-bind - one-way data binding -->
      <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for city or state..."
      class="py-2 px-1 w-full bg-transparent border-b focus:outline-none text-2xl focus:border-weather-secondary focus:shadow-xl"> 
       
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="mapboxSearchResults"> <!-- v-if - vies klasika -->
        <div v-if="!searchError">
          <li v-for="searchResults in mapboxSearchResults" 
            :key="searchResults.id"
            class="py-2 cursor-pointer hover:bg-weather-secondary hover:text-white"
            @click="previewCity(searchResults)"
          > <!-- v-for - vies klasika -->
            {{ searchResults.place_name }}
          </li>
        </div>

        <li v-if="searchError">Something went wrong. Please try again later.</li>

        <li v-if="!searchError && mapboxSearchResults.length === 0">No results found.</li>
      </ul>
         <!-- <CityList /> -->
      <div class="flex flex-col gap-4 mt-4">
        <Suspense>
          <CityList />
          <template #fallback>
            <p>Loading...</p>
          </template>
        </Suspense>
      </div>
    </div>
  </main>

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'  // used for routing
import CityList from '../components/CityList.vue';

export default {

  components: {
    CityList
  },
  setup() { 
    const MAPBOX_TOKEN = 'pk.eyJ1IjoidnJ1dHVwIiwiYSI6ImNscGFhODk0MjA1eGcya3FyNmdtMnZ6dmQifQ.vb2ruBp2N1C0HThIrspi8A';

    const searchQuery = ref('');
    const queryTimeout = ref(null);
    const searchError = ref(false);

    const router = useRouter(); // used for routing
    const previewCity = (searchResults) => {
      const [city, state] = searchResults.place_name.split(',');
      searchQuery.value = `${city} ${state}`;
      mapboxSearchResults.value = null;

      // push view into router (cityView concretely)
      router.push({ 
        name: 'cityView', // name of view
        params: { // parameters passed to the route
          city: city, 
          state: state.replaceAll(' ', '') // removes space from front of the city name (to have the url cleaner)
        },
        query: { // query parameters (shown in URL)
          lat: searchResults.geometry.coordinates[1], 
          lng: searchResults.geometry.coordinates[0], 
          preview: true 
        }
      });
    };

    const mapboxSearchResults = ref(null);

    const getSearchResults = () => {
      clearTimeout(queryTimeout.value);
      queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${MAPBOX_TOKEN}&types=place&types=place`
            );

            mapboxSearchResults.value = result.data.features;
            console.log(mapboxSearchResults.value);
          } catch {
            searchError.value = true;
          }
         
          return;
        }
        mapboxSearchResults.value = null;
      }, 300);
    };

    return { 
      searchQuery, 
      getSearchResults, 
      mapboxSearchResults, 
      searchError, 
      previewCity
    }
  }
}
</script>
