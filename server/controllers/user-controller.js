const User = require('../models/User');
const Archive = require('../models/Archive');
const JWT = require('jsonwebtoken');
const config = require('../config/config');
const encryption = require('../utilities/encryption');
const emailValidator = require('email-validator');
const checkMethod = require('../utilities/checkMethod');
const sendMail = require('../utilities/mailSender');

signToken = (user) => {
    return JWT.sign({
        iss: 'RD',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setTime(new Date().getTime() + 1)
    }, config.JWTsecret);
};


module.exports = {
    signUp: async (req, res) => {
        const user = req.body;

        if (!emailValidator.validate(user.email)) {
            return res.status(403).json({ error: 'Please add a valid email!' });
        }

        if (!user.username) {
            return res.status(403).json({ error: 'Username is required!' });
        }

        if (user.password.length < 6 && user.password.length > 20) {
            return res.status(403).json({ error: 'Password must be between 6 and 20 characters!' });
        }

        if (user.password && user.password !== user.confirmedPassword) {
            return res.status(403).json({ error: 'Password does not match!' });
        }

        const salt = encryption.generateSalt();
        user.salt = salt;

        if (user.password) {
            const hashedPass = encryption.generateHashedPassword(salt, user.password);
            user.password = hashedPass;
        }

        const foundUser = await User.findOne({ 'local.email': user.email });
        if (foundUser) {
            return res.status(403).json({ error: 'E-mail is already taken!' });
        }

        try {
            const newUser = new User({ 
                method: 'local',
                local: {
                    email: user.email, 
                    username: user.username,
                    password: user.password,
                    salt: user.salt
                }
            });
            await newUser.save();
    
            const token = signToken(newUser);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    signIn: async (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    googleOAuth: async (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    profile: async (req, res) => {
        const currentUserId = req.user.id;

        try {
            let currentUser = await User.findById(currentUserId);

            let currentUserEmail = '';
            let currentUserUsername = '';

            if (currentUser.method === 'local') {
                currentUserEmail = currentUser.local.email;
                currentUserUsername = currentUser.local.username;
            } else if (currentUser.method === 'google') {
                currentUserEmail = currentUser.google.email;
                currentUserUsername = currentUser.google.username;
            } else if (currentUser.method === 'facebook') {
                currentUserEmail = currentUser.facebook.email;
                currentUserUsername = currentUser.facebook.username;
            }

            res.status(200).json({ 
                currentUserEmail,
                currentUserUsername
            });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    
    },
    findFriends: async (req, res) => {
        const currentUserId = req.user.id;
        const { limit, skip } = req.body;
 
        try {
            let currentUser = await User
                .findById(currentUserId)
                .populate('requestSend')
                .populate('friends')
                .populate('requestGet');
            let usersData = await User.find().skip(skip).limit(limit);
            usersData = usersData.filter(u => u.id !== currentUserId);
 
            for (let i = 0; i < currentUser.friends.length; i++) {
                usersData = usersData.filter(u => u.id !== currentUser.friends[i].id);
            }
 
            for (let i = 0; i < currentUser.requestSend.length; i++) {
                usersData = usersData.filter(u => u.id !== currentUser.requestSend[i].id);
            }

            for (let i = 0; i < currentUser.requestGet.length; i++) {
                usersData = usersData.filter(u => u.id !== currentUser.requestGet[i].id);
            }
 
            let users = [];
            for (let user of usersData) {
                checkMethod(user, users);
            }
 
            let yourSendedReq = [];
 
            for (let user of currentUser.requestSend) {
                checkMethod(user, yourSendedReq);
            }
 
            res.status(200).json({ users, yourSendedReq});
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    requestSend: async (req, res) => {
        let otherUsers = req.body.id;
        let currentUserId = req.user.id;

        try {
            let user = await User.findById(otherUsers);
            let currentUser = await User.findById(currentUserId);
            if (user.requestGet.toString().indexOf(currentUserId) === -1) {
                user.requestGet.push(currentUserId);
                await user.save();

                currentUser.requestSend.push(otherUsers);
                await currentUser.save();
 
                return res.status(200).json({ message: 'Request was send successfully!' });
            }
 
            res.status(403).json({ message: 'You already send a request to this person!' });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    requestGet: async (req, res) => {
        const currentUserId = req.user.id;
        let usersRequests = [];
        
        try {
            let currentUser = await User.findById(currentUserId).populate('requestGet');
            
            for (let user of currentUser.requestGet) {
                if (user.method === 'local') {
                    let currentUserData = [];
                    currentUserData.push(user.local.email);
                    currentUserData.push(user.local.username);
                    currentUserData.push(user.id);

                    usersRequests.push(currentUserData);
                } else if (user.method === 'google') {
                    let currentUserData = [];
                    currentUserData.push(user.google.email);
                    currentUserData.push(user.google.username);
                    currentUserData.push(user.id);

                    usersRequests.push(currentUserData);
                } else if (user.method === 'facebook') {
                    let currentUserData = [];
                    currentUserData.push(user.facebook.email);
                    currentUserData.push(user.facebook.username);
                    currentUserData.push(user.id);

                    usersRequests.push(currentUserData);
                }
            }


            res.status(200).json({ usersRequests });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    requestAnswer: async (req, res) => {
        let currentUserId = req.user.id;
        let { otherUserId, answer } = req.body;

        if (otherUserId) {
            if (answer === 'yes') {
                try {
                    let currentUser = await User.findById(currentUserId);
                    currentUser.friends.push(otherUserId);
                    let currentUserIndex = currentUser.requestGet.toString().indexOf(otherUserId);
                    currentUser.requestGet.splice(currentUserIndex, 1);
                    let currentUserIndex2 = currentUser.requestSend.toString().indexOf(otherUserId);
                    currentUser.requestSend.splice(currentUserIndex2, 1);
                    await currentUser.save();
    
                    let otherUser = await User.findById(otherUserId);
                    otherUser.friends.push(currentUserId);
                    let otherUserIndex = currentUser.requestSend.toString().indexOf(currentUserId);
                    otherUser.requestSend.splice(otherUserIndex, 1);
                    let otherUserIndex2 = currentUser.requestGet.toString().indexOf(currentUserId);
                    otherUser.requestGet.splice(otherUserIndex2, 1);
                    await otherUser.save();
    
                    res.status(200).json({ message: 'Request successfully accept!' });
                } catch (error) {
                    res.status(403).json({ error: error });
                }
            } else if (answer === 'no') {
                try {
                    let currentUser = await User.findById(currentUserId);
                    let index = currentUser.requestGet.toString().indexOf(otherUserId);
                    currentUser.requestGet.splice(index, 1);
                    let index2 = currentUser.requestSend.toString().indexOf(otherUserId);
                    currentUser.requestSend.splice(index2, 1);
    
                    await currentUser.save();

                    let otherUser = await User.findById(otherUserId);
                    let index3 = otherUser.requestGet.toString().indexOf(currentUserId);
                    otherUser.requestGet.splice(index3, 1);
                    let index4 = otherUser.requestSend.toString().indexOf(currentUserId);
                    otherUser.requestSend.splice(index4, 1);
    
                    await otherUser.save();
                    
                    res.status(200).json({ message: 'Request successfully refused' });
                } catch (error) {
                    res.status(403).json({ error: error });
                }
            }
        } else {
            res.status(403).json({ error: 'Please send a valid data!' });
        }
    },
    yourFriends: async (req, res) => {
        const currentUserId = req.user.id;
        let friends = [];

        try {
            let currentUser = await User
                .findById(currentUserId)
                .populate('friends');

            for (let user of currentUser.friends) {
                if (user.method === 'local') {
                    let currentUserData = [];
                    currentUserData.push(user.local.email);
                    currentUserData.push(user.local.username);
                    currentUserData.push(user.id);

                    friends.push(currentUserData);
                } else if (user.method === 'google') {
                    let currentUserData = [];
                    currentUserData.push(user.google.email);
                    currentUserData.push(user.google.username);
                    currentUserData.push(user.id);

                    friends.push(currentUserData);
                } else if (user.method === 'facebook') {
                    let currentUserData = [];
                    currentUserData.push(user.facebook.email);
                    currentUserData.push(user.facebook.username);
                    currentUserData.push(user.id);

                    friends.push(currentUserData);
                }
            }

            res.status(200).json({ friends });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    remove: async (req, res) => {
        let currentUserId = req.user.id;
        let otherUserId = req.body.id;
 
        try {
            let currentUser = await User.findById(currentUserId);
            let otherUser = await User.findById(otherUserId);
 
            let currentUserIndex = currentUser.friends.toString().indexOf(otherUserId);
            currentUser.friends.splice(currentUserIndex, 1);
            await currentUser.save();
 
            let otherUserIndex = otherUser.friends.toString().indexOf(currentUserId);
            otherUser.friends.splice(otherUserIndex, 1);
            await otherUser.save();
 
            res.status(200).json({ message: 'Your friend was removed successfully!' });
        } catch (error) {
            res.status(403).json({ error: error });
        }
    },
    deleteProfile: async (req, res) => {
        let currentUserId = req.user.id;

        try {
            await User.findByIdAndDelete(currentUserId);

            res.status(200).json({ successMessage: 'Profile was deleted successfully!' });
        } catch (error) {
            res.status(404).json({ error: error });
        }
    },
    changePass: async (req, res) => {
        let currentUserId = req.user.id;
        let { key, newPassword, confirmedNewPassword } = req.body;

        try {
            let archive = await Archive.findOne({ id: currentUserId });

            if (!archive.authenticateKey(key.toString())) {
                return res.status(200).json({ errorMessage: 'Invalid key!' });
            }

            if (newPassword.length < 6 && newPassword.length > 20) {
                return res.status(200).json({ errorMessage: 'Password must be between 6 and 20 characters!' });
            }

            if (newPassword !== confirmedNewPassword) {
                return res.status(200).json({ errorMessage: 'Password does not match!' });
            }

            let currentUser = await User.findById(currentUserId);


            let salt = encryption.generateSalt();
            const hashedPass = encryption.generateHashedPassword(salt, newPassword);
            
            currentUser.local.salt = salt;
            await currentUser.save();

            currentUser.local.password = hashedPass;
            await currentUser.save();

            await Archive.findOneAndDelete({ id: currentUserId });

            res.status(200).json({ successMessage: 'Password successfully changed!' });

        } catch (error) {
            res.status(404).json({ error: error });
        }
    },
    keyChecker: async (req, res) => {
        let currentUserId = req.user.id;
        let key = Math.round(Math.random() * 100000);

        try {
            let oldArchive = await Archive.findOne({ id: currentUserId });
            if (oldArchive) {
                await Archive.findOneAndDelete({ id: currentUserId });
            }
            let salt = encryption.generateSalt();
            let hashedKey = encryption.generateHashedPassword(salt, key.toString());

            let newArchive = new Archive({
                id: currentUserId,
                key: hashedKey,
                salt: salt
            });
            
            await newArchive.save();

            let currentUser = await User.findById(currentUserId);

            let userEmail = currentUser.local.email;

            sendMail(userEmail, 'Secret Key', key.toString(), res);

        } catch (error) {
            res.status(200).json({ error: error });
        }
    }
};