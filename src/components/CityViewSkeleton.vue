<template>
  <div class="flex flex-col flex-1 items-center">
    <div v-if="route.query.preview" class="p-4 bg-weather-secondary w-full flex flex-col items-center">
      <AnimatedPlaceholderVue class="w-1/3"/>
    </div>
    <!-- weather data -->
    <div class="flex flex-col items-center text-white py-12">
      <AnimatedPlaceholderVue class="h-10 w-48 mb-2"/>
      <AnimatedPlaceholderVue class="h-6 w-48 mb-16"/>
      <AnimatedPlaceholderVue class="h-[72px] w-48 mb-6"/>
      <AnimatedPlaceholderVue class="h-12 w-24 mb-8"/>
      <AnimatedPlaceholderVue class="h-12 w-24 mb-8"/>
    </div>

    <hr class="border-white border-opacity-10 border w-full"/>
    
    <!-- hourly forecast -->
    <div class="max-w-sreen-md w-full py-12">
      <div class="mx-8 text-white">
          <AnimatedPlaceholderVue class="h-[172px] w-full"/>
      </div>
    </div>
  
    <hr class="border-white border-opacity-10 border w-full"/>
  
    <!-- weekly forecast -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <AnimatedPlaceholderVue class="h-6 w-48 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
        <AnimatedPlaceholderVue class="h-6 w-128 mb-7"/>
      </div>  
    </div>
  </div>

</template>

<script>
  import AnimatedPlaceholderVue from './AnimatedPlaceholder.vue'
  import { useRoute } from 'vue-router'
  
  export default {
    components: {
      AnimatedPlaceholderVue
    },

    setup() {
      const route = useRoute()
    
      return { route }
    }
  }

</script>