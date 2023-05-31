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
import { FaPen, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import { AppBar, Box, Icon, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import axios from "axios";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Tree } from "antd";

function Tables() {

  const sessionId = sessionStorage.getItem('id');

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "55%",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          renderItem={(props) => <PaginationItem {...props} disableRipple />}
          onChange={handlePageChange}
        />
        <div style={{ marginRight: "5px" }}>
          <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        </div>
      </div>
    );
  }

  function CustomPagination2() {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "62%",
        }}
      >
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          renderItem={(props) => <PaginationItem {...props} disableRipple />}
          onChange={handlePageChange}
        />
        <div style={{ marginRight: "5px" }}>
          <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        </div>
      </div>
    );
  }

  const [selectedRow, setSelectedRow] = useState();
  const [selectedRow2, setSelectedRow2] = useState();
  const [selectedRow3, setSelectedRow3] = useState();

  const getRowClassName = (params) => {
    if (params.id == selectedRow) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick = (params, event) => {
    const selectedRow = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow(selectedRow);
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
  const [selectionForm, setSelectionForm] = useState([]);
  useEffect(() => {
    setSelectionForm([]);
  }, []);

  const handleonSelectionFormChange = (newSelection) => {
    var arry = selectionForm;
    arry.push(newSelection);
    console.log(arry);
    if (arry.length > 1) {
      setSelectionForm([newSelection[1]]);
    } else {
      setSelectionForm(newSelection);
    }
  };

  const [selectionLine, setSelectionLine] = useState([]);
  useEffect(() => {
    setSelectionLine([]);
  }, []);

  const handleonSelectionLineChange = (newSelection) => {
    var arry = selectionLine;
    arry.push(newSelection);
    console.log(arry);
    if (arry.length > 1) {
      setSelectionLine([newSelection[1]]);
    } else {
      setSelectionLine(newSelection);
    }
  };

  const [lineTarget, setLineTarget] = useState([]);
   const [isDuple, setIsDuple] = useState(false)

   useEffect(() => {
    setLineTarget([]);
   }, []);
 
   const handleonLineTargetChange = (newSelection) =>{
    newSelection.length === 0 && setIsDuple(false)
    setLineTarget(newSelection)
   }
  // 체크박스 이벤트 end

  // 결재양식 card start
  const formColumn = [
    {
      field: "documentVerifyCode",
      headerName: "양식 분류",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "formName",
      headerName: "양식명",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "registDate",
      headerName: "등록일자",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];

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
  // 결재양식 card end

  // 결재선 card start
  const approvalLineColumn = [
    {
      field: "approvalLineName",
      headerName: "결재선명",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "approvalLineDetail",
      headerName: "결재선 상세",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "left",
    },
    {
      field: "registDate",
      headerName: "등록일자",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];

  const [approvalLine, setApprovalLine] = useState([
    {
      id: "",
      approvalLineName: "",
      approvalLineDetail: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/approvalLine.do?registrant="+sessionId)
    .then((response) => {
      setApprovalLine(response.data);
    });
  }, []);

  useCallback(() => {
    setApprovalLine(approvalLine);
  }, [approvalLine]);

  useEffect(() => {
    setApprovalLine(approvalLine);
  }, [approvalLine])
  

  // 결재선 추가 start

  const [title, setTitle] = useState("")
  const onChangeTitle =(e)=>{
    setTitle(e.target.value);
  }

  //결재선 직접선택 start
  const [modal, setModal] = useState(false);
  const toggle = () => {
    axios.get("http://192.168.0.200:8080/KPI/deptMember.do?dept="+selectedDept)
    .then((response) => {
        console.log(lineTargetInfo)
        setDeptMember(response.data);
    });
    setTitle("")
    setLineTargetInfo([])
    setLineTarget([])
    setSelectedDept("DP000")
    setModal(!modal)
  }

  const cancleToggle =()=>{
    if(lineTargetInfo.length !== 0){
      if(window.confirm("현재 선택된 결재선이 초기화됩니다. 이 화면에서 나가시겠습니까?")){
        setLineTargetInfo([])
        setModal(!modal)
      }
    }else{
      setModal(!modal)
    }
  }

  //부서목록 조회 start
  const [deptList, setDeptList] = useState([
    {
      deptCode: '',
	    upperDeptCode: '',
	    deptName: '',
	    remarks: '',
	    period: '',
	    workValue: '',
	    useYN: '',
	    deleteYn: '',
	    registrant: '',
	    registDate: '',
	    modifier: '',
	    modifyDate: '',
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/deptList.do")
    .then((response) => {
      setDeptList(response.data);
    })
  }, [])

  useEffect(() => {
    setDeptTree(deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y'))
  }, [deptList])
  //부서목록 조회 end

  // 부서목록 tree start
  const { DirectoryTree } = Tree;
  const [deptTree, setDeptTree] = useState([
    { 
      deptName: '',
      deptCode: '',
      upperDeptCode: '',
      period: "",
    },
  ])

  const createTreeData = (arr, upperCommonCode) => {
    let treeData = [];
    arr.forEach((obj) => {
      if (obj.upperDeptCode === upperCommonCode) {
        const { deptCode, deptName } = obj;
        const children = createTreeData(arr, deptCode);
        if (children.length > 0) {
          treeData.push({ title: deptName, key: deptCode, children });
        } else {
          treeData.push({ title: deptName,
                          key: deptCode });
        }
      }
    });
    return treeData;
  };

  const newData = createTreeData(
    deptTree,
    "DP"
  );
  
  const headData= [{
    title: "세연아이넷",
    key: "",
    children: newData,
  }]

  // dnd start
  const onDragEnter = (info) => {
    console.log(info);
  };

  const onDrop = (info) => {
    console.log(info);
    const dragKey = info.dragNode.key;
    const dragPosition = Number(info.dragNode.pos.slice(-2).replace(/[-]/g, ''));
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition ;
    const positionDept = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const modifier = sessionStorage.getItem('id');
    console.log(dragKey,"dragKey")
    console.log(dragPosition,"dragPosition")
    console.log(dropKey,"dropkey")
    console.log(dropPosition,"dropPosition")
    console.log(positionDept,"positionDept")

    if(dropKey === "" || dropKey === "DP999"){
      alert('해당 위치로는 이동할 수 없습니다.');
      return false;
    }else if(dragKey === "DP000" || dragKey === "DP999"){ 
      alert('해당 부서는 이동할 수 없습니다.');
    }else{
      axios.post("http://192.168.0.200:8080/KPI/dndDept.do?dragKey="+dragKey+"&dragPosition="+dragPosition
                                                        +"&dropKey="+dropKey+"&dropPosition="+dropPosition
                                                        +"&positionDept="+positionDept+"&modifier="+modifier)
      .then((response) => {
        console.log(response.data);
        if(response.data === 1){
          axios.get("http://192.168.0.200:8080/KPI/deptList.do")
          .then((response) => {
            setDeptList(response.data);
          })
        }else{
          alert('실패!!')
        }
      })

    }
  };
  // dnd end
  // 부서목록 tree end

  // 부서정보, 부서원 세팅 start
  const column = [
    {
      field: "id",
      headerName: "사원 번호",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "employeeDept",
      headerName: "부서",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "employeeFullName", //이름으로 표시했지만 DB에 성명을
      headerName: "이름",
      width: 140,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
    {
      field: "employeeRank",
      headerName: "직급",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'center'
    },
    {
      field: "employeeId",
      headerName: "이메일",
      width: 367,
      editable: false,
      headerAlign: "center",
      flex:1,
      align:'left'
    },
  ];

  const [selectedDept, setSelectedDept] = useState("DP000");
  const onClickDept =(value)=>{
    setSelectedRow([]);
    console.log(value);

    const deptName = value.toString();
    console.log(deptName);
    if(deptName !== ""){
      setSelectedDept(deptName);
    }
  };
  const [deptMember, setDeptMember] = useState([{
    id : '',
    employeeCompany : '',
	  employeeId : '',
    employeePw : '',
    employeeFirstName : '',
    employeeLastName : '',
    employeeDept : '',
    deptCode : '',
    employeeRank : '',
    ref : '',
    period : '',
    employeePosition : '',
    positionCode : '',
    employeeStatus : '',
    employeeAuthor : '',
    employeePhone : '',
    employeeLandLineNum : '',
    employeeFullName : '',
    deptHeadYn : '',
    registrant : '',
    registDate : '',
    modifier : '',
    modifyDate : '',
  }]);

  const [deptHead, setDeptHead] = useState("");

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/deptMember.do?dept="+selectedDept)
    .then((response) => {
      setDeptMember(response.data);
      
    })
  }, [selectedDept])
  
  // 부서정보, 부서원 세팅 end

  // 결재선 target 선택 start
  const [lineTargetInfo, setLineTargetInfo] = useState([{
    id : '',
    employeeCompany : '',
	  employeeId : '',
    employeePw : '',
    employeeFirstName : '',
    employeeLastName : '',
    employeeDept : '',
    deptCode : '',
    employeeRank : '',
    ref : '',
    period : '',
    employeePosition : '',
    positionCode : '',
    employeeStatus : '',
    employeeAuthor : '',
    employeePhone : '',
    employeeLandLineNum : '',
    employeeFullName : '',
    deptHeadYn : '',
    registrant : '',
    registDate : '',
    modifier : '',
    modifyDate : '',
  }])

  useEffect(() => {
    lineTarget.map(lt => (lineTargetInfo.map(lti => lt === lti.id && setIsDuple(true))))
  }, [lineTarget])

  const onClickLineTarget =()=>{
    
    if(lineTargetInfo.length !== 0){
      if(isDuple === true){
        console.log(lineTargetInfo.map(lt=>lt.id).toString(), lineTarget.toString())
        alert('동일인은 추가할 수 없습니다.');
        setIsDuple(false);
        setLineTarget([]);
        return false;
      }
    }
    if((lineTarget.length + lineTargetInfo.length) > 5){
      alert('5명 이상은 추가할 수 없습니다.');
      return false;
    }
    lineTarget.map(lt=>(
      setDeptMember(info => [...info.filter(i=>i.id !== lt)]),
      setLineTargetInfo(info => [...info,
                                  {
                                    id : deptMember.filter(d=> d.id === lt).map(d=>d.id).toString(),
                                    employeeCompany : deptMember.filter(d=> d.id === lt).map(d=>d.employeeCompany).toString(),
                                    employeeId : deptMember.filter(d=> d.id === lt).map(d=>d.employeeId).toString(),
                                    employeePw : deptMember.filter(d=> d.id === lt).map(d=>d.employeePw).toString(),
                                    employeeFirstName : deptMember.filter(d=> d.id === lt).map(d=>d.employeeFirstName).toString(),
                                    employeeLastName : deptMember.filter(d=> d.id === lt).map(d=>d.employeeLastName).toString(),
                                    employeeDept : deptMember.filter(d=> d.id === lt).map(d=>d.employeeDept).toString(),
                                    deptCode : deptMember.filter(d=> d.id === lt).map(d=>d.deptCode).toString(),
                                    employeeRank : deptMember.filter(d=> d.id === lt).map(d=>d.employeeRank).toString(),
                                    ref : deptMember.filter(d=> d.id === lt).map(d=>d.ref).toString(),
                                    period : deptMember.filter(d=> d.id === lt).map(d=>d.period).toString(),
                                    employeePosition : deptMember.filter(d=> d.id === lt).map(d=>d.employeePosition).toString(),
                                    positionCode : deptMember.filter(d=> d.id === lt).map(d=>d.positionCode).toString(),
                                    employeeStatus : deptMember.filter(d=> d.id === lt).map(d=>d.employeeStatus).toString(),
                                    employeeAuthor : deptMember.filter(d=> d.id === lt).map(d=>d.employeeAuthor).toString(),
                                    employeePhone : deptMember.filter(d=> d.id === lt).map(d=>d.employeePhone).toString(),
                                    employeeLandLineNum : deptMember.filter(d=> d.id === lt).map(d=>d.employeeLandLineNum).toString(),
                                    employeeFullName : deptMember.filter(d=> d.id === lt).map(d=>d.employeeFullName).toString(),
                                    deptHeadYn : deptMember.filter(d=> d.id === lt).map(d=>d.deptHeadYn).toString(),
                                    registrant : deptMember.filter(d=> d.id === lt).map(d=>d.registrant).toString(),
                                    registDate : deptMember.filter(d=> d.id === lt).map(d=>d.registDate).toString(),
                                    modifier : deptMember.filter(d=> d.id === lt).map(d=>d.modifier).toString(),
                                    modifyDate : deptMember.filter(d=> d.id === lt).map(d=>d.modifyDate).toString(),
                                  }
                                ]
      )
    ))
    //setLineTarget([]);
  }
  
  // 결재선 target 선택 end

  // 추가된 target 삭제 start
  const onRemove =(e)=>{
    console.log(e.target.id)
    const id = e.target.id;
    const duple = deptMember.filter(d=>d.id === id).map(d=>d.id).toString();
    console.log(duple)
    if(id === duple){
      alert('이미 대상이 목록에 존재합니다. 확인 후 다시 시도해주세요.');
      return false;
    }

    setLineTargetInfo(info => [...info.filter(l=>l.id !== id)]);
    setDeptMember(info => [...info,
                            {
                              id : lineTargetInfo.filter(d=> d.id === id).map(d=>d.id).toString(),
                              employeeCompany : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeCompany).toString(),
                              employeeId : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeId).toString(),
                              employeePw : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeePw).toString(),
                              employeeFirstName : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeFirstName).toString(),
                              employeeLastName : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeLastName).toString(),
                              employeeDept : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeDept).toString(),
                              deptCode : lineTargetInfo.filter(d=> d.id === id).map(d=>d.deptCode).toString(),
                              employeeRank : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeRank).toString(),
                              ref : deptMember.filter(d=> d.id === id).map(d=>d.ref).toString(),
                              period : deptMember.filter(d=> d.id === id).map(d=>d.period).toString(),
                              employeePosition : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeePosition).toString(),
                              positionCode : lineTargetInfo.filter(d=> d.id === id).map(d=>d.positionCode).toString(),
                              employeeStatus : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeStatus).toString(),
                              employeeAuthor : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeAuthor).toString(),
                              employeePhone : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeePhone).toString(),
                              employeeLandLineNum : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeLandLineNum).toString(),
                              employeeFullName : lineTargetInfo.filter(d=> d.id === id).map(d=>d.employeeFullName).toString(),
                              deptHeadYn : lineTargetInfo.filter(d=> d.id === id).map(d=>d.deptHeadYn).toString(),
                              registrant : lineTargetInfo.filter(d=> d.id === id).map(d=>d.registrant).toString(),
                              registDate : lineTargetInfo.filter(d=> d.id === id).map(d=>d.registDate).toString(),
                              modifier : lineTargetInfo.filter(d=> d.id === id).map(d=>d.modifier).toString(),
                              modifyDate : lineTargetInfo.filter(d=> d.id === id).map(d=>d.modifyDate).toString(),
                            }
    ]
)

  }
  // 추가된 target 삭제 end

  // 추가된 결재선 등록 start
  const onClickRegLine =()=>{
    const line = [];
    const lineNum = [];
    let numArr = [];
    approvalLine.map(a=> numArr.push(Number(a.id)));
    const seq = (numArr.sort((a, b) => b - a)[0])+1;
    lineTargetInfo.map(l=>(
      line.push(l.employeeFullName.toString())
    ))
    lineTargetInfo.map(l=>lineNum.push(l.id));
    const lineDetail = line.toString().replaceAll(',',' ▶ ');
    const lineNumDetail = lineNum.toString().replaceAll(',',' ▶ ');
    console.log(sessionId, seq, title, lineDetail, lineNumDetail)

    if(title === ""){
      alert('제목을 입력하세요.')
      return false;
    }
    if(line.length === 0 || lineDetail === ""){
      alert('결재선을 입력하세요.')
      return false;
    }
    if(lineNum.length === 0 || lineNumDetail === ""){
      alert('결재선을 입력하세요.')
      return false;
    }

    /* const params = new URLSearchParams();
    params.append("id", seq);
    params.append("registrant", sessionId);
    params.append("approvalLineName", title);
    params.append("approvalLineDetail", lineDetail);
    params.append("employeeNumberDetail", lineNumDetail); */

    axios
    .post("http://192.168.0.200:8080/KPI/regApprovalLine.do?id="
          +seq+
          "&approvalLineName="
          +title+
          "&approvalLineDetail="
          +lineDetail+
          "&employeeNumberDetail="
          +lineNumDetail+
          "&registrant="
          +sessionId)
    .then((response) => {
      console.log(response.data);
      if(response.data === 1){
        alert('등록되었습니다.');
        axios.get("http://192.168.0.200:8080/KPI/approvalLine.do?registrant="+sessionId)
        .then((res) => {
          setApprovalLine(res.data);
        });
        setModal(!modal);
      }
    });
  }
  
  // 추가된 결재선 등록 end

  //결재선 직접선택 end
  // 결재선 추가 end

  // 결재선 삭제 start
  const deleteApprovalLine =()=>{
    console.log(selectionLine)
    if(selectionLine.length < 1){
      alert('삭제 대상을 선택해주세요.');
      return false;
    }
    if (window.confirm("정말 삭제하시겠습니까?")){
      for (let i = 0; i < selectionLine.length; i++) {
        axios
        .post(
          "http://192.168.0.200:8080/KPI/deleteApprovalLine.do?id=" + selectionLine[i]
        )
        .then((response) => {
          if (response.data === 1) {
            axios.get("http://192.168.0.200:8080/KPI/approvalLine.do?registrant="+sessionId)
            .then((res) => {
              setApprovalLine(res.data);
            });
          } else {
            console.log("실패");
            return false;
          }
        });
      }
    }else{
      return false;
    }
  }
  // 결재선 삭제 end

  // 결재선 card end

  // 결재문서작성 페이지로 이동 start
  const history = useNavigate();

  const onClickNextPage =()=>{
    console.log(selectionForm, selectionLine)
    if(selectionForm.length !== 1){
      alert('한개의 양식을 선택해주세요');
      return false;
    }
    if(selectionLine.length > 1){
      alert('결재선을 한개만 선택해주세요');
      return false;
    }
    history('/approvalWrite?approvalForm='+ selectionForm +'&approvalLine=' + selectionLine)

  }
  // 결재문서작성 페이지로 이동 end

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
      <Card>
        <Grid container spacing={1}>
          {/* 결재양식 start */}
          <Grid item xs={12}>
            <div style={{ width: "100%", height: "102%", border: "none" }}>
              <MDBox>
                <div className="sCard">
                  <div className="sTool">
                    <div style={{ width: "100%" }}>
                      <MDTypography variant="h6" color="#4e5158">
                        결재양식
                      </MDTypography>
                    </div>
                  </div>
                  <div style={{height:"300px"}}>
                    <DataGrid
                      style={{marginRight:"44px"}}
                      columns={formColumn}
                      disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                      getRowClassName={getRowClassName}
                      onRowClick={handleRowClick}
                      rows={approvalForm}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      checkboxSelection
                      onSelectionModelChange={(newSelection) => {
                        handleonSelectionFormChange(newSelection);
                      }}
                      selectionModel={selectionForm}
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
                </div>
              </MDBox>
            </div>
          </Grid>
          {/* 결재양식 end */}

          {/* 결재선 start */}
          <Grid item xs={12}>
            <div className="sCard">
              <div className="sTool">
                <div style={{ width: "100%" }}>
                  <MDTypography variant="h6" color="#4e5158">
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <div>
                        결재선
                      </div> 
                      <div>
                        <button
                          className="sButton"
                          style={{
                            background: "rgb(67 79 106)",
                          }}
                          onClick={toggle}
                        >
                          추가
                        </button>
                        {/* 결재선 직접선택 madal start */}
                        <Modal isOpen={modal} toggle={toggle} size="xl">
                          <ModalHeader toggle={toggle}>결재선 선택</ModalHeader>
                          <ModalBody>
                            <MDBox pt={0} mb={1.5}>
                              <Grid container spacing={1}>
                                <Grid item xs={3.5}>
                                  <MDBox sx={{ width: "100%" }}>
                                    <Card sx={{ height: "calc(100vh - 480px)" }}>
                                      <MDBox
                                        variant="gradient"
                                        borderRadius="lg"
                                        coloredShadow="info"
                                        style={{
                                          backgroundColor: "#4b5773",
                                        }}
                                      >
                                        <MDTypography variant="h6">
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              color: "#4e5158",
                                            }}
                                          >
                                            <div style={{ color: "white" }}>부서 목록</div>
                                          </div>
                                        </MDTypography>
                                      </MDBox>
                                      <DirectoryTree
                                        multiple
                                        showLine
                                        onSelect={onClickDept}
                                        treeData={headData}
                                        defaultExpandAll={true}
                                        draggable
                                        blockNode
                                        onDragEnter={onDragEnter}
                                        onDrop={onDrop}
                                        style={{margin:"20px" , height:'calc(100vh - 550px)',overflow:'auto'}}
                                      />
                                    </Card>
                                  </MDBox>
                                </Grid>
                                <Grid item xs={8.5}>
                                  <MDBox>
                                    <Card>
                                      <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                          <div>
                                            <MDBox>
                                              <div className="sCard">
                                                <div className="sTool">
                                                  <div style={{ width: "100%" }}>
                                                    <MDTypography variant="h6" color="#4e5158">
                                                      부서원 목록
                                                    </MDTypography>
                                                  </div>
                                                </div>
                                                <div >
                                                  <DataGrid
                                                    
                                                    style={{marginRight:"44px"}}
                                                    columns={column}
                                                    disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                                                    getRowClassName={getRowClassName}
                                                    onRowClick={handleRowClick}
                                                    rows={deptMember.filter((dm) => dm.employeeStatus !== "퇴사")}
                                                    initialState={{
                                                      pagination: {
                                                        paginationModel: {
                                                          pageSize: 5,
                                                        },
                                                      },
                                                    }}
                                                    checkboxSelection
                                                    onSelectionModelChange={(newSelection) => {
                                                      handleonLineTargetChange(newSelection);
                                                    }}
                                                    selectionModel={lineTarget}
                                                    pageSizeOptions={[5]}
                                                    rowHeight={32}
                                                    sx={{
                                                      height:'calc(100vh - 560px)',
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
                                                      Pagination: CustomPagination2,
                                                    }}
                                                    pageSize={size}
                                                  ></DataGrid>
                                                </div>
                                              </div>
                                            </MDBox>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </Card>
                                  </MDBox>
                                </Grid>
                                <Grid item xs={12} 
                                  style={{display: "flex",
                                    padding: 0,
                                    marginTop: "30px",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <button
                                    className="sButton"
                                    style={{
                                      background: "rgb(67 79 106)",
                                    }}
                                    onClick={onClickLineTarget}
                                  >
                                    추가 ▼
                                  </button>
                                </Grid>
                                <Card style={{ width: "100%"}}>
                                  <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                      <MDBox>
                                        <div>
                                          <div className="sCard">
                                            <table className="sTable">
                                              <tbody>
                                                <tr>
                                                  <th className="sTh">결재선명</th>
                                                  <td colSpan={2} className="sTd">
                                                    <div className="sTdCell">
                                                      <input id="title" name="title" className="sInput" style={{width:"100%"}} value={title || ''} onChange={onChangeTitle} />
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <div style={{height:"180px", 
                                                          display:"flex", 
                                                          width:"1070px", 
                                                          marginRight:"44px",
                                                          border: "1px solid rgba(224, 224, 224, 1)"
                                                        }}>
                                              {lineTargetInfo.sort((a,b)=>(Number(b.ref)-Number(a.ref)) || (Number(b.period)-Number(a.period)))
                                                            .map((lti, idx)=>(
                                                <>
                                                  <Card key={idx} style={{
                                                    width:"160px", 
                                                    height:"140px", 
                                                    textAlign:"center", 
                                                    margin:"20px", 
                                                    backgroundColor:"#E0F8F7",
                                                    fontSize:"15px",
                                                    border:"1px skyblue solid"
                                                  }}
                                                  >
                                                    <div id={lti.id} style={{textAlign:"right", marginRight:"15px", cursor:"pointer"}} onClick={onRemove}>x</div>
                                                    <div style={{marginBottom:"10px"}}>
                                                      {lti.id}
                                                    </div>
                                                    <div style={{marginBottom:"10px"}}>
                                                      <span>{lti.employeeFullName}</span>
                                                      <span style={{fontSize:"12px"}}> {lti.employeeRank}</span> 
                                                    </div>
                                                    <div>
                                                      {lti.employeeDept}
                                                    </div>
                                                  </Card>
                                                  {idx !== lineTargetInfo.length-1 &&
                                                    <div style={{marginTop:"70px"}}>▶</div>
                                                  }
                                                </>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </MDBox>
                                    </Grid>
                                  </Grid>
                                </Card>
                              </Grid>
                            </MDBox>
                          </ModalBody>
                          <ModalFooter className="modal-button">
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={onClickRegLine}
                            >
                              등록
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "gray",
                              }}
                              onClick={cancleToggle}
                            >
                              취소
                            </button>
                          </ModalFooter>
                        </Modal>
                        {/* 결재선 직접선택 madal end */}
                        <button
                          className="sButton"
                          style={{
                            background: "rgb(67 79 106)",
                          }}
                          onClick={deleteApprovalLine}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </MDTypography>
                </div>
              </div>
              <div style={{height:"300px"}}>
                <DataGrid
                  style={{marginRight:"44px"}}
                  columns={approvalLineColumn}
                  disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                  getRowClassName={getRowClassName2}
                  onRowClick={handleRowClick2}
                  rows={approvalLine}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  checkboxSelection
                  onSelectionModelChange={(newSelection) => {
                    handleonSelectionLineChange(newSelection);
                  }}
                  selectionModel={selectionLine}
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
              <div
                style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}
              >
                <button
                  className="sButton"
                  style={{
                    background: "rgb(67 79 106)",
                  }}
                  onClick={onClickNextPage}
                >
                  다음
                </button>
              </div>
            </div>
          </Grid>
          {/* 결재선 end */}
        </Grid>
      </Card>
    </MDBox>
    <Footer />
    </DashboardLayout>
  );
}

export default Tables;
