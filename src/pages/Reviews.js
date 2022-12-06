import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { doctorGetReview, patientGetInfo } from "../API/api";

const Reviews = () => {
    const [reviews, setReviews] = useState(null)
    const navi = useNavigate();
    const location = useLocation();
    let doctorID = location.state.doctorID
    
    const getReviews = async () => {
        let res = await doctorGetReview(doctorID)
        console.log(res)
        setReviews(res.data.reviews)
    }

    const handleButton = () => {
       navi(-1)
    }

    useEffect(()=>{
        getReviews();
    },[])

    return ( 
        <div className="ReviewList">
            <h1>Reviews</h1>
            {reviews && reviews.map((res)=>(
                <div className="Review">
                    <div key={res.reviewID}>
                        <p>{res.rating + " " +res.reviewText}</p>
                    </div>
                </div>
            ))}
        <button onClick={handleButton}>Go Back</button>
        </div>
     );
}
 
export default Reviews