/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { GetReviews } from '../../api/reviews';

const Reviews = ({idx}) => {
    const [review, setReviews] = useState();

    useEffect(() => {
        GetReviews(idx).then((res) => {
            setReviews(res);
        });
    }, []);

    return (
    <div className='bg-background px-6'>
        <div className='text-white text-3xl pl-1 pt-6 text-left pb-2 border-b-2 w-full'>
            Review
        </div>
        <div className='text-white text-left pl-1 pt- pb-12'>
            {
                review?.message
            }
        </div>
    </div>
  )
}

export default Reviews