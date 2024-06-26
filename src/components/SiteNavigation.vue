<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg"> <!-- sticky top-0 - fixed on top -->
    <nav 
      class="container flex flex-col sm:flex-row 
      items-center gap-4 text-white py-6"
    > <!-- container - same as bootstrap; gap-4 - 16px gap; py-6 - 24px padding; -->
    
      <router-link :to="{name: 'home'}">
        <div class="flex items-center gap-3"> 
          <i class="fa-solid fa-sun text-2xl"></i> 
          <p class="text-2xl">The Local Weather</p>
        </div>
      </router-link>
    
      <div class="flex gap-3 flex-1 justify-end"> <!-- flex-1 - flex item, allowed to grow -->
        <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-200"
          @click="toggleModal"></i> <!-- duration - fadein/out;  -->
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary cursor-pointer duration-200"></i>
      </div>

    </nav>
  </header>
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <p>TBD...</p>
  </BaseModal>
</template>

<script>
  import BaseModal from './BaseModal.vue'
  import { ref } from 'vue'

  export default {
    components: {
      BaseModal
    },

    setup() {
      const modalActive = ref(false);
      const toggleModal = () => {
        modalActive.value = !modalActive.value;
        console.log(modalActive.value);
      };

      return { modalActive, toggleModal }
    }
}
</script>
