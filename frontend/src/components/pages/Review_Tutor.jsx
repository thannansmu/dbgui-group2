import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewForm } from '../common/review/reviewForm';
import { SelectField } from '../common';
import { TextAreaField } from '../common';
import { Rating } from '../common/review/rating';
import './Review_Tutor.css'

export const Review_Tutor = ({ loggedInUser }) => {

  const [tutorID, setTutorID] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const ratingOptions = [
    { value: 1, label: '1 stars' },
    { value: 2, label: '2 stars' },
    { value: 3, label: '3 stars' },
    { value: 4, label: '4 stars' },
    { value: 5, label: '5 stars' }
  ];

  const onSubmit = () => {
    // Submit review data
  }

  return <>
    <div className = 'form'>
      <div>
        <h3>Add Review</h3>
        <div className='contai' style={{ marginTop: 0, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
          <div id='oneline' className='rating-container'>
            <div className='rating-containr-inner'>
              <SelectField
                options={ratingOptions}
                setValue={setRating}
                label='Select Rating: '
                value={rating}
                optionLabelKey='label'
                optionValueKey='value'
              />
              <Rating value={rating} />
            </div>
          </div>
          <div className='comment-container'>
            <div style={{ marginTop: 10 }}>
              Comment: 
              <TextAreaField id="comment" value={comment} setValue={setComment} />
            </div>
          </div>
          <button style={{ marginTop: 10 }} type="button" className='reviewTutor' onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  </>
};
