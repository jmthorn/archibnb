import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { getReviews, deleteReview } from '../../store/reviews'


function Reviews () { 

  const sessionUser = useSelector(state => state.session.user);

  const { id } = useParams();

  const unsortedReviews = Object.values(useSelector(state => {
      return state.reviews
    }))

    const reviews = unsortedReviews.sort(function(a, b) {
    return b.id - a.id;
    })

  


    const dispatch = useDispatch()

    useEffect(() => { 
      dispatch(getReviews(id))
    }, [id, dispatch])


    const deleteReviewButton = (id) => { 
        let result = window.confirm("Are you sure you want to delete your review?")
        if (result){ 
            dispatch(deleteReview(id))
        }
    }

    return(
        <>
                <div className="reviews-container">
                  {reviews?.map((review) =>  {
                    return (
                      <div key={review.id} className="review-container">
                        <div className="author-container">
                          <div className="review-image-container">
                            <img src={review.User.image_url} alt="author"></img>
                          </div>
                          <div className="author">
                          {review.User.first_name} {review.User.last_name}
                          </div>
                          <div className="author-info">

                          </div>
                        </div>
                        <div className="review">{review.review}</div>
                        {sessionUser && sessionUser.id === review.User.id &&
                          <button id="deleteReview" onClick={() => deleteReviewButton(review.id)}>
                            <img src={"/images/X.png"} alt="logo"/>
                          </button> 
                        } 
                      </div>
                    )
                  })}
                </div>
        </>
    )
}

export default Reviews;