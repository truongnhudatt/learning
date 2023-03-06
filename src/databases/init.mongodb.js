const mongoose = require("mongoose")
require("dotenv").config()

const connectString = process.env.MONGOURI

class Database{

    constructor(){
        this.connect()
    }

    connect(){
        if( 1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug',{color: true})
        }
        mongoose.connect(connectString).then(_ => {
            console.log(`Connected Mongodb Successfully`);
        }).catch(err => console.log(`Error connect!`))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }

}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb