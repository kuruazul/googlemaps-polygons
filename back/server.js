const express = require("express")
const cors = require("cors")
const areaRoute = require("./routes/areaRoute")
const connection = require("./db/connection")

class Server {
    app
    constructor(){
        this.app = express()
        this.initServerRoutes()
    }

    initServerRoutes(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use("/api/area", areaRoute.router)
    }

    start(){
        this.app.listen(3500,()=>{
            console.log("server up")
            connection.start()
        })
    }
}

module.exports = new Server()