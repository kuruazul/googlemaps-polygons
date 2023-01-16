import { Fragment, useContext } from "react"
import { AppContext } from "../../context/AppContext"

import "./listItemStyles.css"

import locationIcon from "../../assets/icons/location.svg"
import deleteIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"
import cancelIcon from "../../assets/icons/cancel.svg"
import tickIcon from "../../assets/icons/tick.svg"



const ListItem = ({ place, id }) =>{
    const { deletePlace, setSelectedPlace, searchWord, selectedPlace, editableArea, setEditableArea, updateArea, setAddingState } = useContext(AppContext)
    const editableState  = (place.myUuid === editableArea?.myUuid)
    
    if(!place.name.toLowerCase().includes(searchWord?.toLowerCase()) && searchWord) return null

    const handleAreaUpdate = ()=>{
        if(JSON.stringify(place) == JSON.stringify(editableArea)){
            console.log("no hay cambios", place)
        }else{
            console.log("hay cambios", editableArea)
            updateArea(place, editableArea)
            setEditableArea(null)
        }
    }

    const renderDynamicButtons =() =>{

        if(editableState){
            return(
                <Fragment>
                    <input value={editableArea.name} onChange={e=> {
                        setEditableArea({ ...editableArea, name: e.target.value})
                        }} type="text" className="list__item-input" />
                    <div title="Save changes" onClick={handleAreaUpdate} className="list__item-edit__container">
                        <img className="item-delete__icon" src={tickIcon} />
                    </div>
                    <div title="Cancel changes" onClick={e => setEditableArea(null)} className="list__item-delete__container">
                        <img className="item-delete__icon" src={cancelIcon} />
                    </div>
                </Fragment>
            )
        } else {
            return(
                <Fragment>
                    { !editableArea && (
                        <div title="Edit area" onClick={e => { setAddingState(false);setEditableArea(place)}} className="list__item-edit__container">
                            <img className="item-delete__icon" src={editIcon} />
                        </div>
                    )}
                    <div title="Delete area" onClick={e => deletePlace(place)} className="list__item-delete__container">
                        <img className="item-delete__icon" src={deleteIcon} />
                    </div>
                </Fragment>
            )
        }

    }

    return(
        <li className={`list__item ${(selectedPlace === place) ? "active" : ""}`}>
            <img title="View on map" onClick={e => setSelectedPlace(place)} className="list__item-icon" src={locationIcon} />
            <p  className="list__item-info" style={{display: editableState ? "none" : "block"}}>
            <span className="item-info__title"> { place.name }  </span>
            <small className="item-info__zone-info"> { place.zoneInfo.locality } - { place.zoneInfo.areaLevel }</small>
            </p>
            { renderDynamicButtons() }
        </li>
    )
}

export default ListItem



