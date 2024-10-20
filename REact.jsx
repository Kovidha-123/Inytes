import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const MyComponent = () => {
  return (
    <ReCAPTCHA
      sitekey={
        typeof window !== 'undefined' && window.Cypress
          ? '6LfoaxwpAAAAAFLYxAbsxYM_t1ZnoM2qrv3KSTU2' // Test site key for Cypress
          : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY // Production site key
      }
    />
  );
};

export default MyComponent;
