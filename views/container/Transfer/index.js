import React from 'react';
import FeatureHeader from '~/container/components/FeatureHeader';
import FormWrapper from '~/container/components/FormWrapper';
import TransferForm from './Form';

const Transfer = () => {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area gray-bg">
          <FeatureHeader title="CHUYỂN NHƯỢNG" />
          <FormWrapper>
            <TransferForm />
          </FormWrapper>
        </div>
      </main>
    </>
  );
};

export default Transfer;
