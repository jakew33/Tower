import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class CommentsService{
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async findEventComments(eventId) {
    const comments = await dbContext.Comments.find({eventId: eventId}).populate('creator')
    return comments
  }
  async deleteComment(commentId, userId) {

    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) throw new BadRequest("This Comment Doesn't Exist")
    if (comment.creatorId != userId) {
      throw new Forbidden("You can't do that")
    }
    await comment.remove()
    return
  }
}

export const commentsService = new CommentsService()