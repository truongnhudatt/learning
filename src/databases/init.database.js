'use strict'

const mongoose = require("mongoose");
require('dotenv').config()

class Database{

    constructor(){
        this.connect()
    }

    connect(type = 'mongoose'){
        if(1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color : true})
        }

        mongoose.connect(process.env.MONGOURI).then(_ => {
            console.log(`Connected mongodb successfully`)
        }).catch(error => console.log(`Error connect`))

    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const initDatabase = Database.getInstance()

module.exports = initDatabase