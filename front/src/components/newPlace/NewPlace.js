import "./newPlaceStyles.css"
import addIcon from "../../assets/icons/add.svg"
import cancelIcon from "../../assets/icons/cancel.svg"
import { Fragment, useContext } from "react"
import { AppContext } from "../../context/AppContext"

const NewPlace =() =>{
    const { addingState, setAddingState, newPlace, setNewPlace, addNewArea, setEditableArea } = useContext(AppContext)


        const handleFormsubmit =async (e)=>{
            e.preventDefault()
            if (newPlace.paths.length === 0) {
                alert("Add a specific path")
            }else{       
                console.log("new area", newPlace)  
                addNewArea(newPlace)
            }
        }    
    const inputElements =() =>{

        if (!addingState){ 
            return(
                <Fragment>
                    <div title="Add new area" className="list__newplace" onClick={e => {setAddingState(true); setEditableArea(null)}}>
                    <img className="list__newplace-icon" src={addIcon} />
                    <span className="list__newplace-label">Nuevo predio</span>
                    </div>
                </Fragment>
            )      
        } else { 
            return(
                <Fragment>
                    <form className="list__newplace-form" onSubmit={handleFormsubmit}>
                        <input placeholder="Enter name" onChange={e => setNewPlace({...newPlace, name: e.target.value})} type={"text"} className="list__newplace-input" required/> 
                        <input id="btn_submit" type={"submit"} title="Add" value={"Add"} className="list__newplace-submit" />
                        <label title="Add" htmlFor="btn_submit" className="list__newplace-submit__label">
                            <img src={addIcon}/>
                        </label>
                        <a title="Cancel" className="list__newplace-cancel" onClick={e => setAddingState(false)}>
                            <img src={cancelIcon} />
                        </a>
                    </form>
                </Fragment>
            )
        }
    }

    return(
        <>
            {inputElements()}
        </>
    )
}

export default NewPlace