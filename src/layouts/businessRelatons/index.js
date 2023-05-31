import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Footer from "examples/Footer";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Switch, Space } from "antd";
import {
  FaRegPlusSquare,
  FaRegSun,
  FaRegTrashAlt,
  FaRedoAlt,
  FaCheck,
  FaEdit,
  FaPen,
  FaPlusSquare,
} from "react-icons/fa";

import {
  FormFeedback,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
} from "reactstrap";
import TextArea from "antd/es/input/TextArea";

import TableHeadAddButton from "components/CustomButton/TableHeadAddButton";
import TableHeadModButton from "components/CustomButton/TableHeadModButton";
import TableHeadDelButton from "components/CustomButton/TableHeadDelButton";
import MDTypography from "components/MDTypography";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import "../../components/Custom.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { CheckBox, Label } from "@mui/icons-material";
import { width } from "@mui/system";

function Business() {
  const [size, setSize] = useState(15);
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, (state) => state.pagination.page);
    const pageSize = useGridSelector(apiRef, (state) => state.pagination.pageSize);
    const pageCount = useGridSelector(apiRef, (state) => state.pagination.pageCount);

    const handlePageSizeChange = (event) => {
      const newSize = event.target.value;
      setSize(newSize);
      apiRef.current.setPageSize(newSize);
    };

    const handlePageChange = (event, value) => {
      apiRef.current.setPage(value - 1);
    };

    return (
      <div style={{ display: "flex", justifyContent: "center", width: "90%" }}>
        <div
          style={{
            marginRight: "265px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pagination
            color="none"
            variant="none"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            renderItem={(props) => <PaginationItem {...props} disableRipple />}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  }

  const CompColumn = [
    {
      field: "inoutcome",
      headerName: "유형",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_CODE",
      headerName: "거래처 코드",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_NAME",
      headerName: "법인 명",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_REPRESENTATIVE",
      headerName: "대표자",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_CLASSIFICATION",
      headerName: "사업자 분류",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_BUSINESS",
      headerName: "업태",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_ESTABLISHMENT",
      headerName: "사업장 주소",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_FAX",
      headerName: "팩스",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_TRADE_PERMISSION_STATE",
      headerName: "거래",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "company_STATUS",
      headerName: "상태",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];

  const [CompRrows, setCompRrows] = useState([
    {
      inoutcome: "",
      id: "",
      company_CODE: "",
      ourcompany_YN: "",
      company_NAME: "",
      company_REPRESENTATIVE: "",
      company_LICENSE_NUMBER: "",
      company_CLASSIFICATION: "",
      company_TAX_CLASSIFICATION: "",
      company_REGISTRATION_NUMBER: "",
      company_BUSINESS: "",
      company_ITEMS: "",
      income_YN: "",
      outcome_YN: "",
      company_ESTABLISHMENT: "",
      company_HEAD_OFFICE: "",
      company_POST: "",
      company_FAX: "",
      company_WEB: "",
      company_TRADE_PERMISSION_STATE: "",
      deltet_YN: "",
      company_STATUS: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
    },
  ]);
  const [CompRrows2, setCompRrows2] = useState([
    {
      inoutcome: "",
      id: "",
      company_CODE: "",
      ourcompany_YN: "",
      company_NAME: "",
      company_REPRESENTATIVE: "",
      company_LICENSE_NUMBER: "",
      company_CLASSIFICATION: "",
      company_TAX_CLASSIFICATION: "",
      company_REGISTRATION_NUMBER: "",
      company_BUSINESS: "",
      company_ITEMS: "",
      income_YN: "",
      outcome_YN: "",
      company_ESTABLISHMENT: "",
      company_HEAD_OFFICE: "",
      company_POST: "",
      company_FAX: "",
      company_WEB: "",
      company_TRADE_PERMISSION_STATE: "",
      deltet_YN: "",
      company_STATUS: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
    },
  ]);

  const [searchNAME, setSearchNAME] = useState("");
  const [searchREPRESENTATIVE, setSearchREPRESENTATIVE] = useState("");
  const [searchCLASSIFICATION, setSearchCLASSIFICATION] = useState("");
  const [searchTAX_CLASSIFICATION, setSearchTAX_CLASSIFICATION] = useState("");
  const [searchBUSINESS, setSearchBUSINESS] = useState("");
  const [searchITEMS, setSearchITEMS] = useState("");
  const [searchTRADE_PERMISSION_STATE, setSearchTRADE_PERMISSION_STATE] = useState("");
  const [searchSTATUS, setSearchSTATUS] = useState("");
  const [searchincome_YN, setSearchincome_YN] = useState("1");
  const [searchoutcome_YN, setSearchoutcome_YN] = useState("1");

  const [stateComp, setStateComp] = useState("");
  useEffect(() => {
    const params = new URLSearchParams();

    params.append("COMPANY_NAME", searchNAME);
    params.append("COMPANY_REPRESENTATIVE", searchREPRESENTATIVE);
    params.append("COMPANY_CLASSIFICATION", searchCLASSIFICATION);
    params.append("COMPANY_TAX_CLASSIFICATION", searchTAX_CLASSIFICATION);
    params.append("COMPANY_BUSINESS", searchBUSINESS);
    params.append("COMPANY_ITEMS", searchITEMS);
    params.append("COMPANY_TRADE_PERMISSION_STATE", searchTRADE_PERMISSION_STATE);
    params.append("COMPANY_STATUS", searchSTATUS);
    params.append("INCOME_YN", searchincome_YN);
    params.append("OUTCOME_YN", searchoutcome_YN);

    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null") {
        obj.set(key, "");
      }
    });
    axios.post("http://192.168.0.200:8080/KPI/ComList.do?" + params).then((response) => {
      setCompRrows(response.data);
    });
  }, [stateComp]);

  useEffect(() => {
    var data = CompRrows;
    for (var i = 0; i < data.length; i++) {
      if (data[i].income_YN == 1) {
        data[i].inoutcome = "매입";
      } else {
        data[i].inoutcome = "";
      }
      if (data[i].outcome_YN == 1) {
        if (data[i].inoutcome.length > 1) {
          data[i].inoutcome = data[i].inoutcome + " / 매출";
        } else {
          data[i].inoutcome = "매출";
        }
      }
    }
    setCompRrows(data);
    setCompRrows2(data);
  }, [CompRrows]);

  const history = useNavigate();

  const onCellDoubleClick = (e) => {
    history("/company/companyDetail?id=" + e.id);
  };

  const addCompany = (e) => {
    history("/company/companyDetail?id=");
  };

  const [selectionModel, setSelectionModel] = useState([]);

  const handleonSelectionModelChange = (e) => {
    setSelectionModel(e);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/ComDelList.do", selectionModel)
        .then((response) => {
          setSelectionModel([]);
          setStateComp(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onChangeSearch = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    if (id == "searchNAME") {
      setSearchNAME(val);
    }
    if (id == "searchREPRESENTATIVE") {
      setSearchREPRESENTATIVE(val);
    }
    if (id == "searchCLASSIFICATION") {
      setSearchCLASSIFICATION(val);
    }
    if (id == "searchTAX_CLASSIFICATION") {
      setSearchTAX_CLASSIFICATION(val);
    }
    if (id == "searchBUSINESS") {
      setSearchBUSINESS(val);
    }
    if (id == "searchITEMS") {
      setSearchITEMS(val);
    }
    if (id == "searchTRADE_PERMISSION_STATE") {
      setSearchTRADE_PERMISSION_STATE(val);
    }
    if (id == "searchSTATUS") {
      setSearchSTATUS(val);
    }
    if (id == "searchincome_YN") {
      if (document.getElementById("searchincome_YN").checked == true) {
        setSearchincome_YN("1");
      } else {
        setSearchincome_YN("0");
      }
    }
    if (id == "searchoutcome_YN") {
      if (document.getElementById("searchoutcome_YN").checked == true) {
        setSearchoutcome_YN("1");
      } else {
        setSearchoutcome_YN("0");
      }
    }
  };

  const handlerSearch = (e) => {
    const params = new URLSearchParams();

    params.append("COMPANY_NAME", searchNAME);
    params.append("COMPANY_REPRESENTATIVE", searchREPRESENTATIVE);
    params.append("COMPANY_CLASSIFICATION", searchCLASSIFICATION);
    params.append("COMPANY_TAX_CLASSIFICATION", searchTAX_CLASSIFICATION);
    params.append("COMPANY_BUSINESS", searchBUSINESS);
    params.append("COMPANY_ITEMS", searchITEMS);
    params.append("COMPANY_TRADE_PERMISSION_STATE", searchTRADE_PERMISSION_STATE);
    params.append("COMPANY_STATUS", searchSTATUS);
    if (searchincome_YN == "0") {
      params.append("INCOME_YN", "");
    } else {
      params.append("INCOME_YN", searchincome_YN);
    }

    if (searchoutcome_YN == "0") {
      params.append("OUTCOME_YN", "");
    } else {
      params.append("OUTCOME_YN", searchoutcome_YN);
    }
    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null") {
        obj.set(key, "");
      }
    });
    axios.post("http://192.168.0.200:8080/KPI/ComList.do?" + params).then((response) => {
      setCompRrows(response.data);
    });
  };

  const resetSearch = (e) => {
    console.log("초기화");
    setSearchNAME("");
    setSearchREPRESENTATIVE("");
    setSearchCLASSIFICATION("");
    setSearchTAX_CLASSIFICATION("");
    setSearchBUSINESS("");
    setSearchITEMS("");
    setSearchTRADE_PERMISSION_STATE("");
    setSearchSTATUS("");
    setSearchincome_YN("1");
    setSearchoutcome_YN("1");
    document.getElementById("searchincome_YN").checked = true;
    document.getElementById("searchoutcome_YN").checked = true;

    const params = new URLSearchParams();

    params.append("COMPANY_NAME", searchNAME);
    params.append("COMPANY_REPRESENTATIVE", searchREPRESENTATIVE);
    params.append("COMPANY_CLASSIFICATION", searchCLASSIFICATION);
    params.append("COMPANY_TAX_CLASSIFICATION", searchTAX_CLASSIFICATION);
    params.append("COMPANY_BUSINESS", searchBUSINESS);
    params.append("COMPANY_ITEMS", searchITEMS);
    params.append("COMPANY_TRADE_PERMISSION_STATE", searchTRADE_PERMISSION_STATE);
    params.append("COMPANY_STATUS", searchSTATUS);
    params.append("INCOME_YN", "1");
    params.append("OUTCOME_YN", "1");

    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null") {
        obj.set(key, "");
      }
    });
    axios.post("http://192.168.0.200:8080/KPI/ComList.do?" + params).then((response) => {
      setCompRrows(response.data);
      setCompRrows2(response.data);
    });
  };
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={1} pb={3}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <MDBox sx={{ width: "100%" }}>
                <Card>
                  <div className="sCard">
                    <div className="sAreaSearch">
                      <div style={{ fontWeight: "bold" }}>거래처 검색</div>
                      <div>
                        <button
                          className="sButton"
                          style={{
                            background: "rgb(67 79 106)",
                          }}
                          onClick={handlerSearch}
                        >
                          검색
                        </button>
                        <button
                          className="sButton"
                          style={{
                            background: "#c23535",
                          }}
                          onClick={resetSearch}
                        >
                          초기화
                        </button>
                      </div>
                    </div>
                    <div>
                      <table className="sTable" style={{ marginTop: "20px" }}>
                        <tbody>
                          <tr>
                            <td className="sTh">기업명</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="기업명을 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="searchNAME"
                                    value={searchNAME}
                                    onChange={onChangeSearch}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="sTh">대표자</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="대표자를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="searchREPRESENTATIVE"
                                    value={searchREPRESENTATIVE}
                                    onChange={onChangeSearch}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">사업자 분류</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="searchCLASSIFICATION"
                                    value={searchCLASSIFICATION}
                                    onChange={onChangeSearch}
                                  >
                                    <option defaultValue="" style={{ display: "none" }}>
                                      == 사업자 분류 ==
                                    </option>
                                    <option value="법인사업자">법인사업자</option>
                                    <option value="일반사업자">일반사업자</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td className="sTh">과세 분류</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="searchTAX_CLASSIFICATION"
                                    value={searchTAX_CLASSIFICATION}
                                    onChange={onChangeSearch}
                                  >
                                    <option defaultValue="0" style={{ display: "none" }}>
                                      == 과세 분류 ==
                                    </option>
                                    <option value="일반 과세사업자">일반 과세사업자</option>
                                    <option value="간이 과세사업자">간이 과세사업자</option>
                                    <option value="면세사업자">면세사업자</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">업태</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="업태를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="searchBUSINESS"
                                    value={searchBUSINESS}
                                    onChange={onChangeSearch}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="sTh">종목</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="종목을 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="searchITEMS"
                                    value={searchITEMS}
                                    onChange={onChangeSearch}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">거래 허가</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="searchTRADE_PERMISSION_STATE"
                                    value={searchTRADE_PERMISSION_STATE}
                                    onChange={onChangeSearch}
                                  >
                                    <option defaultValue="0" style={{ display: "none" }}>
                                      == 기업 허가 상태 ==
                                    </option>
                                    <option value="미허가">미허가</option>
                                    <option value="심사중">심사중</option>
                                    <option value="허가">허가</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td className="sTh">기업 상태</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="searchSTATUS"
                                    value={searchSTATUS}
                                    onChange={onChangeSearch}
                                  >
                                    <option defaultValue="0" style={{ display: "none" }}>
                                      == 기업 운영 상태 ==
                                    </option>
                                    <option value="개업">개업</option>
                                    <option value="휴업">휴업</option>
                                    <option value="폐업">폐업</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">거래 유형</td>
                            <td className="sTd" colSpan={3}>
                              <label style={{ fontSize: "14px" }}>
                                <input
                                  type="checkbox"
                                  id="searchincome_YN"
                                  //checked={checkIncome_YN}
                                  style={{ margin: "0px 7px", fontSize: "14px" }}
                                  onClick={onChangeSearch}
                                  defaultChecked
                                />
                                매입
                              </label>
                              <label style={{ fontSize: "14px" }}>
                                <input
                                  type="checkbox"
                                  id="searchoutcome_YN"
                                  //checked={checkOutcome_YN}
                                  style={{ margin: "0px 7px", fontSize: "14px" }}
                                  onClick={onChangeSearch}
                                  defaultChecked
                                />
                                매출
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <MDBox sx={{ width: "100%", marginTop: "-5px" }}>
                <Card>
                  <div className="sCard" style={{ width: "1603px" }}>
                    <div className="sTool">
                      <div style={{ width: "100%" }}>
                        <MDTypography variant="h6" color="inherit">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              color: "#4e5158",
                            }}
                          >
                            <div>거래처 목록</div>
                            <div>
                              <RenewalTableHeadAddButton clickEvent={addCompany} />
                              <RenewalTableHeadDelButton clickEvent={handleDelete} />
                            </div>
                          </div>
                        </MDTypography>
                      </div>
                    </div>
                    <DataGridPro
                      style={{
                        height: "calc(100vh - 483px)",
                        border: "1px solid rgb(205, 205, 205)",
                        marginRight: "44px",
                      }}
                      disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                      onCellDoubleClick={onCellDoubleClick}
                      //getRowClassName={getRowClassName}
                      //onRowClick={handleRowClick}
                      //onPageChange={handlerpageChnage}
                      columns={CompColumn}
                      rows={CompRrows2}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      rowHeight={40}
                      checkboxSelection
                      pageSizeOptions={[5]}
                      sx={{
                        borderRadius: "0%",
                        "& .MuiButtonBase-root ": {
                          border: "none",
                          background: "none",
                        },
                        "& .Mui-selected ": {
                          color: "#0d6efd",
                        },

                        "& .MuiPaginationItem-root ": {
                          margin: "0px 10px",
                        },
                        " .MuiPaginationItem-icon": { width: "1.5rem", height: "1.5rem" },
                        "& .Mui-disabled": {
                          background: "#f8f8f8!important",
                          borderRadius: "0px!important",
                          border: " solid 1px #616161",
                        },
                        "& .MuiDataGrid-overlay ": {
                          top: "-17px!important",
                          height: "106%!important",
                        },

                        "& .MuiDataGrid-virtualScroller": {
                          marginTop: "39px!important",
                          height: "360px!important",
                        },

                        "& .MuiDataGrid-columnsContainer": {
                          backgroundColor: "#f5f4f4",
                        },
                        "& .MuiDataGrid-iconSeparator": {
                          display: "none",
                        },
                        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
                          borderRight: "1px solid  rgb(205, 205, 205)",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          minHeight: "20px!important",
                          height: "40px",
                        },
                        "& .MuiDataGrid-columnHeader": {
                          backgroundColor: "#f5f4f4",
                          fontSize: "14px",
                          color: "#36383a",
                          fontWeight: "600",
                        },
                        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
                          borderBottom: "0.5px solid rgb(205, 205, 205)",
                          fontSize: " 14px",
                          color: "black",
                        },
                        "& .MuiDataGrid-footerContainer":{
                          backgroundColor:'#dee2e5'
                        },
                      }}
                      components={{
                        Pagination: CustomPagination,
                      }}
                      pageSize={size}
                      selectionModel={selectionModel}
                      onSelectionModelChange={handleonSelectionModelChange}
                    ></DataGridPro>
                  </div>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      <script></script>
    </div>
  );
}

export default Business;
