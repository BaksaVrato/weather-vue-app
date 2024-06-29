<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg"> <!-- sticky top-0 - fixed on top -->
    <nav 
      class="container flex flex-col sm:flex-row 
      items-center gap-4 text-white py-6"
    > <!-- container - same as bootstrap (when screen is sm - flex-col); gap-4 - 16px gap; py-6 - 24px padding; -->
    
      <router-link :to="{name: 'home'}">
        <div class="flex items-center gap-3"> 
          <i class="fa-solid fa-sun text-2xl"></i> 
          <p class="text-2xl">Weather App</p>
        </div>
      </router-link>
    
      <div class="flex gap-3 flex-1 justify-end"> <!-- flex-1 - flex item, allowed to grow -->
        <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-200"
          @click="toggleModal"></i> <!-- duration - fadein/out;  -->
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary cursor-pointer duration-200"
          @click="addCity"
          v-if="route.query.preview"></i>
      </div>

    </nav>
  </header>
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <h1 class="text-2xl font-bold">About</h1>
    <p>Some description...</p>
    <h1 class="text-2xl font-bold">How it works</h1>
    <ol class="list-decimal px-4 text-sm">
      <li class="py-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, est dolore sed quis nulla laborum sit vitae nisi officia suscipit aut.</li>
      <li class="py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptate delectus odit quo a magni molestiae unde libero sed! Aperiam veritatis dolores earum ut!</li>
      <li class="py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quidem.</li>
    </ol>
  </BaseModal>
</template>

<script>
  import BaseModal from './BaseModal.vue'
  import { ref } from 'vue'
  import { uid } from 'uid'; // id for items in local storage
  import { useRoute, useRouter } from 'vue-router'; // for url usage (params and query)

  export default {
    components: {
      BaseModal
    },

    setup() {
      const modalActive = ref(false);
      const toggleModal = () => {
        modalActive.value = !modalActive.value;
        console.log(modalActive.value);
      };

      const savedCities = ref([]);
      const route = useRoute();
      const router = useRouter();
      const addCity = () => {
        console.log('Add City');

      // WORKING WITH LOCAL STORAGE 
        if (localStorage.getItem('savedCities')) {
          savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
        }

        const locationObject = {
          id: uid(),
          state: route.params.state,
          city: route.params.city,
          coords: {
            lat: route.query.lat,
            lng: route.query.lng
          }
        };

        savedCities.value.push(locationObject);

        localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

        let query = Object.assign({}, route.query); // copy query
        delete query.preview; // remove preview from query
        query.id = locationObject.id; // add id to query
        router.replace({ query });
      };

      return { modalActive, toggleModal, addCity, route }
    }
}
</script>
