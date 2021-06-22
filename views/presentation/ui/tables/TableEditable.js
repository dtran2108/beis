import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, InputNumber, DatePicker, Form, Select } from 'antd';
import { SuggestionField } from '~/views/presentation/ui/fields';
import strings from '~/localization';
import _ from 'lodash';
import moment from 'moment';
import { isNullOrEmpty, getArray, getString } from '~/utils/helpers/utilObject';
import UtilDate from '~/views/utils/helpers/UtilDate';
import ModelImages from './ModelImages';
import { currencyFormat, numberFormatWithPoint } from '~/views/utils/helpers/currency';
import { Link } from 'next/link';

const EditableContext = React.createContext();

const { Option } = Select;

const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  placeholder,
  suffix,
  type,
  options,
  optionIndex,
  rules,
  tableEditable = true,
  isAddMoreRow,
  renderOpts,
  nameData,
  handleFetch,
  filterOption,
  disabled,
  isSearch,
  disabledDate,
  optionFilterProp,
  min,
  max,
  formatter,
  parser,
  ...restProps
}) => {
  let dataOptions = optionIndex ? record[optionIndex] || [] : options;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      // type: number, date, year, select, selectMulti, images, selectSuggestion, link
      // type do not focus: images, link
      if (type === 'images' || type === 'link') return;
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (!tableEditable && type !== 'images') return;
    setEditing(!editing);
    if (type === 'text' || type === 'select' || type === 'currency' || type === 'selectSuggestion') {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
      });
    } else if (type === 'date' || type === 'year') {
      let date = undefined;
      if (!editing) {
        date = moment.utc(record[dataIndex], UtilDate.formatDateTimeServer);
        form.setFieldsValue({
          [dataIndex]: date.isValid() ? date : undefined
        });
      }
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      if (type === 'number' || type === 'currency' || type === 'numberReadOnly' || type === 'numberInput') {
        let intValue = +values[dataIndex];
        if (!_.isNaN(intValue) && record[dataIndex] !== intValue) {
          handleSave({ ...record, [dataIndex]: intValue }, dataIndex);
        }
      } else if (type === 'text' || type === 'select' || type === 'selectSuggestion' || type === 'selectMulti') {
        if (record[dataIndex] !== values[dataIndex]) {
          handleSave({ ...record, ...values }, dataIndex);
        }
      } else if (type === 'date' || type === 'year') {
        let date = values[dataIndex];
        handleSave(
          {
            ...record,
            ...{
              [dataIndex]: date && date.isValid() ? date.format(UtilDate.formatDateTimeServer) : undefined
            }
          },
          dataIndex
        );
      }
    } catch (errInfo) {
      toggleEdit();
      if (type === 'text' || type === 'select' || type === 'selectSuggestion' || type === 'selectMulti') {
        handleSave({ ...record }, dataIndex);
      } else if (type === 'date' || type === 'year') {
        handleSave({ ...record }, dataIndex);
      }
    }
  };

  const saveImages = (updateImages) => {
    try {
      toggleEdit();
      handleSave({ ...record, ...{ [dataIndex]: updateImages } }, dataIndex);
    } catch (error) {
      handleSave({ ...record }, dataIndex);
    }
  };

  let childNode = children;
  const renderEditChildren = () => {
    if (type === 'text') {
      return <Input ref={inputRef} maxLength={255} placeholder={placeholder} onPressEnter={save} onBlur={save} />;
    } else if (type === 'number' || type === 'currency' || type === 'numberReadOnly') {
      return (
        <Input
          type="number"
          min={min || 0}
          max={max}
          onInput={(e) => (e.target.value = e.target.value.slice(0, 12))}
          ref={inputRef}
          placeholder={placeholder}
          suffix={suffix}
          onPressEnter={save}
          onBlur={save}
        />
      );
    } else if (type === 'numberInput') {
      return (
        <InputNumber
          min={min || 0}
          max={max}
          onInput={(e) => (e.target.value = e.target.value.slice(0, 12))}
          ref={inputRef}
          placeholder={placeholder}
          suffix={suffix}
          formatter={formatter}
          parser={parser}
          onPressEnter={save}
          onBlur={save}
        />
      );
    } else if (type === 'date') {
      return (
        <DatePicker
          defaultOpen
          showAction="focus"
          allowClear
          picker="date"
          ref={inputRef}
          onChange={save}
          onBlur={save}
          placeholder={placeholder}
          format={UtilDate.formatDateLocal}
          disabledDate={disabledDate}
        />
      );
    } else if (type === 'year') {
      return (
        <DatePicker
          defaultOpen
          showAction="focus"
          allowClear
          picker="year"
          ref={inputRef}
          onChange={save}
          onBlur={save}
          placeholder={placeholder}
          format={'YYYY'}
        />
      );
    } else if (type === 'select') {
      return (
        <Select
          size="middle"
          placeholder={placeholder}
          showAction="focus"
          ref={inputRef}
          openOnFocus
          defaultValue={record[dataIndex]}
          onChange={save}
          onBlur={save}
          style={{ width: '100%' }}>
          {getArray(dataOptions, undefined, []).map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      );
    } else if (type === 'selectMulti') {
      return (
        <Select
          mode="multiple"
          size="middle"
          placeholder={placeholder}
          showAction="focus"
          ref={inputRef}
          openOnFocus
          filterOption={filterOption}
          optionFilterProp={optionFilterProp}
          defaultValue={record[dataIndex]}
          // onChange={save}
          onBlur={save}
          style={{ width: '100%' }}>
          {getArray(dataOptions, undefined, []).map((item) => (
            <Option key={item.value} value={item.value} label={item.label}>
              {item.label}
            </Option>
          ))}
        </Select>
      );
    } else if (type === 'images') {
      return (
        <>
          <ModelImages title={title} editable={tableEditable} images={record[dataIndex]} onChange={saveImages} />
          <i className="fa fa-spinner" style={{ fontSize: '20px' }} />
        </>
      );
    } else if (type === 'selectSuggestion') {
      return (
        <SuggestionField
          size="middle"
          forwardRef={inputRef}
          placeholder={placeholder}
          showAction="focus"
          defaultValue={record[dataIndex] || ''}
          onChange={save}
          onBlur={save}
          openOnFocus
          isSearch={isSearch}
          data={dataOptions}
          handleFetch={handleFetch}
          renderOpts={renderOpts}
          nameData={nameData}
          filterOption={filterOption}
          optionFilterProp={optionFilterProp}
          style={{ width: '100%', height: 'auto', outline: 'none', border: 'none' }}
          suffix={suffix}
          disabled={disabled}
        />
      );
    } else if (type === 'link') {
      return <Link> Hoạt động </Link>;
    }
  };

  const renderChildren = () => {
    if (type === 'images') {
      if (getString(record[dataIndex], undefined, '').length > 0) {
        return <i className="fa fa-edit" style={{ fontSize: '20px' }} />;
      } else {
        return <span className="placeholder">{placeholder}</span>;
      }
    } else if (type === 'number') {
      return typeof record[dataIndex] !== 'number' ? (
        <span className="placeholder">{placeholder}</span>
      ) : (
        <span>
          {numberFormatWithPoint(record[dataIndex])} {suffix}
        </span>
      );
    } else if (type === 'numberInput') {
      return typeof record[dataIndex] !== 'number' ? (
        <span className="placeholder">{placeholder}</span>
      ) : (
        <span>
          {numberFormatWithPoint(record[dataIndex])} {suffix}
        </span>
      );
    } else if (type === 'currency') {
      return typeof record[dataIndex] !== 'number' ? (
        <span className="placeholder">{placeholder}</span>
      ) : (
        <span>{currencyFormat(record[dataIndex])}</span>
      );
    } else if (type === 'numberReadOnly') {
      return typeof record[dataIndex] !== 'number' ? (
        <span className="placeholder">{placeholder}</span>
      ) : (
        <span>{currencyFormat(record[dataIndex])}</span>
      );
    } else if (isNullOrEmpty(children[1])) {
      return <span className="placeholder">{placeholder}</span>;
    } else {
      if (type === 'text') {
        return children;
      } else if (type === 'select' || type === 'selectSuggestion') {
        let selectedObject = getArray(dataOptions, undefined, []).find((item) => item.value + '' === record[dataIndex] + '');
        return selectedObject ? [null, getString(selectedObject, 'label')] : [null, record[dataIndex]];
      } else if (type === 'selectMulti') {
        if (getArray(record[dataIndex], undefined, []).length <= 1) {
          let selectedObject = getArray(dataOptions, undefined, []).find((item) => {
            return item.value + '' === record[dataIndex] + '';
          });
          return selectedObject ? [null, getString(selectedObject, 'label')] : [null, record[dataIndex]];
        } else {
          let selectedObject = _.intersection(
            getArray(dataOptions, undefined, []).map((item) => item.value),
            record[dataIndex]
          );
          // Sau khi so sánh thì compare với giá trị để hiện thị và join lại thành chuỗi
          let resultMap = selectedObject.map((item) => {
            return {
              label: getArray(dataOptions, undefined, []).find((i) => {
                return i.value + '' === item + '';
              }).label,
              value: item
            };
          });
          let result = resultMap.map((item) => item.label);
          return result ? [null, result.join(`; `)] : [null, record[dataIndex]];
        }
      } else if (type === 'date') {
        let date = moment.utc(record[dataIndex], UtilDate.formatDateTimeServer);
        return date && date.isValid() ? [null, date.format(UtilDate.formatDateLocal)] : [null];
      } else if (type === 'year') {
        let date = moment.utc(record[dataIndex], UtilDate.formatDateTimeServer);
        return date && date.isValid() ? [null, date.format('YYYY')] : [null];
      }
    }
    return null;
  };

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={type !== 'images' ? rules : []}>
        {renderEditChildren()}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        role="presentation"
        onClick={toggleEdit}>
        {renderChildren()}
      </div>
    );
  }
  if (tableEditable && isAddMoreRow) {
    return null;
  }
  return <td {...restProps}>{childNode}</td>;
};

