import React from 'react';
import SupportElement from './SupportElement.js';
import FeatureHeaderTitle from './FeatureHeaderTitle.js';

export default function FeatureHeader(props) {
  const supportHeaderItems = [
    { title: 'Booking', icon: '/assets/icons/calendar.svg', url: '/features/booking' },
    { title: 'Chuyển nhượng', icon: '/assets/icons/transfer.svg', url: '/features/transfer' },
    { title: 'Bồi hoàn', icon: '/assets/icons/refund.svg', url: '/features/refund' },
    { title: 'Cấp lại thẻ', icon: '/assets/icons/renew-card.svg', url: '/features/renew-card' }
  ];
  return (
    <>
      <section className="section icon-tinh-nang dark" id="section_167128669" style={{ backgroundColor: '#4B4B4B!important' }}>
        <div className="section-content relative">
          <div className="row" id="row-18280584">
            {supportHeaderItems.map((item, i) => (
              <SupportElement key={i} title={item.title} icon={item.icon} url={item.url} />
            ))}
          </div>
        </div>
      </section>
      <FeatureHeaderTitle title={props.title} />
    </>
  );
}
