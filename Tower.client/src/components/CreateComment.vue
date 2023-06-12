<template>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="modalLabel">Leave Comment</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
      </button>
    </div>
    <form @submit.prevent="$event => createComment()">
      <div class="modal-body">
        <div class="form-floating">
          <input required type="text" class="form-control" id="floatingPassword" placeholder="Text"
              v-model="editable.body">
          <label for="floatingPassword">Comment</label>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">LeaveComment</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from "../services/CommentsService.js";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
export default {
  setup(){
    const editable = ref({})
    const route = useRoute()
  return { 
    editable,
    comments: computed(()=> AppState.comments),
    
    async createComment() {
      try {
        const commentData = editable.value
        commentData.eventId = route.params.id
        await commentsService.createComment(commentData)
        Modal.getOrCreateInstance('#createComment').hide()
          editable.value - {}
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