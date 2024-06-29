<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <div class="flex flex-col gap-2 h-16">
        <AnimatedPlaceholderVue class="h-10 w-32"/>
        <AnimatedPlaceholderVue class="h-4 w-32"/>
      </div>
    </div>
    <div class="flex flex-col self-end">
      <div class="flex flex-col gap-2 h-16">
        <AnimatedPlaceholderVue class="h-10 w-16 flex self-end"/>
        <AnimatedPlaceholderVue class="h-4 w-44"/>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedPlaceholderVue from './AnimatedPlaceholder.vue'
export default {
  components: {
    AnimatedPlaceholderVue
  }
}
</script>

