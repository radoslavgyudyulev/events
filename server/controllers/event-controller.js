const User = require('../models/User');
const CalendarEvent = require('../models/CalendarEvent');
const checkMethod = require('../utilities/checkMethod');

async function createCalendar(currentUserId, data) {
    try {
        if (data.isPrivate) {
            let event = new CalendarEvent({
                title: data.title,
                description: data.description,
                date: data.date,
                hour: data.hour,
                isPrivate: true,
                numberOfParticipants: Number(data.numberOfParticipants),
                participants: [],
                creator: currentUserId,
                dateCreate : Date.now()
            });

            await event.save();

            let currentUser = await User.findById(currentUserId);

            currentUser.createdEvents.push(event.id);

            await currentUser.save();

            let participants = data.participants;

            for (let participant of participants) {
                let currentParticipant = await User.findById(participant);
                currentParticipant.invitedEvents.push(event.id);

                await currentParticipant.save();
            }

            return event;
        } else {
            let event = new CalendarEvent({
                title: data.title,
                description: data.description,
                date: data.date,
                hour: data.hour,
                isPrivate: false,
                numberOfParticipants: Number(data.numberOfParticipants),
                participants: [],
                creator: currentUserId,
                dateCreate : Date.now()
            });

            await event.save();

            let currentUser = await User.findById(currentUserId);

            currentUser.createdEvents.push(event.id);

            await currentUser.save();

            let participants = data.participants;

            for (let participant of participants) {
                let currentParticipant = await User.findById(participant);
                currentParticipant.invitedEvents.push(event.id);

                await currentParticipant.save();
            }

            return event;
        }
    } catch (error) {
        throw new Error(error);
    }
}

function validateParticipants(data) {
    let lastParticipant = [];
    let firstParticipants = [];

    for (let i = 0; i < data.length / 2; i++) {
        lastParticipant.push(data[i]);   
    }
    for (let j = data.length - 1; j > data.length / 2 - 1; j--) {
        firstParticipants.push(data[j]);
    }

    for (let p of lastParticipant) {
        if (firstParticipants.toString().includes(p)) {
            let index = data.indexOf(p);
            data.splice(index, 1);
        } 
    }

    return data;
}

