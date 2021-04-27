import { Schema, model, Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

export interface DebtInterface extends Document{
    name:string;
    email:string;
    password: string;
    value: Number;
}
const DebtSchema = new Schema({
  client_id: Number,
  date: Date,
  value: Number,
  description: String,
})

DebtSchema.plugin(mongoosePaginate)

export default model<DebtInterface>('debt', DebtSchema)
