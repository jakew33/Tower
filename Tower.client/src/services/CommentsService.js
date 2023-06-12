import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  // async getComments() {
  //   AppState.comments = []
  //   const res = await api.get('api/comments')
  //   logger.log('events', res.data)
  //   AppState.comments = res.data.comments.map(c => new Comment(c))
  // }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log(' creating comment', res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async getCommentsByEventId(eventId) {
    AppState.comments = []
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('Getting Event Comments', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
    // AppState.comments = res.data
    logger.log('[COMMENTS IN THE APPSTATE]', AppState.comments)
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('Deleting Comment', res.data)
    AppState.comments = AppState.events.filter(c => c.id != commentId)
  }
}

export const commentsService = new CommentsService()