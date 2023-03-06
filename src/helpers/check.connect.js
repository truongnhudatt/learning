'use strict'

const { default: mongoose } = require("mongoose")
const os = require("os")
const process = require("process")

const _SECOND = 5000

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections:: ${numConnection}`)
}


const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        
        const maxConnections = numCores * 2
        if(numConnection > maxConnections){
            console.log(`Connection overload detected`)
        }
    }, _SECOND)
}


module.exports = {
    countConnect,
    checkOverload
}