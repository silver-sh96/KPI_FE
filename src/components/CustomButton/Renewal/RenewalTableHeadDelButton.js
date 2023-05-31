import React from "react";
import PropTypes from "prop-types";

const RenewalTableHeadDelButton = (props) => {
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
        marginRight: "5px",
        height:'30px'
      }}
    >
      삭제
    </button>
  );
};
RenewalTableHeadDelButton.propTypes = {
  clickEvent: PropTypes.func.isRequired,
};
export default RenewalTableHeadDelButton;
