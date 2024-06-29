<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl"> {{ city.city }} </h2>
      <h3> {{ city.state }} </h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-5xl self-end"> <!-- self-end - align right -->
        {{ Math.round(city.weather.main.temp) }}&deg;C
      </p>
      <div class="flex gap-2">
        <span class="text-sm">
          H:
          {{ Math.round(city.weather.main.temp_max) }}&deg;C
        </span>
        <span class="text-sm">
          H:
          {{ Math.round(city.weather.main.temp_min) }}&deg;C
        </span>
      </div>
    </div>
  </div>  
</template>

<script>

export default {
  props: {
    city: {
      type: Object,
      default: {}
    }
  }
}
</script>
