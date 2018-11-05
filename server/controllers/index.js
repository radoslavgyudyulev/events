const userController = require('./user-controller');
const eventController = require('./event-controller');

module.exports = {
    user: userController,
    event: eventController
};