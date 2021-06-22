import React from 'react';
import Link from 'next/link';
import { AOS_DATA } from '~/configs/index';
import SectionHeader from '~/views/container/components/SectionHeader';

const HeavenSection = () => {
  return (
    <section>
      <div className="row text-center mb-3">
        <SectionHeader
          layout="col-12"
          dividerWidth="200px"
          title={
            <h1 className="mb-2 my-5" style={{ textAlign: 'center', fontSize: '30px', color: '#000' }}>
              THIÊN ĐƯỜNG BẠN ĐANG TÌM KIẾM
            </h1>
          }
        />
      </div>
      <div className="row" data-aos={AOS_DATA.fadeRight}>
        <div className="col-12">
          <h3 className="mb-4" style={{ fontWeight: 'bold' }}>
            Khu nghỉ dưỡng ven biển đẳng cấp tại Cam Ranh
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6" data-aos={AOS_DATA.fadeRight}>
          <p style={{ color: '#000' }}>
            Chỉ cách thành phố Nha Trang 30 phút và cách sân bay quốc tế Cam Ranh 20 phút lái xe, du khách sẽ được hòa mình vào không gian
            sống tràn ngập cảnh sắc thiên nhiên, thưởng thức các món đặc sản và hải sản tươi sống, lưu lại những kỉ niệm khó phai khi đặt
            chân khám phá nơi đây.
          </p>
        </div>
        <div className="col-12 col-lg-6" data-aos={AOS_DATA.fadeLeft}>
          <p style={{ color: '#000' }}>
            Như một ốc đảo ẩn mình an yên bên bờ đại dương, là chốn dừng chân cho những ai yêu thích vẻ đẹp của thiên nhiên hoang sơ và nét
            quyến rũ của miền biển xanh cát trắng rợp bóng dừa.
          </p>
          <Link href="#!">
            <p className="text-right" style={{ cursor: 'pointer', color: '#074494' }}>
              Xem bản đồ
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeavenSection;
