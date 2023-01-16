import List from '../list/List'
import Map from '../map/Map'
import './appContainerStyles.css'

const AppContainer = () =>{
    return(
        <div className="app-container">
            <List />
            <Map />
        </div>
    )
}

export default AppContainer