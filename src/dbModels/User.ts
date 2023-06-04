import mongoose from 'mongoose';
const {Schema} = mongoose

const User = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]

})

export const UserModel = mongoose.model('User',User)