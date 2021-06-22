import React from 'react';
import SectionBanner from './SectionBanner';
import SectionWrapper from './SectionWrapper';
import FeatureCarousel from './FeatureCarousel';
import CelebCarousel from './CelebCarousel';
import PackageCarousel from './PackageCarousel';
import RegisterSection from './RegisterSection';
import HomeBenefit from '~/views/container/components/HomeBenefit';
import { AOS_DATA } from '~/configs/index';

export default function Home() {
  const benefitList = [
    {
      key: 1,
      col: [
        {
          key: 2,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-1-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-1-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-1.png         512w',
          title: 'KHÔNG GIỚI HẠN',
          content: (
            <p style={{ padding: '0 72px' }} className="style-content">
              Sản phẩm thẻ duy nhất trên thị trường <b>không giới hạn</b> ngày sử dụng & <b>không thu phí</b> hội viên.
            </p>
          )
        },
        {
          key: 3,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-2-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-2-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-2.png         512w',
          title: 'AN TOÀN',
          content: (
            <p style={{ padding: '0 56px' }} className="style-content">
              Cam kết <b>bồi hoàn</b> lên tới <b>110%</b> giá trị Thẻ khi bạn không đặt được phòng (với sự bảo lãnh của{' '}
              <b>Ngân hàng BIDV</b>).
            </p>
          )
        },
        {
          key: 4,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-3-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-3-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-3.png         512w',
          title: 'LINH HOẠT',
          content: (
            <p style={{ padding: '0 56px' }} className="style-content">
              Nói <b>không</b> với giới hạn ngày đặt và phụ phí ngày cao điểm. Hơn nữa bạn có thể chuyển nhượng một cách dễ dàng.
            </p>
          )
        }
      ]
    },
    {
      key: 5,
      col: [
        {
          key: 6,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-4-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-4-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-4.png         512w',
          title: 'SINH LỢI',
          content: (
            <p style={{ fontSize: '15px', padding: '0 72px' }} className="style-content">
              Nhận điểm thưởng với giá trị ~<b>10%/năm</b>, để tiêu dùng hoặc tích lũy đầu tư
            </p>
          )
        },
        {
          key: 7,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-5-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-5-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-5.png         512w',
          title: 'TIẾT KIỆM',
          content: (
            <p style={{ fontSize: '15px', padding: '0 56px' }} className="style-content">
              Đặt phòng với giá cố định chỉ bằng ~<b>50%</b> giá niêm yết. Nhận ưu đãi lên đến <b>50%</b> khi nâng hạng phòng và sử dụng DV
              tại các cơ sở trong hệ thống.
            </p>
          )
        },
        {
          key: 8,
          imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/icon-6-300x259.png',
          imgSrcSet:
            '/vninturist-assets/wp-content/uploads/2020/12/icon-6-300x259.png 300w,/vninturist-assets/wp-content/uploads/2020/12/icon-6.png         512w',
          title: 'CƠ HỘI',
          content: (
            <p style={{ fontSize: '15px', padding: '0 72px' }} className="style-content">
              Chuyển đổi toàn bộ giá trị chưa sử dụng &amp; điểm thưởng qua các công cụ đầu tư khác như trái phiếu, cổ phần, condotel.
            </p>
          )
        }
      ]
    }
  ];

  const featureList = [
    {
      key: 1,
      title: 'NGHỈ DƯỠNG',
      content: 'Đối tác lưu trú đẳng cấp 5 sao, booking linh hoạt không giới hạn và ưu đãi khi nâng cấp hạng phòng'
    },
    {
      key: 2,
      title: 'NGHỈ DƯỠNG',
      content: 'Đối tác lưu trú đẳng cấp 5 sao, booking linh hoạt không giới hạn và ưu đãi khi nâng cấp hạng phòng'
    },
    {
      key: 3,
      title: 'NGHỈ DƯỠNG',
      content: 'Đối tác lưu trú đẳng cấp 5 sao, booking linh hoạt không giới hạn và ưu đãi khi nâng cấp hạng phòng'
    }
  ];

  const celebList = [
    {
      key: 1,
      celebImg: '/vninturist-assets/wp-content/uploads/2020/12/soobin-hoang-son-150x150.jpg',
      celebName: 'Soobin Hoàng Sơn',
      celebTitle: 'Ca sĩ nổi tiếng Việt Nam',
      celebQuote: `"Trải nghiệm CBP Riviera là một trong những trải nghiệm tuyệt vời nhất , mọi thứ đều tuyệt vời từ chất
      lượng đến dịch vụ".`
    },
    {
      key: 2,
      celebImg: '/vninturist-assets/wp-content/uploads/2020/12/soobin-hoang-son-150x150.jpg',
      celebName: 'Soobin Hoàng Sơn',
      celebTitle: 'Ca sĩ nổi tiếng Việt Nam',
      celebQuote: `"Trải nghiệm CBP Riviera là một trong những trải nghiệm tuyệt vời nhất , mọi thứ đều tuyệt vời từ chất
      lượng đến dịch vụ".`
    },
    {
      key: 3,
      celebImg: '/vninturist-assets/wp-content/uploads/2020/12/soobin-hoang-son-150x150.jpg',
      celebName: 'Soobin Hoàng Sơn',
      celebTitle: 'Ca sĩ nổi tiếng Việt Nam',
      celebQuote: `"Trải nghiệm CBP Riviera là một trong những trải nghiệm tuyệt vời nhất , mọi thứ đều tuyệt vời từ chất
      lượng đến dịch vụ".`
    }
  ];

  const packageList = [
    {
      key: 1,
      imgSrc: 'vninturist-assets/wp-content/uploads/2020/12/Product-1.png',
      title: 'RIVIERA 30',
      link: '#!',
      content: 'Trị giá 30.000.000 VND, giảm giá 30% các dịch vụ tại Cam Ranh Riviera Resort.'
    },
    {
      key: 2,
      imgSrc: 'vninturist-assets/wp-content/uploads/2020/12/Product-1.png',
      title: 'RIVIERA 30',
      link: '#!',
      content: 'Trị giá 30.000.000 VND, giảm giá 30% các dịch vụ tại Cam Ranh Riviera Resort.'
    },
    {
      key: 3,
      imgSrc: 'vninturist-assets/wp-content/uploads/2020/12/Product-1.png',
      title: 'RIVIERA 30',
      link: '#!',
      content: 'Trị giá 30.000.000 VND, giảm giá 30% các dịch vụ tại Cam Ranh Riviera Resort.'
    }
  ];

  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <SectionBanner />

          <SectionWrapper title="LỢI ÍCH">
            {benefitList.map((row) => (
              <div key={row.key} className="row" id="row-1149237739">
                {row.col.map((benefit) => (
                  <HomeBenefit
                    data-aos={AOS_DATA.zoomIn}
                    key={benefit.key}
                    imgSrc={benefit.imgSrc}
                    imgSrcSet={benefit.imgSrcSet}
                    title={benefit.title}
                    content={benefit.content}
                  />
                ))}
              </div>
            ))}
          </SectionWrapper>

          <SectionWrapper title="TÍNH NĂNG">
            <FeatureCarousel itemList={featureList} data-aos={AOS_DATA.zoomInRight} />
          </SectionWrapper>

          <SectionWrapper title="KHÁCH HÀNG VÀ ĐỐI TÁC NÓI GÌ VỀ CHÚNG TÔI">
            <CelebCarousel itemList={celebList} data-aos={AOS_DATA.zoomInLeft} />
          </SectionWrapper>

          <SectionWrapper title="GÓI SẢN PHẨM">
            <PackageCarousel itemList={packageList} />
          </SectionWrapper>

          <RegisterSection />
        </div>
      </main>
    </>
  );
}
