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

import { AppBar, Box, Icon, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import axios from "axios";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  FaCheck,
  FaPen,
  FaRedoAlt,
  FaRegPlusSquare,
  FaRegSun,
  FaRegTrashAlt,
  FaSearch,
} from "react-icons/fa";
import {
  Button,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import MDButton from "components/MDButton";
import breakpoints from "assets/theme/base/breakpoints";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";

function Tables() {
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
          width: "60%",
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
            "& .Mui-disabled":{
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
      upper_COMMON_CODE: "",
      use_YN: "",
      regist_DATE: "",
      ref1: "",
    },
  ]);

  const [positionList, setPositionList] = useState([
    {
      code_DESCRIPTION: "",
      code_NAME: "",
      common_CODE: "",
      delete_YN: "",
      upper_COMMON_CODE: "",
      use_YN: "",
      regist_DATE: "",
      ref1: "",
    },
  ]);

  const [statusList, setStatusList] = useState([
    {
      code_DESCRIPTION: "",
      code_NAME: "",
      common_CODE: "",
      delete_YN: "",
      upper_COMMON_CODE: "",
      use_YN: "",
      regist_DATE: "",
    },
  ]);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
      setDeptList(response.data);
    });
    axios.get("http://192.168.0.200:8080/KPI/deptCnt.do").then((response) => {
      setDeptCnt(response.data);
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
  
  useEffect(() => {
    setDeptTree(deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y'))
  }, [deptList])
  

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

  //탭선택 2 start
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
    console.log(newValue);
    setTabValue(newValue);
  };
  //탭선택 2 end

  // 부서목록 tree start
  const { DirectoryTree } = Tree;
  const [deptTree, setDeptTree] = useState([
    {
      deptName: "",
      deptCode: "",
      upperDeptCode: "",
      period: "",
    },
  ]);

  const createTreeData = (arr, upperCommonCode) => {
    let treeData = [];
    arr.forEach((obj) => {
      if (obj.upperDeptCode === upperCommonCode) {
        const { deptCode, deptName } = obj;
        const children = createTreeData(arr, deptCode);
        if (children.length > 0) {
          treeData.push({ title: deptName, key: deptCode, children });
        } else {
          treeData.push({ title: deptName, key: deptCode });
        }
      }
    });
    return treeData;
  };

  const newData = createTreeData(deptTree, "DP");

  const headData = [
    {
      title: "세연아이넷",
      key: "",
      children: newData,
    },
  ];

  // dnd start
  const onDragEnter = (info) => {
    console.log(info);
  };

  const onDrop = (info) => {
    console.log(info);
    const dragKey = info.dragNode.key;
    const dragPosition = Number(info.dragNode.pos.slice(-2).replace(/[-]/g, ""));
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition;
    const positionDept = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const modifier = sessionStorage.getItem("id");
    console.log(dragKey, "dragKey");
    console.log(dragPosition, "dragPosition");
    console.log(dropKey, "dropkey");
    console.log(dropPosition, "dropPosition");
    console.log(positionDept, "positionDept");

    if (dropKey === "" || dropKey === "DP999") {
      alert("해당 위치로는 이동할 수 없습니다.");
      return false;
    } else if (dragKey === "DP000" || dragKey === "DP999") {
      alert("해당 부서는 이동할 수 없습니다.");
    } else {
      axios
        .post(
          "http://192.168.0.200:8080/KPI/dndDept.do?dragKey=" +
            dragKey +
            "&dragPosition=" +
            dragPosition +
            "&dropKey=" +
            dropKey +
            "&dropPosition=" +
            dropPosition +
            "&positionDept=" +
            positionDept +
            "&modifier=" +
            modifier
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === 1) {
            axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
              setDeptList(response.data);
            });
          } else {
            alert("실패!!");
          }
        });
    }
  };
  // dnd end

  // 부서목록 tree end

  // 부서정보, 부서원 세팅 start
  const [selectedDept, setSelectedDept] = useState("DP000");
  const onClickDept = (value) => {
    setTargetInfo([]);
    setSelectedRow([]);
    console.log(value);
    console.log(transferDept);
    if (value.toString() === transferDept) {
      deptList.filter((d) => d.deptCode !== transferDept).map((dl) => setTransferDept(dl.deptCode));
    }
    const deptName = value.toString();
    console.log(deptName);
    if (deptName !== "") {
      setSelectedDept(deptName);
    }
  };
  const [deptMember, setDeptMember] = useState([
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
      employeeLandLineNum: "",
      employeeFullName: "",
      deptHeadYn: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  const [deptHead, setDeptHead] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
      .then((response) => {
        setDeptMember(response.data);
      });
  }, [selectedDept]);
  // 부서정보, 부서원 세팅 end

  // 첫번째 tab (부서정보) start

  // 부서 추가 start
  const [deptRegModal, setDeptRegModal] = useState(false);
  const deptRegModalToggle = () => {
    setSelectedUpperDept("DP");
    setNewDeptCode("");
    setNewDeptDiscription("");
    setDeptRegModal(!deptRegModal);
  };

  const [selectedUpperDept, setSelectedUpperDept] = useState("DP");
  const [newDeptCode, setNewDeptCode] = useState("");
  const [newDeptDiscription, setNewDeptDiscription] = useState("");
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptWorkValue, setNewDeptWorkValue] = useState("");

  const deptRegSet = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "upperDept") {
      setSelectedUpperDept(value);
    } else if (name === "newDeptCode") {
      setNewDeptCode(value.slice(2));
    } else if (name === "newDeptDiscription") {
      setNewDeptDiscription(value);
    } else if (name === "newDeptName") {
      setNewDeptName(value);
    } else if (name === "newDeptWorkValue") {
      setNewDeptWorkValue(value);
    }
  };

  //부서코드 생성 start
  const [deptArr, setDeptArr] = useState([]);
  const [deptNumArr, setDeptNumArr] = useState([]);
  const [maxDeptNum, setMaxDeptNum] = useState(0);
  let deptSeq = 0;

  useEffect(() => {
    const arr = [];
    deptList.map((d) => d.deptCode !== "DP999" && arr.push(d.deptCode.slice(2)));
    setDeptArr(arr);
  }, [deptList]);

  useEffect(() => {
    setDeptArr(deptArr);
    setDeptNumArr([]);
    deptArr.map((d) => setDeptNumArr((num) => [...num, Number(d)]));
  }, [deptArr]);

  useEffect(() => {
    setDeptNumArr(deptNumArr);
    console.log(deptNumArr, deptNumArr.sort((a, b) => b - a)[0])
    setMaxDeptNum(deptNumArr.sort((a, b) => b - a)[0]);
  }, [deptNumArr]);

  if (maxDeptNum + 1 < 10) {
    deptSeq = "00" + (maxDeptNum + 1);
  } else if (maxDeptNum + 1 >= 10 && maxDeptNum + 1 < 100) {
    deptSeq = "0" + (maxDeptNum + 1);
  } else if (maxDeptNum + 1 >= 100) {
    deptSeq = maxDeptNum + 1;
  }

  //부서코드 생성 end

  const onClickDeptReg = (e) => {
    const newDeptPeriod = deptList.filter((d) => d.upperDeptCode === selectedUpperDept).length - 1;
    const deptCodeSeq = document.getElementById("newDeptCode").value;
    const registrant = sessionStorage.getItem("id");

    e.preventDefault();
    if (newDeptName === "") {
      alert("부서명을 입력하세요.");
      return false;
    }
    if (newDeptWorkValue === "") {
      alert("업무 분류를 선택하세요.");
      return false;
    }

    const params = new URLSearchParams();
    params.append("deptCode", deptCodeSeq);
    params.append("upperDeptCode", selectedUpperDept);
    params.append("deptName", newDeptName);
    params.append("workValue", newDeptWorkValue);
    params.append("remarks", newDeptDiscription);
    params.append("period", newDeptPeriod);
    params.append("registrant", registrant);

    axios
      .post(
        "http://192.168.0.200:8080/KPI/deptReg.do?DeptVO=" + params + "&deptCode=" + deptCodeSeq
      )
      .then((response) => {
        if (response.data === 1) {
          alert("등록되엇습니다.");
          axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
            setDeptList(response.data);
          });
          deptRegModalToggle();
        } else {
          alert("실패.");
          deptRegModalToggle();
        }
      });
  };
  // 부서 추가 end

  // 수정 이벤트 start

  // 부서장 변경 start
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [selectedHead, setSelectedHead] = useState("");

  //부서장 setting start
  useEffect(() => {
    setDeptMember(deptMember);
    if (deptMember.length === 0) {
      setDeptHead("없음");
    } else {
      for (let i = 0; i < deptMember.length; i++) {
        if (deptMember[i].deptHeadYn === "Y") {
          setDeptHead(deptMember[i].employeeFullName);
          setSelectedHead(deptMember[i].id);
          break;
        } else {
          setDeptHead("없음");
        }
      }
    }
  }, [deptMember]);
  //부서장 setting end

  const selectHead = (e) => {
    const target = e.target.id;
    if (selectedHead === target) {
      setSelectedHead("");
    } else {
      setSelectedHead(target);
    }
  };

  const changeDeptHead = () => {
    const modifier = sessionStorage.getItem("id");
    if (selectedHead === "") {
      if (window.confirm("선택된 부서장이 없습니다. 계속 진행하시겠습니까?")) {
        alert("변경되었습니다.");
        axios
          .post(
            "http://192.168.0.200:8080/KPI/changeDeptHead.do?dept=" +
              selectedDept +
              "&head=" +
              selectedHead +
              "&modifier=" +
              modifier
          )
          .then((response) => {
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
              .then((response) => {
                setDeptMember(response.data);
              });
          });
        toggle();
      } else {
        //no
        return false;
      }
    } else {
      alert("변경되었습니다.");
      axios
        .post(
          "http://192.168.0.200:8080/KPI/changeDeptHead.do?dept=" +
            selectedDept +
            "&head=" +
            selectedHead +
            "&modifier=" +
            modifier
        )
        .then((response) => {
          axios
            .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
            .then((response) => {
              setDeptMember(response.data);
            });
        });
      toggle();
    }
  };
  // 부서장 변경 end

  // 부서장 변경후 미적용 시 선택된 부서장 초기화 start
  const cancleModal = () => {
    setSelectedHead("");
    axios
      .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
      .then((response) => {
        setDeptMember(response.data);
      });
    toggle();
  };
  // 부서장 변경후 미적용 시 선택된 부서장 초기화 end

  const [deptModify, setdeptModify] = useState(false);
  const [modifyDeptName, setModifyDeptName] = useState();
  const [modifyDeptDescription, setModifyDeptDescription] = useState();

  const onClickModify = () => {
    setdeptModify(true);
  };

  const cancleInfoModify = () => {
    setModifyDeptName("");
    setModifyDeptDescription("");
    setdeptModify(false);
  };

  const onChangeDeptInfo = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "deptName") {
      setModifyDeptName(value);
    } else if (name === "deptDescription") {
      setModifyDeptDescription(value);
    }
  };

  const saveDeptInfoModify = () => {
    const code = document.getElementById("deptCode").value;
    const name = document.getElementById("deptName").value;
    const description = document.getElementById("deptDescription").value;
    const modifier = sessionStorage.getItem("id");
    console.log(code, name, description);

    const params = new URLSearchParams();
    params.append("deptCode", code);
    params.append("deptName", name);
    params.append("remarks", description);
    params.append("modifier", modifier);

    if (window.confirm("수정하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/deptModify.do?DeptVO=" + params + "&deptCode=" + code)
        .then((response) => {
          if (response.data === 1) {
            alert("수정되었습니다.");
            axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
              setDeptList(response.data);
              setModifyDeptName("");
              setModifyDeptDescription("");
              setdeptModify(false);
            });
          } else {
            alert("실패");
            return false;
          }
        });
    } else {
      //no
      return false;
    }
  };
  // 수정 이벤트 end

  // 부서 삭제 start
  const onClickDeptDelete = () => {
    console.log(selectedDept);
    const modifier = sessionStorage.getItem("id");
    if (selectedDept === "DP000") {
      alert("해당 부서는 삭제가 불가합니다.");
      return false;
    } else {
      if (
        window.confirm(
          "현재 선택된 부서는 '" +
            document.getElementById("deptName").value +
            "' 입니다. 삭제하시겟습니까?"
        )
      ) {
        axios
          .post(
            "http://192.168.0.200:8080/KPI/deptDelete.do?deptCode=" +
              selectedDept +
              "&modifier=" +
              modifier
          )
          .then((response) => {
            if (response.data === 1) {
              alert("삭제되었습니다.");
              axios.get("http://192.168.0.200:8080/KPI/deptList.do").then((response) => {
                setDeptList(response.data);
                setSelectedDept("DP000");
              });
            } else {
              alert("실패");
              return false;
            }
          });
      } else {
        //no
        return false;
      }
    }
  };
  // 부서 삭제 end

  // 첫번째 tab(부서정보) end

  // 두번째 tab start
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
      align: "left",
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
      align: "left",
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

  const transferColumn = [
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
      align: "left",
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
  ];

  const [targetInfo, setTargetInfo] = useState([
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
      employeeLandLineNum: "",
      employeeFullName: "",
      deptHeadYn: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  // 체크박스 이벤트 start
  const [selectionModel, setSelectionModel] = useState([]);
  useEffect(() => {
    setSelectionModel([]);
  }, []);

  const handleonSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const [hyphenPhone, setHyphenPhone] = useState("");
  const [hyphenLandNum, setHyphenLandNum] = useState("");
  useEffect(() => {
    setTargetInfo(targetInfo);

    const phone = targetInfo.map((t) => t.employeePhone).toString();
    const landNum = targetInfo.map((t) => t.employeeLandLineNum).toString();

    if (phone.length < 4) {
      setHyphenPhone("-");
    } else {
      setHyphenPhone(phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3"));
    }

    if (landNum.length < 4) {
      setHyphenLandNum("-");
    } else if (landNum.startsWith("02") && (landNum.length === 9 || landNum.length === 10)) {
      setHyphenLandNum(landNum.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3"));
    } else if (!landNum.startsWith("02") && (landNum.length === 10 || landNum.length === 11)) {
      setHyphenLandNum(landNum.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3"));
    }
  }, [targetInfo]);

  // 체크박스 이벤트 end

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
  const [emplyDept, setEmplyDept] = useState(selectedDept);
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
  const [idDuplCheck, setIdDuplCheck] = useState(false);

  const idVaild = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    console.log(name, val);

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
  const [tDeptWorkVal, setTDeptWorkVal] = useState("");

  useEffect(() => {
    setEmplyDept(selectedDept);
    console.log(selectedDept);

    for (let i = 0; i < deptList.length; i++) {
      if (deptList[i].deptCode === selectedDept) {
        setTDeptWorkVal(deptList[i].workValue);
        console.log(deptList[i].workValue);
      }
    }
  }, [deptList, selectedDept]);

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
    console.log(selectedDept);
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
    params.append("employeeDept", selectedDept);
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
            setIsSelectRank(false);
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
              .then((response) => {
                setDeptMember(response.data);
                setSelectionModel([]);
              });
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
    setIsModifyPwValid(0);
    setIsModifyPhoneValid(0);
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
  const [tModifyDeptWorkVal, setTModifyDeptWorkVal] = useState("");
  const [tModifyDeptCode, setTModifyDeptCode] = useState("");

  useEffect(() => {
    setModifyTarget(modifyTarget);
    const tModifyDept = modifyTarget.map((m) => m.employeeDept).toString();
    setTModifyDeptCode(tModifyDept);

    for (let i = 0; i < deptList.length; i++) {
      if (deptList[i].deptCode === tModifyDept) {
        setTModifyDeptWorkVal(deptList[i].workValue);
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

  const onClickMemberModify = (e) => {
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
          axios
            .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
            .then((response) => {
              setDeptMember(response.data);
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
        axios
          .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
          .then((response) => {
            setDeptMember(response.data);
            setSelectionModel([]);
          });
      } else {
        //no
        alert("삭제를 취소합니다.");
        return false;
      }
    }
  };
  // 사원 삭제(퇴사처리) end

  const onDoubleClickCell = (e) => {
    console.log(e.id, " < - id!!");
    axios.get("http://192.168.0.200:8080/KPI/modifyInfo.do?id=" + e.id).then((response) => {
      setModifyTarget(response.data);
      modifyToggle();
    });
  };

  // 두번째 tab end

  // 세번째 tab start

  //데이터 그리드 및 이동부서 선택 start
  const [moveTargetMember, setMoveTargetMember] = useState([
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
      employeeLandLineNum: "",
      employeeFullName: "",
      deptHeadYn: "",
      registrant: "",
      registDate: "",
      modifier: "",
      modifyDate: "",
    },
  ]);

  const [transferDept, setTransferDept] = useState("DP999");
  const onChangeTransferDept = (e) => {
    console.log(e.target.value);
    const selected = e.target.value;
    setTransferDept(selected);
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + transferDept)
      .then((response) => {
        setMoveTargetMember(response.data);
      });
  }, [transferDept]);

  const [removeTarget, setRemoveTarget] = useState([]);
  useEffect(() => {
    setRemoveTarget([]);
  }, []);

  const onSelectRemoveTarget = (model) => {
    console.log(model);
    setRemoveTarget(model);
  };

  const [transferTarget, setTransferTarget] = useState([]);
  useEffect(() => {
    setTransferTarget([]);
  }, []);

  const onSelectTransferTarget = (model) => {
    console.log(model);
    setTransferTarget(model);
  };
  // 데이터 그리드 및 이동부서 선택 end

  // 추가버튼 클릭 start
  const onClickTransferBtn = () => {
    const modifier = sessionStorage.getItem("id");
    console.log(transferTarget, selectedDept);
    for (let i = 0; i < transferTarget.length; i++) {
      axios
        .post(
          "http://192.168.0.200:8080/KPI/memberTransfer.do?target=" +
            transferTarget[i] +
            "&dept=" +
            selectedDept +
            "&modifier=" +
            modifier
        )
        .then((response) => {
          if (response.data === 1) {
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
              .then((response) => {
                setDeptMember(response.data);
              });
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + transferDept)
              .then((response) => {
                setMoveTargetMember(response.data);
              });
          } else {
            console.log("실패");
            return false;
          }
        });
      setTransferTarget([]);
      setRemoveTarget([]);
    }
  };
  // 추가버튼 클릭 end

  // 삭제버튼 클릭 start
  const onClickRemoveBtn = () => {
    const modifier = sessionStorage.getItem("id");
    console.log(removeTarget, transferDept);
    for (let i = 0; i < removeTarget.length; i++) {
      axios
        .post(
          "http://192.168.0.200:8080/KPI/memberRemove.do?target=" +
            removeTarget[i] +
            "&dept=" +
            transferDept +
            "&modifier=" +
            modifier
        )
        .then((response) => {
          if (response.data === 1) {
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + selectedDept)
              .then((response) => {
                setDeptMember(response.data);
              });
            axios
              .get("http://192.168.0.200:8080/KPI/deptMember.do?dept=" + transferDept)
              .then((response) => {
                setMoveTargetMember(response.data);
              });
          } else {
            console.log("실패");
            return false;
          }
        });
      setTransferTarget([]);
      setRemoveTarget([]);
    }
  };
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
  // 삭제버튼 클릭 end

  // 세번째 tab end

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={0} pb={2}>
        <Grid item xs={12} md={4} lg={0} sx={{ ml: "auto" }} style={{ marginBottom: "15px" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab
                label="부서정보"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    info
                  </Icon>
                }
              />
              <Tab
                label="부서원관리"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    settingsApplications
                  </Icon>
                }
              />
              <Tab
                label="부서원이동"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    groupAdd
                  </Icon>
                }
              />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid container spacing={1.5}>
          <Grid item xs={2.5} style={{ marginTop: "-12px" }}>
            <Card>
              <MDBox
                variant="gradient"
                borderRadius="lg"
                coloredShadow="info"
                style={{
                  backgroundColor: "#4b5773",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "100%" }}>
                  <MDTypography variant="h6" color="white">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginLeft: "120px" }}>부서 목록</div>
                      <div>
                        <button style={{ all: "unset", cursor: "pointer" }}>
                          <FaRegPlusSquare
                            onClick={deptRegModalToggle}
                            style={{ width: "25px", height: "25px" }}
                          />
                        </button>
                        <button style={{ all: "unset", cursor: "pointer" }}>
                          <FaRegTrashAlt
                            onClick={onClickDeptDelete}
                            style={{
                              marginLeft: "15px",
                              width: "20px",
                              height: "20px",
                              marginRight: "20px",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </MDTypography>
                </div>
              </MDBox>
              {/* 부서 추가 Modal start */}
              <Modal isOpen={deptRegModal} toggle={deptRegModalToggle} size="lg">
                <ModalHeader toggle={deptRegModalToggle}>부서 추가</ModalHeader>
                <ModalBody>
                  <div>
                    <div className="sCard">
                      <table className="sTable" style={{ marginTop: "20px" }}>
                        <tbody>
                          <tr>
                            <th className="sTh" style={{minWidth:"120px"}}>
                              <span style={{ color: "red" }}>* </span>상위부서 선택
                            </th>
                            <td className="sTd">
                              <Input
                                id="upperDept"
                                name="upperDept"
                                type={"select"}
                                onChange={deptRegSet}
                              >
                                <option value={"DP"}>세연아이넷</option>
                                {deptList.filter(d=> d.useYN !== 'N' && d.deleteYn !== 'Y').map((dl, idx) => (
                                  <option key={idx} value={dl.deptCode}>
                                    {dl.deptName}
                                  </option>
                                ))}
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>부서 코드
                            </th>
                            <td className="sTd">
                              <div style={{ display: "flex" }}>
                                <Input
                                  id="newDeptCode"
                                  name="newDeptCode"
                                  type={"text"}
                                  value={"DP" + deptSeq}
                                  style={{ backgroundColor: "rgb(235, 235, 235)" }}
                                  readOnly
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>부서명
                            </th>
                            <td className="sTd">
                              <Input
                                id="newDeptName"
                                name="newDeptName"
                                type={"text"}
                                onChange={deptRegSet}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">
                              <span style={{ color: "red" }}>* </span>업무분류
                            </th>
                            <td className="sTd">
                              <Input
                                id="newDeptWorkValue"
                                name="newDeptWorkValue"
                                type={"select"}
                                onChange={deptRegSet}
                              >
                                <option hidden>== 분류 선택 ==</option>
                                <option>일반사무</option>
                                <option>연구소</option>
                              </Input>
                            </td>
                          </tr>
                          <tr>
                            <th className="sTh">설명</th>
                            <td className="sTd">
                              <Input
                                id="newDeptDiscription"
                                name="newDeptDiscription"
                                type={"textarea"}
                                onChange={deptRegSet}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="modal-button">
                  <button
                    className="sButton"
                    style={{
                      background: "rgb(67 79 106)",
                    }}
                    onClick={onClickDeptReg}
                  >
                    등록
                  </button>
                  <button
                    className="sButton"
                    style={{
                      background: "gray",
                    }}
                    onClick={deptRegModalToggle}
                  >
                    취소
                  </button>
                </ModalFooter>
              </Modal>
              {/* 부서 추가 Modal end */}
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
                style={{ margin: "10px", height: "calc(100vh - 285px)" }}
              />
            </Card>
          </Grid>
          <Grid
            item
            xs={9.5}
            style={
              tabValue === 0 || tabValue === 1
                ? { paddingTop: "0px" }
                : { display: "none", paddingTop: "0px" }
            }
          >
            <Card>
              {/* <MDBox
                className="table_top"
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              > */}
              <div className="sTool" style={{ marginRight: "0px", marginTop: "0px" }}>
                <div style={{ width: "100%" }}>
                  <MDTypography variant="h6" color="#4e5158">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {tabValue === 0 ? "부서 정보" : tabValue === 1 ? "부서원 관리" : ""}
                      </div>
                      <div>
                        {tabValue === 0 ? (
                          <></>
                        ) : tabValue === 1 ? (
                          <>
                            <RenewalTableHeadAddButton clickEvent={regToggle} />
                            <RenewalTableHeadModButton
                              clickEvent={() => onClickModifyModal(selectionModel)}
                            />
                            <RenewalTableHeadDelButton
                              clickEvent={() => onClickDelete(selectionModel)}
                            />
                            {/* <button style={{all:"unset", cursor:"pointer"}}>
                              <FaRegPlusSquare onClick={regToggle} style={{ width:"25px", height:"25px" }}/>
                            </button>
                            <button style={{all:"unset", cursor:"pointer"}}>
                              <FaPen onClick={() => onClickModifyModal(selectionModel)} style={{ marginLeft: "20px", width:"20px", height:"20px" }} />
                            </button>
                            <button style={{all:"unset", cursor:"pointer"}}>
                              <FaRegTrashAlt onClick={() => onClickDelete(selectionModel)} style={{ marginLeft: "20px", width:"20px", height:"20px", marginRight:"20px" }} />
                            </button> */}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </MDTypography>
                </div>
              </div>
              {/* </MDBox> */}
              <MDBox pt={3}>
                {/* 첫번째 탭 start */}
                <div
                  style={tabValue === 0 ? { height: "calc(100vh - 307px)" } : { display: "none" }}
                >
                  <form style={{ display: "flex", justifyContent: "center" }}>
                    {deptList.map(
                      (dl, idx) =>
                        selectedDept === dl.deptCode && (
                          // <table
                          //   key={idx}
                          //   style={{
                          //     borderSpacing: "20px 15px",
                          //     borderCollapse: "separate",
                          //     marginTop: "50px",
                          //     width: "80%",
                          //     marginLeft: "20px",
                          //   }}
                          // >
                          <table
                            className="sTable"
                            style={{ margin: "20px", marginTop: "0px", marginBottom: "15px" }}
                          >
                            <tbody>
                              <tr>
                                <td className="sTh" style={{ width: "10%" }}>
                                  부서명
                                </td>
                                <td className="sTd" style={{ width: "80%" }}>
                                  <div className="sTdCell">
                                    {" "}
                                    <input
                                      type={"text"}
                                      value={modifyDeptName || dl.deptName}
                                      id="deptName"
                                      name="deptName"
                                      style={
                                        deptModify === true ? {} : { border:'unset',outline:'none' }
                                      }
                                      onChange={onChangeDeptInfo}
                                      readOnly={deptModify === true ? false : true}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="sTh">부서 코드</td>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <input
                                      type={"text"}
                                      value={dl.deptCode || ""}
                                      id="deptCode"
                                      name="deptCode"
                                      style={{ border:'unset',outline:'none' }}
                                      readOnly
                                    />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="sTh">부서장</td>
                                <td className="sTd">
                                  <div style={{ display: "flex" }}>
                                    <input
                                      key={idx}
                                      style={{
                                        width: "20%",
                                        display: "inline-block",
                                        border:'unset'
                                        ,outline:'none'
                                      }}
                                      value={deptHead}
                                      readOnly
                                    />
                                    <MDButton
                                      className="sButton"
                                      variant="contained"
                                      color="info"
                                      style={{
                                        background: "rgb(67 79 106)",
                                        marginLeft: "5px",
                                        height: "30px",
                                        borderRadius: "0px",
                                      }}
                                      onClick={toggle}
                                    >
                                      찾기
                                    </MDButton>
                                  </div>
                                  <Modal isOpen={modal} toggle={toggle} size="xl">
                                    <ModalHeader toggle={toggle}>부서장선택</ModalHeader>
                                    <ModalBody>
                                      <Table hover>
                                        <thead>
                                          <tr>
                                            <th></th>
                                            <th>사원번호</th>
                                            <th>사원명</th>
                                            <th>부서</th>
                                            <th>직급</th>
                                            <th>직책</th>
                                            <th>이메일</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {deptMember
                                            .filter((dm) => dm.employeeStatus !== "퇴사")
                                            .map((dm, idx) => (
                                              <tr key={idx}>
                                                <th scope="row">
                                                  <input
                                                    id={dm.id}
                                                    type={"checkbox"}
                                                    onChange={selectHead}
                                                    checked={selectedHead === dm.id && true}
                                                  />
                                                </th>
                                                <td>{dm.id}</td>
                                                <td>{dm.employeeFullName}</td>
                                                <td>{dm.employeeDept}</td>
                                                <td>{dm.employeeRank}</td>
                                                <td>{dm.employeePosition}</td>
                                                <td>{dm.employeeId}</td>
                                              </tr>
                                            ))}
                                        </tbody>
                                      </Table>
                                    </ModalBody>
                                    <ModalFooter className="modal-button">
                                      <button
                                        className="sButton"
                                        style={{
                                          background: "rgb(67 79 106)",
                                        }}
                                        onClick={changeDeptHead}
                                      >
                                        저장
                                      </button>
                                      <button
                                        className="sButton"
                                        style={{
                                          background: "gray",
                                        }}
                                        onClick={cancleModal}
                                      >
                                        취소
                                      </button>
                                    </ModalFooter>
                                  </Modal>
                                </td>
                              </tr>
                              <tr>
                                <td className="sTh">부서원 수</td>
                                <td className="sTd">
                                  <input
                                    type={"text"}
                                    value={
                                      deptMember.filter((dm) => dm.employeeStatus !== "퇴사")
                                        .length || "없음"
                                    }
                                    style={{ border:'unset',outline:'none'}}
                                    readOnly
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="sTh">생성일자</td>
                                <td className="sTd">
                                  <input
                                    type={"text"}
                                    value={dl.registDate || ""}
                                    style={{ border:'unset',outline:'none' }}
                                    readOnly
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="sTh">비고</td>
                                <td className="sTd" colSpan={3}>
                                  <input
                                    type={"textarea"}
                                    value={modifyDeptDescription || dl.remarks}
                                    id="deptDescription"
                                    name="deptDescription"
                                    style={
                                      deptModify === true ? {} : { border:'unset',outline:'none' }
                                    }
                                    onChange={onChangeDeptInfo}
                                    readOnly={deptModify === true ? false : true}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={4}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginTop: "40px",
                                    }}
                                  >
                                    {deptModify === true ? (
                                      <>
                                        <MDButton
                                          className="sButton"
                                          id="deptInfoModify"
                                          name="deptInfoModify"
                                          onClick={saveDeptInfoModify}
                                          style={{
                                            background: "rgb(67 79 106)",
                                            marginRight: "5px",
                                            height: "30px",
                                            borderRadius: "0px",
                                            color: "white",
                                          }}
                                        >
                                          저장
                                        </MDButton>
                                        <MDButton
                                          className="sButton"
                                          onClick={cancleInfoModify}
                                          style={{
                                            background: "rgb(67 79 106)",
                                            marginRight: "5px",
                                            height: "30px",
                                            borderRadius: "0px",
                                            color: "white",
                                          }}
                                        >
                                          취소
                                        </MDButton>
                                      </>
                                    ) : (
                                      // <MDButton
                                      //   variant="contained"
                                      //   color="info"
                                      //   id="deptInfoModify"
                                      //   name="deptInfoModify"
                                      //   onClick={onClickModify}
                                      //   //style={{display:"none"}}
                                      // >
                                      //   수정
                                      //   <FaPen style={{ marginLeft: "5px" }} />
                                      // </MDButton>
                                      <MDButton
                                        id="deptInfoModify"
                                        name="deptInfoModify"
                                        onClick={onClickModify}
                                        className="sButton"
                                        style={{
                                          background: "rgb(67 79 106)",
                                          marginRight: "5px",
                                          height: "30px",
                                          borderRadius: "0px",
                                          color: "white",
                                        }}
                                      >
                                        수정
                                      </MDButton>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )
                    )}
                  </form>
                </div>
                {/* 첫번째 탭 end */}

                {/* 두번째 탭 start */}
                <div
                  style={
                    tabValue === 1
                      ? { minHeight: "620px", paddingTop: "0px" }
                      : { display: "none", paddingTop: "0px" }
                  }
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <table style={{borderSpacing: '20px 10px', borderCollapse:'separate', width:"90%", marginBottom:"20px"}}> */}
                    <table
                      className="sTable"
                      style={{ margin: "20px", marginTop: "0px", marginBottom: "15px" }}
                    >
                      <tbody>
                        {targetInfo.length === 0 ? (
                          <>
                            <tr>
                              <th className="sTh">사원 번호</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} type="text" readOnly></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">연락처</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly type="text"></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">아이디</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} type="text" readOnly></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">내선 번호</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly type="text"></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">비밀번호</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input
                                      style={{ width: "80%" }}
                                      type="password"
                                      readOnly
                                    ></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">부서</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly type="text"></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">재직상태</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} type="text" readOnly></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">직급</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly type="text"></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">이름</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">직책</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div style={{ width: "100%" }}>
                                    <input style={{ width: "80%" }} readOnly type="text"></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        ) : (
                          targetInfo.map((t, idx) => (
                            <>
                              <tr>
                                <th className="sTh">사원 번호</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        type="text"
                                        value={t.id || ""}
                                        readOnly
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                                <th className="sTh">연락처</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        value={hyphenPhone || ""}
                                        readOnly
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="sTh">아이디</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        type="text"
                                        value={t.employeeId || ""}
                                        readOnly
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                                <th className="sTh">내선 번호</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        value={hyphenLandNum || ""}
                                        readOnly
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="sTh">비밀번호</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        type="password"
                                        value={t.employeePw || ""}
                                        readOnly
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                                <th className="sTh">부서</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        value={t.employeeDept || ""}
                                        readOnly
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="sTh">재직상태</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        type="text"
                                        value={t.employeeStatus || ""}
                                        readOnly
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                                <th className="sTh">직급</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        value={t.employeeRank || ""}
                                        readOnly
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="sTh">이름</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        type="text"
                                        value={t.employeeFullName || ""}
                                        readOnly
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                                <th className="sTh">직책</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div style={{ width: "100%" }}>
                                      <input
                                        style={{ width: "80%" }}
                                        value={t.employeePosition || ""}
                                        readOnly
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </td>
                              </tr>

                              {/* <tr key={idx}>
                                <td>사원 번호</td>
                                <td>
                                  <Input value={t.id || ""} readOnly />
                                </td>
                                <td>연락처</td>
                                <td>
                                  <Input value={hyphenPhone || ""} readOnly />
                                </td>
                              </tr>
                              <tr>
                                <td>아이디</td>
                                <td>
                                  <Input value={t.employeeId || ""} readOnly />
                                </td>
                                <td>내선 번호</td>
                                <td>
                                  <Input value={hyphenLandNum || ""} readOnly />
                                </td>
                              </tr>
                              <tr>
                                <td>비밀번호</td>
                                <td>
                                  <Input type="password" value={t.employeePw || ""} readOnly />
                                </td>
                                <td>부서</td>
                                <td>
                                  <Input value={t.employeeDept || ""} readOnly />
                                </td>
                              </tr>
                              <tr>
                                <td>재직 상태</td>
                                <td>
                                  <Input value={t.employeeStatus || ""} readOnly />
                                </td>
                                <td>직급</td>
                                <td>
                                  <Input value={t.employeeRank || ""} readOnly />
                                </td>
                              </tr>
                              <tr>
                                <td>이름</td>
                                <td>
                                  <Input value={t.employeeFullName || ""} readOnly />
                                </td>
                                <td>직책</td>
                                <td>
                                  <Input value={t.employeePosition || ""} readOnly />
                                </td>
                              </tr> */}
                            </>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* 사원 추가 modal start */}
                  <Modal isOpen={regModal} toggle={regToggle} size="lg">
                    <ModalHeader toggle={regToggle}>사원 정보 등록</ModalHeader>
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
                                          width: "40%",
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
                                          width: "40%",
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
                                        disabled
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
                                    id="emplyDept"
                                    name="emplyDept"
                                    onChange={infoSetting}
                                    defaultValue={
                                      deptList
                                        .filter((dl) => dl.deptCode === selectedDept)
                                        .map((dl) => dl.deptName) || ""
                                    }
                                    disabled
                                  />
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
                                  >
                                    <option value={"default"} hidden>
                                      == 직급을 선택하세요 ==
                                    </option>
                                    {emplyDept !== "DP000"
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
                                        .filter(
                                          (pl) => Number(pl.ref1) === 1 || Number(pl.ref1) === 2
                                        )
                                        .map((pl, idx) => (
                                          <option key={idx} value={pl.common_CODE || ""}>
                                            {pl.code_NAME}
                                          </option>
                                        ))
                                    ) : isTl === true ? (
                                      positionList
                                        .filter(
                                          (pl) => Number(pl.ref1) === 2 || Number(pl.ref1) === 3
                                        )
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
                                      style={{ backgroundColor: "#ebebeb"}}
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
                                              width: "40%",
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
                                      {tModifyDeptCode !== "DP000"
                                        ? tModifyDeptWorkVal === "연구소"
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
                                        : tModifyDeptWorkVal === "연구소"
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
                                          .filter(
                                            (pl) => Number(pl.ref1) === 1 || Number(pl.ref1) === 2
                                          )
                                          .map((pl, idx) => (
                                            <option key={idx} value={pl.common_CODE || ""}>
                                              {pl.code_NAME}
                                            </option>
                                          ))
                                      ) : isTl === true ? (
                                        positionList
                                          .filter(
                                            (pl) => Number(pl.ref1) === 2 || Number(pl.ref1) === 3
                                          )
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
                        onClick={onClickMemberModify}
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
                  <DataGrid
                    disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                    getRowClassName={getRowClassName}
                    onRowClick={handleRowClick}
                    columns={column}
                    rows={deptMember.filter((dm) => dm.employeeStatus !== "퇴사")}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    checkboxSelection
                    onCellDoubleClick={onDoubleClickCell}
                    onSelectionModelChange={handleonSelectionModelChange}
                    selectionModel={selectionModel}
                    pageSizeOptions={[5]}
                    rowHeight={32}
                    sx={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginBottom: "20px",
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
                      height: "calc(100vh - 542px)",
                    }}
                    components={{
                      Pagination: CustomPagination,
                    }}
                    pageSize={size}
                  ></DataGrid>
                </div>
              </MDBox>
            </Card>
          </Grid>
          {/* 두번째 탭 end */}

          {/* 세번째 탭 start */}
          <Grid
            item
            xs={4.44}
            style={tabValue === 2 ? { paddingTop: "0px" } : { display: "none", paddingTop: "0px" }}
          >
            <Card>
              {/* <MDBox
                className="table_top"
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              > */}
              <div className="sTool" style={{ marginRight: "0px", marginTop: "0px" }}>
                <div style={{ width: "100%" }}>
                  <MDTypography variant="h6" color="#4e5158">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>이동부서</div>
                      <div>
                        <Input
                          type="select"
                          style={{ width: "200px", height: "35px", marginRight: "10px" }}
                          onChange={onChangeTransferDept}
                          value={transferDept || ""}
                        >
                          {deptList
                            .filter((d) => d.deptCode !== selectedDept && d.useYN !== 'N' && d.deleteYn !== 'Y')
                            .map((dl, idx) => (
                              <option key={idx} value={dl.deptCode}>
                                {dl.deptName}
                              </option>
                            ))}
                        </Input>
                      </div>
                    </div>
                  </MDTypography>
                </div>
              </div>
              {/* </MDBox> */}
              <div style={{ minHeight: "645px" }}>
                <DataGrid
                  disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                  getRowClassName={getRowClassName3}
                  onRowClick={handleRowClick3}
                  columns={transferColumn}
                  rows={moveTargetMember.filter(
                    (m) => m.deptCode === transferDept && m.employeeStatus !== "퇴사"
                  )}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  checkboxSelection
                  onSelectionModelChange={(newSelection) => {
                    onSelectTransferTarget(newSelection);
                  }}
                  selectionModel={transferTarget}
                  pageSizeOptions={[5]}
                  rowHeight={32}
                  sx={{
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
                    height: "calc(100vh - 281px)",
                  }}
                  components={{
                    Pagination: CustomPagination,
                  }}
                  pageSize={size}
                ></DataGrid>
              </div>
            </Card>
          </Grid>
          <Grid
            item
            xs={0.6}
            style={
              tabValue === 2
                ? { padding: "0", margin: "0", display: "flex", alignItems: "center" }
                : { display: "none" }
            }
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="sButton"
                style={{
                  background: "rgb(67 79 106)",
                  height: "35px",
                  padding: "0",
                  margin: "0",
                  width: "57px",
                  marginBottom: "20px",
                }}
                onClick={onClickTransferBtn}
              >
                추가 ▶
              </button>
              <button
                className="sButton"
                onClick={onClickRemoveBtn}
                style={{
                  background: "rgb(67 79 106)",
                  height: "35px",
                  padding: "0",
                  margin: "0",
                  width: "57px",
                }}
              >
                ◀ 삭제
              </button>
            </div>
          </Grid>

          <Grid
            item
            xs={4.44}
            style={
              tabValue === 2
                ? { paddingLeft: "0", paddingTop: "0px" }
                : { display: "none", paddingTop: "0px" }
            }
          >
            <Card>
              {/* <MDBox
                className="table_top"
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              > */}
              <div className="sTool" style={{ marginRight: "0px", marginTop: "0px" }}>
                <div style={{ width: "100%" }}>
                  <MDTypography variant="h6" color="#4e5158">
                    현재 선택부서
                  </MDTypography>
                </div>
              </div>
              {/* </MDBox> */}
              <div style={{ minHeight: "645px" }}>
                <DataGrid
                  columns={transferColumn}
                  disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                  getRowClassName={getRowClassName2}
                  onRowClick={handleRowClick2}
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
                    onSelectRemoveTarget(newSelection);
                  }}
                  selectionModel={removeTarget}
                  pageSizeOptions={[5]}
                  rowHeight={32}
                  sx={{
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
                    height: "calc(100vh - 281px)",
                  }}
                  components={{
                    Pagination: CustomPagination,
                  }}
                  pageSize={size}
                ></DataGrid>
              </div>
            </Card>
          </Grid>
          {/* 세번째 탭 end */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
