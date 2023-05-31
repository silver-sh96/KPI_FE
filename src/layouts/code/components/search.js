import React, { useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { width } from "@mui/system";

function Search() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [use, setUse] = useState("");

  const onChangeSearch = () => {};

  const onClickSearch = () => {};

  const reLoad4 = () => {};

  const [age, setAge] = React.useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  return (
    <div>
      <Box
        sx={{ minWidth: 120 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <MDInput className="search_input" label="그룹 코드" />
          <MDInput className="search_input" label="그룹 코드 명" />
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              style={{ background: "white", padding: "0px 11px" }}
            >
              사용여부
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              style={{ height: "43px", width: "15vw" }}
            >
              <MenuItem value={"0"}>전체</MenuItem>
              <MenuItem value={"Y"}>사용</MenuItem>
              <MenuItem value={"N"}>미사용</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <MDButton
            className="search_bt"
            variant="contained"
            color="primary"
            onClick={onClickSearch}
          >
            검색
          </MDButton>

          <MDButton className="search_bt" variant="contained" color="info" onClick={reLoad4}>
            초기화
          </MDButton>
        </div>
      </Box>
    </div>
  );
}

export default Search;
