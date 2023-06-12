import { BadRequest, Forbidden  } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class EventsService {


  async create(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator ticketCount')
    return event
  }

  async findAllEvents() {
    const events = await dbContext.Events.find().populate('creator ticketCount')
    return events
  }

  async findEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
    if (!event) throw new BadRequest(`Event at id: ${eventId} not found`)
    return event
  }

  async editEvent( eventData, eventId, userId){
    const originalEvent = await this.findEventById(eventId)
    if (originalEvent.creatorId != userId) {
      throw new Forbidden("No way, Jose")
    }
    if (originalEvent.isCanceled == true)
      throw new BadRequest('Not Able To Do That')
    
    originalEvent.name = eventData.name || originalEvent.name
    originalEvent.description = eventData.description || originalEvent.description
    originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
    originalEvent.location = eventData.location || originalEvent.location
    originalEvent.capacity = eventData.capacity || originalEvent.capacity
    originalEvent.startDate= eventData.startDate || originalEvent.startDate
    // originalEvent.isCanceled = eventData.isCancelled|| originalEvent.isCanceled
    
    await originalEvent.save()
    return originalEvent
  
  }

  async getEventTickets(eventId) {
  const tickets = await dbContext.Tickets.find({eventId: eventId}).populate('event ticketCount')
  return tickets
}
  async cancelEvent(eventId, userId) {
    const event = await this.findEventById(eventId)
    if (event.creatorId != userId) throw new BadRequest("Can't Do That")

    event.isCanceled = true
    await event.save()
    return event
  }

}

export const eventsService = new EventsService()