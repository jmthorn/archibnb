import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewForm } from '../../store/reviews';
// import { useHistory } from 'react-router-dom';
import './CreateReviewForm.css';

const CreateReviewForm = ({user, listing}) => {

  const dispatch = useDispatch();
  // const history = useHistory();
  const [review, setReview] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      guest_id: user.id,
      listing_id: parseInt(listing)
    };  
    let createdReview = await dispatch(createReviewForm(newReview))
    setReview("")
  };


  return (
    <section className="new-form-holder centered middled">
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          className="review-input"
          type="text"
          placeholder="Leave a review..."
          value={review}
          onChange={e => setReview(e.target.value)} />
        
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default CreateReviewForm;
