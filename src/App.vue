
<template>

  <div class="flex flex-col bg-weather-primary min-h-screen mt-20"> <!-- minimal height - screen -->
    <SiteNavigation/>
    <router-view v-slot="{ Component }">

      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>

    </router-view>
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

<style scoped>
/* fort transition component */
  .page-enter-active,
  .page-leave-active {
    transition: 600ms ease all;
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }

  .class {
    @apply fixed top-0 w-full;
    z-index: 10;
  }

</style>
