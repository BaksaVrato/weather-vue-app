<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- v-model - two-way data binding, :value - v-bind - one-way data binding -->
      <input v-model="searchQuery" @focus="printQuery" type="text" placeholder="Search for city or state..."
      class="py-2 px-1 w-full bg-transparent border-b focus:outline-none text-2xl focus:border-weather-secondary focus:shadow-xl"> 
       
    </div>
  </main>

</template>

<script>
import { ref } from 'vue'

export default {

  setup() { 
    const searchQuery = ref('');
    const printQuery = () => {
      console.log(searchQuery.value);
    }

    return { searchQuery, printQuery }
  }
}
</script>

<style>

</style>