const express = require('express');
const mongoose = require('mongoose');
const LeaveRequest = require('./models/leave-request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:4200',
    })
);

mongoose.connect('mongodb://localhost:27017/leave-requests-app');

// Routes
app.get('/', async (req, res) => {
    try {
        res.status(200).send('Welcome to the Leave requests API!');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/leave-requests', async (req, res) => {
    const leaveRequests = await LeaveRequest.find().sort({ updatedAt: -1 });
    const filteredLeaveRequests = [];

    const formatDate = (date) => {
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${da}/${mo}/${ye}`;
    };

    if (req.query.search) {
        const search = req.query.search.toLowerCase();

        leaveRequests.filter((leaveRequest) => {
            leaveRequest.employee = leaveRequest.employee.toLowerCase();
            leaveRequest.formatedStartDate = formatDate(leaveRequest.startDate);
            leaveRequest.formatedEndtDate = formatDate(leaveRequest.endDate);

            // console.log(leaveRequest.formatedStartDate);

            // console.log('Start Date raw: ', leaveRequest.startDate);
            // console.log('End Date raw: ', leaveRequest.endDate);
            // console.log('Start Date processed: ', leaveRequest.startDate.toDateString());
            // console.log('End Date processed: ', leaveRequest.endDate.toString());

            if (
                leaveRequest.employee.includes(search) ||
                leaveRequest.category.includes(search) ||
                leaveRequest.formatedStartDate.includes(search) ||
                leaveRequest.formatedEndtDate.includes(search) ||
                leaveRequest.status.includes(search)
            ) {
                return filteredLeaveRequests.push(leaveRequest);
            }
        });

        return res.status(200).send(filteredLeaveRequests);
    }

    // console.log(filteredLeaveRequests);

    try {
        res.status(200).send(leaveRequests);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/leave-requests/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const leaveRequest = await LeaveRequest.findOne({ _id: id });
        if (leaveRequest.length === 0)
            return res.status(404).send({ error: 'Leave request not found!' });
        res.status(200).send(leaveRequest);
    } catch (error) {
        if (error instanceof mongoose.CastError)
            return res.status(404).send({ error: 'Leave request not found!' });
        res.status(500).send(error);
    }
});

app.post('/api/leave-requests', async (req, res) => {
    const leaveRequest = new LeaveRequest(req.body);

    try {
        const createdLeaveRequest = await leaveRequest.save();
        res.status(201).send(createdLeaveRequest);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/api/leave-requests/:id', async (req, res) => {
    const allowedUpdates = [
        'employee',
        'startDate',
        'endDate',
        'category',
        'status',
    ];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidUpdate)
        return res.status(405).send({ error: 'Update not allowed!' });

    const id = req.params.id;

    try {
        const leaveRequest = await LeaveRequest.findOne({ _id: id });

        if (leaveRequest.length === 0)
            return res.status(404).send({ error: 'Leave request not found!' });

        updates.forEach((update) => (leaveRequest[update] = req.body[update]));

        await leaveRequest.save();
        res.status(200).send(leaveRequest);
    } catch (error) {
        res.status(404).send({ error: 'Bad request!' });
    }
});

app.delete('/api/leave-requests/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const leaveRequest = await LeaveRequest.findOneAndDelete({ _id: id });
        if (leaveRequest.length === 0)
            return res.status(404).send({ error: 'Leave request not found!' });
        res.send({ success: 'Deleted!', deletedRecord: leaveRequest });
    } catch (error) {
        if (error instanceof mongoose.CastError)
            res.status(404).send({ error: 'Leave request not found!' });
        res.status(500).send();
    }
});

// App init
app.listen(port, () => {
    console.log(`Node.js app listening on port ${port}`);
});
