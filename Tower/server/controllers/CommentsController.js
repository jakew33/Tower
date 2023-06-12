import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .delete('/:commentId', this.deleteComment)
  }
  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId
      const userId = req.userInfo.id
      await commentsService.deleteComment(commentId, userId)
      return res.send(`${commentId} deleted`)
    } catch (error) {
      next(error)
    }
  }
} 