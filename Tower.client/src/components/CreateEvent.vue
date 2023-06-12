<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="eventModal">Create An Event</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent=" createTowerEvent()">
    <div class="modal-body">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Event Image" v-model="editable.coverImg">
        <label for="floatingPassword">Cover Image</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Name" v-model="editable.name">
        <label for="floatingPassword">Event Name</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Location" v-model="editable.location">
        <label for="floatingPassword">Event Location</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Description" v-model="editable.description">
        <label for="floatingPassword">Event Description</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Date" v-model="editable.startDate">
        <label for="floatingPassword">Event Date/Time</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Capacity" v-model="editable.capacity">
        <label for="floatingPassword">Event Capacity</label>
      </div>
      <div>
        <select name="type" id="type" v-model="editable.type">
        <option value="concert">Concerts</option>
        <option value="convention">Conventions</option>
        <option value="sport">Sports</option>
        <option value="digital">Digital</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Create An Event</button>
    </div>
  </form>
  </div>
</template>


<script>

import { ref } from 'vue';
import { eventsService } from "../services/EventServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
export default {
  setup(){
    const editable = ref({})
    const router = useRouter()
  return { 
    editable,
    
    async createTowerEvent() {
      try {
        const formData = editable.value
        const newTowerEvent = await eventsService.createTowerEvent(formData)
        Modal.getOrCreateInstance('#createEvent').hide()
        editable.value = {}
        router.push({ name: 'EventDetails',
      params: { id: newTowerEvent.id } })
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>