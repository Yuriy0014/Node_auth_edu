import mongoose from 'mongoose';
const {Schema} = mongoose

const Role = new Schema({
    value: {type: String, unique: true, default: 'USER'}
})

export const RoleModel = mongoose.model('Role',Role)