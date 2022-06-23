const mongoose = require('mongoose');

const dateValidator = (value) => {
    return this.startDate <= value;
};

const leaveRequestSchema = new mongoose.Schema(
    {
        employee: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
            // validate: [
            //     dateValidator,
            //     'End date must be greater than Start date',
            // ],
        },
        category: {
            type: String,
            required: true,
            enum: [
                'annual',
                'hospitality',
                'adoption',
                'paid-educational',
                'maternity',
                'paternity',
                'parental',
                'palliative-care',
                'serious-illness',
                'time-credit',
                'short-time-unemployment',
                'compelling-reasons',
                'political'
            ]
        },
        status: {
            type: String,
            required: true,
            enum: [
                'new',
                'approved',
                'refused',
                'canceled'
            ]
        }
    },
    {
        timestamps: true,
    }
);

const LeaveRequest = mongoose.model('leave-requests', leaveRequestSchema);

module.exports = LeaveRequest;
