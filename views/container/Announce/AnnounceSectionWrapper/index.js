import React from 'react';
import SectionHeader from '~/views/container/components/SectionHeader';

export default function AnnounceSectionWrapper(props) {
  return (
    <section className="section" id="section_953655991" {...props}>
      <div className="bg section-bg fill bg-fill bg-loaded" />
      <div className="section-content relative">
        <div className="row" id="row-1475583076">
          <div className={`col ${props.layout}`}>
            <div className="col-inner">
              <SectionHeader title={props.title} />
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
