<template>
  <router-link :to="{ name: 'EventDetails', params: { id: eventProp.id }}">
    <div class="elevation-5 event-card my-3 bg-dark">
      <img class="" :src="eventProp.coverImg" :alt="eventProp.name">
      <div class="text-center p-2 text-light eventInfo">
        <p class="m-0">{{ eventProp.name }}</p>
      </div>
    </div>
  </router-link> 
</template>


<script>
import { computed } from "vue";
import { eventsService } from "../services/EventServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    eventProp: {type: TowerEvent, required:true}
  },
  setup(){
  return { 
    async cancelEvent(eventId) {
      try {
        await eventsService.cancelEvent(eventId)
      } catch (error) {
        logger.error(error)
        Pop.event(error.message, 'error')
      }
    },
    account: computed(()=> AppState.account)
  }
  }
};
</script>


<style lang="scss" scoped>

    img {
        height: 25vh;
        width: 100%;
        object-fit: cover;
    }

    .event-card{
      box-shadow: 2px 2px #79E7AB;

      img {
        height: 35vh;
        width: 100%;
        object-fit: cover;
    }
      
    }

</style>