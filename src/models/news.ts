import mongoose from 'mongoose';



const disasterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/free-vector/empty-conference-room_529539-71.jpg?w=2000',
    },

    user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
});
disasterSchema.set('toJSON', {
    transform: (document, returnDocument) => {
        returnDocument.id = document._id.toString(),
            delete returnDocument._id;
        delete returnDocument.__v

    }
});

export = mongoose.model('News', disasterSchema)