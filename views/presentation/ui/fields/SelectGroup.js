import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { ReStyle, RemovePieButton, AddPieButton } from './styles';
import { Row, Col } from 'antd';

const SelectGroup = (props) => {
  const {
    initValues: values,
    dataSource,
    fieldName,
    label
    // intl: { formatMessage: fMsg }
  } = props;
  return (
    <FieldArray
      name={fieldName}
      render={({ remove, push }) => (
        <div>
          <div
            style={{
              display: 'inline-block',
              marginBottom: '20px',
              cursor: 'pointer'
            }}>
            {label}:
          </div>
          <Row type="flex">
            {!!values[fieldName] &&
              values[fieldName].length > 0 &&
              values[fieldName].map((name, index) => (
                <div style={{ maxWidth: 500 }} key={index} className="col-3 border-bottom mb-3">
                  <Col xs={20}>
                    <ReStyle>
                      <Field component="select" name={`${fieldName}.${index}`}>
                        {!!dataSource &&
                          dataSource.map((item, id) => (
                            <option key={id} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                      </Field>
                    </ReStyle>
                    <ErrorMessage name={`${fieldName + index}`} component="div" className="field-error" />
                  </Col>
                  <Col xs={4} style={{ position: 'relative', textAlign: 'center' }}>
                    <RemovePieButton type="button" className="mdi mdi-close-circle" onClick={() => remove(index - 1)}></RemovePieButton>
                  </Col>
                </div>
              ))}
          </Row>
          <div>
            <AddPieButton
              type="button"
              className="secondary"
              style={{
                width: '27px',
                height: '27px',
                background: 'skyblue',
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={() => push(dataSource[0].value)}>
              +
            </AddPieButton>
            <span style={{ textAlign: 'right' }}>{label}</span>
          </div>
        </div>
      )}
    />
  );
};

export default SelectGroup;
