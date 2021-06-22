import React from 'react';

export default function SubHeader(props) {
  return (
    <div className="text-center py-5" style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover' }}>
      <h1 style={{ color: '#074494', fontSize: '32px', fontFamily: 'Montserrat', textTransform: 'uppercase' }} className="m-0">
        <b>{props.title}</b>
      </h1>
    </div>
  );
}
