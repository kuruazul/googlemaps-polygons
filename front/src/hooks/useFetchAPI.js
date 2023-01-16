import { useEffect, useState } from "react"

const useFetchAPI = () =>{
    const [ Places, setPlaces] = useState([])
    const [ selectedPlace, setSelectedPlace ] = useState(null)
    const [ addingState, setAddingState] = useState(false)

    const addNewArea = async(newPlace) =>{
        await fetch("http://localhost:3500/api/area",{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPlace)
        }).then(res => res.json())
        .then(resJson => {
            console.log(resJson)
            setPlaces([ ...Places, resJson.newArea])
            setAddingState(false)
        })
        .catch(err => console.log(err))
    }

    const deletePlace = async (area) =>{
        fetch(`http://localhost:3500/api/area/${area.myUuid}`,{
            method: "DELETE",
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson)
            let areaId = Places.indexOf(area)
            let preArray = Places.slice(0, areaId)
            let postArray = Places.slice(areaId + 1, Places.length)
            setPlaces(preArray.concat(postArray))
        })
        .catch( err => console.log(err))
    }

    const updateArea = async (oldArea, newArea) =>{
        fetch(`http://localhost:3500/api/area/${oldArea.myUuid}`,{
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(newArea)
        })
        .then(res => res.json())
        .then(resJson => {
            
            const newAreas = Places.map(area => {
                if (area.myUuid === oldArea.myUuid) {
                  return newArea;
                }else{
                    return area
                }
              });


             setPlaces(newAreas)
            console.log(newAreas)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        async function getAreas (){
            await fetch("http://localhost:3500/api/area",{
            method: "GET"
        })
        .then(res => res.json())
        .then(resJson =>{
            setPlaces(resJson.areas)
        })
        .catch(err => console.log(err))
        }
        getAreas()
    },[])

    return{
        Places,
        selectedPlace,
        addingState,
        updateArea,
        setAddingState,
        setSelectedPlace,
        addNewArea,
        deletePlace ,
    }
}

export default useFetchAPI