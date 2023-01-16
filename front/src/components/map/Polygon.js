import { PolygonF } from "@react-google-maps/api"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import env from "react-dotenv"

import GeoCode from "react-geocode"
GeoCode.setApiKey(env.API_KEY)
GeoCode.setLanguage("en")
GeoCode.setRegion("es")

const Polygon = ({ place }) =>{
    const { searchWord, selectedPlace, setSelectedPlace, editableArea, setEditableArea }= useContext(AppContext)
    const editableState = place.myUuid === editableArea?.myUuid

    if(!place.name.toLowerCase().includes(searchWord?.toLowerCase()) && searchWord) return null

    const options ={
        fillColor: "#0853f3",
        fillOpacity: (place === selectedPlace) ? 0.6 : 0.3,
        strokeColor: "#0853f3",
        editable: editableState
    }

    const handlePolygonPaths =(paths) =>{
        console.log(paths.getArray().length)
        let pathsArray = []
        let newPaths = editableArea.paths
        let pathsLenght = paths.getArray().length
        let zoneInfo ={
            locality: "",
            areaLevel: ""
        }
        let lats = 0, lngs = 0, newCenter = null

        paths.forEach(function(xy){
            pathsArray.push([xy.lat(), xy.lng()])
            lats+= xy.lat()
            lngs += xy.lng()
        })

        newPaths.coordinates = [pathsArray]

        newCenter = {
            lat: (lats/ pathsLenght),
            lng: (lngs/ pathsLenght)
        }

        GeoCode.fromLatLng(newCenter.lat, newCenter.lng).then(
            (response) => {
              zoneInfo.locality = response.results[0].address_components[1].long_name
              zoneInfo.areaLevel = response.results[0].address_components[3].long_name
            },
            (error) => {
              console.error(error);
            }
        );
         setEditableArea({ ...editableArea, paths: newPaths, center: newCenter, zoneInfo })
    }

    const paths = place.paths.coordinates[0].map(coors => ({ lat: coors[0], lng: coors[1]}))
    
    function handleNewPaths (){
        if (editableState)
        handlePolygonPaths(this.getPath())
    }

    return(
        <PolygonF 
            paths={editableState ? editableArea.paths:  paths}
            
            onChange={pol => console.log(pol)}
            options={{options}}
            onDblClick={handleNewPaths}
        >   
        </PolygonF>
    )
}

export default Polygon





