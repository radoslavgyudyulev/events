function checkMethod(user, arr) {
    if (user.local || user.google || user.facebook) {
        arr.push(`${user.id}:${user.local.username
            ? user.local.username
            : user.google.username
            ||
            user.google.username
                ? user.google.username
                : user.facebook.username ||
            user.facebook.username
                    ? user.facebook.username
                    : ''
        }:${user.local.email
            ? user.local.email
            : user.google.email
            ||
            user.google.email
                ? user.google.email
                : user.facebook.email ||
            user.facebook.email
                    ? user.facebook.email
                    : ''}`);
    }

    return arr;
};

module.exports = checkMethod;
