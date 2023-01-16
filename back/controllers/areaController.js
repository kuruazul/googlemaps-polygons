
const Area = require("../models/areaModel")

class AreaController {

    async getAll(req, res){
        try {
            const areas = await Area.findAll()
            console.log(areas)
            res.json({ areas })
        } catch (error) {
            console.log(error)
        }
    }

    async addNew(req, res){

        let {
            name,
            paths,
            center,
            zoneInfo
        } = req.body

        let parsedPaths ={
            type: "POLYGON",
            coordinates: [paths.map(path => [path.lat, path.lng])]
        }

        try {
            const newArea = await Area.create({
                name,
                paths: parsedPaths,
                center,
                zoneInfo: zoneInfo
            })

            console.log(newArea)
            res.json({ newArea })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOne(req, res){
        const { areaId } = req.params

        try {
            const deletedArea = await Area.findOne({ myUuid: areaId})
            const notify = await deletedArea.destroy()
            console.log(notify)
            res.json({ notify })
        } catch (error) {
            console.log(error)
        }
    }

    async updateArea(req, res){
        const { areaId } = req.params

        const {
            name,
            center,
            paths,
            zoneInfo
        } = req.body

        try {
            const area = await Area.update({
                name,
                center,
                zoneInfo,
                paths
            },{ where:{ 
                myUuid: areaId 
            }})  
            console.log(area)
            res.json({area})
        } catch (error) {
            console.log(error)
        }


    }
}

module.exports = new AreaController()



