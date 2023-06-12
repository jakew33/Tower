
export class Ticket {
  constructor(data){
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.account = data.account
  }
}

export class TicketHolder extends Ticket{
  constructor(data) {
    super(data)
    this.profileId = data.profile.id
    this.name = data.profile.name
    this.picture = data.profile.picture
}
}

export class AttendingEvent extends Ticket {
    constructor(data) {
        super(data)
        this.name = data.event.name
        this.coverImg = data.event.coverImg
    }
}