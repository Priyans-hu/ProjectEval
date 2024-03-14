const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentsEvaluated: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }],
        default: [],
        validate: {
            validator: function(v) {
                return v.length >= 3 && v.length <= 4;
            },
            message: props => `The array must have a length between 3 and 4. Current length is ${props.value.length}.`
        }
    }
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;