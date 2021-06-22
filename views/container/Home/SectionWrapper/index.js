import React from 'react';
import { AOS_DATA } from '~/configs/index';

export default function SectionWrapper(props) {
  return (
    <>
      <section className="section" id="section_1896935432">
        <div className="bg section-bg fill bg-fill bg-loaded" />
        <div className="section-content relative">
          <div className="row" id="row-1912480831">
            <div className="col small-12 large-12">
              <div className="col-inner">
                <div className="container section-title-container">
                  <h3 className="section-title section-title-center" data-aos={AOS_DATA.fadeUp}>
                    <b />
                    <span className="section-title-main">{props.title}</span>
                    <b />
                  </h3>
                </div>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
