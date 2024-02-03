import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});
userSchema.set('toJSON', {
    transform: (document, returnDocument) => {
        returnDocument.id = document._id.toString(),
            delete returnDocument._id;
        delete returnDocument.__v;
      


    }
});
const Users = mongoose.model('User', userSchema)
export = Users