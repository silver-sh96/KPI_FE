import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const TableHeadDelButton = (props) => {
  const { clickEvent } = props;

  const handleClick = () => [clickEvent()];
  return (
    <button onClick={handleClick} style={{all:"unset", cursor:"pointer"}}>
      <FaRegTrashAlt
        style={{ marginLeft: "20px", width: "20px", height: "20px" , marginRight:"20px"}}
      />
    </button>
  );
};

TableHeadDelButton.propTypes = {
  clickEvent: PropTypes.func.isRequired,
};
export default TableHeadDelButton;
