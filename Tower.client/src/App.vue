<template>
  <header>
    <Navbar />
  </header>
  <main class="bg">
    <router-view />
  </main>
  
  <Modal id="createEvent">
    <CreateEvent />
  </Modal>
  
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";


:root{
  --main-height: calc(100vh - 32px - 64px);
}

.bg{
  background-color: #2A2D3A;
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
