const controllers = require('../controllers');
const passport = require('passport');
require('../config/passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

module.exports = (app) => {
    // Authentications
    app.post('/api/auth/signup', controllers.user.signUp);
    app.post('/api/auth/signin', passportSignIn, controllers.user.signIn);
    app.post('/api/auth/google', passportGoogle, controllers.user.googleOAuth);
    app.post('/api/auth/facebook', passportFacebook, controllers.user.facebookOAuth);

    // All about users friends 
    app.get('/api/user/profile', passportJWT, controllers.user.profile);
    app.post('/api/user/friends/find', passportJWT, controllers.user.findFriends);
    app.post('/api/user/request/send', passportJWT, controllers.user.requestSend);
    app.get('/api/user/request/get', passportJWT, controllers.user.requestGet);
    app.post('/api/user/request/answer', passportJWT, controllers.user.requestAnswer);
    app.get('/api/user/friends/yourFriends', passportJWT, controllers.user.yourFriends);
    app.post('/api/user/friends/remove', passportJWT, controllers.user.remove);
    app.get('/api/user/delete', passportJWT, controllers.user.deleteProfile);
    app.get('/api/user/change/key', passportJWT, controllers.user.keyChecker);
    app.post('/api/user/changePass', passportJWT, controllers.user.changePass);

    // All about Events
    app.post('/api/event/create', passportJWT, controllers.event.create);
    app.post('/api/event/edit', passportJWT, controllers.event.editEvent);
    app.post('/api/event/getEvents', controllers.event.getEvents);
    app.get('/api/event/allEvents', passportJWT, controllers.event.allEvents);
    app.get('/api/event/invites', passportJWT, controllers.event.invitesEvents);
    app.post('/api/event/invites/answer', passportJWT, controllers.event.invitesAnswer);
    app.post('/api/event/join', passportJWT, controllers.event.joinEvent);
    app.post('/api/event/leave', passportJWT, controllers.event.leaveEvent);

    app.get('*', (req, res) => {
        res.status(404).json({ message: 'Not found!' });
    });
};