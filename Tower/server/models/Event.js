import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId
export const EventSchema = new Schema({
    creatorId: {type: ObjectId, required: true},
    name: {type: String, required: true},
    description: { type: String, required: true},
    coverImg: {type: String, required: true},
    location: { type: String, required: true},
    capacity: {type: Number, required: true},
    startDate: { type: Date, required: true},
    isCanceled: {type: Boolean, default: false},
    type: {type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital']}
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

EventSchema.virtual('ticketCount',{
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true,
})

