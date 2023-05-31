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
import SearchBarSearchButton from "components/CustomButton/SearchBarSearchButton";
import SearchBarResetButton from "components/CustomButton/SearchBarResetButton";

import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from "@mui/material";
import {
  FaCheck,
  FaPen,
  FaPlusSquare,
  FaRedoAlt,
  FaRegPlusSquare,
  FaRegSun,
  FaRegTrashAlt,
} from "react-icons/fa";
import { BsFillFilePlusFill, BsPlusSquareFill } from "react-icons/bs";
import {
  Button,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function Tables() {
  /* local axios url >> ("http://localhost:8080/url삽입")
  server axios url >> ("http://192.168.0.200:8080/KPI/url삽입") */

  const [size, setSize] = useState(14);

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
          sx={{
            ".MuiPaginationItem-root.Mui-selected": {
              border: "unset",
              color: "blue",
              background: "white",
              fontWeight: "bold",
            },
            ".MuiPaginationItem-root": {
              border: "unset",
            },
            ".Mui-disabled":{
              border:'unset'
            }
          }}
        />
        <div style={{ marginRight: "5px" }}>
          <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        </div>
      </div>
    );
  }

  const column = [
    {
      field: "id",
      headerName: "사원 번호",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "employeeCompany",
      headerName: "회사",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "employeeDept",
      headerName: "부서",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "employeeFullName", //이름으로 표시했지만 DB에 성명을
      headerName: "이름",
      width: 140,
      editable: false,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "employeeRank",
      headerName: "직급",
      width: 160,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "employeeId",
      headerName: "이메일",
      width: 367,
      editable: false,
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "employeeStatus",
      headerName: "재직상태",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
  ];

  // 부서, 직급, 직책, 재직상태 목록 조회 start

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

  const [rankList, setRankList] = useState([
    {
      code_DESCRIPTION: "",
      code_NAME: "",
      common_CODE: "",
      delete_YN: "",
      period: "",
      upper_COMMON_CODE: "",
      use_YN: "",
      REGIST_DATE: "",
      ref1: "",
    },
  ]);

  const [positionList, setPositionList] = useState([
    {
      code_DESCRIPTION: "",
      code_NAME: "",
      common_CODE: "",
      delete_YN: "",
      period: "",
      upper_COMMON_CODE: "",
      use_YN: "",
      REGIST_DATE: "",
      ref1: "",
    },
  ]);

  const [statusList, setStatusList] = useState([
    {
      code_DESCRIPTION: "",
      code_NAME: "",
      common_CODE: "",
      delete_YN: "",
      period: "",
      upper_COMMON_CODE: "",
      use_YN: "",
      REGIST_DATE: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
      setDeptList(response.data);
    });
    axios.get("http://192.168.0.200:8080/KPI/rankList.do").then((response) => {
      setRankList(response.data);
    });
    axios.get("http://192.168.0.200:8080/KPI/positionList.do").then((response) => {
      setPositionList(response.data);
    });
    axios.get("http://192.168.0.200:8080/KPI/statusList.do").then((response) => {
      setStatusList(response.data);
    });
  }, []);

  useCallback(() => {
    setDeptList(deptList);
    setRankList(rankList);
    setPositionList(positionList);
    setStatusList(statusList);
  }, [deptList, rankList, positionList, statusList]);

  // 부서, 직급, 직책, 재직상태 목록 조회 end

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
    axios.get("http://192.168.0.200:8080/KPI/employeeList.do").then((response) => {
      setEmployee(response.data);
    });
  }, []);

  useCallback(() => {
    setEmployee(employee);
  }, [employee]);

  // 사원 목록 조회 end

  //검색 start
  const [searchCompany, setsearchCompany] = useState("");
  const [searchDept, setsearchDept] = useState("");
  const [searchRank, setsearchRank] = useState("");
  const [searchId, setsearchId] = useState("");
  const [searchName, setsearchName] = useState("");
  const [searchStatus, setsearchStatus] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [includDeceased, setIncludDeceased] = useState(false);

  const searchKeySetting = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "searchByCompany") {
      setsearchCompany(value);
    } else if (name === "searchByDept") {
      setsearchDept(value);
    } else if (name === "searchByRank") {
      setsearchRank(value);
    } else if (name === "searchById") {
      setsearchId(value);
    } else if (name === "searchByName") {
      setsearchName(value);
    } else if (name === "searchByStatus") {
      console.log(value, "statusvalue");
      if (value == "all") {
        setIncludDeceased(true);
        setsearchStatus("");
      } else if (value == "") {
        console.log("퇴사자 별도");
        setIncludDeceased(false);
        setsearchStatus("");
      } else {
        setsearchStatus(value);
      }
    }
  };

  const onClickSearchBtn = () => {
    axios
      .get(
        "http://192.168.0.200:8080/KPI/searchList.do?cp=" +
          searchCompany +
          "&dp=" +
          searchDept +
          "&rk=" +
          searchRank +
          "&id=" +
          searchId +
          "&nm=" +
          searchName +
          "&st=" +
          searchStatus
      )
      .then((response) => {
        if (includDeceased === true) {
          setIsChked(true);
        } else {
          setIsChked(false);
        }
        setEmployee(response.data);
      });
    setIsSearch(true);
  };

  const setDefaultSearch = () => {
    setIncludDeceased(false);
    setIsChked(false);
    setsearchCompany("");
    setsearchDept("");
    setsearchRank("");
    setsearchId("");
    setsearchName("");
    setsearchStatus("");
    axios.get("http://192.168.0.200:8080/KPI/employeeList.do").then((response) => {
      setEmployee(response.data);
    });
  };
  // 검색 end

  // 체크박스 이벤트 start
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setSelectionModel([]);
  }, []);

  useCallback(() => {
    setSelectionModel(selectionModel);
  }, [selectionModel]);
  //console.log(selectionModel);
  // 체크박스 이벤트 end

  // 대상 정보보기(더블클릭) start
  const onDoubleClickCell = (e) => {
    console.log(e.id, " < - id!!");
    axios.get("http://192.168.0.200:8080/KPI/modifyInfo.do?id=" + e.id).then((response) => {
      setModifyTarget(response.data);
      modifyToggle();
    });
  };
  // 대상 정보보기(더블클릭) end

  // 삭제대상(퇴사처리자) 보기 start
  const [isChked, setIsChked] = useState(false);
  const chkDeleteEmply = () => {
    setIsChked(!isChked);
  };
  // 삭제대상(퇴사처리자) 보기 end

  // 사원 추가 start
  const [regModal, setRegModal] = useState(false);
  const regToggle = () => {
    setRegModal(!regModal);
    setIsFNameValid(0);
    setIsLNameValid(0);
    setIsIdValid(0);
    setIsPwValid(0);
    setIsPhoneValid(0);
    setIsHomePhoneValid(0);
    setIsLandNumValid(0);
    setIsSelectDept(false);
    setIsSelectRank(false);
  };

  const [emplyCompany, setEmplyCompany] = useState("세연아이넷");
  const [emplyFName, setEmplyFName] = useState("");
  const [emplyLName, setEmplyLName] = useState("");
  const [emplyId, setEmplyId] = useState("");
  const [emplyPw, setEmplyPw] = useState("");
  const [emplyFPhone, setEmplyFPhone] = useState("");
  const [emplyLPhone, setEmplyLPhone] = useState("");
  const [emplyFHomePhone, setEmplyFHomePhone] = useState("");
  const [emplyLHomePhone, setEmplyLHomePhone] = useState("");
  const [emplyFLandnum, setEmplyFLandnum] = useState("");
  const [emplyLLandnum, setEmplyLLandnum] = useState("");
  const [emplyDept, setEmplyDept] = useState("default");
  const [emplyRank, setEmplyRank] = useState("default");
  const [emplyPosition, setEmplyPosition] = useState("default");

  //사원번호 생성 start
  const [emplyArr, setEmplyArr] = useState([]);
  const [NumArr, setNumArr] = useState([]);
  const [maxNum, setMaxNum] = useState(0);
  let now = new Date();
  let year = now.getFullYear().toString();
  let seq = 0;

  useEffect(() => {
    const arr = [];
    employee.map((e) => e.id.slice(0, 4) === year && arr.push(e.id));
    setEmplyArr(arr);
  }, [employee]);

  useEffect(() => {
    setEmplyArr(emplyArr);
    setNumArr([]);
    emplyArr.map((e) => setNumArr((num) => [...num, Number(e.slice(4))]));
  }, [emplyArr]);

  useEffect(() => {
    setNumArr(NumArr);
    //console.log(NumArr.sort((a,b)=>b-a)[0])
    setMaxNum(NumArr.sort((a, b) => b - a)[0]);
  }, [NumArr]);

  useCallback(() => {
    setEmplyArr(emplyArr);
    setNumArr(NumArr);
  }, [emplyArr, NumArr]);

  if (maxNum + 1 < 10) {
    seq = "00" + (maxNum + 1);
  } else if (maxNum + 1 >= 10 && maxNum + 1 < 100) {
    seq = "0" + (maxNum + 1);
  } else if (maxNum + 1 >= 100) {
    seq = maxNum + 1;
  }
  //사원번호 생성 end

  //유효성검사 start
  //성
  const [isFNameValid, setIsFNameValid] = useState(0);
  const FNameVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const nameCheck = /([^가-힣\x20])/i;
    if (val === "") {
      setIsFNameValid(0);
    } else if (nameCheck.test(val)) {
      setIsFNameValid(true);
    } else {
      setIsFNameValid(false);
    }
  };
  //이름
  const [isLNameValid, setIsLNameValid] = useState(0);
  const LNameVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const nameCheck = /([^가-힣\x20])/i;
    if (val === "") {
      setIsLNameValid(0);
    } else if (nameCheck.test(val)) {
      setIsLNameValid(true);
    } else {
      setIsLNameValid(false);
    }
  };

  // 아이디
  const [isIdValid, setIsIdValid] = useState(0);

  const idVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);
    setIdDuplCheck(false);

    if (e.key.match(/[^0-9]/g)) {
      e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, "");
    }

    const idCheck = /^[A-Za-z0-9]{5,15}$/;
    if (val === "") {
      setIsIdValid(0);
    } else if (idCheck.test(val)) {
      setIsIdValid(false);
    } else {
      setIsIdValid(true);
    }
  };

  //아이디 중복검사
  const [idDuplCheck, setIdDuplCheck] = useState(false);

  const onClickDupleChk = () => {
    const domain = document.getElementById("emplyDomain").value;
    console.log("중복확인");
    axios
      .get("http://192.168.0.200:8080/KPI/idDupleCheck.do?employeeId=" + emplyId + domain)
      .then((response) => {
        if (response.data === 0) {
          alert("사용가능한 아이디입니다.");
          setIdDuplCheck(true);
        } else {
          alert("중복된 아이디입니다. 다른 아이디를 사용해주세요!");
          setIsIdValid(true);
          setIdDuplCheck(false);
        }
      });
  };

  // 비밀번호
  const [isPwValid, setIsPwValid] = useState(0);

  const pwVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const againCheck = /(\w)\1\1\1/;
    let ascSeqCharCnt = 0; // 오름차순 연속 문자 카운트
    let descSeqCharCnt = 0; // 내림차순 연속 문자 카운트
    let char_0;
    let char_1;
    let char_2;
    let diff_0_1;
    let diff_1_2;

    for (var i = 0; i < val.length; i++) {
      // charAt(): 문자값 반환
      char_0 = val.charAt(i);
      char_1 = val.charAt(i + 1);
      char_2 = val.charAt(i + 2);

      // charCodeAt(): 유니코드값 반환
      diff_0_1 = char_0.charCodeAt(0) - char_1.charCodeAt(0);
      diff_1_2 = char_1.charCodeAt(0) - char_2.charCodeAt(0);

      if (diff_0_1 === 1 && diff_1_2 === 1) {
        ascSeqCharCnt += 1;
      }

      if (diff_0_1 === -1 && diff_1_2 === -1) {
        descSeqCharCnt += 1;
      }
    }

    if (val === "") {
      setIsPwValid(0);
    } else if (pwCheck.test(val)) {
      setIsPwValid(false);
    } else {
      setIsPwValid(true);
    }

    if (isPwValid === false) {
      if (againCheck.test(val)) {
        setIsPwValid(true);
      } else if (ascSeqCharCnt > 1 || descSeqCharCnt > 1) {
        setIsPwValid(true);
      } else {
        setIsPwValid(false);
      }
    }
  };

  // 휴대연락처
  const [isPhoneValid, setIsPhoneValid] = useState(0);

  const phoneValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const phoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsPhoneValid(0);
    } else if (phoneCheck.test(val)) {
      setIsPhoneValid(false);
    } else {
      setIsPhoneValid(true);
    }
  };

  // 자택연락처
  const [isHomePhoneValid, setIsHomePhoneValid] = useState(0);

  const homePhoneValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const homePhoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsHomePhoneValid(0);
    } else if (homePhoneCheck.test(val)) {
      setIsHomePhoneValid(false);
    } else {
      setIsHomePhoneValid(true);
    }
  };

  // 내선번호
  const [isLandNumValid, setIsLandNumValid] = useState(0);

  const landNumValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const phoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsLandNumValid(0);
    } else if (phoneCheck.test(val)) {
      setIsLandNumValid(false);
    } else {
      setIsLandNumValid(true);
    }
  };
  //유효성검사 end

  const infoSetting = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    if (name === "emplyCompany") {
      setEmplyCompany(value);
    } else if (name === "emplyFName") {
      setEmplyFName(value);
    } else if (name === "emplyLName") {
      setEmplyLName(value);
    } else if (name === "emplyId") {
      setEmplyId(value);
    } else if (name === "emplyPw") {
      setEmplyPw(value);
    } else if (name === "emplyFPhone") {
      setEmplyFPhone(value);
    } else if (name === "emplyLPhone") {
      setEmplyLPhone(value);
    } else if (name === "emplyFHomePhone") {
      setEmplyFHomePhone(value);
    } else if (name === "emplyLHomePhone") {
      setEmplyLHomePhone(value);
    } else if (name === "emplyFLandnum") {
      setEmplyFLandnum(value);
    } else if (name === "emplyLLandnum") {
      setEmplyLLandnum(value);
    } else if (name === "emplyDept") {
      setEmplyDept(value);
    } else if (name === "emplyRank") {
      setEmplyRank(value);
    } else if (name === "emplyPosition") {
      setEmplyPosition(value);
    }
  };

  // 부서 선택으로 직급가르기 start
  const [isLab, setIsLab] = useState(false);
  const [isSelectDept, setIsSelectDept] = useState(false);

  useEffect(() => {
    setEmplyDept(emplyDept);
    setIsSelectDept(true);
    const lab = deptList.filter((dl) => dl.workValue === "연구소").map((dl) => dl.deptCode);

    if (lab.includes(emplyDept)) {
      console.log("islab");
      setIsLab(true);
    } else {
      console.log("notlab");
      setIsLab(false);
    }
  }, [emplyDept]);

  useEffect(() => {
    setRankList(rankList);
  }, [rankList]);
  // 부서 선택으로 직급가르기 end

  // 직급 선택으로 직책가르기 start
  const [isCeo, setIsCeo] = useState(false);
  const [isExecutives, setIsExecutives] = useState(false);
  const [isTl, setIsTl] = useState(false);
  const [isTm, setIsTm] = useState(false);
  const [isIntern, setIsIntern] = useState(false);
  const [isSelectRank, setIsSelectRank] = useState(false);

  useEffect(() => {
    setEmplyRank(emplyRank);
    setIsSelectRank(true);
    const ceo = rankList.filter((rl) => Number(rl.ref1) === 0).map((rl) => rl.common_CODE);
    const executives = rankList.filter((rl) => Number(rl.ref1) === 1).map((rl) => rl.common_CODE);
    const teamLeader = rankList.filter((rl) => Number(rl.ref1) === 2).map((rl) => rl.common_CODE);
    const teamMember = rankList.filter((rl) => Number(rl.ref1) === 3).map((rl) => rl.common_CODE);
    const intern = rankList.filter((rl) => Number(rl.ref1) === 999).map((rl) => rl.common_CODE);

    if (ceo.includes(emplyRank)) {
      console.log("대표");
      setIsCeo(true);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (executives.includes(emplyRank)) {
      console.log("임원");
      setIsCeo(false);
      setIsExecutives(true);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamLeader.includes(emplyRank)) {
      console.log("팀장");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(true);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamMember.includes(emplyRank)) {
      console.log("팀원");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(true);
      setIsIntern(false);
    } else if (intern.includes(emplyRank)) {
      console.log("수습");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(true);
    }
  }, [emplyRank]);

  useEffect(() => {
    setPositionList(positionList);
  }, [positionList]);
  // 직급 선택으로 직책가르기 end

  const onClickReg = (e) => {
    const emplyNum = document.getElementById("emplyNum").value;
    const domain = document.getElementById("emplyDomain").value;
    const registrant = sessionStorage.getItem("id");

    const params = new URLSearchParams();
    params.append("id", emplyNum);
    params.append("employeeCompany", emplyCompany);
    params.append("employeeId", emplyId + domain);
    params.append("employeePw", emplyPw);
    params.append("employeeFirstName", emplyFName);
    params.append("employeeLastName", emplyLName);
    params.append("employeeFullName", emplyFName + emplyLName);
    params.append("employeeDept", emplyDept);
    params.append("employeeRank", emplyRank);
    params.append("employeePosition", emplyPosition);
    params.append("employeePhone", emplyFPhone + emplyLPhone);
    params.append("employeeHomePhone", emplyFHomePhone + emplyLHomePhone);
    params.append("employeeLandLineNum", emplyFLandnum + emplyLLandnum);
    params.append("registrant", registrant);

    //등록 전 유효성 검증 start
    e.preventDefault();

    if (emplyFName === "") {
      alert("사원 이름을 입력하세요.");
      return false;
    }
    if (isFNameValid === true) {
      alert("이름을 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyLName === "") {
      alert("사원 이름을 입력하세요.");
      return false;
    }
    if (isLNameValid === true) {
      alert("이름을 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyId === "") {
      alert("사원 아이디를 입력하세요.");
      return false;
    }
    if (isIdValid === true) {
      alert("사원 아이디를 형식에 맞게 입력하세요.");
      return false;
    }
    if (idDuplCheck === false) {
      alert("아이디 중복검사를 진행해주세요.");
      return false;
    }
    if (emplyPw === "") {
      alert("사원 암호를 입력하세요.");
      return false;
    }
    if (isPwValid === true) {
      alert("암호를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyFPhone === "" || emplyLPhone === "") {
      alert("휴대연락처를 입력하세요.");
      return false;
    }
    if (isPhoneValid === true) {
      alert("휴대연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (isHomePhoneValid === true) {
      alert("자택연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyFHomePhone === "" && emplyLHomePhone !== "") {
      alert("자택연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyFHomePhone !== "" && emplyLHomePhone === "") {
      alert("자택연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (isLandNumValid === true) {
      alert("내선번호를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyFLandnum === "" && emplyLLandnum !== "") {
      alert("내선번호를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyFLandnum !== "" && emplyLLandnum === "") {
      alert("내선번호를 형식에 맞게 입력하세요.");
      return false;
    }
    if (emplyCompany === "default") {
      alert("사원 소속 기업을 선택하세요.");
      return false;
    }
    if (emplyDept === "default") {
      alert("사원 소속 부서를 선택하세요.");
      return false;
    }
    if (emplyRank === "default") {
      alert("사원 직급을 선택하세요.");
      return false;
    }
    if (emplyPosition === "default") {
      alert("사원 직책을 선택하세요.");
      return false;
    }

    //등록 전 유효성 검증 end

    axios
      .post("http://192.168.0.200:8080/KPI/employeeReg.do?employeeVo=" + params + "&id=" + emplyNum)
      .then((response) => {
        if (response.data === 1) {
          alert("등록되엇습니다.");
          axios.get("http://192.168.0.200:8080/KPI/employeeList.do").then((response) => {
            setEmployee(response.data);
            setSelectionModel([]);
            setIsSelectDept(false);
            setIsSelectRank(false);
          });
          setRegModal(!regModal);
        } else {
          alert("실패.");
          setRegModal(!regModal);
        }
      });
  };
  // 사원 추가 end

  // 사원 정보 수정 start
  const [modifyModal, setModifyModal] = useState(false);
  const modifyToggle = () => {
    setModifyModal(!modifyModal);
    setIsModifyFNameValid(0);
    setIsModifyLNameValid(0);
    setIsModifyIdValid(0);
    setIsModifyPwValid(0);
    setIsModifyPhoneValid(0);
    setIsModifyHomePhoneValid(0);
    setIsModifyLandNumValid(0);
    /* setIsModifyLandNumValid(0);
    if(modifyModal === true){
      setSelectionModel([]);
    } */
  };

  const [modifyTarget, setModifyTarget] = useState([
    {
      id: "",
      employeeCompany: "",
      employeeId: "",
      employeePw: "",
      employeeFirstName: "",
      employeeLastName: "",
      employeeDept: "",
      employeeRank: "",
      employeePosition: "",
      employeeStatus: "",
      employeeAuthor: "",
      employeePhone: "",
      employeeHomePhone: "",
      employeeLandLineNum: "",
      employeeFullName: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  const onClickModifyModal = () => {
    if (selectionModel.length === 0) {
      alert("수정대상을 1명 선택해주세요.");
      return false;
    } else if (selectionModel.length > 1) {
      alert("수정대상은 1명 이상 선택할 수 없습니다.");
      return false;
    } else {
      axios
        .get("http://192.168.0.200:8080/KPI/modifyInfo.do?id=" + selectionModel)
        .then((response) => {
          setModifyTarget(response.data);
          modifyToggle();
        });
    }
  };

  //수정대상 부서 - 직급 - 직책 가르기 start
  const [tDeptWorkVal, setTDeptWorkVal] = useState("");
  const [tDeptCode, setTDeptCode] = useState("");

  useEffect(() => {
    setModifyTarget(modifyTarget);
    const tDept = modifyTarget.map((m) => m.employeeDept).toString();
    setTDeptCode(tDept);

    for (let i = 0; i < deptList.length; i++) {
      if (deptList[i].deptCode === tDept) {
        setTDeptWorkVal(deptList[i].workValue);
        console.log(deptList[i].workValue);
      }
    }

    const tRank = modifyTarget.map((m) => m.employeeRank).toString();

    const ceo = rankList.filter((rl) => Number(rl.ref1) === 0).map((rl) => rl.common_CODE);
    const executives = rankList.filter((rl) => Number(rl.ref1) === 1).map((rl) => rl.common_CODE);
    const teamLeader = rankList.filter((rl) => Number(rl.ref1) === 2).map((rl) => rl.common_CODE);
    const teamMember = rankList.filter((rl) => Number(rl.ref1) === 3).map((rl) => rl.common_CODE);
    const intern = rankList.filter((rl) => Number(rl.ref1) === 999).map((rl) => rl.common_CODE);

    if (ceo.includes(tRank)) {
      console.log("대표");
      setIsCeo(true);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (executives.includes(tRank)) {
      console.log("임원");
      setIsCeo(false);
      setIsExecutives(true);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamLeader.includes(tRank)) {
      console.log("팀장");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(true);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamMember.includes(tRank)) {
      console.log("팀원");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(true);
      setIsIntern(false);
    } else if (intern.includes(tRank)) {
      console.log("수습");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(true);
    }
  }, [modifyTarget]);

  const onChangeTargetDept = (e) => {
    console.log(e.target.value);
    const changeDept = e.target.value;
    setTDeptCode(changeDept);
    for (let i = 0; i < deptList.length; i++) {
      if (deptList[i].deptCode === changeDept) {
        setTDeptWorkVal(deptList[i].workValue);
        console.log(deptList[i].workValue);
      }
    }
  };

  const onChangeTargetRank = (e) => {
    console.log(e.target.value);
    const chageRank = e.target.value;

    const ceo = rankList.filter((rl) => Number(rl.ref1) === 0).map((rl) => rl.common_CODE);
    const executives = rankList.filter((rl) => Number(rl.ref1) === 1).map((rl) => rl.common_CODE);
    const teamLeader = rankList.filter((rl) => Number(rl.ref1) === 2).map((rl) => rl.common_CODE);
    const teamMember = rankList.filter((rl) => Number(rl.ref1) === 3).map((rl) => rl.common_CODE);
    const intern = rankList.filter((rl) => Number(rl.ref1) === 999).map((rl) => rl.common_CODE);

    if (ceo.includes(chageRank)) {
      console.log("대표");
      setIsCeo(true);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (executives.includes(chageRank)) {
      console.log("임원");
      setIsCeo(false);
      setIsExecutives(true);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamLeader.includes(chageRank)) {
      console.log("팀장");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(true);
      setIsTm(false);
      setIsIntern(false);
    } else if (teamMember.includes(chageRank)) {
      console.log("팀원");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(true);
      setIsIntern(false);
    } else if (intern.includes(chageRank)) {
      console.log("수습");
      setIsCeo(false);
      setIsExecutives(false);
      setIsTl(false);
      setIsTm(false);
      setIsIntern(true);
    }
  };
  //수정대상 부서 - 직급 - 직책 가르기 end

  //수정 유효성검사 start
  //성
  const [isModifyFNameValid, setIsModifyFNameValid] = useState(0);
  const modifyFNameVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const nameCheck = /([^가-힣\x20])/i;
    if (val === "") {
      setIsModifyFNameValid(0);
    } else if (nameCheck.test(val)) {
      setIsModifyFNameValid(true);
    } else {
      setIsModifyFNameValid(false);
    }
  };
  //이름
  const [isModifyLNameValid, setIsModifyLNameValid] = useState(0);
  const modifyLNameVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const nameCheck = /([^가-힣\x20])/i;
    if (val === "") {
      setIsModifyLNameValid(0);
    } else if (nameCheck.test(val)) {
      setIsModifyLNameValid(true);
    } else {
      setIsModifyLNameValid(false);
    }
  };

  // 아이디
  const [isModifyIdValid, setIsModifyIdValid] = useState(0);

  const modifyIdVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);
    setModifyIdDuplCheck(false);

    if (e.key.match(/[^0-9]/g)) {
      e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, "");
    }

    const idCheck = /^[A-Za-z0-9]{5,15}$/;
    if (val === "") {
      setIsModifyIdValid(0);
    } else if (idCheck.test(val)) {
      setIsModifyIdValid(false);
    } else {
      setIsModifyIdValid(true);
    }
  };

  //아이디 중복검사
  const [modifyIdDuplCheck, setModifyIdDuplCheck] = useState(true);

  const onClickModifyDupleChk = () => {
    const domain = document.getElementById("emplyDomain").value;
    const modifyId = document.getElementById("modifyId").value;
    console.log("중복확인");
    axios
      .get("http://192.168.0.200:8080/KPI/idDupleCheck.do?employeeId=" + modifyId + domain)
      .then((response) => {
        if (response.data === 0) {
          alert("사용가능한 아이디입니다.");
          setModifyIdDuplCheck(true);
        } else {
          alert("중복된 아이디입니다. 다른 아이디를 사용해주세요!");
          setIsModifyIdValid(true);
          setModifyIdDuplCheck(false);
        }
      });
  };

  // 비밀번호
  const [isModifyPwValid, setIsModifyPwValid] = useState(0);

  const modifyPwVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const pwCheck = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const againCheck = /(\w)\1\1\1/;
    let ascSeqCharCnt = 0; // 오름차순 연속 문자 카운트
    let descSeqCharCnt = 0; // 내림차순 연속 문자 카운트
    let char_0;
    let char_1;
    let char_2;
    let diff_0_1;
    let diff_1_2;

    for (var i = 0; i < val.length; i++) {
      // charAt(): 문자값 반환
      char_0 = val.charAt(i);
      char_1 = val.charAt(i + 1);
      char_2 = val.charAt(i + 2);

      // charCodeAt(): 유니코드값 반환
      diff_0_1 = char_0.charCodeAt(0) - char_1.charCodeAt(0);
      diff_1_2 = char_1.charCodeAt(0) - char_2.charCodeAt(0);

      if (diff_0_1 === 1 && diff_1_2 === 1) {
        ascSeqCharCnt += 1;
      }

      if (diff_0_1 === -1 && diff_1_2 === -1) {
        descSeqCharCnt += 1;
      }
    }

    if (val === "") {
      setIsModifyPwValid(0);
    } else if (pwCheck.test(val)) {
      setIsModifyPwValid(false);
    } else {
      setIsModifyPwValid(true);
    }

    if (isPwValid === false) {
      if (againCheck.test(val)) {
        setIsModifyPwValid(true);
      } else if (ascSeqCharCnt > 1 || descSeqCharCnt > 1) {
        setIsModifyPwValid(true);
      } else {
        setIsModifyPwValid(false);
      }
    }
  };

  // 휴대연락처
  const [isModifyPhoneValid, setIsModifyPhoneValid] = useState(0);

  const modifyPhoneValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const phoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsModifyPhoneValid(0);
    } else if (phoneCheck.test(val)) {
      setIsModifyPhoneValid(false);
    } else {
      setIsModifyPhoneValid(true);
    }
  };

  // 자택연락처
  const [isModifyHomePhoneValid, setIsModifyHomePhoneValid] = useState(0);

  const modifyHomePhoneValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const homePhoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsModifyHomePhoneValid(0);
    } else if (homePhoneCheck.test(val)) {
      setIsModifyHomePhoneValid(false);
    } else {
      setIsModifyHomePhoneValid(true);
    }
  };

  // 내선번호
  const [isModifyLandNumValid, setIsModifyLandNumValid] = useState(0);

  const modifyLandNumValid = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

    const phoneCheck = /^\d{3,4}\d{4}$/;
    if (val === "") {
      setIsModifyLandNumValid(0);
    } else if (phoneCheck.test(val)) {
      setIsModifyLandNumValid(false);
    } else {
      setIsModifyLandNumValid(true);
    }
  };
  //유효성검사 end

  const onClickModify = (e) => {
    const modifyNum = document.getElementById("modifyNum").value;
    const modifyCompany = document.getElementById("modifyCompany").value;
    const modifyFName = document.getElementById("modifyFName").value;
    const modifyLName = document.getElementById("modifyLName").value;
    const modifyId = document.getElementById("modifyId").value;
    //const modifyDomain = document.getElementById("modifyDomain").value;
    const modifyPw = document.getElementById("modifyPw").value;
    const modifyFPhone = document.getElementById("modifyFPhone").value;
    const modifyLPhone = document.getElementById("modifyLPhone").value;
    const modifyFHomePhone = document.getElementById("modifyFHomePhone").value;
    const modifyLHomePhone = document.getElementById("modifyLHomePhone").value;
    const modifyFLandnum = document.getElementById("modifyFLandnum").value;
    const modifyLLandnum = document.getElementById("modifyLLandnum").value;
    const modifyDept = document.getElementById("modifyDept").value;
    const modifyRank = document.getElementById("modifyRank").value;
    const modifyPosition = document.getElementById("modifyPosition").value;
    const modifyStatus = document.getElementById("modifyStatus").value;
    const modifier = sessionStorage.getItem("id");

    const params = new URLSearchParams();
    params.append("id", modifyNum);
    params.append("employeeCompany", modifyCompany);
    params.append("employeeId", modifyId + "@syinet.com");
    params.append("employeePw", modifyPw);
    params.append("employeeFirstName", modifyFName);
    params.append("employeeLastName", modifyLName);
    params.append("employeeFullName", modifyFName + modifyLName);
    params.append("employeeDept", modifyDept);
    params.append("employeeRank", modifyRank);
    params.append("employeePosition", modifyPosition);
    params.append("employeeStatus", modifyStatus);
    params.append("employeePhone", modifyFPhone + modifyLPhone);
    params.append("employeeHomePhone", modifyFHomePhone + modifyLHomePhone);
    params.append("employeeLandLineNum", modifyFLandnum + modifyLLandnum);
    params.append("modifier", modifier);

    //수정 전 유효성 검증 start.
    e.preventDefault();

    if (modifyFName === "") {
      alert("사원 이름을 입력하세요.");
      return false;
    }
    if (isModifyFNameValid === true) {
      alert("이름을 형식에 맞게 입력하세요.");
      return false;
    }
    if (modifyLName === "") {
      alert("사원 이름을 입력하세요.");
      return false;
    }
    if (isModifyLNameValid === true) {
      alert("이름을 형식에 맞게 입력하세요.");
      return false;
    }
    if (modifyId === "") {
      alert("사원 아이디를 입력하세요.");
      return false;
    }
    if (isModifyIdValid === true) {
      alert("사원 아이디를 형식에 맞게 입력하세요.");
      return false;
    }
    if (modifyIdDuplCheck === false) {
      alert("아이디 중복검사를 진행해주세요.");
      return false;
    }
    if (modifyPw === "") {
      alert("사원 암호를 입력하세요.");
      return false;
    }
    if (isModifyPwValid === true) {
      alert("암호를 형식에 맞게 입력하세요.");
      return false;
    }
    if (isModifyPhoneValid === true) {
      alert("연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (isModifyHomePhoneValid === true) {
      alert("연락처를 형식에 맞게 입력하세요.");
      return false;
    }
    if (isModifyLandNumValid === true) {
      alert("내선번호를 형식에 맞게 입력하세요.");
      return false;
    }
    //수정 전 유효성 검증 end

    axios
      .post(
        "http://192.168.0.200:8080/KPI/employeeModify.do?employeeVo=" + params + "&id=" + modifyNum
      )
      .then((response) => {
        if (response.data === 1) {
          alert("수정되엇습니다.");
          axios.get("http://192.168.0.200:8080/KPI/employeeList.do").then((response) => {
            setEmployee(response.data);
            setSelectionModel([]);
          });
          setModifyModal(false);
        } else {
          alert("실패.");
          setModifyModal(false);
        }
      });
  };
  // 사원 정보 수정 end

  // 사원 삭제(퇴사처리) start(test)
  const onClickDelete = (selectionModel) => {
    const modifier = sessionStorage.getItem("id");
    if (selectionModel.length < 1) {
      alert("삭제 대상을 선택해주세요.");
      return false;
    } else {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        //yes
        for (let i = 0; i < selectionModel.length; i++) {
          axios
            .post(
              "http://192.168.0.200:8080/KPI/employeeDelete.do?id=" +
                selectionModel[i] +
                "&modifier=" +
                modifier
            )
            .then((response) => {
              if (response.data === 1) {
              } else {
                console.log("실패");
                return false;
              }
            });
        }
        alert("삭제되었습니다.");
        axios.get("http://192.168.0.200:8080/KPI/employeeList.do").then((response) => {
          setEmployee(response.data);
          setSelectionModel([]);
        });
      } else {
        //no
        return false;
      }
    }
  };
  // 사원 삭제(퇴사처리) end

  // 데이터그리드 설정 start
  const PAGE_SIZE = 5;

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 1,
  });

  const handleonSelectionModelChange = (newSelection) => {
    console.log("newSelection:", newSelection);
    var filterEmp =
      isChked === false && isSearch === false
        ? ""
        : isChked === true && isSearch === false
        ? ""
        : isChked === false && isSearch === true
        ? employee.filter((e) => e.employeeStatus !== "퇴사")
        : employee;

    if (newSelection.length === filterEmp.length) {
      var end = (page + 1) * size;
      if ((page + 1) * size >= filterEmp.length) {
        end = filterEmp.length;
      }

      var filterSelection = filterEmp.slice(page * size, end);
      var arrayFilterSelection = filterSelection.map((v) => v.id);
      setSelectionModel(arrayFilterSelection);
    } else {
      setSelectionModel(newSelection);
    }
  };

  const [page, setPage] = useState(0);
  const handlerpageChnage = (nowPage) => {
    setPage(nowPage);
    setSelectionModel([]);
  };

  const [selectedRow, setSelectedRow] = useState();

  const getRowClassName = (params) => {
    if (params.id == selectedRow) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick = (params, event) => {
    console.log("rowclick:", params);
    const selectedRow = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow(selectedRow);
  };
  // 데이터그리드 설정 end

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1} sx={{ marginBottom: "12px" }}>
        <Grid item xs={12}>
          <Card>
            <div className="sAreaSearch" style={{ margin: "20px",marginBottom:'10px' }}>
              <div style={{ fontWeight: "bold" }}>사원 검색</div>
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
            {/* 검색 1안 */}
            <MDBox pt={0}>
              <table className="sTable" style={{ margin: "20px", marginTop: "0px", marginBottom:'-10px' }}>
                <tbody>
                  <tr>
                    <th className="sTh">소속 기업</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <select
                            className="sInput"
                            id="searchByCompany"
                            name="searchByCompany"
                            type={"select"}
                            onChange={searchKeySetting}
                            value={searchCompany || ""}
                          >
                            <option value={""}>전체보기</option>
                            <option>세연아이넷</option>
                          </select>
                        </div>
                      </div>
                    </td>
                    <th className="sTh">부서</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <select
                            className="sInput"
                            type="select"
                            id="searchByDept"
                            name="searchByDept"
                            onChange={searchKeySetting}
                            value={searchDept || ""}
                          >
                            <option value={""}>전체보기</option>
                            {deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y').map((dl, idx) => (
                              <option key={idx} value={dl.deptCode || ""}>
                                {dl.deptName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="sTh">사원 번호</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <input
                            className="sInput"
                            id="searchById"
                            name="searchById"
                            type={"text"}
                            value={searchId}
                            onChange={searchKeySetting}
                            placeholder="사원 번호를 입력하세요.."
                          />
                        </div>
                      </div>
                    </td>
                    <th className="sTh">직급</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <select
                            className="sInput"
                            type="select"
                            id="searchByRank"
                            name="searchByRank"
                            onChange={searchKeySetting}
                            value={searchRank || ""}
                          >
                            <option value={""}>전체보기</option>
                            {rankList.map((rl, idx) => (
                              <option key={idx} value={rl.common_CODE || ""}>
                                {rl.code_NAME}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th className="sTh">이름</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <input
                            className="sInput"
                            id="searchByName"
                            name="searchByName"
                            type={"text"}
                            value={searchName}
                            onChange={searchKeySetting}
                            placeholder="이름을 입력하세요.."
                          />
                        </div>
                      </div>
                    </td>
                    <th className="sTh">재직 상태</th>
                    <td className="sTd">
                      <div className="sTdCell">
                        <div>
                          <select
                            className="sInput"
                            type="select"
                            id="searchByStatus"
                            name="searchByStatus"
                            onChange={searchKeySetting}
                            value={
                              searchStatus !== ""
                                ? searchStatus
                                : includDeceased === true
                                ? "all"
                                : ""
                            }
                          >
                            <option value={""}>전체보기</option>
                            {statusList
                              .filter((sl) => sl.code_NAME !== "퇴사")
                              .map((sl, idx) => (
                                <option key={idx} value={sl.common_CODE || ""}>
                                  {sl.code_NAME}
                                </option>
                              ))}
                            <option value={"all"}>퇴사자 포함 보기</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* 검색바 원본 #############################################################*/}
              {/* <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                        <td style={{ width: "5vw" }}>소속 기업</td>
                        <td style={{ width: "28.5vw" }}>
                          <Input
                            id="searchByCompany"
                            name="searchByCompany"
                            type={"select"}
                            onChange={searchKeySetting}
                            value={searchCompany || ""}
                          >
                            <option value={""}>전체보기</option>
                            <option>세연아이넷</option>
                          </Input>
                        </td>
                        <td style={{ width: "5vw" }}>부서</td>
                        <td style={{ width: "28.5vw" }}>
                          <Input
                            type="select"
                            id="searchByDept"
                            name="searchByDept"
                            onChange={searchKeySetting}
                            value={searchDept || ""}
                          >
                            <option value={""}>전체보기</option>
                            {deptList.map((dl, idx) => (
                              <option key={idx} value={dl.deptCode || ""}>
                                {dl.deptName}
                              </option>
                            ))}
                          </Input>
                        </td>
                      </tr>
                      <tr>
                        <td>사원 번호</td>
                        <td>
                          <Input
                            id="searchById"
                            name="searchById"
                            type={"text"}
                            value={searchId}
                            onChange={searchKeySetting}
                            placeholder="사원 번호를 입력하세요.."
                          />
                        </td>
                        <td>직급</td>
                        <td>
                          <Input
                            type="select"
                            id="searchByRank"
                            name="searchByRank"
                            onChange={searchKeySetting}
                            value={searchRank || ""}
                          >
                            <option value={""}>전체보기</option>
                            {rankList.map((rl, idx) => (
                              <option key={idx} value={rl.common_CODE || ""}>
                                {rl.code_NAME}
                              </option>
                            ))}
                          </Input>
                        </td>
                      </tr>
                      <tr>
                        <td>이름</td>
                        <td>
                          <Input
                            id="searchByName"
                            name="searchByName"
                            type={"text"}
                            value={searchName}
                            onChange={searchKeySetting}
                            placeholder="이름을 입력하세요.."
                          />
                        </td>
                        <td>재직 상태</td>
                        <td>
                          <Input
                            type="select"
                            id="searchByStatus"
                            name="searchByStatus"
                            onChange={searchKeySetting}
                            value={
                              searchStatus !== ""
                                ? searchStatus
                                : includDeceased === true
                                ? "all"
                                : ""
                            }
                          >
                            <option value={""}>전체보기</option>
                            {statusList
                              .filter((sl) => sl.code_NAME !== "퇴사")
                              .map((sl, idx) => (
                                <option key={idx} value={sl.common_CODE || ""}>
                                  {sl.code_NAME}
                                </option>
                              ))}
                            <option value={"all"}>퇴사자 포함 보기</option>
                          </Input>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <SearchBarSearchButton clickEvent={onClickSearchBtn} /> */}
              {/* <MDButton
                                variant="contained"
                                color="info"
                                style={{
                                  minWidth: "60px",
                                }}
                                onClick={onClickSearchBtn}
                                // onClick={searchButtonClick}
                              >
                                검색
                              </MDButton> */}
              {/* <SearchBarResetButton clickEvent={setDefaultSearch} /> */}
              {/* <MDButton
                                variant="contained"
                                color="secondary"
                                style={{
                                  minWidth: "80px",
                                  marginLeft: "10px",
                                }}
                                onClick={setDefaultSearch}
                                // onClick={searchButtonClick}
                              >
                                초기화
                              </MDButton> */}
              {/* </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div> */}
              {/* 검색바 원본▲ #############################################################*/}
            </MDBox>
            {/* 검색 2안 */}
            {/* <MDBox pt={0}>
                <div
                  style={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <form style={{ width: "100%" }}>
                    <table
                      style={{
                        borderSpacing: "20px 10px",
                        borderCollapse: "separate",
                        margin: "0",
                        width: "100%",
                        fontSize: "15px"
                      }}
                    >
                      <tbody style={{ width: "100%" }}>
                        <tr>
                          <td style={{width: "28.5vw"}}>
                            <FormControl>
                              <InputLabel id="companyLabel">소속 기업...</InputLabel>
                              <Select
                                id="searchByCompany"
                                name="searchByCompany"
                                type={"select"}
                                onChange={searchKeySetting}
                                value={searchCompany || ""}
                                labelId="companyLabel"
                                label="소속 기업..."
                                style={{width:"650px", height:"40px", marginRight:"50px"}}
                              >
                                <MenuItem value={""}>전체보기</MenuItem>
                                <MenuItem>세연아이넷</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{width: "28.5vw"}}>
                            <FormControl>
                              <InputLabel id="deptLabel">소속 부서...</InputLabel>
                              <Select
                                id="searchByDept"
                                name="searchByDept"
                                onChange={searchKeySetting}
                                value={searchDept || ""}
                                labelId="deptLabel"
                                label="소속 기업..."
                                style={{width:"650px", height:"40px"}}
                              >
                                <MenuItem value={""}>전체보기</MenuItem>
                                {deptList.map((dl, idx) => (
                                  <MenuItem key={idx} value={dl.deptCode || ""}>
                                    {dl.deptName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <MDInput
                              id="searchById"
                              name="searchById"
                              type={"text"}
                              value={searchId}
                              onChange={searchKeySetting}
                              label="사원 번호..."
                              style={{width:"650px", height:"40px"}}
                            />
                          </td>
                          <td>
                            <FormControl>
                              <InputLabel id="rankLabel">직급...</InputLabel>
                              <Select
                                id="searchByRank"
                                name="searchByRank"
                                onChange={searchKeySetting}
                                value={searchRank || ""}
                                labelId="rankLabel"
                                label="직급..."
                                style={{width:"650px", height:"40px"}}
                              >
                                <MenuItem value={""}>전체보기</MenuItem>
                                {rankList.map((rl, idx) => (
                                  <MenuItem key={idx} value={rl.common_CODE || ""}>
                                    {rl.code_NAME}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <MDInput
                              id="searchByName"
                              name="searchByName"
                              type={"text"}
                              value={searchName}
                              onChange={searchKeySetting}
                              label="성명..."
                              style={{width:"650px", height:"40px"}}
                            />
                          </td>
                          <td>
                           <FormControl>
                              <InputLabel id="statusLabel">재직상태...</InputLabel>
                              <Select
                                id="searchByStatus"
                                name="searchByStatus"
                                onChange={searchKeySetting}
                                value={searchStatus !== "" ? searchStatus : includDeceased === true ? "all" : ""}
                                labelId="statusLabel"
                                label="재직상태..."
                                style={{width:"650px", height:"40px"}}
                              >
                                <MenuItem value={"all"}>전체보기</MenuItem>
                                {statusList.filter(sl=>sl.code_NAME !== '퇴사').map((sl, idx) => (
                                  <MenuItem key={idx} value={sl.common_CODE || ""}>
                                    {sl.code_NAME}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <MDButton
                                variant="contained"
                                color="info"
                                style={{
                                  minWidth: "60px",
                                }}
                                onClick={onClickSearchBtn}
                                // onClick={searchButtonClick}
                              >
                                검색
                              </MDButton>
                              <MDButton
                                variant="contained"
                                color="secondary"
                                style={{
                                  minWidth: "80px",
                                  marginLeft: "10px",
                                }}
                                onClick={setDefaultSearch}
                                // onClick={searchButtonClick}
                              >
                                초기화
                              </MDButton>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </MDBox> */}
            <MDBox style={{ padding: "20px" }}>
              <div style={{ width: "100%" }}>
                {/* <MDTypography variant="h6" color="white">
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                      <div>사원목록</div>
                      <div> */}
                {/* 버튼 1안 */}
                {/* <Button
                          variant="contained"
                          style={{ all:"unset",
                          cursor:"pointer"
                        }}
                        onClick={regToggle}
                        >
                        추가 <FaRegPlusSquare style={{ marginLeft: "5px", marginRight:"15px" }} />
                        </Button>
                        <Button
                        variant="contained"
                        style={{ all:"unset",
                        cursor:"pointer"
                                }}
                                onClick={() => onClickModifyModal(selectionModel)}
                                >
                                수정 <FaRegSun style={{ marginLeft: "5px", marginRight:"15px" }} />
                                </Button>
                                <Button
                                variant="contained"
                                style={{ all:"unset",
                                cursor:"pointer"
                              }}
                              onClick={() => onClickDelete(selectionModel)}
                              >
                              삭제 <FaRegTrashAlt style={{ marginLeft: "5px", marginRight:"15px" }} />
                            </Button> */}
                {/* 버튼 2안 */}
                {/* <button style={{all:"unset", cursor:"pointer"}}>
                          <FaRegPlusSquare onClick={regToggle} style={{ width:"25px", height:"25px" }}/>
                        </button>
                        <button style={{all:"unset", cursor:"pointer"}}>
                          <FaPen onClick={() => onClickModifyModal(selectionModel)} style={{ marginLeft: "20px", width:"20px", height:"20px" }} />
                        </button>
                        <button style={{all:"unset", cursor:"pointer"}}>
                          <FaRegTrashAlt onClick={() => onClickDelete(selectionModel)} style={{ marginLeft: "20px", width:"20px", height:"20px", marginRight:"20px" }} />
                        </button>
                      </div>
                    </div>
                  </MDTypography> */}
                <div className="sTool" style={{ marginRight: "0px" }}>
                  <div style={{ width: "100%" }}>
                    <MDTypography variant="h6" color="#4e5158">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#4e5158",
                        }}
                      >
                        <div>사원 목록</div>
                        <div>
                          <RenewalTableHeadAddButton clickEvent={regToggle} />
                          <RenewalTableHeadModButton
                            clickEvent={() => onClickModifyModal(selectionModel)}
                          />
                          <RenewalTableHeadDelButton
                            clickEvent={() => onClickDelete(selectionModel)}
                          />
                          {/* EX) <RenewalTableHeadAddButton clickEvent={함수}/> */}
                        </div>
                      </div>
                    </MDTypography>
                  </div>
                </div>
              </div>
              {/* 사원 추가 modal start */}
              <Modal isOpen={regModal} toggle={regToggle} size="lg">
                <ModalHeader className="modal-header" toggle={regToggle}>
                  사원 정보 등록
                </ModalHeader>
                <ModalBody style={{ margin: "0 auto" }}>
                  <div>
                    <div className="sCard">
                      <table className="sTable" style={{ marginTop: "20px" }}>
                        <tbody>
                          <tr>
                            <th className="sTh" style={{minWidth:"120px"}}>
                              <span style={{ color: "red" }}>* </span>사원 번호
                            </th>
                            <td className="sTd">
                              <Input
                                id="emplyNum"
                                name="emplyNum"
                                type={"text"}
                                value={year + seq || ""}
                                style={{ backgroundColor: "#ebebeb" }}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>성
                            </th>
                            <td className="sTd">
                              {isFNameValid === 0 ? (
                                <Input
                                  id="emplyFName"
                                  name="emplyFName"
                                  type={"text"}
                                  onChange={infoSetting}
                                  onKeyUp={FNameVaild}
                                />
                              ) : isFNameValid === false ? (
                                <Input
                                  id="emplyFName"
                                  name="emplyFName"
                                  type={"text"}
                                  onChange={infoSetting}
                                  onKeyUp={FNameVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    id="emplyFName"
                                    name="emplyFName"
                                    type={"text"}
                                    onChange={infoSetting}
                                    onKeyUp={FNameVaild}
                                    invalid
                                  />
                                  <FormFeedback>유효한 한글값을 입력하세요.</FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>이름
                            </th>
                            <td className="sTd">
                              {isLNameValid === 0 ? (
                                <Input
                                  id="emplyLName"
                                  name="emplyLName"
                                  type={"text"}
                                  onChange={infoSetting}
                                  onKeyUp={LNameVaild}
                                />
                              ) : isLNameValid === false ? (
                                <Input
                                  id="emplyLName"
                                  name="emplyLName"
                                  type={"text"}
                                  onChange={infoSetting}
                                  onKeyUp={LNameVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    id="emplyLName"
                                    name="emplyLName"
                                    type={"text"}
                                    onChange={infoSetting}
                                    onKeyUp={LNameVaild}
                                    invalid
                                  />
                                  <FormFeedback>유효한 한글값을 입력하세요.</FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>아이디
                            </th>
                            <td className="sTd">
                              {isIdValid === 0 ? (
                                <div style={{ display: "flex" }}>
                                  <Input
                                    type={"text"}
                                    id="emplyId"
                                    name="emplyId"
                                    style={{ marginRight: "10px", width: "40%" }}
                                    onChange={infoSetting}
                                    onKeyUp={idVaild}
                                  />
                                  <Input
                                    type={"text"}
                                    id="emplyDomain"
                                    name="emplyDomain"
                                    value="@syinet.com"
                                    style={{
                                      backgroundColor: "#ebebeb",
                                      width: "38%",
                                    }}
                                    readOnly
                                  />
                                  <button
                                    className="sButton"
                                    style={{
                                      background: "gray",
                                      width:"120px"
                                    }}
                                    onClick={onClickDupleChk}
                                    disabled
                                  >
                                    중복확인
                                  </button>
                                </div>
                              ) : isIdValid === false ? (
                                <div style={{ display: "flex" }}>
                                  <Input
                                    type={"text"}
                                    id="emplyId"
                                    name="emplyId"
                                    style={{ marginRight: "10px", width: "40%" }}
                                    onChange={infoSetting}
                                    onKeyUp={idVaild}
                                    valid
                                  />
                                  <Input
                                    type={"text"}
                                    id="emplyDomain"
                                    name="emplyDomain"
                                    value="@syinet.com"
                                    style={{
                                      backgroundColor: "#ebebeb",
                                      width: "38%",
                                    }}
                                    readOnly
                                  />
                                  <button
                                    className="sButton"
                                    style={{
                                      background: "rgb(67 79 106)",
                                      width:"120px"
                                    }}
                                    onClick={onClickDupleChk}
                                  >
                                    중복확인
                                  </button>
                                </div>
                              ) : (
                                <div style={{ display: "flex" }}>
                                  <Input
                                    type={"text"}
                                    id="emplyId"
                                    name="emplyId"
                                    style={{ marginRight: "10px", width: "40%" }}
                                    onChange={infoSetting}
                                    onKeyUp={idVaild}
                                    invalid
                                  />
                                  <Input
                                    type={"text"}
                                    id="emplyDomain"
                                    name="emplyDomain"
                                    value="@syinet.com"
                                    style={{
                                      backgroundColor: "#ebebeb",
                                      width: "38%",
                                    }}
                                    readOnly
                                  />
                                  <button
                                    className="sButton"
                                    style={{
                                      background: "gray",
                                      width:"120px"
                                    }}
                                    onClick={onClickDupleChk}
                                    disabled
                                  >
                                    중복확인
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>비밀번호
                            </th>
                            <td className="sTd">
                              {isPwValid === 0 ? (
                                <Input
                                  type={"password"}
                                  id="emplyPw"
                                  name="emplyPw"
                                  onChange={infoSetting}
                                  onKeyUp={pwVaild}
                                />
                              ) : isPwValid === false ? (
                                <Input
                                  type={"password"}
                                  id="emplyPw"
                                  name="emplyPw"
                                  onChange={infoSetting}
                                  onKeyUp={pwVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    type={"password"}
                                    id="emplyPw"
                                    name="emplyPw"
                                    onChange={infoSetting}
                                    onKeyUp={pwVaild}
                                    invalid
                                  />
                                  <FormFeedback>
                                    암호는 3회이상 연속,반복 않는 8~15자리 영문,숫자,특수문자 조합으로
                                    작성하세요.
                                  </FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>휴대연락처
                            </th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="emplyFPhone"
                                  name="emplyFPhone"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  onChange={infoSetting}
                                >
                                  <option value={""} defaultChecked>
                                    선택
                                  </option>
                                  <option>010</option>
                                  <option>011</option>
                                  <option>016</option>
                                  <option>017</option>
                                  <option>018</option>
                                  <option>019</option>
                                </Input>
                                {isPhoneValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLPhone"
                                    name="emplyLPhone"
                                    onChange={infoSetting}
                                    onKeyUp={phoneValid}
                                    maxLength={8}
                                  />
                                ) : isPhoneValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLPhone"
                                    name="emplyLPhone"
                                    onChange={infoSetting}
                                    onKeyUp={phoneValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="emplyLPhone"
                                    name="emplyLPhone"
                                    onChange={infoSetting}
                                    onKeyUp={phoneValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">자택연락처</th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="emplyFHomePhone"
                                  name="emplyFHomePhone"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  onChange={infoSetting}
                                >
                                  <option value={""} defaultChecked>
                                    선택
                                  </option>
                                  <option>010</option>
                                  <option>011</option>
                                  <option>016</option>
                                  <option>017</option>
                                  <option>018</option>
                                  <option>019</option>
                                  <option>02</option>
                                  <option>031</option>
                                  <option>032</option>
                                  <option>042</option>
                                  <option>044</option>
                                  <option>051</option>
                                  <option>052</option>
                                  <option>062</option>
                                  <option>063</option>
                                  <option>064</option>
                                </Input>
                                {isHomePhoneValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLHomePhone"
                                    name="emplyLHomePhone"
                                    onChange={infoSetting}
                                    onKeyUp={homePhoneValid}
                                    maxLength={8}
                                  />
                                ) : isHomePhoneValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLHomePhone"
                                    name="emplyLHomePhone"
                                    onChange={infoSetting}
                                    onKeyUp={homePhoneValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="emplyLHomePhone"
                                    name="emplyLHomePhone"
                                    onChange={infoSetting}
                                    onKeyUp={homePhoneValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">내선번호</th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="emplyFLandnum"
                                  name="emplyFLandnum"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  onChange={infoSetting}
                                >
                                  <option value={""} defaultChecked>
                                    선택
                                  </option>
                                  <option>02</option>
                                  <option>031</option>
                                  <option>032</option>
                                  <option>042</option>
                                  <option>044</option>
                                  <option>051</option>
                                  <option>052</option>
                                  <option>062</option>
                                  <option>063</option>
                                  <option>064</option>
                                </Input>
                                {isLandNumValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLLandnum"
                                    name="emplyLLandnum"
                                    onChange={infoSetting}
                                    onKeyUp={landNumValid}
                                    maxLength={8}
                                  />
                                ) : isLandNumValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="emplyLLandnum"
                                    name="emplyLLandnum"
                                    onChange={infoSetting}
                                    onKeyUp={landNumValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="emplyLLandnum"
                                    name="emplyLLandnum"
                                    onChange={infoSetting}
                                    onKeyUp={landNumValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>소속 기업
                            </th>
                            <td className="sTd">
                              <Input
                                id="emplyCompany"
                                name="emplyCompany"
                                type={"select"}
                                onChange={infoSetting}
                                defaultValue={"세연아이넷"}
                              >
                                <option value={"default"} hidden>
                                  == 기업을 선택하세요 ==
                                </option>
                                <option>세연아이넷</option>
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>부서
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="emplyDept"
                                name="emplyDept"
                                onChange={infoSetting}
                              >
                                <option value={"default"} hidden>
                                  == 부서를 선택하세요 ==
                                </option>
                                {deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y').map((dl, idx) => (
                                  <option key={idx} value={dl.deptCode || ""}>
                                    {dl.deptName}
                                  </option>
                                ))}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>직급
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="emplyRank"
                                name="emplyRank"
                                onChange={infoSetting}
                                disabled={isSelectDept !== true ? true : false}
                              >
                                <option value={"default"} hidden>
                                  == 직급을 선택하세요 ==
                                </option>
                                {emplyDept !== "DP000"
                                  ? isLab === true
                                    ? rankList
                                        .filter(
                                          (r) =>
                                            r.code_DESCRIPTION !== "일반사무" &&
                                            r.code_NAME !== "대표이사"
                                        )
                                        .map((rl, idx) => (
                                          <option key={idx} value={rl.common_CODE || ""}>
                                            {rl.code_NAME}
                                          </option>
                                        ))
                                    : rankList
                                        .filter(
                                          (r) =>
                                            r.code_DESCRIPTION !== "연구직" &&
                                            r.code_NAME !== "대표이사"
                                        )
                                        .map((rl, idx) => (
                                          <option key={idx} value={rl.common_CODE || ""}>
                                            {rl.code_NAME}
                                          </option>
                                        ))
                                  : isLab === true
                                  ? rankList
                                      .filter((r) => r.code_DESCRIPTION !== "일반사무")
                                      .map((rl, idx) => (
                                        <option key={idx} value={rl.common_CODE || ""}>
                                          {rl.code_NAME}
                                        </option>
                                      ))
                                  : rankList
                                      .filter((r) => r.code_DESCRIPTION !== "연구직")
                                      .map((rl, idx) => (
                                        <option key={idx} value={rl.common_CODE || ""}>
                                          {rl.code_NAME}
                                        </option>
                                      ))}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>직책
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="emplyPosition"
                                name="emplyPosition"
                                onChange={infoSetting}
                                disabled={isSelectRank !== true ? true : false}
                              >
                                <option value={"default"} hidden>
                                  == 직책을 선택하세요 ==
                                </option>
                                {isCeo === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 0)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isExecutives === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 1 || Number(pl.ref1) === 2)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isTl === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 2 || Number(pl.ref1) === 3)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isTm === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 3)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isIntern === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 999)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : (
                                  <></>
                                )}
                              </Input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <form>
                    <table
                      style={{
                        borderSpacing: "20px 10px",
                        borderCollapse: "separate",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      
                    </table>
                  </form>
                </ModalBody>
                <ModalFooter className="modal-button">
                  <button
                    className="sButton"
                    style={{
                      background: "rgb(67 79 106)",
                    }}
                    onClick={onClickReg}
                  >
                    등록
                  </button>
                  <button
                    className="sButton"
                    style={{
                      background: "gray",
                    }}
                    onClick={regToggle}
                  >
                    취소
                  </button>
                </ModalFooter>
              </Modal>
              {/* 사원 추가 modal end */}
              {/* 사원 수정 modal start */}
              <Modal isOpen={modifyModal} toggle={modifyToggle} size="lg">
                <ModalHeader toggle={modifyToggle}>사원 정보 수정</ModalHeader>
                <ModalBody style={{ margin: "0 auto" }}>
                  {modifyTarget.map((t, idx) => (
                  <div key={idx}>
                    <div className="sCard">
                      <table className="sTable" style={{ marginTop: "20px" }}>
                      <tbody>
                          <tr>
                            <th className="sTh" style={{minWidth:"120px"}}>
                              <span style={{ color: "red" }}>* </span>사원 번호
                            </th>
                            <td className="sTd">
                              <Input
                                id="modifyNum"
                                name="modifyNum"
                                type={"text"}
                                value={t.id || ""}
                                style={{ backgroundColor: "#ebebeb" }}
                                readOnly
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>성
                            </th>
                            <td className="sTd">
                              {isModifyFNameValid === 0 ? (
                                <Input
                                  id="modifyFName"
                                  name="modifyFName"
                                  type={"text"}
                                  defaultValue={t.employeeFirstName || ""}
                                  onKeyUp={modifyFNameVaild}
                                />
                              ) : isModifyFNameValid === false ? (
                                <Input
                                  id="modifyFName"
                                  name="modifyFName"
                                  type={"text"}
                                  defaultValue={t.employeeFirstName || ""}
                                  onKeyUp={modifyFNameVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    id="modifyFName"
                                    name="modifyFName"
                                    type={"text"}
                                    defaultValue={t.employeeFirstName || ""}
                                    onKeyUp={modifyFNameVaild}
                                    invalid
                                  />
                                  <FormFeedback>유효한 한글값을 입력하세요.</FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>이름
                            </th>
                            <td className="sTd">
                              {isModifyLNameValid === 0 ? (
                                <Input
                                  id="modifyLName"
                                  name="modifyLName"
                                  type={"text"}
                                  defaultValue={t.employeeLastName || ""}
                                  onKeyUp={modifyLNameVaild}
                                />
                              ) : isModifyLNameValid === false ? (
                                <Input
                                  id="modifyLName"
                                  name="modifyLName"
                                  type={"text"}
                                  defaultValue={t.employeeLastName || ""}
                                  onKeyUp={modifyLNameVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    id="modifyLName"
                                    name="modifyLName"
                                    type={"text"}
                                    defaultValue={t.employeeLastName || ""}
                                    onKeyUp={modifyLNameVaild}
                                    invalid
                                  />
                                  <FormFeedback>유효한 한글값을 입력하세요.</FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>아이디
                            </th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                {/* <Input
                                  type={"text"}
                                  id="modifyId"
                                  name="modifyId"
                                  value={t.employeeId || ""}
                                  style={{ backgroundColor: "#ebebeb" }}
                                  readOnly
                                /> */}
                                {isModifyIdValid === 0 ? (
                                  <div style={{ display: "flex" }}>
                                    <Input
                                      type={"text"}
                                      id="modifyId"
                                      name="modifyId"
                                      style={{ marginRight: "10px", width: "40%" }}
                                      defaultValue={t.employeeId.split("@", 1)}
                                      onKeyUp={modifyIdVaild}
                                    />
                                    <Input
                                      type={"text"}
                                      id="modifyDomain"
                                      name="modifyDomain"
                                      value="@syinet.com"
                                      style={{
                                        backgroundColor: "#ebebeb",
                                        width: "38%",
                                      }}
                                      readOnly
                                    />
                                    <button
                                      className="sButton"
                                      style={{
                                        background: "gray",
                                        width:"120px"
                                      }}
                                      onClick={onClickModifyDupleChk}
                                      disabled
                                    >
                                      중복확인
                                    </button>
                                  </div>
                                ) : isModifyIdValid === false ? (
                                  <div style={{ display: "flex" }}>
                                    <Input
                                      type={"text"}
                                      id="modifyId"
                                      name="modifyId"
                                      style={{ marginRight: "10px", width: "40%" }}
                                      defaultValue={t.employeeId.split("@", 1)}
                                      onKeyUp={modifyIdVaild}
                                      valid
                                    />
                                    <Input
                                      type={"text"}
                                      id="emplyDomain"
                                      name="emplyDomain"
                                      value="@syinet.com"
                                      style={{
                                        backgroundColor: "#ebebeb",
                                        width: "38%",
                                      }}
                                      readOnly
                                    />
                                    <button
                                      className="sButton"
                                      style={{
                                        background: "rgb(67 79 106)",
                                        width:"120px"
                                      }}
                                      onClick={onClickModifyDupleChk}
                                    >
                                      중복확인
                                    </button>
                                  </div>
                                ) : (
                                  <div style={{ display: "flex" }}>
                                    <Input
                                      type={"text"}
                                      id="modifyId"
                                      name="modifyId"
                                      style={{ marginRight: "10px", width: "40%" }}
                                      defaultValue={t.employeeId.split("@", 1)}
                                      onKeyUp={modifyIdVaild}
                                      invalid
                                    />
                                    <Input
                                      type={"text"}
                                      id="emplyDomain"
                                      name="emplyDomain"
                                      value="@syinet.com"
                                      style={{
                                        backgroundColor: "#ebebeb",
                                        width: "40%",
                                      }}
                                      readOnly
                                    />
                                    <button
                                      className="sButton"
                                      style={{
                                        background: "gray",
                                        width:"120px"
                                      }}
                                      onClick={onClickModifyDupleChk}
                                      disabled
                                    >
                                      중복확인
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>비밀번호
                            </th>
                            <td className="sTd">
                              {isModifyPwValid === 0 ? (
                                <Input
                                  type={"password"}
                                  id="modifyPw"
                                  name="modifyPw"
                                  defaultValue={t.employeePw || ""}
                                  onKeyUp={modifyPwVaild}
                                />
                              ) : isModifyPwValid === false ? (
                                <Input
                                  type={"password"}
                                  id="modifyPw"
                                  name="modifyPw"
                                  defaultValue={t.employeePw || ""}
                                  onKeyUp={modifyPwVaild}
                                  valid
                                />
                              ) : (
                                <>
                                  <Input
                                    type={"password"}
                                    id="modifyPw"
                                    name="modifyPw"
                                    defaultValue={t.employeePw || ""}
                                    onKeyUp={modifyPwVaild}
                                    invalid
                                  />
                                  <FormFeedback>
                                    암호는 3회이상 연속,반복 않는 8~15자리 영문,숫자,특수문자
                                    조합으로 작성하세요.
                                  </FormFeedback>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>휴대연락처
                            </th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="modifyFPhone"
                                  name="modifyFPhone"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  defaultValue={t.employeePhone.slice(0, 3) || ""}
                                >
                                  <option value={"010"}>010</option>
                                  <option value={"011"}>011</option>
                                  <option value={"016"}>016</option>
                                  <option value={"017"}>017</option>
                                  <option value={"018"}>018</option>
                                  <option value={"019"}>019</option>
                                </Input>
                                {isModifyPhoneValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLPhone"
                                    name="modifyLPhone"
                                    defaultValue={t.employeePhone.slice(3, 11) || ""}
                                    onKeyUp={modifyPhoneValid}
                                    maxLength={8}
                                  />
                                ) : isModifyPhoneValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLPhone"
                                    name="modifyLPhone"
                                    defaultValue={t.employeePhone.slice(3, 11) || ""}
                                    onKeyUp={modifyPhoneValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="modifyLPhone"
                                    name="modifyLPhone"
                                    defaultValue={t.employeePhone.slice(3, 11) || ""}
                                    onKeyUp={modifyPhoneValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">자택연락처</th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="modifyFHomePhone"
                                  name="modifyFHomePhone"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  defaultValue={
                                    t.employeeHomePhone === null
                                      ? ""
                                      : t.employeeHomePhone.slice(0, 3)
                                  }
                                >
                                  <option value={""}>선택</option>
                                  <option value={"010"}>010</option>
                                  <option value={"011"}>011</option>
                                  <option value={"016"}>016</option>
                                  <option value={"017"}>017</option>
                                  <option value={"018"}>018</option>
                                  <option value={"019"}>019</option>
                                  <option value={"02"}>02</option>
                                  <option value={"031"}>031</option>
                                  <option value={"032"}>032</option>
                                  <option value={"042"}>042</option>
                                  <option value={"044"}>044</option>
                                  <option value={"051"}>051</option>
                                  <option value={"052"}>052</option>
                                  <option value={"062"}>062</option>
                                  <option value={"063"}>063</option>
                                  <option value={"064"}>064</option>
                                </Input>
                                {isModifyHomePhoneValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLHomePhone"
                                    name="modifyLHomePhone"
                                    defaultValue={
                                      t.employeeHomePhone === null
                                        ? ""
                                        : t.employeeHomePhone.slice(3, 11)
                                    }
                                    onKeyUp={modifyHomePhoneValid}
                                    maxLength={8}
                                  />
                                ) : isModifyHomePhoneValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLHomePhone"
                                    name="modifyLHomePhone"
                                    defaultValue={
                                      t.employeeHomePhone === null
                                        ? ""
                                        : t.employeeHomePhone.slice(3, 11)
                                    }
                                    onKeyUp={modifyHomePhoneValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="modifyLHomePhone"
                                    name="modifyLHomePhone"
                                    defaultValue={
                                      t.employeeHomePhone === null
                                        ? ""
                                        : t.employeeHomePhone.slice(3, 11)
                                    }
                                    onKeyUp={modifyHomePhoneValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">내선번호</th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  type="select"
                                  id="modifyFLandnum"
                                  name="modifyFLandnum"
                                  style={{ marginRight: "10px", width: "40%" }}
                                  defaultValue={
                                    t.employeeLandLineNum === null
                                      ? ""
                                      : t.employeeLandLineNum.slice(0, 2) === "02"
                                      ? t.employeeLandLineNum.slice(0, 2)
                                      : t.employeeLandLineNum.slice(0, 3)
                                  }
                                >
                                  <option value={""}>선택</option>
                                  <option value={"02"}>02</option>
                                  <option value={"031"}>031</option>
                                  <option value={"032"}>032</option>
                                  <option value={"042"}>042</option>
                                  <option value={"044"}>044</option>
                                  <option value={"051"}>051</option>
                                  <option value={"052"}>052</option>
                                  <option value={"062"}>062</option>
                                  <option value={"063"}>063</option>
                                  <option value={"064"}>064</option>
                                </Input>
                                {isModifyLandNumValid === 0 ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLLandnum"
                                    name="modifyLLandnum"
                                    defaultValue={
                                      t.employeeLandLineNum === null
                                        ? ""
                                        : t.employeeLandLineNum.slice(0, 2) === "02"
                                        ? t.employeeLandLineNum.slice(2, 11)
                                        : t.employeeLandLineNum.slice(3, 11)
                                    }
                                    onKeyUp={modifyLandNumValid}
                                    maxLength={8}
                                  />
                                ) : isModifyLandNumValid === false ? (
                                  <Input
                                    type={"text"}
                                    id="modifyLLandnum"
                                    name="modifyLLandnum"
                                    defaultValue={
                                      t.employeeLandLineNum === null
                                        ? ""
                                        : t.employeeLandLineNum.slice(0, 2) === "02"
                                        ? t.employeeLandLineNum.slice(2, 11)
                                        : t.employeeLandLineNum.slice(3, 11)
                                    }
                                    onKeyUp={modifyLandNumValid}
                                    maxLength={8}
                                    valid
                                  />
                                ) : (
                                  <Input
                                    type={"text"}
                                    id="modifyLLandnum"
                                    name="modifyLLandnum"
                                    defaultValue={
                                      t.employeeLandLineNum === null
                                        ? ""
                                        : t.employeeLandLineNum.slice(0, 2) === "02"
                                        ? t.employeeLandLineNum.slice(2, 11)
                                        : t.employeeLandLineNum.slice(3, 11)
                                    }
                                    onKeyUp={modifyLandNumValid}
                                    maxLength={8}
                                    invalid
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>소속 기업
                            </th>
                            <td className="sTd">
                              <Input
                                id="modifyCompany"
                                name="modifyCompany"
                                type={"select"}
                                defaultValue={t.employeeCompany || ""}
                              >
                                <option value={"세연아이넷"}>세연아이넷</option>
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>부서
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="modifyDept"
                                name="modifyDept"
                                defaultValue={t.employeeDept || ""}
                                onChange={onChangeTargetDept}
                              >
                                {deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y').map((dl, idx) => (
                                  <option key={idx} value={dl.deptCode || ""}>
                                    {dl.deptName}
                                  </option>
                                ))}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>직급
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="modifyRank"
                                name="modifyRank"
                                defaultValue={t.employeeRank || ""}
                                onChange={onChangeTargetRank}
                              >
                                {tDeptCode !== "DP000"
                                  ? tDeptWorkVal === "연구소"
                                    ? rankList
                                        .filter(
                                          (r) =>
                                            r.code_DESCRIPTION !== "일반사무" &&
                                            r.code_NAME !== "대표이사"
                                        )
                                        .map((rl, idx) => (
                                          <option key={idx} value={rl.common_CODE || ""}>
                                            {rl.code_NAME}
                                          </option>
                                        ))
                                    : rankList
                                        .filter(
                                          (r) =>
                                            r.code_DESCRIPTION !== "연구직" &&
                                            r.code_NAME !== "대표이사"
                                        )
                                        .map((rl, idx) => (
                                          <option key={idx} value={rl.common_CODE || ""}>
                                            {rl.code_NAME}
                                          </option>
                                        ))
                                  : tDeptWorkVal === "연구소"
                                  ? rankList
                                      .filter((r) => r.code_DESCRIPTION !== "일반사무")
                                      .map((rl, idx) => (
                                        <option key={idx} value={rl.common_CODE || ""}>
                                          {rl.code_NAME}
                                        </option>
                                      ))
                                  : rankList
                                      .filter((r) => r.code_DESCRIPTION !== "연구직")
                                      .map((rl, idx) => (
                                        <option key={idx} value={rl.common_CODE || ""}>
                                          {rl.code_NAME}
                                        </option>
                                      ))}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>직책
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="modifyPosition"
                                name="modifyPosition"
                                defaultValue={t.employeePosition || ""}
                              >
                                {isCeo === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 0)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isExecutives === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 1 || Number(pl.ref1) === 2)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isTl === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 2 || Number(pl.ref1) === 3)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isTm === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 3)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : isIntern === true ? (
                                  positionList
                                    .filter((pl) => Number(pl.ref1) === 999)
                                    .map((pl, idx) => (
                                      <option key={idx} value={pl.common_CODE || ""}>
                                        {pl.code_NAME}
                                      </option>
                                    ))
                                ) : (
                                  <></>
                                )}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>재직 상태
                            </th>
                            <td className="sTd">
                              <Input
                                type="select"
                                id="modifyStatus"
                                name="modifyStatus"
                                defaultValue={t.employeeStatus || ""}
                              >
                                {statusList.map((sl, idx) => (
                                  <option key={idx} value={sl.common_CODE || ""}>
                                    {sl.code_NAME}
                                  </option>
                                ))}
                              </Input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  ))}
                </ModalBody>
                <ModalFooter className="modal-button">
                  <button
                    className="sButton"
                    style={{
                      background: "rgb(67 79 106)",
                    }}
                    onClick={onClickModify}
                  >
                    수정
                  </button>
                  <button
                    className="sButton"
                    style={{
                      background: "gray",
                    }}
                    onClick={modifyToggle}
                  >
                    취소
                  </button>
                </ModalFooter>
              </Modal>
              {/* 사원 수정 modal end */}

              <MDBox>
                <DataGrid
                  disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                  getRowClassName={getRowClassName}
                  onRowClick={handleRowClick}
                  onPageChange={handlerpageChnage}
                  columns={column}
                  rows={
                    isChked === false && isSearch === false
                      ? employee.filter((e) => e.deptCode === "")
                      : isChked === true && isSearch === false
                      ? employee.filter((e) => e.deptCode === "")
                      : isChked === false && isSearch === true
                      ? employee.filter((e) => e.employeeStatus !== "퇴사")
                      : employee
                  }
                  checkboxSelection
                  onSelectionModelChange={handleonSelectionModelChange}
                  onCellDoubleClick={onDoubleClickCell}
                  selectionModel={selectionModel}
                  //  pageSizeOptions={[5]}
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
                      height: "106%!important",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                      marginTop: "39px!important",
                      height: "390px",
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
                    " .MuiDataGrid-cell:focus": {
                      outline: "unset",
                    },
                    "& .MuiDataGrid-footerContainer":{
                      backgroundColor:'#dee2e5'
                    },
                    minHeight: "calc(100vh - 450px)",
                  }}
                  components={{
                    Pagination: CustomPagination,
                  }}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[PAGE_SIZE]}
                  pageSize={size}
                  isRowSelectable={(params) => true}
                ></DataGrid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