const generateAutoKey = (dataSource) => {
  return getArray(dataSource, undefined, []).map((item, index) => ({
    ...item,
    key: index
  }));
};

class TableEditable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: generateAutoKey(this.props.dataSource)
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.dataSource !== nextProps.dataSource) {
      this.setState({ dataSource: generateAutoKey(nextProps.dataSource) });
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key)
    });
  };

  handleAdd = () => {
    const { count } = this.state;

    const newData = this.props.handleAddRow ? this.props.handleAddRow() : {};
    this.state.dataSource.push(newData);

    this.setState({
      dataSource: generateAutoKey(this.state.dataSource),
      count: count + 1
    });
  };

  handleSave = (row, dataIndex) => {
    const newData = [...this.state.dataSource];
    const index = row.key;
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({ dataSource: newData }, () => {
      const { changedData } = this.props;
      /**
       * index : Số thứ tự của dòng có data thay đổi
       * dataIndex: Tên field dữ liệu thay đổi
       */
      changedData && changedData(index, dataIndex, this.state.dataSource);
    });
  };

  render() {
    const { dataSource } = this.state;
    const { selectable = false, onSelect, selectedKey, editable = true, onlyOneRow, scroll } = this.props;

    const checkFilledRow = (val) => {
      var filled = true;
      for (var i = 0; i < (this.props.columns || []).length; i++) {
        if ((this.props.columns[i].required === true) & isNullOrEmpty(val[this.props.columns[i].dataIndex])) {
          filled = false;
        }
      }
      return filled;
    };

    /**
     * kiểm tra những field required đã được đổ data chưa
     */
    let notFilledRow = (dataSource || []).filter((item) => {
      return !checkFilledRow(item);
    });

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };

    const renderContainer = (value, rowIndex) => {
      return (
        <>
          <span>{value}</span>
          <p
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            role="presentation"
            onClick={() => {
              onSelect && onSelect(dataSource[rowIndex]);
            }}></p>
        </>
      );
    };

    const renderZeroColSpan = () => {
      return {
        props: {
          colSpan: 0
        }
      };
    };
    const mapColumns = (col, colIndex) => {
      if (!col.editable) {
        return {
          ...col,
          render: (record, rowData, index) => {
            if ((this.state.dataSource || []).length === index) return renderZeroColSpan();
            if (col.type === 'numberReadOnly' || col.type === ' numberInput') {
              return renderContainer(currencyFormat(record), rowData.key);
            } else if (col.type === 'date') {
              let date = moment.utc(record, UtilDate.formatDateTimeServer);
              return renderContainer(date.isValid() ? date.format(UtilDate.formatDateLocal) : '', rowData.key);
            } else if (col.type === 'year') {
              let date = moment.utc(record, UtilDate.formatDateTimeServer);
              return renderContainer(date.isValid() ? date.format('YYYY') : '', rowData.key);
            } else if (col.type === 'select' || col.type === 'selectSuggestion') {
              let selectOption = [];
              if (_.isArray(record)) {
                record.map((val) => {
                  const itemFind = _.find(col.options, (item) => {
                    return item.value === val;
                  });
                  selectOption.push(getString(itemFind, 'label', ''));
                });

                return renderContainer(selectOption.join(', '), rowData.key);
              } else {
                selectOption = _.find(col.options, (item) => {
                  return item.value === record;
                });
                return renderContainer(getString(selectOption, 'label', ''), rowData.key);
              }
            } else if (col.type === 'selectMulti') {
              let selectOption = [];
              if (_.isArray(record)) {
                record.map((val) => {
                  const itemFind = _.find(col.options, (item) => {
                    return item.value === val;
                  });
                  selectOption.push(getString(itemFind, 'label', ''));
                });
                return renderContainer(selectOption.join(', '), rowData.key);
              } else {
                selectOption = _.find(col.options, (item) => {
                  return item.value === record;
                });
                return renderContainer(getString(selectOption, 'label', ''), rowData.key);
              }
            }
            return renderContainer(record, rowData.key);
          }
        };
      }

      let newCol = {
        ...col,
        onCell: (record, rowIndex) => ({
          record,
          editable: col.editable,
          isAddMoreRow: rowIndex === (this.state.dataSource || []).length,
          colIndex: colIndex,
          tableEditable: editable,
          dataIndex: col.dataIndex,
          title: col.title,
          placeholder: col.placeholder,
          type: col.type,
          options: col.options,
          rules: col.rules,
          optionIndex: col.optionIndex,
          handleSave: this.handleSave,
          handleFetch: col.handleFetch,
          nameData: col.nameData,
          renderOpts: col.renderOpts,
          filterOption: col.filterOption,
          suffix: col.suffix,
          disabled: col.disabled,
          disabledDate: col.disabledDate,
          isSearch: col.isSearch,
          optionFilterProp: col.optionFilterProp,
          min: col.min,
          max: col.max,
          formatter: col.formatter,
          parser: col.parser
        })
      };
      if (col.children) {
        newCol.children = col.children.map(mapColumns);
      }
      return newCol;
    };
    let columns = this.props.columns.map(mapColumns);

    const removeRow = (record) => {
      const { changedData } = this.props;

      this.setState(
        {
          dataSource: (this.state.dataSource || []).filter((item) => item.key !== record.key)
        },
        () => {
          changedData && changedData(record.key, 'key', this.state.dataSource);
        }
      );
    };

    if (editable) {
      let lengthOfDataSource = (this.state.dataSource || []).length;
      let lengthOfColumns = columns.length;
      columns.unshift({
        title: undefined,
        width: '40px',
        className: 'px-1',
        render: (data, records, index) => {
          if (lengthOfDataSource === index) {
            return {
              children: (
                <button
                  onClick={this.handleAdd}
                  className="btn py-0 d-flex align-items-center"
                  style={{ paddingLeft: 8, color: 'rgba(0,0,0,0.65)' }}
                  disabled={(notFilledRow || []).length !== 0 || (lengthOfDataSource === 1 && onlyOneRow)}>
                  <i className="fa fa-plus-circle" />
                  <span className="ml-3">{strings.add_row}</span>
                </button>
              ),
              // children: <span>{lengthOfColumns}</span>,
              props: {
                colSpan: lengthOfColumns + 1
              }
            };
          }
          return (
            <button
              className="btn"
              style={{
                height: '30px',
                width: '30px',
                display: 'flex',
                justifyContent: 'center',
                color: 'rgba(0, 0, 0, 0.65)'
              }}
              onClick={() => removeRow(records)}>
              <i className="fa fa-trash-o" style={{ fontSize: '15px' }}></i>
            </button>
          );
        }
      });
    }

    return (
      <div className="w-100">
        <div className="overflow-auto">
          <Table
            components={components}
            scroll={scroll}
            rowClassName={(r) =>
              ` editable-row ${selectedKey && selectedKey === r.key ? 'selected-row' : ''} ${selectable ? 'selectable-row' : ''}`
            }
            dataSource={!editable || onSelect ? dataSource : [...dataSource, {}]}
            columns={columns}
            pagination={false}
            footer={this.props.footer || undefined}
          />
        </div>
      </div>
    );
  }
}

export default TableEditable;
