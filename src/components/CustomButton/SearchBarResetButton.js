import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const SearchBarResetButton = (props) => {
    const {clickEvent} = props;

    const handleClick = () =>{
        clickEvent()
    }

    return (
        <Button
        className="cus-bt-mr15"
        variant="contained"
        sx={{
          marginLeft: "10px",
          marginRight: "10px",
          height: "33px",
          minWidth: "80px",
          backgroundColor: "gray",
          "&:hover": {
            backgroundColor: "gray",
            outline: "none",
          },
        }}
        onClick={handleClick}
      >
        초기화
      </Button>
    )

}
SearchBarResetButton.propTypes = {
    clickEvent: PropTypes.func.isRequired,
  };
export default SearchBarResetButton;