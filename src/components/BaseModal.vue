<template>
  <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center px-8"
    v-show="modalActive"
  >
    <div class="py-8 px-4 bg-white rounded-lg max-w-sm self-start mt-24" >
      <slot/>
      <button class="text-white mt-4 bg-weather-primary py-2 px-6 rounded"
      @click="$emit('close-modal')">Close</button>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      modalActive: {
        type: Boolean,
        default: false
      }
    },

    emits: {
      'close-modal': null
    },
    setup() {
    }
  }
</script>
