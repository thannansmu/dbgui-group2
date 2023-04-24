import React, { useState } from 'react';
import { Rating } from './rating';
import { TextAreaField } from '../TextAreaField';
import { TextField } from '../TextField';
import { SelectField } from '../SelectField';
import './rating.css'
export const ReviewForm = ({ reviews, setReviews }) => {
    const [ comment, setComment ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ rating, setRating ] = useState('');

    const ratingOptions = [
        {value: 1, label: '1 stars'},
        {value: 2, label: '2 stars'},
        {value: 3, label: '3 stars'},
        {value: 4, label: '4 stars'},
        {value: 5, label: '5 stars'}
    ];

    const addReview = () => {
        if (!reviews) {
            const newReview = (
                <div className='container border bg-light'>
                    <div key={0} className="review">
                    <div className="reviewRating">
                        <Rating value={rating} />
                    </div>
                    <p className="reviewName">{userName}</p>
                    <p className="reviewComment">{comment}</p>
                    <p className="reviewDate">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            );
            setReviews([newReview]);
        }
        else {
            const newReview = (
                <div key={reviews.length} className="review border bg-light" style={{marginTop: '1rem', marginBottom: '1rem', minHeight: '6rem'}}>
                    <div className='container bg-secondary border' style={{width: '100%', paddingBottom: '0.25rem', paddingTop: '0.25rem'}}>
                        <div className="reviewRating">
                            <Rating value={rating} />
                        </div>
                    </div>
                    <div className='container'>
                        <div className='container'>
                            <p className="reviewName d-inline text-secondary size-small">{userName}</p>
                            <p className="reviewDate float-end text-secondary size-small">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div className='container'>
                            <p className="reviewComment size-small">"{comment}"</p>
                        </div>
                    </div>
                </div>
            );
            setReviews([...reviews, newReview]);
        }

        setUserName('');
        setRating('');
        setComment('');
    };

    return (<>
        <div className='container'>
            <h3 className='bg-secondary text-white border' style={{padding: 5, marginBottom: 0}}>Add Review</h3>
            <div className='container bg-light border' style = {{marginTop: 0, paddingTop: 10, paddingBottom: 10, marginBottom: 10}}>  
                <div id='oneline' className='container'>
                    <div className='d-inline-block'  style={{width: '60%', marginRight: '3%'}}>
                        <TextField id="userName" label="Your Name" value={userName} setValue={setUserName}/>
                    </div>
                    <div className='d-inline-block' style={{width: '20%', marginRight: '1%'}}>
                        <SelectField 
                            id="rating" 
                            label="Rating" 
                            value={rating} 
                            setValue={setRating}
                            options={ratingOptions}
                        />
                    </div>
                    <div className='d-inline-block'>
                        <Rating value={rating}/>
                    </div>
                </div>
                <div className='container'>
                    <div style={{marginTop: 10}}>
                        <TextAreaField id="comment" label="Comment" value={comment} setValue={setComment}/>
                    </div>
                </div>
                <button style={{marginTop: 10}} type="button" className = 'btn btn-sm btn-primary' onClick={addReview}>Submit</button>
            </div>
        </div>
    </>);
};
