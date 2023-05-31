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
import { Input } from "reactstrap";
import MDButton from "components/MDButton";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheck, FaRedoAlt } from "react-icons/fa";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { Pagination, PaginationItem } from "@mui/material";


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

   // 사원 목록 조회 start
  const [employee, setEmployee] = useState([
    {
      id: "",
      employeeCompany: "",
      employeeId: "",
      employeePw: "",
      employeeFirstName: "",
      employeeLastName: "",
      employeeDept: "",
      deptCode: "",
      employeeRank: "",
      employeePosition: "",
      positionCode: "",
      employeeStatus: "",
      employeeAuthor: "",
      employeePhone: "",
      employeeHomePhone: "",
      employeeLandLineNum: "",
      employeeFullName: "",
      deptHeadYn: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/employeeList.do")
      .then((response) => {
        setEmployee(response.data);
      });
  }, []);

  useCallback(
    () => {
      setEmployee(employee)
    },
    [employee],
  )

  // 사원 목록 조회 end

  // 전체 문서 조회 start
  
  const [totalApproval, setTotalApproval] = useState([{
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
      .get("http://192.168.0.200:8080/KPI/totalApproval.do")
      .then((response) => {
        setTotalApproval(response.data);
      });
  }, []);

  useCallback(
    () => {
      setTotalApproval(totalApproval)
    },
    [totalApproval],
  )
  // 전체 문서 조회 end

  //문서번호 생성 start
  const [approvalArr, setApprovalArr] = useState([]);
  const [NumArr, setNumArr] = useState([]);
  const [maxNum, setMaxNum] = useState(0);
  let now = new Date();
  let year = now.getFullYear().toString();
  let seq = 0;

  useEffect(() => {
    const arr = [];
    totalApproval.map((a) => a.id.slice(3, 7) === year && arr.push(a.id));
    setApprovalArr(arr);
  }, [totalApproval]);

  useEffect(() => {
    setApprovalArr(approvalArr);
    setNumArr([])
    approvalArr.map(a=>
        setNumArr(num => [...num, Number(a.slice(7))])
      )
  }, [approvalArr]);

  useEffect(() => {
    setNumArr(NumArr);
    setMaxNum(NumArr.sort((a,b)=>b-a)[0]);
    //console.log(NumArr.sort((a,b)=>b-a)[0])
  }, [NumArr])

  useCallback(
    () => {
      setApprovalArr(approvalArr);
      setNumArr(NumArr);
    },
    [approvalArr, NumArr],
  )

  if (maxNum + 1 < 10) {
    seq = "00" + (maxNum + 1);
  } else if (maxNum + 1 >= 10 && maxNum + 1 < 100) {
    seq = "0" + (maxNum + 1);
  } else if (maxNum + 1 >= 100) {
    seq = maxNum + 1;
  }
  //문서번호 생성 end

  //결재선 목록조회 start
  const [approvalLine, setApprovalLine] = useState([{
    id : "",
    approvalLineName : "",
    approvalLineDetail : "",
    employeeNumberDetail : "",
    registrant : "",
    registDate : "",
    modifier : "",
    modifyDate : "",
  }])

  useEffect(() => {
    const registrant = sessionStorage.getItem('id');
    axios
      .get("http://192.168.0.200:8080/KPI/approvalLine.do?registrant="+registrant)
      .then((response) => {
        setApprovalLine(response.data);
      });
  }, []);

  useCallback(
    () => {
      setApprovalLine(approvalLine)
    },
    [approvalLine],
  )
  //결재선 목록조회 end

  const [selectedLine, setSelectedLine] = useState("")
  const [newLine, setNewLine] = useState([])
  const [newLineNum, setNewLineNum] = useState([])
  //params 조회 start
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const form = searchParams.get('approvalForm');
  const line = searchParams.get('approvalLine');

  useEffect(() => {
    console.log(form, line);
    setSelectedLine(line);
    if(line !== '1'){
      setNewLine(approvalLine.filter(al=>al.id === line).map(al=>al.approvalLineDetail.split('▶')));
      setNewLineNum(approvalLine.filter(al=>al.id === line).map(al=>al.employeeNumberDetail.split('▶')))
    }
  }, [approvalLine])
  //params 조회 end

  //결재선 변경 start
  const onChangeLine =(e)=>{
    setLineTargetInfo([]);
    const value = e.target.value
    setSelectedLine(value);
    console.log(value)
    if(value === '1'){
      setNewLine([]);
      setNewLineNum([]);
    }else{
      setNewLine(approvalLine.filter(al=>al.id === value).map(al=>al.approvalLineDetail.split('▶')));
      setNewLineNum(approvalLine.filter(al=>al.id === value).map(al=>al.employeeNumberDetail.split('▶')))
      //setLineTargetInfo([]);
    }
    
  }
  
  //결재선 변경 end
  
  //결재선 직접선택 start
  const [modal, setModal] = useState(false);
  const toggle = () => {
    axios.get("http://192.168.0.200:8080/KPI/deptMember.do?dept="+selectedDept)
    .then((response) => {
        console.log(lineTargetInfo)
        setDeptMember(response.data);
    });
    setNewLine([])
    setNewLineNum([])
    if(lineTargetInfo.length === 1 || selectedLine !== "1"){
      setSelectedLine("1")
      setLineTargetInfo([])
    }else{
      setLineTargetInfo([...lineTargetInfo])
    }
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

  const onClickLineTarget =(lt)=>{
    console.log(lt)
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
    lineTargetInfo.map(l=>(
      setNewLine(line => [...line, l.employeeFullName.toString()])
    ))
    setNewLineNum(lineTargetInfo.map(l=>l.id));
    setModal(!modal);
  }

  useEffect(() => {
    setNewLine(newLine);
    setNewLineNum(newLineNum);
    console.log(newLine.toString().replaceAll(',','▶'), newLineNum)
  }, [newLine, newLineNum])
  
  // 추가된 결재선 등록 end

  //결재선 직접선택 end

  // 결재문서 세팅 start
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const [contents, setContents] = useState("");
  const [remark, setRemark] = useState("");

  const setApprovalForm =(e)=>{
    const {name, value} = e.target;
    console.log(name, value)
    if(name === "title"){
      setTitle(value);
    }else if(name === "attachment"){
      setAttachment(value);
    }else if(name === "contents"){
      setContents(value);
    }else if(name === "remark"){
      setRemark(value);
    }
  }
  // 결재문서 세팅 end

  // 결재상신 start
  const sendApproval =()=>{
    const registrant = sessionStorage.getItem('id');
    if(seq === 0){
      seq = '001';
    }
    if(newLine.length === 0 || newLineNum.length === 0){
      alert('결재선을 지정해주세요.');
      return false;
    }
    if(title === ""){
      alert('제목을 입력해주세요.');
      return false;
    }
    if(contents === ""){
      alert('내용을 입력해주세요.');
      return false;
    }

    const checkArr = (newLineNum.toString().split(','));
    for(let i=0; i<checkArr.length; i++){
      console.log(checkArr[i].trim(), registrant)
      if(checkArr[i].trim() === registrant){
        alert('본인은 결재선으로 지정할 수 없습니다. 결재선을 재지정해주세요.');
        return false;
      }
    }

    const documentNum = 'EAD'+year+seq;
    console.log(documentNum, ' <- 문서번호');
    console.log(form, ' <- 양식번호')
    console.log(contents, ' <- 내용');
    console.log(newLine, newLine.toString().replaceAll(',','▶'), ' <- 결재선상세');
    console.log(newLineNum, newLineNum.toString().replaceAll(',','▶'), ' <- 결재선상세(사번)');
    console.log(title, ' <- 제목');
    console.log(attachment, ' <- 첨부파일');
    console.log(remark, ' <- 비고');
    console.log(registrant, ' <- 등록자')

    const params = new URLSearchParams();
    params.append("id", documentNum);
    params.append("formClassifyCode", form);
    params.append("contents", contents);
    params.append("approvalLineDetail", newLine.toString().replaceAll(',','▶'));
    params.append("employeeNumberDetail", newLineNum.toString().replaceAll(',','▶'));
    params.append("title",title);
    params.append("attachmentPath",attachment);
    params.append("remark",remark);
    params.append("registrant", registrant);

    if(window.confirm("결재를 상신하시겠습니까?")){
      axios
      .post("http://192.168.0.200:8080/KPI/regApprovalDocument.do?ApprovalVO="+params+"&id="+documentNum)
      .then((response) => {
        console.log(response.data);
        if(response.data === 1){
          alert('결재가 상신되었습니다.');
          history('/approvalList')
        }
      });
    }

  }
  // 결재상신 end

  // 취소버튼 선택 start
  const history = useNavigate();

  const cancleWrite =()=>{
    history('/approvalList')
  }
  // 취소버튼 선택 end

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <div style={{minHeight:"680px"}}>
                  <div className="sCard">
                    <table className="sTable">
                      <tbody>
                        <tr>
                          <th className="sTh">제목</th>
                          <td colSpan={2} className="sTd">
                            <div className="sTdCell">
                              <input id="title" name="title" className="sInput" style={{width:"100%"}} value={title || ''} onChange={setApprovalForm} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh" rowSpan={2}>결재선</th>
                          <td className="sTd">
                            <div style={{display:"flex"}} className="sTdCell">
                              <select className="sInput" onChange={onChangeLine} value={selectedLine || ''}>
                                {approvalLine.map((al, idx)=>(
                                  <option key={idx} value={al.id}>{al.approvalLineName}</option>
                                ))}
                              </select>
                              <button
                                className="sButton"
                                style={{
                                  background: "rgb(67 79 106)",
                                }}
                                onClick={toggle}
                              >
                                직접선택
                              </button>
                              {/* 결재선 직접선택 madal start */}
                              <Modal isOpen={modal} toggle={toggle} size="xl">
                                <ModalHeader toggle={cancleToggle}>결재선 선택</ModalHeader>
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
                                              style={{margin:"20px" , height:'calc(100vh - 550px)'}}
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
                                                      <div style={{height:"368px"}}>
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
                                          onClick={()=> onClickLineTarget(lineTarget)}
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
                                                  <div className="sTool">
                                                    <div>
                                                      <MDTypography variant="h6" color="#4e5158">
                                                        결재선
                                                      </MDTypography>
                                                    </div>
                                                  </div>
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
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="sTd">
                            <div className="sTdCell">
                            {newLine.length === 0 ?
                              <input id="lineDetail" name="lineDetail" className="sInput" style={{minWidth:"1000px", all:"unset"}} value={approvalLine.filter(al=>al.id === selectedLine).map(al=>al.approvalLineDetail)} readOnly/> :
                              <input id="lineDetail" name="lineDetail" className="sInput" style={{minWidth:"1000px", all:"unset"}} value={newLine.toString().replaceAll(',',' ▶ ')} readOnly/>
                            }
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">첨부파일</th>
                          <td colSpan={2} className="sTd">
                            <div style={{display:"flex"}} className="sTdCell">
                              <input type="file" id="attachment" name="attachment" className="sInput" value={attachment || ''} onChange={setApprovalForm} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">문서내용</th>
                          <td colSpan={2} className="sTd">
                            <select className="sInput" style={{ float:"right", width:"200px", marginBottom:"10px"}}>
                              <option>선택</option>
                            </select>
                            <iframe
                                title='smartEditor2'
                                src={'http://192.168.0.200:8080/KPI/editor.do?documentCode=' + form + '&id=' + sessionId} 
                                style={{width:"100%", height:"500px"}}  
                                frameBorder={"0"}
                            />
                            {/* <textarea type="textarea" 
                                      id="contents" 
                                      name="contents" 
                                      className="sInput" 
                                      value={contents || ''} 
                                      onChange={setApprovalForm} 
                                      style={{ minHeight:"300px", width:"100%"}} 
                            /> */}
                          </td>
                        </tr>
                        <tr>
                          <th className="sTh">비고</th>
                          <td colSpan={2} className="sTd">
                            <div className="sTdCell">
                              <input type="text" id="remark" name="remark" className="sInput" value={remark || ''} style={{width:"100%"}} onChange={setApprovalForm} />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style={{display:"flex", marginTop:"50px", marginRight:"44px", justifyContent:"center"}}>
                      <button
                        className="sButton"
                        style={{
                          background: "rgb(67 79 106)",
                        }}
                        onClick={sendApproval}
                      >
                        결재상신
                      </button>
                      <button
                        className="sButton"
                        style={{
                          background: "rgb(67 79 106)",
                        }}
                        onClick={cancleWrite}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
