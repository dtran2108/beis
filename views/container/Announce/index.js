import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { AOS_DATA } from '~/configs/index';

const IntroduceSection = dynamic(import('./IntroduceSection'));
const ImgAsideSection = dynamic(import('./ImgAsideSection'));
const AnnounceSectionWrapper = dynamic(import('./AnnounceSectionWrapper'));
const CardOverlay = dynamic(import('./CardOverlay'));
const VerticalCard = dynamic(import('../components/VerticalCard'));

export default function Announce() {
  const refs = useRef([]);
  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };

  const jumptoList = [
    {
      key: 1,
      title: 'NGHỈ DƯỠNG'
    },
    {
      key: 2,
      title: 'ƯU ĐÃI & ĐẶC BIỆT'
    },
    {
      key: 3,
      title: 'ĐIỂM THƯỞNG'
    },
    {
      key: 4,
      title: 'CHUYỂN NHƯỢNG & QUY ĐỔI'
    },
    {
      key: 5,
      title: 'BỒI HOÀN'
    }
  ];

  refs.current = jumptoList.map((element, i) => refs.current[i] ?? React.createRef());

  const resortList = [
    {
      sizes: '(max-width: 955px) 100vw, 955px',
      width: 955,
      height: 330,
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/dangcap5sao.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/dangcap5sao.jpg         955w,
      /vninturist-assets/wp-content/uploads/2020/12/dangcap5sao-300x104.jpg 300w,
      /vninturist-assets/wp-content/uploads/2020/12/dangcap5sao-768x265.jpg 768w
    `,
      title: 'ĐẲNG CẤP 5 SAO',
      content: 'CBP luôn thẩm định kĩ lưỡng và lựa chọn các đối tác liên kết là các Resort 5* đã khẳng định được chất lượng và uy tín.'
    },
    {
      sizes: '(max-width: 1024px) 100vw, 1024px',
      width: 1024,
      height: 712,
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/dichvutiennghi.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/dichvutiennghi.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/dichvutiennghi-300x209.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/dichvutiennghi-768x534.jpg  768w
    `,
      title: 'DỊCH VỤ TIỆN NGHI',
      content:
        'Dịch vụ cao cấp bao gồm F&B, thể thao & chăm sóc sức khỏe, vui chơi giải trí tạo sự hài lòng kể cả đối với các khách hàng khó tính nhất.'
    },
    {
      sizes: '(max-width: 1024px) 100vw, 1024px',
      width: 1024,
      height: 712,
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Booking.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Booking.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Booking-300x209.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Booking-768x534.jpg  768w
    `,
      title: 'BOOKING KHÔNG GIỚI HẠN',
      content: 'Đêm nghỉ không hết hạn và nói không với giới hạn ngày đặt cũng như phụ phí ngày cao điểm.'
    }
  ];

  const incentiveList = [
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Baibienrieng.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Baibienrieng-768x568.jpg  768w
    `,
      textPadding: '40px 25px 10px 25px',
      title: 'QUÀ TẶNG HẤP DẪN',
      content: 'Tặng ngay gói quà tặng gồm tiền mặt, Voucher đêm nghỉ All-inclusive và Voucher sử dụng dịch vụ miễn phí tại Resort.'
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Congviennuoc.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Congviennuoc-768x568.jpg  768w
    `,
      textPadding: '24px 25px 10px 25px',
      title: 'ĐẶC QUYỀN VIP',
      content:
        'Hưởng theo chế độ VIP với các đặc quyền như: đưa đón tại sân bay, turn-down service, bữa tối miễn phí cho 2 người vào ngày sinhnhật,…'
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Gym.jpg',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2020/12/Gym.jpg         1024w,
      /vninturist-assets/wp-content/uploads/2020/12/Gym-300x222.jpg  300w,
      /vninturist-assets/wp-content/uploads/2020/12/Gym-768x568.jpg  768w
    `,
      textPadding: '56px 25px',
      title: 'ƯU ĐÃI ĐẶC BIỆT',
      content: 'Giảm giá lên tới 30% cho tất cả dịch vụ tại Resort, kể cả với phí Upgrade & Extra Bed.'
    }
  ];

  const featureList = [
    {
      title: 'MỨC THƯỞNG HẤP DẪN',
      content: 'Hưởng 10%/năm trên giá trị gói Voucher sở hữu'
    },
    {
      title: 'KHẢ NĂNG SỬ DỤNG LINH HOẠT',
      content: 'Có thể sử dụng điểm thưởng thanh toán các dịch vụ tại Resort hoặc quy đổi ra tiền mặt'
    }
  ];

  const exchangeList = [
    {
      title: 'CHUYỂN NHƯỢNG DỄ DÀNG',
      sizes: '(max-width: 1020px) 100vw, 1020px',
      width: 1020,
      height: 608,
      imgSrc: '/vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-1024x610.png',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-1024x610.png  1024w,
      /vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-300x179.png    300w,
      /vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-768x457.png    768w,
      /vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-1536x914.png  1536w,
      /vninturist-assets/wp-content/uploads/2021/01/Chuyennhuong-2048x1219.png 2048w
    `
    },
    {
      title: (
        <>
          QUY ĐỔI SANG CÁC SẢN PHẨM <br /> ĐẦU TƯ KHÁC{' '}
        </>
      ),
      sizes: '(max-width: 460px) 100vw, 460px',
      width: 460,
      height: 354,
      imgSrc: '/vninturist-assets/wp-content/uploads/2021/01/Quydoi.png',
      srcSet: `
      /vninturist-assets/wp-content/uploads/2021/01/Quydoi.png 460w, /vninturist-assets/wp-content/uploads/2021/01/Quydoi-300x231.png 300w
    `
    }
  ];

  const chargebackList = [
    {
      content: (
        <>
          Bồi hoàn trong 30 ngày nếu khách hàng
          <br />
          không đặt được phòng
        </>
      )
    },
    {
      content: 'An toàn tuyệt đối với cam kết được Ngân hàng…bảo lãnh'
    }
  ];

  return (
    <>
      <main id="main" className>
        <div id="content" role="main" className="content-area">
          <IntroduceSection refs={refs} jumptoList={jumptoList} scrollToRef={scrollToRef} data-aos={AOS_DATA.fadeRight} />

          <AnnounceSectionWrapper
            title={
              <p className="mb-2" style={{ textAlign: 'center', fontSize: '32px', fontFamily: 'Montserrat' }}>
                VỀ TÍNH NĂNG CỦA THẺ ĐẦU TƯ KỲ NGHỈ CBP RIVIERA
              </p>
            }
            data-aos={AOS_DATA.zoomIn}>
            <p style={{ textAlign: 'center', fontSize: '16px', color: '#000', fontFamily: 'Montserrat' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </AnnounceSectionWrapper>

          <div ref={refs.current[0]}>
            <AnnounceSectionWrapper
              title={
                <p className="mb-2" style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '32px' }}>
                  NGHỈ DƯỠNG
                </p>
              }>
              <div className="row" id="row-1222020323">
                <div className="col small-12 large-12">
                  <CardOverlay
                    data-aos={AOS_DATA.zoomInUp}
                    sizes={resortList[0].sizes}
                    width={resortList[0].width}
                    height={resortList[0].height}
                    imgSrc={resortList[0].imgSrc}
                    srcSet={resortList[0].srcSet}
                    title={resortList[0].title}
                    content={resortList[0].content}
                  />
                </div>
              </div>
              <div className="row" id="row-892653113">
                {resortList.slice(1).map((resort, i) => (
                  <div key={i} className="col medium-6 small-12 large-6">
                    <CardOverlay
                      data-aos={i % 2 == 0 ? AOS_DATA.zoomInLeft : AOS_DATA.zoomInRight}
                      sizes={resort.sizes}
                      width={resort.width}
                      height={resort.height}
                      imgSrc={resort.imgSrc}
                      srcSet={resort.srcSet}
                      title={resort.title}
                      content={resort.content}
                    />
                  </div>
                ))}
              </div>
            </AnnounceSectionWrapper>
          </div>

          <div ref={refs.current[1]}>
            <AnnounceSectionWrapper
              title={
                <p className="mb-2" style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '32px' }}>
                  ƯU ĐÃI &amp; ĐẶC QUYỀN
                </p>
              }>
              <div className="row mt-5">
                {incentiveList.map((item, i) => (
                  <div key={i} className="col medium-4 small-12 large-4">
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
            </AnnounceSectionWrapper>
          </div>

          <div ref={refs.current[2]}>
            <ImgAsideSection
              imgStyle={{ transform: 'scale(1.5)', position: 'relative', left: '92px', top: '40px' }}
              imgWidth={1020}
              imgHeight={679}
              imgSrc="/vninturist-assets/wp-content/uploads/2021/01/Diemthuong.png"
              srcSet="
            /vninturist-assets/wp-content/uploads/2021/01/Diemthuong.png         1024w,
            /vninturist-assets/wp-content/uploads/2021/01/Diemthuong-300x200.png  300w,
            /vninturist-assets/wp-content/uploads/2021/01/Diemthuong-768x512.png  768w
          "
              sizes="(max-width: 1020px) 100vw, 1020px"
              title="ĐIỂM THƯỞNG"
              itemList={featureList}
              left={true}
            />
          </div>

          <div ref={refs.current[3]}>
            <AnnounceSectionWrapper
              title={
                <p className="mb-2" style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '32px' }}>
                  CHUYỂN NHƯỢNG VÀ QUY ĐỔI
                </p>
              }>
              <div className="row" id="row-1151732410">
                {exchangeList.map((item, i) => (
                  <div key={i} className="col medium-6 small-12 large-6">
                    <div className="col-inner" data-aos={AOS_DATA.zoomIn}>
                      <p style={{ textAlign: 'center', fontFamily: 'Montserrat', fontSize: '24px', color: '#000' }}>{item.title}</p>
                      <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1696085733">
                        <div className="img-inner dark" style={{ margin: '50px 0px 0px 0px' }}>
                          <img
                            width={item.width}
                            height={item.height}
                            src={item.imgSrc}
                            className="attachment-large size-large"
                            alt=""
                            loading="lazy"
                            srcSet={item.srcSet}
                            sizes={item.sizes}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnnounceSectionWrapper>
          </div>

          <div ref={refs.current[4]}>
            <ImgAsideSection
              imgStyle={{}}
              imgWidth={460}
              imgHeight={354}
              imgSrc="/vninturist-assets/wp-content/uploads/2021/01/Boihoan.png"
              srcSet="/vninturist-assets/wp-content/uploads/2021/01/Boihoan.png 460w, /vninturist-assets/wp-content/uploads/2021/01/Boihoan-300x231.png 300w"
              sizes="(max-width: 460px) 100vw, 460px"
              title="BỒI HOÀN"
              itemList={chargebackList}
              left={false}
            />
          </div>
        </div>
      </main>
    </>
  );
}
