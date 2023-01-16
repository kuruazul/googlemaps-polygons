import { DrawingManagerF } from "@react-google-maps/api"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import GeoCode from "react-geocode"
import env from "react-dotenv"

GeoCode.setApiKey(env.API_KEY)
GeoCode.setLanguage("en")
GeoCode.setRegion("es")

const DrawingManager =()=>{
    const { newPlace, setNewPlace, addingState, editableArea } = useContext(AppContext)
    const editableState = (editableArea === null)

    const addNewPolygon = pol => {
        let paths =[]
        let zoneInfo ={
            locality: "",
            areaLevel: ""
        }
        let lats = 0, lngs = 0, center = null
        let pathsLenght = pol.getPaths().getArray()[0].getLength()
        
        pol.getPath().forEach(function(xy, i) {
            paths.push(xy.toJSON())
            lats+= xy.lat()
            lngs += xy.lng()
            
        });
        
        pol.setVisible(false)

        center = {
            lat: (lats/ pathsLenght),
            lng: (lngs/ pathsLenght)
        }


        GeoCode.fromLatLng(center.lat, center.lng).then(
            (response) => {
              const address = response.results[0].address_components[0].long_name;
              zoneInfo.locality = response.results[0].address_components[1].long_name
              zoneInfo.areaLevel = response.results[0].address_components[3].long_name

              console.log(address, zoneInfo);
            },
            (error) => {
              console.error(error);
            }
          );
          
        setNewPlace({...newPlace, paths, center, zoneInfo})
        
    }

    return(
        <DrawingManagerF 
            options={{
                drawingControl: false,
                polygonOptions:{editable: editableState},
                drawingMode: addingState ? "polygon" : null
            }}
            
            onPolygonComplete={addNewPolygon}
        />
    )
}

export default DrawingManager