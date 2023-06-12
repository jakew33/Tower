import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('getting events', res.data)
    AppState.events = res.data.map(e=> new TowerEvent(e))
    logger.log("appstate events", AppState.events)
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log('getting event by id', res.data)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async createTowerEvent(formData) {
    const res = await api.post('api/events', formData)
    logger.log('creating event', res.data)
    return res.data
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('message',res.data)
  }
}

export const eventsService = new EventsService()