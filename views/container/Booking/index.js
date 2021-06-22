import React from 'react';
import FeatureHeader from '~/container/components/FeatureHeader';
import FormWrapper from '~/container/components/FormWrapper';
import BookingForm from './Form';

const Booking = () => {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area gray-bg">
          <FeatureHeader title="BOOKING" />
          <FormWrapper>
            <BookingForm />
          </FormWrapper>
        </div>
      </main>
    </>
  );
};

export default Booking;
