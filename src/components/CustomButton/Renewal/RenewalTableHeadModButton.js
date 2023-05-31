import React from "react";
import PropTypes from "prop-types";

const RenewalTableHeadModButton = (props) => {
  const { clickEvent } = props;

  const handleClick = () => {
    clickEvent();
  };
  return (
    <button
      className="sButton"
      onClick={handleClick}
      style={{
        background: "rgb(67 79 106)",
        height:'30px'
      }}
    >
      수정
    </button>
  );
};
RenewalTableHeadModButton.propTypes = {
  clickEvent: PropTypes.func.isRequired,
};
export default RenewalTableHeadModButton;
