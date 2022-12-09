import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecord, patientGetInfo, removeReview, reviewAddEntry } from "../API/api";
import { useState } from "react";
import { UserState } from "../UserState";

const AddRecord = () => {
    const userState = useContext(UserState)
    const location = useLocation()
    const navigate = useNavigate()
    let {patientID} = location.state

    const [data, setData] = useState({})
    const [recordText,setRecord] = useState('')
    const [isPending,setPending] = useState(false)
    const [error,setError] = useState(null)
    const [edit,setEditMode] = useState(false)
    const [prevText,setText] = useState('')
    const [prevID,setReviewID] = useState(null)

    useEffect(() => {
        let data = patientGetInfo(patientID)
        data.then((res) => {setData(res.data)})
    }, [])

    useEffect(() => {
        let data = getRecord(patientID,-1)
        data.then((res) => {
            console.log(res)
            if (res.data.isSuccessful){
                setText(res.data.text)
                setReviewID(res.data.reviewID)
                setEditMode(true)
            }else{
                setEditMode(false)
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPending(true)

        // if in edit mode
        if (edit){
            // remove prev record
            let res = await removeReview(prevID)
            if (res.data.isSuccessful){
                //if removed prev record then add new one
                let res = await reviewAddEntry(patientID,userState.accountID,-1,recordText)
                if (res.data.isSuccessful){
                    navigate("/bookings")
                }else{
                    setError(res.data.errorMessage)
                    console.log(res.data)
                }
            }
        // else add without removing
        }else{
            let res = await reviewAddEntry(patientID,userState.accountID,-1,recordText)
            if (res.data.isSuccessful){
                navigate("/bookings")
            }else{
                setError(res.data.errorMessage)
                console.log(res.data)
            }  
        }
    }

    return ( 
        <div className="patientInfo">
             <h1>Patient: {patientID}</h1>
             <p>{data.firstName}</p>
             <p>{data.lastName}</p>
             <p>{data.dateOfBirth}</p>
             <p>{data.gender}</p>
             <form onSubmit={handleSubmit}>

                <p></p>
                {edit && <p>Previous Record</p>}
                {edit && <p>{prevText}</p>}
                <p></p>

                <label>Record Description</label>
                <p></p>
                <textarea
                    type="text"
                    required
                    value={recordText}
                    onChange={(e)=>setRecord(e.target.value)}
                />
                <p></p>
                {!isPending && !edit && <button>Add</button>}
                {!isPending && edit && <button>Edit</button>}
                {isPending && <button disabled>chotto matte</button>}

             </form>
             {error}

        </div>
    );
}
 
export default AddRecord;