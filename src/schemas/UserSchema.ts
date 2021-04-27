import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document{
    name:string;
    email:string;
    password: string;
}
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String
})

export default model<UserInterface>('user', UserSchema)
