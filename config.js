"use strict";
require("dotenv").config();
const env = process.env.NODE_ENV;
const useMocks = process.env.USE_MOCKS === 'true' || !env;
const port = process.env.PORT;

module.exports = {
    env,
    csp: {
        imgSrc: ['data:']
    },
    dateTimeFormat: 'DD-MM-YYYY hh:mma',
    port,
    session: {
        secret: process.env.SESSION_SECRET,
        ttls: process.env.SESSION_TTL,
        name: process.env.SESSION_KEY,
    },
    redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
    email: {
        from: process.env.FROM_ADDRESS,
        replyTo: process.env.REPLY_TO,
        region: process.env.EMAIL_REGION,
        notifyApiKey: process.env.NOTIFY_KEY,
        notifyTemplate: process.env.NOTIFY_TEMPLATE,
    },
    upload: {
        maxFileSize: 20000000
    }
};
