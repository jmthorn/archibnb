import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { getReviews } from '../../store/reviews'


function Reviews () { 

const { id } = useParams();

  const reviews = useSelector(state => {
    return state.reviews.reviews
  });


  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getReviews(id))
  }, [id, dispatch])




    return(
        <>
                <div className="reviews-container">
                  {reviews?.map((review) =>  {
                    return (
                      <div key={review.id} className="review-container">
                        <div className="author-container">
                          <img src={review.User.image_url} alt="author"></img>
                          <div className="author">
                          {review.User.first_name} {review.User.last_name}
                          </div>
                          <div className="author-info">

                          </div>
                        </div>
                        <div className="review">{review.review}</div>
                      </div>
                    )
                  })}
                </div>
        </>
    )
}

export default Reviews;