import { createContext, useEffect, useState } from "react";
import useFetchAPI from "../hooks/useFetchAPI";


const AppContext = createContext()

const AppContextProvider = ({ children }) =>{
    const [searchWord, setSearchWord] = useState(null)
    const [editableArea, setEditableArea] = useState(null)
    const [newPlace, setNewPlace] = useState({
        name: "",
        paths:[],
        center: null,
        zoneInfo: {
            locality: "",
            areaLevel: "",
        }
    })

    const { 
        Places,
        selectedPlace,
        addingState,
        updateArea,
        setAddingState,
        setSelectedPlace,
        addNewArea,
        deletePlace ,
    } = useFetchAPI()

    useEffect(()=>{
        setNewPlace({
            name: "",
            paths:[],
            center: null,
            zoneInfo: {
                locality: "",
                areaLevel: "",
            }
        })
    },[addingState])

    return (
        <AppContext.Provider value={{
            Places,
            addingState,
            newPlace,
            selectedPlace,
            searchWord,
            editableArea,
            updateArea,
            setEditableArea,
            addNewArea,
            setSearchWord,
            setSelectedPlace,
            setAddingState,
            setNewPlace,
            deletePlace
        }}>
            { children }
        </AppContext.Provider>
    )
}

export {
    AppContext,
    AppContextProvider
}