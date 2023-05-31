import React from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import PropTypes from "prop-types";

const TableHeadAddButton = (props) =>{
    const {clickEvent} = props;

    const handleClick = () =>[
        clickEvent()
    ]
    return(
        <button onClick={handleClick} style={{all:"unset", cursor:"pointer"}}>
        <FaRegPlusSquare  style={{ width:"25px", height:"25px" }}/>
      </button>
    )
}

TableHeadAddButton.propTypes = {
    clickEvent: PropTypes.func.isRequired,
  };
export default TableHeadAddButton;