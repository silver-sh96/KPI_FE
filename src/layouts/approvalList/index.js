/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useCallback, useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MDButton from "components/MDButton";
import breakpoints from "assets/theme/base/breakpoints";

import { AppBar, Box, Icon, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import { FaCheck, FaPen, FaRedoAlt, FaRegPlusSquare, FaRegSun, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { MdCancelScheduleSend } from "react-icons/md";
import axios from "axios";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";

function Tables() {
  const history = useNavigate();
  const id = sessionStorage.getItem('id');

  //탭선택 start
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
   console.log(newValue)
   setTabValue(newValue);
   setSelectionModel([]);
  }
  //탭선택 end

  //데이터그리드 이벤트 start
  const [size, setSize] = useState(10);
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "55%" }}>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          renderItem={(props) => <PaginationItem {...props} disableRipple />}
          onChange={handlePageChange}
        />
        <div style={{marginRight:'5px'}}>
        <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        </div>
      </div>
    );
  }

  const [selectedRow,setSelectedRow] = useState();
  const [selectedRow2,setSelectedRow2] = useState();
  const [selectedRow3,setSelectedRow3] = useState();

  const getRowClassName = (params) => {
    if (params.id == selectedRow) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick = (params, event) => {
    const selectedRow = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow(selectedRow);
    setTargetInfo([params.row]);
  };

  const getRowClassName2 = (params) => {
    if (params.id == selectedRow2) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick2 = (params, event) => {
    const selectedRow2 = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow2(selectedRow2);
  };
  const getRowClassName3 = (params) => {
    if (params.id == selectedRow3) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick3 = (params, event) => {

    const selectedRow3 = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow3(selectedRow3);

  };
  //데이터그리드 이벤트 end

  // 체크박스 이벤트 start
  const [selectionModel, setSelectionModel] = useState([]);
  useEffect(() => {
    setSelectionModel([]);
  }, []);

  const handleonSelectionModelChange = (newSelection) =>{
   setSelectionModel(newSelection)
  }
  // 체크박스 이벤트 end

  // 문서양식 조회  start
  const [approvalForm, setApprovalForm] = useState([
    {
      id: "",
      documentVerifyCode: "",
      formName: "",
      formSrc: "",
      useYN: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/approvalForm.do").then((response) => {
      setApprovalForm(response.data);
    });
  }, []);

  useCallback(() => {
    setApprovalForm(approvalForm);
  }, [approvalForm]);
  // 문서양식 조회 end

  // 부서 조회 start
  const [deptList, setDeptList] = useState([
    {
      deptCode: "",
      upperDeptCode: "",
      deptName: "",
      remarks: "",
      period: "",
      workValue: "",
      useYN: "",
      deleteYn: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
      setDeptList(response.data);
    });
  }, []);

  useCallback(() => {
    setDeptList(deptList);
  }, [deptList]);
  // 부서 조해 end

  // 첫번째 tab start
  const receptColumn = [
    {
      field: "id",
      headerName: "문서 번호",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "formClassifyCode",
      headerName: "분류",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "title",
      headerName: "제목",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "writer", //이름으로 표시했지만 DB에 성명을
      headerName: "기안자",
      width: 140,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "writerDept", //이름으로 표시했지만 DB에 성명을
      headerName: "기안부서",
      width: 140,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "registDate",
      headerName: "수신일자",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "documentStatus",
      headerName: "문서상태",
      width: 367,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
  ];

  const [receptApproval, setReceptApproval] = useState([{
    id : "",
    formClassifyCode : "",
    nowStep : "",
    documentStatus : "",
    contents : "",
    approvalLineDetail : "",
    title : "",
    attachmentPath : "",
    remark : "",
    writer : "",
    writerDept : "",
    writerRank : "",
    registrant : "",
    registDate : "",
    modifier : "",
    modifyDate : "",
  }])

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/receptApproval.do?id="+id)
      .then((response) => {
        setReceptApproval(response.data);
      });
  }, []);

  // 수신문서 확인 start

  /* useEffect(() => {
    console.log(receptApproval.filter(r=>r.documentStatus === '미결재').length)
    const cnt = receptApproval.filter(r=>r.documentStatus === '미결재').length;
    //localStorage.setItem('cnt', cnt);
  }, []) */
  
  
  const onDoubleClickRecept =(e)=>{
    console.log(e.id)
    history('/approvalList/approvalProcess?id='+e.id)
  }
  // 수신문서 확인 end

  // 날짜 구하기 start
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString1 = (year-1) + '-' + month  + '-' + day;
  const dateString2 = year + '-' + month  + '-' + day;
  console.log(dateString1, dateString2)

  useEffect(() => {
    setSearchDate1(dateString1);
    setSearchDate2(dateString2);
    setReqSearchDate1(dateString1);
    setReqSearchDate2(dateString2);
  }, [])
  
  // 날짜 구하기 end

  // 수신검색 start
  const [isSearch, setIsSearch] = useState(false)
  const [searchForm, setSearchForm] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [searchDate1, setSearchDate1] = useState("");
  const [searchDate2, setSearchDate2] = useState("");
  
  const searchKeySetting = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "searchByForm") {
      setSearchForm(value);
    } else if (name === "searchByStatus") {
      setSearchStatus(value);
    } else if (name === "searchByName") {
      setSearchName(value);
    } else if (name === "searchByDept") {
      setSearchDept(value);
    } else if (name === "searchByDate1") {
      setSearchDate1(value);
    } else if (name === "searchByDate2") {
      setSearchDate2(value);
    }
  }

  const onClickSearchBtn =()=>{
    setIsSearch(true);
    axios
      .get(
        "http://192.168.0.200:8080/KPI/receptSearch.do?fm=" +
          searchForm +
          "&st=" +
          searchStatus +
          "&nm=" +
          searchName +
          "&dp=" +
          searchDept +
          "&dt1=" +
          searchDate1 +
          "&dt2=" +
          searchDate2 +
          "&id=" +
          id 
      )
    .then((response) => {
      setReceptApproval(response.data);
    });
  }

  const setDefaultSearch =()=>{
    setIsSearch(false);
    setSearchForm("")
    setSearchStatus("")
    setSearchName("")
    setSearchDept("")
    setSearchDate1(dateString1)
    setSearchDate2(dateString2)
    axios
    .get("http://192.168.0.200:8080/KPI/receptApproval.do?id="+id)
    .then((response) => {
      setReceptApproval(response.data);
    });
  }
  // 수신검색 end

  // 첫번째 tab end

  // 두번째 tab start
  const requestColumn = [
    {
      field: "id",
      headerName: "문서 번호",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "formClassifyCode",
      headerName: "분류",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "title",
      headerName: "제목",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "approvalLineDetail", //이름으로 표시했지만 DB에 성명을
      headerName: "결재선상세",
      width: 140,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "registDate",
      headerName: "발신일자",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "documentStatus",
      headerName: "결재 진행상태",
      width: 367,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
  ];

  const [requestApproval, setRequestApproval] = useState([{
    id : "",
    formClassifyCode : "",
    documentStatus : "",
    contents : "",
    approvalLineDetail : "",
    title : "",
    attachmentPath : "",
    remark : "",
    registrant : "",
    registDate : "",
    modifier : "",
    modifyDate : "",
  }])

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/requestApproval.do?id="+id)
      .then((response) => {
        setRequestApproval(response.data);
      });
  }, []);

  useCallback(
    () => {
      setRequestApproval(requestApproval)
    },
    [requestApproval],
  )

  // 발신문서 확인 start
 /*  const [requestApprovalView, setRequestApprovalView] = useState([{
    id : "",
    formClassifyCode : "",
    documentStatus : "",
    contents : "",
    approvalLineDetail : "",
    title : "",
    attachmentPath : "",
    remark : "",
    registrant : "",
    registDate : "",
    modifier : "",
    modifyDate : "",
  }])

  const [requestModal, setRequestModal] = useState(false);
  const requestToggle = () => {
    setRequestModal(!requestModal);
  } */

  const onDoubleClickRequest =(e)=>{
    console.log(e.id)
    history('/approvalList/approvalView?id='+e.id)
    /* setRequestApprovalView(requestApproval.filter(r=>(r.id === e.id)))
    setRequestModal(!requestModal); */
  }
  // 발신문서 확인 end

  // 발신검색 start
  const [reqSearchForm, setReqSearchForm] = useState("");
  const [reqSearchStatus, setReqSearchStatus] = useState("");
  const [reqSearchName, setReqSearchName] = useState("");
  const [reqSearchTitle, setReqSearchTitle] = useState("");
  const [reqSearchDate1, setReqSearchDate1] = useState("");
  const [reqSearchDate2, setReqSearchDate2] = useState("");
  
  const reqSearchKeySetting = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "reqSearchByForm") {
      setReqSearchForm(value);
    } else if (name === "reqSearchByStatus") {
      setReqSearchStatus(value);
    } else if (name === "reqSearchByName") {
      setReqSearchName(value);
    } else if (name === "reqSearchByTitle") {
      setReqSearchTitle(value);
    } else if (name === "reqSearchByDate1") {
      setReqSearchDate1(value);
    } else if (name === "reqSearchByDate2") {
      setReqSearchDate2(value);
    }
  }

  const onClickReqSearchBtn =()=>{
    axios
      .get(
        "http://192.168.0.200:8080/KPI/requestSearch.do?fm=" +
          reqSearchForm +
          "&st=" +
          reqSearchStatus +
          "&nm=" +
          reqSearchName +
          "&tt=" +
          reqSearchTitle +
          "&dt1=" +
          reqSearchDate1 +
          "&dt2=" +
          reqSearchDate2 +
          "&id=" +
          id 
      )
    .then((response) => {
      setRequestApproval(response.data);
    });
  }

  const setReqDefaultSearch =()=>{
    setReqSearchForm("")
    setReqSearchStatus("")
    setReqSearchName("")
    setReqSearchTitle("")
    setReqSearchDate1(dateString1)
    setReqSearchDate2(dateString2)
    axios
    .get("http://192.168.0.200:8080/KPI/requestApproval.do?id="+id)
    .then((response) => {
      setRequestApproval(response.data);
    });
  }
  // 발신검색 end

  // 두번째 tab end
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={0} pb={3}>
        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }} style={{marginBottom:"10px"}}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="수신문서"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    inbox
                  </Icon>
                }
              />
              <Tab
                label="발신문서"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    outbox
                  </Icon>
                }
              />
            </Tabs>
          </AppBar>
        </Grid>
        <Card>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {tabValue === 0 ?
                /* 첫번째 탭 검색창 start */
                <div>
                  <div className="sCard">
                    <div className="sAreaSearch">
                      <div>
                        문서 검색
                      </div>
                      <div>
                      <button
                        className="sButton"
                        style={{
                          background: "rgb(67 79 106)",
                        }}
                        onClick={onClickSearchBtn}
                      >
                        검색
                      </button>
                      <button
                        className="sButton"
                        style={{
                          background: "#c23535",
                        }}
                        onClick={setDefaultSearch}
                      >
                        초기화
                      </button>
                      </div>
                    </div>
                    <table className="sTable" style={{ marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <th className="sTh">문서 양식</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select id="searchByForm"
                                        name="searchByForm" 
                                        className="sInput"
                                        onChange={searchKeySetting}
                                        value={searchForm || ''}
                                >
                                  <option value={""}>전체보기</option>
                                  {approvalForm.map((a, idx)=>(
                                  <option key={idx} value={a.id}>{a.formName}</option> 
                                  ))}

                                </select>
                              </div>
                            </div>
                          </td>
                          <th className="sTh">문서 상태</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select id="searchByStatus"
                                        name="searchByStatus" 
                                        className="sInput"
                                        onChange={searchKeySetting}
                                        value={searchStatus || ''}
                                >
                                  <option value={""}>전체보기</option>
                                  <option value={"미결재"}>미결재</option>
                                  <option value={"승인"}>승인</option>
                                  <option value={"반려"}>반려</option>
                                </select>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">기안자</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <input 
                                  id="searchByName"
                                  name="searchByName"
                                  type="text" 
                                  className="sInput" 
                                  placeholder="기안자명을 입력하세요.."
                                  onChange={searchKeySetting}
                                  value={searchName || ''} 
                                />
                              </div>
                            </div>
                          </td>
                          <th className="sTh">기안 부서</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select id="searchByDept"
                                        name="searchByDept" 
                                        className="sInput"
                                        onChange={searchKeySetting}
                                        value={searchDept || ''}
                                >
                                  <option value={""}>전체보기</option>
                                  {deptList.map((d,idx)=>(
                                    <option key={idx} value={d.deptCode}>{d.deptName}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">수신일자</th>
                          <td className="sTd" colSpan={3}>
                            <div className="sTdCell">
                              <div>
                                <input 
                                  id="searchByDate1"
                                  name="searchByDate1"
                                  type={"date"} 
                                  className="sInput"
                                  onChange={searchKeySetting}
                                  value={searchDate1 || dateString1}
                                ></input>
                                <span style={{ padding: "0px 10px", marginLeft:"20px", marginRight:"20px" }}>~</span>
                                <input 
                                  id="searchByDate2"
                                  name="searchByDate2"
                                  type={"date"} 
                                  className="sInput"
                                  onChange={searchKeySetting}
                                  value={searchDate2 || dateString2}
                                ></input>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                /* 첫번째 탭 검색창 end */
                :
                /* 두번째 탭 검색창 start */
                <div>
                  <div className="sCard">
                    <div className="sAreaSearch">
                      <div>
                        문서 검색
                      </div>
                      <div>
                      <button
                        className="sButton"
                        style={{
                          background: "rgb(67 79 106)",
                        }}
                        onClick={onClickReqSearchBtn}
                      >
                        검색
                      </button>
                      <button
                        className="sButton"
                        style={{
                          background: "#c23535",
                        }}
                        onClick={setReqDefaultSearch}
                      >
                        초기화
                      </button>
                      </div>
                    </div>
                    <table className="sTable" style={{ marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <th className="sTh">문서 양식</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select id="reqSearchByForm"
                                        name="reqSearchByForm" 
                                        className="sInput"
                                        onChange={reqSearchKeySetting}
                                        value={reqSearchForm || ""}
                                >
                                  <option value={""}>전체보기</option>
                                  {approvalForm.map((a, idx)=>(
                                  <option key={idx} value={a.id}>{a.formName}</option> 
                                  ))}
                                </select>
                              </div>
                            </div>
                          </td>
                          <th className="sTh">문서 상태</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select id="reqSearchByStatus"
                                        name="reqSearchByStatus" 
                                        className="sInput"
                                        onChange={reqSearchKeySetting}
                                        value={reqSearchStatus || ""}
                                >
                                  <option value={""}>전체보기</option>
                                  <option value={"결재상신"}>결재상신</option>
                                  <option value={"결재진행중"}>결재진행중</option>
                                  <option value={"승인"}>승인</option>
                                  <option value={"반려"}>반려</option>
                                </select>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">수신자</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <input 
                                  id="reqSearchByName"
                                  name="reqSearchByName" 
                                  type="text" className="sInput" placeholder="수신자명을 입력하세요.." 
                                  onChange={reqSearchKeySetting}
                                  value={reqSearchName || ""}
                                />
                              </div>
                            </div>
                          </td>
                          <th className="sTh">제목</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <input id="reqSearchByTitle"
                                        name="reqSearchByTitle" 
                                        className="sInput"
                                        placeholder="제목을 입력하세요.."
                                        onChange={reqSearchKeySetting}
                                        value={reqSearchTitle || ""}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">발신일자</th>
                          <td className="sTd" colSpan={3}>
                            <div className="sTdCell">
                              <div>
                                <input 
                                  id="reqSearchByDate1"
                                  name="reqSearchByDate1" 
                                  type={"date"} 
                                  className="sInput"
                                  onChange={reqSearchKeySetting}
                                  value={reqSearchDate1 || dateString1}
                                ></input>
                                <span style={{ padding: "0px 10px", marginLeft:"20px", marginRight:"20px" }}>~</span>
                                <input 
                                  id="reqSearchByDate2"
                                  name="reqSearchByDate2" 
                                  type={"date"} 
                                  className="sInput"
                                  onChange={reqSearchKeySetting}
                                  value={reqSearchDate2 || dateString2}
                                ></input>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                /* 두번째 탭 검색창 end */
                }
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: "100%", height: "102%", border: "none" }}>
                  <MDBox>
                    <div className="sCard">
                      <div className="sTool">
                        <div style={{ width: "100%" }}>
                          <MDTypography variant="h6" color="#4e5158">
                            {tabValue === 0 ? 
                              "수신 결재문서" :
                              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                <div>
                                  발신 결재문서
                                </div> 
                                <div>
                                  <RenewalTableHeadAddButton/>
                                  <RenewalTableHeadDelButton/>
                                </div>
                              </div>
                            }
                          </MDTypography>
                        </div>
                      </div>
                      {/* 첫번째 tab start */}
                      <div style={tabValue === 0 ? {height:"calc(100vh - 570px)"} : {display:"none"}}>
                        <DataGrid
                          style={{marginRight:"44px"}}
                          columns={receptColumn}
                          disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                          getRowClassName={getRowClassName2}
                          onRowClick={handleRowClick2}
                          rows={isSearch === true ? receptApproval : receptApproval.filter(r=>r.documentStatus === '미결재')}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          checkboxSelection
                          onSelectionModelChange={(newSelection) => {
                            setSelectionModel(newSelection);
                          }}
                          onCellDoubleClick={onDoubleClickRecept}
                          selectionModel={selectionModel}
                          pageSizeOptions={[5]}
                          rowHeight={32}
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
                        ></DataGrid>
                      </div>
                      {/* 첫번째 tab end */}
                      {/* 두번째 tab start */}
                      <div style={tabValue === 1 ? {height:"calc(100vh - 570px)"} : {display:"none"}}>
                        <DataGrid
                          style={{marginRight:"44px"}}
                          columns={requestColumn}
                          disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                          getRowClassName={getRowClassName2}
                          onRowClick={handleRowClick2}
                          rows={requestApproval}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          checkboxSelection
                          onSelectionModelChange={(newSelection) => {
                            setSelectionModel(newSelection);
                          }}
                          onCellDoubleClick={onDoubleClickRequest}
                          selectionModel={selectionModel}
                          pageSizeOptions={[5]}
                          rowHeight={32}
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
                        ></DataGrid>
                        {/* <Modal isOpen={requestModal} toggle={requestToggle} size="xl">
                          <ModalHeader toggle={requestToggle}>발신문서</ModalHeader>
                          <ModalBody>
                            <form>
                              <table style={{borderSpacing: '20px 10px', borderCollapse:'separate', marginLeft:"auto", marginRight:"auto"}}>
                                {requestApprovalView.map((r, idx)=>(
                                <tbody key={idx}>
                                  <tr>
                                    <td width={"100px"}>제목</td>
                                    <td width={"800px"}>
                                      <Input value={r.title ||''} readOnly />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>첨부파일</td>
                                    <td><Input value={r.attachmentPath ||'-'} readOnly /></td>
                                  </tr>
                                  <tr>
                                    <td>내용</td>
                                    <td>
                                      <Input type="textarea" style={{height:"500px"}} value={r.contents ||''} readOnly />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>비고</td>
                                    <td><Input value={r.remark ||'-'} readOnly /></td>
                                  </tr>
                                  <tr>
                                    <td>결재선</td>
                                    <td><Input value={r.approvalLineDetail ||''} readOnly /></td>
                                  </tr>
                                </tbody>
                                ))}
                              </table>
                            </form>
                          </ModalBody>
                          <ModalFooter className="modal-button">
                            <Button color="secondary" onClick={requestToggle}>
                              닫기
                            </Button>
                          </ModalFooter>
                        </Modal> */}
                      </div>
                      {/* 두번째 tab end */}
                    </div>
                  </MDBox>
                </div>
                <MDBox pt={3}>
                  
                  
                  
                    
                  
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
  );
}

export default Tables;
