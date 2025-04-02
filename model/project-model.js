const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register'
    }],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    dueDays: {
        type: Number,
        default: 0
    },
    overdueDays: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

projectSchema.pre('save', function (next) {

    this.dueDays = moment(this.endDate).diff(moment(this.startDate), 'days');
    const today = moment().startOf('day');
    if (today.isAfter(this.endDate)) {
        this.overdueDays = today.diff(moment(this.endDate), 'days');
    } else {
        this.overdueDays = 0;
    }

    next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;