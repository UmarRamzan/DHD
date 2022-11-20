
import {inputgroup} from 'react-bootstrap'

export function Search_Bar() {
    return (
        <div class="input-group">
            <input type="search" class="form-control rounded" placeholder="Search for doctors, hospitals, specialties" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary">search</button>
        </div>  
    )
}