import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import "./searchInputStyles.css"

const SearchInput =() =>{
    const { setSearchWord } = useContext(AppContext)

    return(
        <div className="search-container">
            <input onChange={e=>setSearchWord(e.target.value)} className="search__input" placeholder="Search.."/>
        </div>
    )
}

export default SearchInput