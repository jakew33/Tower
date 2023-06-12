import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {


  async getMyTickets(){
    const res = await api.get('account/tickets')
    logger.log('getting account tickets', res.data)
    AppState.myTickets = res.data.map(t => new Ticket(t))
    logger.log(AppState.myTickets)
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('getting event tickets', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }

  async createTicket(eventId) {
    const res = await api.post('api/tickets', { eventId })
    logger.log('creating ticket', res.data)
    AppState.activeEvent.ticketCount ++
    AppState.account.ticketCount ++
    AppState.activeEvent.capacity --
    AppState.tickets.push(new Ticket(res.data))
  }

  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleted ticket', res.data)
    AppState.activeEvent.ticketCount --
    AppState.account.ticketCount --
    AppState.activeEvent.capacity ++
    AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
  }
}

export const ticketsService = new TicketsService()