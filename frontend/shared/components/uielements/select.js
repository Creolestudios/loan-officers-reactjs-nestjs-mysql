import React from 'react';
import { Select } from 'antd';
import { AntSelect } from './styles/select.style';
import WithDirection from '@iso/lib/helpers/rtl';
import SelectDropdownIcon from '@iso/assets/images/icon/select-dropdown.svg';

const SelectCustom = ({ children, ...props }) => (
  <Select suffixIcon={<img src={SelectDropdownIcon} />} {...props}>
    {children}
  </Select>
);

const WDSelect = AntSelect(SelectCustom);
const isoSelect = WithDirection(WDSelect);
const SelectOption = Select.Option;

export default isoSelect;
export { SelectOption };
