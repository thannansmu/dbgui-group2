import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewForm } from '../common/review/reviewForm';
import { SelectField } from '../common';
import { TextAreaField } from '../common';
import { Rating } from '../common/review/rating';
import { availabilityApi } from '../../Api/availabilityApi';
import { getTutorID } from '../../Api/availabilityApi';
import { addRating, addReview } from '../../Api';
import { getStudentIDByUsername } from '../../Api';
import { Link } from 'react-router-dom';
import './Review_Tutor.css'

export const Review_Tutor = ({ loggedInUser }) => {

  const { username } = useParams();

  const [tutorID, setTutorID] = useState('');
  const [studentID, setStudentID] = useState('');
  //const [tutorFirstName, setTutorFirstName] = useState('');
  //const [tutorLastName, setTutorLastName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchTutorID = async () => {
      try {
        const data = await availabilityApi.getTutorID(username);
        setTutorID(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutorID();
  }, [username]);

  useEffect(() => {
    const fetchStudentID = async () => {
      try {
        const data = await getStudentIDByUsername(loggedInUser);
        setStudentID(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentID();
  }, [loggedInUser]);
  
  /*
  useEffect(() => {
    const fetchTutorFirstName = async () => {
      try {
        const data = await getTutorFirstName(tutorID);
        setTutorFirstName(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchTutorFirstName();
    }
  }, [tutorID]);

  useEffect(() => {
    const fetchTutorLastName = async () => {
      try {
        const data = await getTutorLastName(tutorID);
        setTutorLastName(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (tutorID) {
      fetchTutorLastName();
    }
  }, [tutorID]);
  */

  const ratingOptions = [
    { value: 1, label: '1 stars' },
    { value: 2, label: '2 stars' },
    { value: 3, label: '3 stars' },
    { value: 4, label: '4 stars' },
    { value: 5, label: '5 stars' }
  ];

  const onSubmit = () => {
    // Submit review data
    addReview(username, {"studentID":studentID, "tutorID":tutorID, "review":comment});
    addRating(username, {"studentID":studentID, "tutorID":tutorID, "review":rating});
    console.log('added review + rating!')
  }

  return <>
    <div className='form'>
      <div>
        <h3>Add Review</h3>
        <div className='contai' style={{ marginTop: 0, paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}>
          <div id='oneline' className='rating-container'>
            <div className='rating-containr-inner'>
              <SelectField
                className='reviewTutor'
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
              <TextAreaField className='reviewTutor' id="comment" value={comment} setValue={setComment} />
            </div>
          </div>
          <Link to='/profile'><button style={{ marginTop: 10 }} type="button" className='reviewTutor' onClick={onSubmit}>Submit</button></Link>
        </div>
      </div>
    </div>
  </>
};