module.exports = {
    create: async (req, res) => {
        let currentUserId = req.user.id;
        let data = req.body;
        let eventId = '';

        data.participants = validateParticipants(data.participants);

        try {
            if (data.numberOfParticipants < data.participants.length) {
                return res.status(200).json({ message: 'Participants are more then a number you choose!' });
            }
            let event = await createCalendar(currentUserId, data);
            eventId = event.id;

            res.status(200).json({ message: 'Event was create successfully!', eventId: eventId});
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    editEvent: async (req, res) => {
        let data = req.body;
        
        try {
            let event = await CalendarEvent.findById(data.eventId).populate('participants');
            if (!event) {
                return res.status(403).json({ message: 'You have not create a Event!' });
            }
            if (data.numberOfParticipants < data.participants.length) {
                return res.status(200).json({ message: 'Participants are more then a number you choose!' });
            }

            if (data.title && typeof data.title === 'string') {  event.title = data.title; }

            if (data.description && typeof data.description === 'string') { event.description = data.description; }

            if (data.date && typeof data.date === 'string') { event.date = data.date; }

            if (data.hour && typeof data.hour === 'string') { event.hour = data.hour; }

            if (typeof data.isPrivate === 'boolean') { 
                if (data.isPrivate) {
                    event.isPrivate = true;
                } else {
                    event.isPrivate = false;
                }
            }

            if (data.numberOfParticipants) { event.numberOfParticipants = Number(data.numberOfParticipants); }

            if (data.participants) { 
                for (let participant of data.participants) {
                    let user = await User.findById(participant);

                    user.invitedEvents.push(event.id);

                    await user.save();
                }
                
            }

            await event.save();

            res.status(200).json({ message: 'Event was successfully edited' });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    getEvents: async (req, res) => {
        let getAllEvents = [];
        let { skip, limit } = req.body;

        try {
            let events = await CalendarEvent
                .find()
                .populate('participants')
                .populate('creator')
                .skip(skip)
                .limit(limit)
                .sort({ dateCreate: -1 });

            if (events.length === 0) {
                return res.status(200).json({ message: 'No events found!'});
            }

            for (let event of events) {
                let helper = [];
                checkMethod(event.creator, helper);

                let participants = [];
                for (let participant of event.participants) {
                    checkMethod(participant, participants);
                }

                let eventList = {
                    eventId: event.id,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    hour: event.hour,
                    numberOfParticipants: event.numberOfParticipants,
                    isPrivate: event.isPrivate,
                    creator: helper,
                    participants: participants,
                    dateCreate: event.dateCreate
                };

                getAllEvents.push(eventList);
            }
            res.status(200).json({ getAllEvents });
        } catch (error) {
            res.status(403).json({ error: error });
        }
        
    },
    allEvents: async (req, res) => {
        let currentUserId = req.user.id;
        let { skip, limit } = req.body;
        let allCreatedEvents = [];

        try {
            let currentUser = await User
                .findById(currentUserId)
                .populate('createdEvents')
                .skip(skip)
                .limit(limit);

            for (let event of currentUser.createdEvents) {
                let participants = [];
                for (let participant of event.participants) {
                    let users = await User.findById(participant);
                    checkMethod(users, participants);
                }

                let helper = {
                    eventId: event.id,
                    title: event.title,
                    description: event.description,
                    isPrivate: event.isPrivate,
                    date: event.date,
                    hour: event.hour,
                    numberOfParticipants: event.numberOfParticipants,
                    participants: participants,
                    dateCreate: event.dateCreate
                };

                allCreatedEvents.push(helper);
            }

            res.status(200).json({ allCreatedEvents });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    invitesEvents: async (req, res) => {
        let currentUserId = req.user.id;

        let allInvitedEvents = [];

        try {
            let currentUser = await User
                .findById(currentUserId)
                .populate('invitedEvents');

            for (let event of currentUser.invitedEvents) {
                let helper = [];

                let user = await User.findById(event.creator);
                checkMethod(user, helper);

                helper = helper.toString().split(':')[1];

                let invites = {
                    eventId: event.id,
                    title: event.title,
                    description: event.description,
                    isPrivate: event.isPrivate,
                    date: event.date,
                    hour: event.hour,
                    creator: helper,
                    dateCreate: event.dateCreate
                };
        
                allInvitedEvents.push(invites);
            }

            res.status(200).json({ allInvitedEvents });
        } catch (error) {
            res.status(404).json({ error: error });
        }
    },
    invitesAnswer: async (req, res) => {
        let currentUserId = req.user.id;
        let { eventId, answer } = req.body;

        try {
            if (answer) {
                let currentUser = await User
                    .findById(currentUserId);
                
                let index = currentUser.invitedEvents.toString().indexOf(eventId);
                currentUser.invitedEvents.splice(index, 1);

                await currentUser.save();

                let event = await CalendarEvent.findById(eventId);

                event.participants.push(currentUserId);

                await event.save();

                res.status(200).json({ message: 'You are now part of this Event!' });
            } else {
                let currentUser = await User
                    .findById(currentUserId);
                
                let index = currentUser.invitedEvents.toString().indexOf(eventId);
                currentUser.invitedEvents.splice(index, 1);

                await currentUser.save();

                res.status(200).json({ message: 'Event was successfully ignored!' });
            }
        } catch (error) {
            res.status(404).json({ error: error });
        }
    },
    joinEvent: async (req, res) => {
        let currentUserId = req.user.id;
        let eventId = req.body.id;
 
        try {
            let event = await CalendarEvent
                .findById(eventId)
                .populate('creator');

            if (!event) {
                return res.status(404).json({ errorMessage: 'Please send a valid data!' });
            }

            if (event.creator.id === currentUserId) {
                return res.status(200).json({ errorMessage: "Creator can't join in his own Event!" });
            }
 
            if (!event.participants.toString().includes(currentUserId)) {
                event.participants.push(currentUserId);
            } else {
                return res.status(200).json({ errorMessage: 'You are part of this Event!' });
            }

            if (event.isPrivate) {
                let creator = await User
                    .findById(event.creator);
                    
                if (!creator.friends.toString().includes(currentUserId)) {
                    return res.status(200).json({ errorMessage: "The Event is Private!You can't join it!" });
                } 
            }
 
            await event.save();
 
            res.status(200).json({ successMessage: 'Successfully joined to this Event!' });
        } catch (error) {
            res.status(200).json({ error: error });
        }
    },
    leaveEvent: async (req, res) => {
        let currentUserId = req.user.id;
        let eventId = req.body.id;
 
        try {
            let event = await CalendarEvent
                .findById(eventId);
 
            if (!event.participants.toString().includes(currentUserId)) {
                return res.status(200).json({ errorMessage: 'You are not part of this Event!' });
            }

            let index = event.participants.indexOf(currentUserId);

            event.participants.splice(index, 1);

            await event.save();
            
            res.status(200).json({ successMessage: 'Successfully leaved the Event!' });
        } catch (error) {
            res.status(404).json({ error: error });
        }
    }
};