import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class EventsController extends BaseController {
  constructor() {
    super ('api/events')
    this.router
      .get('', this.findAllEvents)
      .get('/:eventId', this.findEventById)
      .get('/:eventId/comments', this.findEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create) 
      .delete('/:eventId', this.cancelEvent)
      .put('/:eventId', this.editEvent)
      .get('/:eventId/tickets', this.getEventTickets)
    
  }

  async create(req, res, next) {
    try {
      let eventData = req.body
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async findAllEvents (req,res,next) {
    try {
      const events = await eventsService.findAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async findEventById( req, res, next) {
    try {
      const event = await eventsService.findEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent( req,res,next) {
    try {
      const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async findEventComments( req, res, next) {
    try {
      const comments = await commentsService.findEventComments(req.params.eventId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventData = req.body
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const editedEvent = await eventsService.editEvent(eventData, eventId, userId)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const ticket = await ticketsService.getEventTickets(req.params.eventId)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }


}