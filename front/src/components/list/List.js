import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import ListItem from "../listItem/ListItem"
import NewPlace from "../newPlace/NewPlace"
import SearchInput from "../searchInput/SearchInput"
import "./listStyles.css"
const List =() =>{
    const { Places } = useContext(AppContext)

    return(
        <ul className="app__list">
            <SearchInput />
            <NewPlace />
            {Places.map((place, i)=> (<ListItem key={place.myUuid} place={place} id={i}/>))}
        </ul>
    )
}

export default List