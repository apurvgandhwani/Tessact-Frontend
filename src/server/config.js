const IS_PROD = (process.env.NODE_ENV === "production");
// const IS_PROD = false;

const NODE_PORT = 4211;
const BS_PORT   = 3002;

module.exports = {
    NODE_PORT,
    BS_PORT,

    SESSION_SECRET:
        't355@c7_S3cr37',

    LOGIN_URL: "https://www.backend.trigger.tessact.com/auth/login/",

    DB: {
        production: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'tessact_db'
        },
        development: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'tessact_db'
        }
    }

}