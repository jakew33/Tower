<template>
  <div class="d-flex justify-content-around my-3 p-3 elevation-5 bg-dark">

        <button @click="filterBy = ''" class="btn btn-outline-light w-15 mx-1 text-light">All</button>
        <button @click="filterBy = 'concert'" class="btn btn-outline-light w-15 mx-1 text-light">Concerts</button>
        <button @click="filterBy = 'convention'" class="btn btn-outline-light w-15 mx-1 text-light">Conventions</button>
        <button @click="filterBy = 'sport'" class="btn btn-outline-light w-15 mx-1 text-light">Sports</button>
        <button @click="filterBy = 'digital'" class="btn btn-outline-light w-15 mx-1 text-light">Digital</button>
      </div>
        <div class="container-fluid justify-content-start">
    <div class="row">
      <div class="col-md-3" v-for="e in events" :key="e.id">
        <EventCard :eventProp="e"/>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { eventsService } from "../services/EventServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
export default {
  // components: {EventCard},
  setup() {
    const filterBy = ref('')
    async function getTowerEvents() {
      try {
        logger.log('getting events')
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error.message)
        logger.log(error)
      }
    }
    onMounted(() => {
      getTowerEvents()
    })
    return {
      filterBy,
      myTickets: computed(() => AppState.myTickets),
      events: computed(() => {
        if (filterBy.value ==""){
          return AppState.events
        } else{
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .background{
    background-color: #FFD464;
  }


  .home-card {
    width: 50vw;

    >img {
      height: 100px;
      max-width: 100px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>



