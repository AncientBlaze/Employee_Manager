import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    assignTo: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    work: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: "pending"
    }
});

const Work = mongoose.model('Work', WorkSchema);

export default Work;