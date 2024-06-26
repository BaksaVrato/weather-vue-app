<template>
 <Teleport to="body"> <!-- Teleport - move to DOM component outside of hierarchy of this component (in this case body) -> good for absolute comps-->
  <Transition name="modal"> <!-- transition animation -->
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center px-8"
      v-show="modalActive"
    >
      <div class="py-4 px-5 bg-white rounded-lg max-w-sm self-start mt-24" >

        <slot/>

        <button class="text-white mt-4 bg-weather-primary py-2 px-6 rounded"
        @click="$emit('close-modal')">Close</button>
        
      </div>
    </div>
  </Transition>
 </Teleport>
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

<style>

/* Transition cpomponent */
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease-out;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

</style>