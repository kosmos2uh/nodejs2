module.exports = {
    db: {
        uri: process.env.DB_CONNECTION + ':' + process.env.MONGODB_PORT + '/' +  process.env.DB_NAME,
        options:{
              "keepAlive": 300000,
              "connectTimeoutMS": 30000,
              "useNewUrlParser": true
              }
    },
    email: {
        apiKey: process.env.SENDGRID_API_KEY,
        sendFrom: process.env.SEND_EMAILS_FROM
    },
    login: {
        maxAttempts: process.env.MAX_LOGIN_ATTEMPTS,
        lockoutHours: process.env.LOGIN_ATTEMPTS_LOCKOUT_HOURS * 60 * 60 * 1000,
        minimumPasswordLength: process.env.MINIMUM_PASSWORD_LENGTH,
        passwordResetTimeLimitInHours: process.env.PASSWORD_RESET_TIME_LIMIT_IN_HOURS,
        passwordHashRounds: parseInt(process.env.PASSWORD_HASH_ROUNDS, 10)
    },
    server: {
        timezone: process.env.TZ
    },
    session: {
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET
    },

    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://" + process.env.APP_HOST + "/auth/github/callback"
    },

    linkedin: {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://" + process.env.APP_HOST + "/auth/linkedin/callback"
    },

    twitter: {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://" + process.env.APP_HOST + "/auth/twitter/callback"
    },

    facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://" + process.env.APP_HOST + "/auth/facebook/callback"
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_ID,
        callbackURL: "http://" + process.env.APP_HOST + "/auth/facebook/callback"
    },
    transport: {
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpSecure: true,
        smtpUser: process.env.SMTP_USER,
        smtpPass: process.env.SMTP_PASSWORD
    },
    pusher: {
        appId: process.env.PUSHER_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
    },
};
