<template>
  <div class="container-fluid">
    <section class="row pt-4" v-if="event">
      <div>
        <div class="row">
          <div class="col-md-6 mb-3 d-flex flex-column align-items">
            <div class="card border-dark">
              <img :src="event.coverImg" class="card-img-top elevation-5" alt="Card Image">
              <div class="card-body d-flex flex-column bg-dark text-light">
                <h5 class="card-title">{{ event.name }}</h5>
                <p class="m-0">Location: {{ event.location }}</p>
                <p class="m-0">Date: {{ event.startDate }}</p>
                <p class="card-text mb-4 lead">{{ event.description }}</p>
                <div class="col-3 pt-3">
                  <div class="p-1 fw-bold fs-5">
                    <p></p>
                  </div>
                  <button :disabled="event.isCanceled" v-if="!isAttendee" class="btn btn-success text-center fs-5 text-white fw-bold" @click="createTicket()">
                    Attend
                  </button>
                  <button :disabled="event.isCanceled" v-else class="btn btn-dark text-center fs-5 text-white fw-bold" @click="deleteTicket()">
                    Un-Attend
                  </button>
                  <button :disabled="event.isCanceled" v-if="event.creatorId == user.id" class="btn btn-danger" @click="cancelEvent()">Cancel Event</button>
                </div>
                <h1 v-if="event.isCanceled" class="text-danger mt-2">Cancelled</h1>
                <h1 v-if="event.capacity == 0" class="text-danger mt-2">Sold Out</h1>
                <h5 v-if="!event.isCanceled" class="text-light mt-2">{{ event.capacity }} Tickets Remaining</h5>
              </div>
            </div>
          </div>
          <div class="col-6 text-white pt-3">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#createComment" :disabled="event.isCanceled">Leave Comment</button>
          </div>
        </div>
      </div>

      <div v-for="c in comments" :key="c.id" class="card w-75 mt-4 mb-4 bg-dark elevation-5">
        <div class="d-flex justify-content-between px-3 py-2 mb-2">
          <div v-if="c.creator">
            <div>
              <img :src="c.creator.picture" alt="" class="rounded-circle" width="80" height="80">
              <p class="text-light mb-5">{{ c.creator.name }}</p>
            </div>
          </div>
          <div class="d-flex flex-row card-body justify-content-center">
            <div class="ml-2">
              <h5 class="text-light mb-0 ms-2">{{ c.body }}</h5>
            </div>
          </div>
          <div>
            <button v-if="c.creator && c.creatorId == user.id" class="btn btn-danger btn-sm text-center justify-content-end text-light" @click="deleteComment(c.id)">Delete Comment</button>
          </div>
        </div>
      </div>
    </section>

    <Modal id="createComment">
      <CreateComment />
    </Modal>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  setup(){
    const route = useRoute()

    async function getTicketsByEventId(){
      try {
        const eventId = route.params.id
        await ticketsService.getTicketsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    async function getEventById() {
      try {
        const eventId = route.params.id
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
        
      }
    }

    async function getCommentsByEventId() {
      try {
        const eventId = route.params.id
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    
    onMounted(() => {
      getEventById()
      getTicketsByEventId()
      getCommentsByEventId()
      
    })
  return { 
    event: computed(()=> AppState.activeEvent),
    tickets: computed(() => AppState.tickets),
    comments: computed(()=> AppState.comments),
    isAttendee: computed(()=> AppState.tickets.find(t => t.accountId == AppState.user.id && AppState.activeEvent.id == route.params.id)),
    user: computed(()=> AppState.user),
    account: computed(()=> AppState.account),

    async createTicket() {
      try {
        const eventId = route.params.id
        await ticketsService.createTicket(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },

    async deleteTicket() {
      try {
        if (await Pop.confirm){
          const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id)
          await ticketsService.deleteTicket(ticket.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    },

    async deleteComment(commentId) {
      try {
        if (await Pop.confirm()) {
          await commentsService.deleteComment(commentId);
          await getCommentsByEventId();
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, 'error');
      }
    },

    async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await eventsService.cancelEvent(route.params.id)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      }
    }
  };
</script>
<style lang="scss" scoped>
    .card{
      box-shadow: 2px 2px #79E7AB;
      
    }
.cardBg{
  background-color:#474C61;
}
</style>