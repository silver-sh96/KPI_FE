import React, { useEffect, useState } from "react";

import MDBox from "components/MDBox";

import "bootstrap/dist/css/bootstrap.css";
import { Button, Input } from "reactstrap";

function Search() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [use, setUse] = useState("");

  const onChangeSearch = () => {};

  const onClickSearch = () => {};

  const reLoad = () => {};

  return (
    <MDBox pt={3}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <form style={{ width: "100%" }}>
          <table
            style={{
              borderSpacing: "20px 10px",
              borderCollapse: "separate",
              margin: "0",
              width: "100%",
              fontSize: "15px",
            }}
          >
            <tbody style={{ width: "100%" }}>
              <tr>
                <td>그룹코드</td>
                <td>
                  <Input
                    id="code"
                    name="code"
                    type={"text"}
                    placeholder="그룹코드를 입력하세요.."
                    onChange={onChangeSearch}
                    value={code}
                  />
                </td>
                <td>그룹코드 명</td>
                <td>
                  <Input
                    id="name"
                    name="name"
                    type={"text"}
                    placeholder="그룹코드 명을 입력하세요.."
                    onChange={onChangeSearch}
                    value={name}
                  />
                </td>
                <td>사용여부</td>
                <td>
                  <Input type="select" id="use" name="use" onChange={onChangeSearch} value={use}>
                    <option value={""}>전체보기</option>
                    <option value={"Y"}>사용</option>
                    <option value={"N"}>미사용</option>
                  </Input>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onChange={onClickSearch}
                      variant="contained"
                      style={{
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
                      onChange={reLoad}
                      variant="contained"
                      style={{
                        minWidth: "80px",
                        backgroundColor: "gray",
                        marginLeft: "10px",
                        "&:hover": {
                          backgroundColor: "gray",
                          outline: "none",
                        },
                      }}
                    >
                      초기화
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </MDBox>
  );
}

export default Search;
