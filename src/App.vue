<!-- 
  LINKS
  https://tailwindcss.com/docs/
  https://fontawesome.com/search?o=r&m=free
  https://vuejs.org/guide
  gemini
-->


<template>
  <div class="flex flex-col bg-weather-primary min-h-screen"> <!-- minimal height - screen -->
    <SiteNavigation/>
    <router-view/>
  </div>

</template>

<script>
  import SiteNavigation from './components/SiteNavigation.vue'

  export default {
    components: {
      SiteNavigation
    }
  }
</script>
