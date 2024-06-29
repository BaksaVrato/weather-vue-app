<template>
  <div>
    <Suspense> <!-- Handle async components -->

      <AsyncCityView /> <!-- default slot -->

      <template #fallback> <!-- slot shown while fetching -->
        <CityViewSkeleton />
      </template>
 
    </Suspense>
  </div>

</template>

<script>
  import AsyncCityView from '../components/AsyncCityView.vue'
  import CityViewSkeleton from '../components/CityViewSkeleton.vue'
  
  export default {

    components: {
      AsyncCityView,
      CityViewSkeleton
    }


  }
</script>