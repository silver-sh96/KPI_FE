import React, { useState, useEffect } from "react";

import { Input } from "reactstrap";

import { Button } from "@mui/material";

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
    <div
      id="search"
      style={{
        //background: "#ebebeb",
        //margin: "12px 20px -9px 20px",
        margin: "0px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: "5px",
      }}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <table
          style={{
            borderSpacing: "20px 10px",
            borderCollapse: "separate",
            margin: "0",
            width: "85%",
          }}
        >
          <tbody>
            <tr>
              <td>그룹 코드</td>
              <td>
                <Input
                  id="searchCode"
                  name="regiUcode"
                  type={"text"}
                  value={code}
                  onChange={onChangeSearch}
                ></Input>
              </td>

              <td>그룹 코드 명</td>
              <td>
                <Input
                  id="searchName"
                  name="regiUcode"
                  type={"text"}
                  value={name}
                  onChange={onChangeSearch}
                ></Input>
              </td>
              <td>사용 여부</td>
              <td>
                <Input
                  id="searchUse"
                  name="regiUcode"
                  type={"select"}
                  value={use}
                  onChange={onChangeSearch}
                >
                  <option defaultValue value={" "}>
                    == 전체 ==
                  </option>
                  <option value={"Y"}>사용</option>
                  <option value={"N"}>미사용</option>
                </Input>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <span></span>
            </tr>
            <tr>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onClickSearch}
                  style={{ color: "white" }}
                  sx={{
                    color: "white",
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
                <Button
                  style={{ color: "white" }}
                  variant="contained"
                  sx={{
                    color: "white",
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
                  onClick={reLoad4}
                >
                  초기화
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Search;
