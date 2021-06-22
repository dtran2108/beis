import React, { useState } from 'react';
import { Alert } from 'antd';
import SubHeader from '../SubHeader';
import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';
import { getErrorDescription } from '~/views/utils/helpers/parseError';
import CenterLayout from '~/views/container/components/CenterLayout';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [login, setLogin] = useState('');
  const [formError, setFormError] = useState(null);
  const [resetKey, setResetKey] = useState('');

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            //
            setLogin={setLogin}
            setFormError={setFormError}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <StepTwo //
            login={login}
            setFormError={setFormError}
            setResetKey={setResetKey}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <StepThree //
            setFormError={setFormError}
            resetKey={resetKey}
          />
        );
      default:
        return;
    }
  };

  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <SubHeader backgroundUrl="/images/header/login-bg.png" title="Reset Password" />
          {formError && (
            <CenterLayout className="mt-5">
              <Alert message="Lỗi" description={getErrorDescription(formError)} type="error" showIcon />
            </CenterLayout>
          )}
          {renderContent()}
        </div>
      </main>
    </>
  );
}
