import React from "react";
import { FormGroup, Input } from "reactstrap";
import './commonfilter.css'

const CommonFilterButtonForModule = ({
  hideFirstOption,
  data,
  selectedItem,
  handleInputChange,
  style,
  firstOption,
  inputChangeOption,
  clName, 
}) => {
  return (
    <Input
      className={`rounded-3  ${clName}`}
      type="select"
      name="role"
      id="role"
      style={style}
      value={selectedItem}
      onChange={(e) => handleInputChange(e, inputChangeOption)}
    >
      {hideFirstOption ? null : <option value="">{firstOption}</option>}
      {data &&
        data?.map((item, index) => (
          <option style={{width:'80%'}} className="ellipsis-textt" key={index} value={item}>
            {item.split('-')[0]}
          </option>
        ))}
    </Input>
  );
};

export default CommonFilterButtonForModule;
