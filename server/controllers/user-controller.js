const User = require('../models/User');
const Archive = require('../models/Archive');
const encryption = require('../utilities/encryption');
const sendMail = require('../utilities/mailSender');
const checkMethod = require('../utilities/checkMethod');
const UserData = require('../utilities/UserData');

module.exports = {
    profile: async (req, res) => {
        const currentUserId = req.user.id;

        try {
            let currentUser = await User.findById(currentUserId);

            let user = checkMethod(currentUser, UserData);

            res.status(200).json({ user });
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
        let key = Math.round(Math.random() * 1000000);

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

            if (currentUser.method !== 'local') {
                let loginMethod = currentUser.method;

                return res.status(200).json({ errorMessage: `You are logged with ${loginMethod.toUpperCase()}.You are not able to change your password!` });
            }

            let userEmail = currentUser.local.email;
            let username = currentUser.local.username;

            let timer = setTimeout(async () => {
                try {
                    await Archive.findOneAndDelete({ id: currentUserId });
                    return clearTimeout(timer);
                } catch (error) {
                    throw new Error(error);
                }
            }, 900000);

            let html = `Hello ${username}!This is your secret key ${key.toString()}, be alert the key is valid only for 15 minutes!`;

            sendMail(userEmail, 'Secret Key', html, res);

        } catch (error) {
            res.status(200).json({ error: error });
        }
    }
};