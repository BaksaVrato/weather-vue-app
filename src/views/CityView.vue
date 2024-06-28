<template>
  <div>
    <Suspense> <!-- Handle async components -->

      <AsyncCityView /> <!-- default slot -->

      <template #fallback> <!-- slot shown while fetching -->
        <p>Loading...</p>
      </template>
 
    </Suspense>
  </div>

</template>

<script>
import AsyncCityView from './AsyncCityView.vue'

  export default {

    components: {
      AsyncCityView
    }


  }
</script>