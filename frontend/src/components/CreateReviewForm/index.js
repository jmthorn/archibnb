import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewForm } from '../../store/reviews';
// import { useHistory } from 'react-router-dom';

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
    console.log("newReview returns:", newReview)
    //newReview returns: {review: "What an awesome place to stay!", guest_id: 32, listing_id: 25}
    let createdReview = await dispatch(createReviewForm(newReview))
    console.log("FRONTEND", createdReview)
    setReview("")
  };


  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
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
