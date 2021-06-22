import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '~/views/container/components/SectionHeader';
import ProductSection from './ProductSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { packageActions } from '~/redux/package';
import { firstImage } from '~/views/utils/helpers/utilObject';
import { connect } from 'react-redux';
import IconLi from '~/views/container/components/IconLi';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import { AOS_DATA } from '~/configs/index';
import { Skeleton } from 'antd';

const Cards = (props) => {
  const [packageList, setPackageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const refs = useRef([]);
  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };

  useEffect(() => {
    setLoading(true);
    props
      .getPackages()
      .then((res) => {
        setPackageList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('trandev ~ file: index.js ~ line 17 ~ useEffect ~ err', err);
        setLoading(false);
      });
  }, []);

  refs.current = packageList.map((element, i) => refs.current[i] ?? React.createRef());

  const adList = [
    { title: 'Chất lượng tốt nhất', content: 'Tận hưởng chất lượng tại 1 trong những Resort cao cấp nhất tại Việt Nam' },
    { title: 'Giá tốt nhất', content: 'Trải nghiệm những dịch vụ 5 sao với giá chỉ 4 sao' },
    {
      title: 'An toàn nhất',
      content: 'Cam kết bồi hoàn lên tới 200% giá trị voucher khi bạn không đặt được phòng (với sự bảo lãnh của Ngân hàng…)'
    }
  ];

  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <section>
            <div className="row">
              <SectionHeader
                data-aos={AOS_DATA.fadeRight}
                layout="col-lg-6 col-md-6"
                dividerWidth="200px"
                title={
                  <div style={{ fontFamily: 'Montserrat' }}>
                    <h1 className="mb-2 mt-5" style={{ textAlign: 'center', fontSize: '64px', letterSpacing: '.3rem', color: '#000' }}>
                      CÁC HẠNG
                    </h1>
                    <h5 className="mb-3 mt-4" style={{ textAlign: 'center', fontSize: '36px', letterSpacing: '.3rem', color: '#000' }}>
                      THẺ ĐẦU TƯ KỲ NGHỈ
                    </h5>
                    <h5 className="mb-3" style={{ textAlign: 'center', letterSpacing: '.3rem', fontSize: '16px', color: 'gray' }}>
                      CBP RIVIERA
                    </h5>
                  </div>
                }
              />
              <div className="col-lg-6 col-md-6" />
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Skeleton loading={loading} active className="mb-5" data-aos={AOS_DATA.fadeRight}>
                  {packageList.map((item, i) => (
                    <div key={item.id} data-aos={AOS_DATA.fadeRight}>
                      <button
                        onClick={() => {
                          scrollToRef(refs.current[i]);
                        }}>
                        <p
                          className="d-flex align-items-center"
                          style={{ textAlign: 'left', fontFamily: 'Montserrat', color: '#000', fontSize: '16px' }}>
                          <FontAwesomeIcon
                            icon={faAngleDoubleRight}
                            className="mr-3"
                            style={{ width: '1rem', height: '1rem', marginLeft: '.5rem', fontWeight: 200 }}
                          />
                          &nbsp;{item.name}
                        </p>
                      </button>
                    </div>
                  ))}
                </Skeleton>
              </div>
              <div className="col-6"></div>
            </div>
          </section>

          <section
            data-aos={AOS_DATA.zoomInUp}
            className="d-flex flex-column justify-content-center align-items-center primary-linear-bg py-3 mb-3">
            <SectionHeader
              dividerWidth="200px"
              dividerColor="white"
              title={
                <div style={{ fontFamily: 'Montserrat' }}>
                  <h5 className="mb-3 mt-4" style={{ textAlign: 'center', color: 'white', fontSize: '36px', letterSpacing: '.3rem' }}>
                    VỀ CÁC GÓI SẢN PHẨM
                  </h5>
                </div>
              }
            />
            <p style={{ color: 'white', width: '60%', textAlign: 'center' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          {packageList.map((pack, i) => (
            <section key={i} className="my-5" ref={refs.current[i]} data-aos={i % 2 !== 0 ? AOS_DATA.fadeLeft : AOS_DATA.fadeRight}>
              <ProductSection //
                isLeft={i % 2 !== 0}
                title={pack.name}
                price={pack.price}
                descriptions={pack.description.split(';\n')}
                imgUrl={firstImage(pack.image)}
              />
            </section>
          ))}

          <section data-aos={AOS_DATA.fadeRight} className="my-5">
            <div className="row">
              <div className="col-lg-6">
                {adList.map((ad, i) => (
                  <IconLi key={i}>
                    <h2>
                      <b>{ad.title}</b>
                    </h2>
                    <p>{ad.content}</p>
                  </IconLi>
                ))}
              </div>
            </div>
          </section>

          <section className="d-flex flex-column justify-content-center align-items-center my-5">
            <SectionHeader
              data-aos={AOS_DATA.zoomIn}
              dividerWidth="270px"
              title={
                <div style={{ fontFamily: 'Montserrat' }}>
                  <h5 className="mb-3 mt-4" style={{ textAlign: 'center', fontSize: '30px', letterSpacing: '.3rem' }}>
                    <b>HỆ THỐNG PHÂN PHỐI SẢN PHẨM</b>
                  </h5>
                </div>
              }
            />
            <div className="row d-flex justify-content-center">
              <UISecondaryButton data-aos={AOS_DATA.zoomIn} className="col-lg-2 col-md-2" size="large" title="Miền Bắc"></UISecondaryButton>
              <UISecondaryButton
                data-aos={AOS_DATA.zoomIn}
                className="col-lg-2 col-md-2"
                size="large"
                title="Miền Trung"></UISecondaryButton>
              <UISecondaryButton data-aos={AOS_DATA.zoomIn} className="col-lg-2 col-md-2" size="large" title="Miền Nam"></UISecondaryButton>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default connect(null, {
  getPackages: packageActions.getPackages
})(Cards);
