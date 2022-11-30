import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patientAddReview } from "../API/api";

const AddReview = () => {

    const navi = useNavigate()
    const location = useLocation()
    let patientID = localStorage.getItem("accountID")
    let doctorID = location.state.doctorID

    const [rating,setRating] = useState(10)
    const [reviewText,setReviewText] = useState('')

    const handleSubmit = async () =>{
        let res = await patientAddReview(patientID,doctorID,rating,reviewText)
        if (res.data.isSuccessful){
            console.log(patientID,doctorID,rating,reviewText)
            console.log("Review added")
            navi(-1)
        } else {
            console.log(res.data.err)
        }
    }
    

    return ( 
        <div className="addReview">
            <h1>Review</h1>
            <form onSubmit={handleSubmit}>
                
                <label>Rating</label>
                <input 
                    type="text"
                    required
                    value={rating}
                    onChange={(e)=>{setRating(e.target.value)}}
                />

                <label>Review Text:</label>
                <input 
                    type="text"
                    required
                    value={reviewText}
                    onChange={(e)=>{setReviewText(e.target.value)}}
                />

                <button>Add Review</button>
            </form>
        </div>
     );
}
 
export default AddReview