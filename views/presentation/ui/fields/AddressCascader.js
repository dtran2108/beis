import React, { useEffect, useState, useCallback } from 'react';
import { Input, Cascader, Form } from 'antd';
import { commonValidate } from '~/views/utils/helpers/ant-validation';
import { connect } from 'react-redux';
import { appDataAction } from '~/redux/appData';
import styled from 'styled-components';
import { findIndex } from 'lodash';

const CascaderStyled = styled(Cascader)`
  @media (min-width: 768px) {
    width: 70% !important;
  }
  @media (max-width: 426px) {
    width: 100% !important;
  }
  .ant-cascader-input.ant-input {
    background-color: #f0f5ff !important;
  }
`;

const InputStyled = styled(Input)`
  @media (min-width: 768px) {
    width: 29% !important;
    margin-left: 1% !important;
  }
  @media (max-width: 426px) {
    width: 100% !important;
    margin-top: 16px !important;
  }
`;

function AddressCascader(props) {
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProvinces = useCallback(
    (params) => {
      if (!props.needLoadDefault) {
        setLoading(true);
        props
          .getProvinces(params)
          .then((res) => {
            setArea(
              res?.data.map((p) => {
                setLoading(false);
                return { value: p.id, label: p.name, type: 'province', isLeaf: false };
              })
            );
          })
          .catch((err) => {
            setLoading(false);
            console.error('trandev ~ file: index.js ~ line 17 ~ useEffect ~ err', err);
          });
      }
    },
    [props]
  );

  useEffect(() => {
    getAllProvinces();
  }, [getAllProvinces]);

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    switch (targetOption.type) {
      case 'province':
        props
          .getDistricts(targetOption.value)
          .then((res) => {
            targetOption.loading = false;
            targetOption.children = res?.data.map((d) => {
              return { value: d.id, label: d.name, type: 'district', isLeaf: false };
            });
            setArea([...area]);
          })
          .catch((err) => {
            console.error('trandev ~ file: AddressCascader.js ~ line 54 ~ loadData ~ err', err);
          });
        break;
      case 'district':
        props
          .getWards(targetOption.value)
          .then((res) => {
            targetOption.loading = false;
            targetOption.children = res?.data.map((w) => {
              return { value: w.id, label: w.name, type: 'ward' };
            });
            setArea([...area]);
          })
          .catch((err) => {
            console.error('trandev ~ file: AddressCascader.js ~ line 54 ~ loadData ~ err', err);
          });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let _area = [];
    if (props.valueAddress?.length === 3 && props.needLoadDefault) {
      setLoading(true);
      props
        .getProvinces()
        .then((provinces) => {
          _area = Array.from(
            provinces?.data.map((p) => {
              return { value: p.id, label: p.name, type: 'province', isLeaf: false };
            })
          );
          if (Number(props.valueAddress[0]) > 0)
            props.getDistricts(props.valueAddress[0]).then((districts) => {
              const indexDistrict = findIndex(_area, (p) => p.value === props.valueAddress[0]);
              if (indexDistrict > -1) {
                _area[indexDistrict] = {
                  ..._area[indexDistrict],
                  loading: false,
                  children: districts?.data.map((d) => {
                    return { value: d.id, label: d.name, type: 'district', isLeaf: false };
                  })
                };
                props.getWards(props.valueAddress[1]).then((wards) => {
                  const indexWards = findIndex(_area[indexDistrict]?.children, (d) => d.value === props.valueAddress[1]);
                  if (indexWards > -1) {
                    _area[indexDistrict].children[indexWards] = {
                      ..._area[indexDistrict]?.children[indexWards],
                      loading: false,
                      children: wards?.data.map((w) => {
                        return { value: w.id, label: w.name, type: 'ward' };
                      })
                    };
                    setArea(_area);
                    setLoading(false);
                  } else {
                    setArea(_area);
                    setLoading(false);
                  }
                });
              } else {
                setArea(_area);
                setLoading(false);
              }
            });
          else {
            setArea(_area);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error('trandev ~ file: index.js ~ line 17 ~ useEffect ~ err', err);
        });
    }
  }, [props.valueAddress?.length]);

  return (
    <div className={props.noLabel ? 'col-12' : 'col-12 col-lg-12 col-xl-6'}>
      {props.copyBtn && props.copyBtn}
      <Form.Item label={props?.label} validateStatus={props.validateStatus || loading ? 'validating' : undefined} hasFeedback>
        <div className="d-flex flex-wrap">
          <Form.Item name={'address'} noStyle rules={commonValidate()}>
            <CascaderStyled loadData={loadData} options={area} placeholder={props.selectPlaceholder} />
          </Form.Item>
          <Form.Item name={'address1'} noStyle>
            <InputStyled placeholder={props.inputPlaceholder} />
          </Form.Item>
        </div>
      </Form.Item>
    </div>
  );
}
export default connect(null, {
  getProvinces: appDataAction.getProvinces,
  getDistricts: appDataAction.getDistricts,
  getWards: appDataAction.getWards
})(AddressCascader);
