import React from 'react';
import { Tree } from 'antd';

const TreeMenu = (props) => {
  const { treeData, defaultCheckedKeys, onChange, ...rest } = props;

  const onSelect = () => {};

  return <Tree checkable defaultCheckedKeys={defaultCheckedKeys} onSelect={onSelect} onCheck={onChange} treeData={treeData} {...rest} />;
};

export default TreeMenu;
