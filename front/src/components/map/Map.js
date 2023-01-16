import { LoadScript, GoogleMap, PolygonF } from "@react-google-maps/api"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import DrawingManager from "./DrawingManager";
import env from "react-dotenv"
import "./mapStyles.css"
import Polygon from "./Polygon";


const Map = () => {

    const { Places, newPlace, selectedPlace } = useContext(AppContext)

    let defaullCenter = {
        lat: 29.0457951, 
        lng: -110.8732774
    };

    return(
        <LoadScript  
            id="mapApp"
            googleMapsApiKey={env.API_KEY}
            libraries={["drawing"]}
        >
            <GoogleMap
                mapContainerClassName="app__map"
                center={ selectedPlace ? selectedPlace.center : defaullCenter}
                zoom={14}
                options={{streetViewControl: false, fullscreenControl: false, disableDoubleClickZoom: true}}
            >     

                <PolygonF paths={newPlace.paths} />
                
                
                {Places.map(place => (<Polygon key={place.myUuid} place={place} />))}  

               <DrawingManager />
            </GoogleMap>
        </LoadScript>
    )
}

export default Map