import React from "react";
import { FaPen } from "react-icons/fa";
import PropTypes from "prop-types";

const TableHeadModButton = (props) => {
  const { clickEvent } = props;

  const handleClick = () => [clickEvent()];
  return (
    <button onClick={handleClick} style={{all:"unset", cursor:"pointer"}}>
      <FaPen
        style={{ marginLeft: "20px", width: "20px", height: "20px" }}
      />
    </button>
  );
};

TableHeadModButton.propTypes = {
  clickEvent: PropTypes.func.isRequired,
};
export default TableHeadModButton;
