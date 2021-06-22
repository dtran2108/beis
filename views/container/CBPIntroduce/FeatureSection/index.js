import React from 'react';
import { AOS_DATA } from '~/configs/index';
import SectionHeader from '~/views/container/components/SectionHeader';
import VerticalCard from '~/views/container/components/VerticalCard';

const CBPIntroduce = (props) => {
  const incentiveList = [
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Baibienrieng.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng-768x568.jpg  768w
    `,
      textPadding: '40px 25px 10px 25px',
      title: 'BÃI BIỂN RIÊNG',
      content: `Kỳ nghỉ của bạn sẽ không thể trọn vẹn nếu thiếu 
      đi những giờ phút trầm mình trong làn nước 
      man mát vị biển hay vùi chân dưới bãi cát mịn 
      màng, mặc cho gió biển mơn man làn da.`
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Congviennuoc.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc-768x568.jpg  768w
    `,
      textPadding: '94px 25px 67px 25px',
      title: 'CÔNG VIÊN NƯỚC',
      content: `Hãy để các bé được thỏa niềm yêu thích bơi lội 
        và vui chơi với hệ thống máng trượt đạt chuẩn 
        Quốc tế ngay tại công viên nước thuộc khuôn 
        viên resort của chúng tôi.`
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Gym.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Gym.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Gym-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Gym-768x568.jpg  768w
    `,
      textPadding: '50px 10px',
      title: 'GYM & THỂ THAO',
      content: `Được dành riêng cho khách hàng lưu trú tại 
      resort, phòng GYM với trang thiết bị hiện đại và 
      Sân Tennis rộng đến 700m2 luôn sẵn sàng cung 
      cấp đầy đủ dụng cụ (như: vợt, banh, khăn) chắn 
      chắn sẽ giúp bạn duy trì thói quen rèn luyện sức 
      khỏe ngay cả khi đi công tác hoặc du lịch.`
    }
  ];

  return (
    <section {...props}>
      <div className="row text-center mb-2">
        <SectionHeader
          layout="col-12"
          dividerWidth="200px"
          title={
            <h1 className="mb-2" style={{ textAlign: 'center', fontSize: '30px', color: '#000' }}>
              TIỆN ÍCH 5 SAO
            </h1>
          }
        />
      </div>
      <div className="row text-center mb-4" data-aos={AOS_DATA.zoomIn}>
        <div className="col-12">
          <h4 style={{ color: '#000' }}>Chúng tôi đem đến sự khác biệt trong chính từng trải nghiệm nhỏ của khách hàng.</h4>
        </div>
      </div>

      <div>
        <div className="row mt-5" style={{ maxWidth: '90%' }}>
          {incentiveList.map((item, i) => (
            <div key={i} className="col-12 col-md-4 col-lg-4">
              <VerticalCard
                data-aos={i % 2 === 0 ? AOS_DATA.fadeUp : AOS_DATA.fadeDown}
                isBottom={i % 2 === 0}
                imgSrc={item.imgSrc}
                srcSet={item.srcSet}
                title={item.title}
                content={item.content}
                textPadding={item.textPadding}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CBPIntroduce;
