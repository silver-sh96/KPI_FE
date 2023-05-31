import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const SearchBarSearchButton = (props) =>{

    const {clickEvent} = props;

    const handleClick = () =>{
        clickEvent()
    }

    return (
        <Button
        className="cus-bt-mr15"
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          marginLeft: "10px",
          marginRight: "10px",
          height: "33px",
          minWidth: "60px",
          backgroundColor: "black",
          "&:hover": {
            backgroundColor: "black",
            outline: "none",
          },
        }}
      >
        검색
      </Button>
    )
}
SearchBarSearchButton.propTypes = {
    clickEvent: PropTypes.func.isRequired,
  };
export default SearchBarSearchButton;