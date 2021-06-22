import React from 'react';

const WelcomeSection = (props) => {
  return (
    <section
      className="section banner-about dark mt-5"
      id="section_1395945224"
      style={{
        backgroundImage: 'url("/vninturist-assets/wp-content/uploads/2020/12/background-2.jpg")',
        backgroundPosition: '50% 50%',
        height: '500px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      {...props}>
      <div className="bg section-bg fill bg-fill" />
      <div className="section-content relative">
        <div className="row align-center" id="row-408875006">
          <div className="col medium-5 small-12 large-5 d-flex justify-content-center align-items-center">
            <div
              className="col-inner text-center"
              style={{ backgroundColor: 'rgba(91, 91, 91, 0.55)', padding: '32px 0px 40px 0px', width: '60vw' }}>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '40px',
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                  letterSpacing: '.7rem'
                }}>
                WELCOME
              </div>
              <div className="text-center">
                <div
                  className="is-divider divider clearfix mb-4"
                  style={{ maxWidth: '80%', height: '2px', backgroundColor: 'rgb(255, 255, 255)' }}
                />
              </div>
              <p className="mb-0" style={{ textAlign: 'center', fontSize: '20px', fontFamily: 'Montserrat' }}>
                Cam Ranh Riviera Beach Resort &amp; Spa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
