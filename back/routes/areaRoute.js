const express = require("express")
const areaController = require("../controllers/areaController")
class AreaRoutes {
    router
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }

    initRoutes(){
        this.router.get("/", areaController.getAll)
        this.router.post("/", areaController.addNew)
        this.router.delete("/:areaId", areaController.deleteOne)
        this.router.put("/:areaId", areaController.updateArea)
    }
}

module.exports = new AreaRoutes()