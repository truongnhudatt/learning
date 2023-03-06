
const dev = {
    app:{
        port: process.env.DEV_APP_PORT || 3052
    },
    db:{
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27012,
        name: process.env.DEV_DB_NAME || 'test'
    }
}

const pro = {
    app:{
        port: process.env.DEV_APP_PORT || 3000
    },
    db:{
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27012,
        name: process.env.DEV_DB_NAME || 'test'
    }
}


const config = {dev, pro}
const type = process.env.NODE_ENV || 'dev'
module.exports = config[dev]