
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TicketsService {
async getMyTickets(accountId) {
  const ticket = await dbContext.Tickets.find({accountId: accountId}).populate('event profile')
  return ticket
}
async getEventTickets(eventId) {
  const tickets = await dbContext.Tickets.find({eventId: eventId}).populate('profile')
  return tickets
}

async createTicket(ticketData) {
  const ticket = await dbContext.Tickets.create(ticketData)
  await ticket.populate('profile')
  return ticket
}

  async deleteTicket(ticketId, userId) {

    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) throw new BadRequest("This Ticket Doesn't Exist")
    if (ticket.accountId != userId) {
      throw new Forbidden("You can't do that")
    }
    await ticket.remove()
    return
  }
}

export const ticketsService = new TicketsService()