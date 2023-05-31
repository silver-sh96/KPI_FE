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
import React, { useState, useEffect } from "react";

import Search2 from "./components/search3";

import "../../components/Custom.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { DataGridPro } from "@mui/x-data-grid-pro";

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
import SearchBarSearchButton from "components/CustomButton/SearchBarSearchButton";
import SearchBarResetButton from "components/CustomButton/SearchBarResetButton";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";
import { fontSize } from "@mui/system";

function Codes() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [use, setUse] = useState("");
  const [antCheck, setAntCheck] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow2, setSelectedRow2] = useState(null);

  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      primary: `item ${k}`,
      secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
    }));

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });

  function CustomPagination() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "55%",
          paddingRight: "10px",
        }}
      >
        Total: {Ucodes.length}
      </div>
    );
  }

  function CustomPagination2() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          width: "55%",
          paddingRight: "10px",
        }}
      >
        Total: {Ccodes.length}
      </div>
    );
  }

  const getCellClassNames = (params) => {
    if (params.field === "use_YN") {
      return "center-align";
    }
    return null;
  };

  // 변수 : 코드 상세 정보 테이블 컬럼
  const Ucolumn = [
    {
      field: "common_CODE",
      headerName: "그룹 코드",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "code_NAME",
      headerName: "그룹 코드 명",
      editable: false,
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "code_DESCRIPTION",
      headerName: "설명",
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "use_YN",
      headerName: "사용",
      editable: false,
      headerAlign: "center",
      textAlign: "center",
      flex: 1,
      align: "center",
    },
  ];
  // 변수 : 코드 상세 정보 테이블 컬럼
  var column = [
    {
      field: "period",
      headerName: "순번",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "code_NAME",
      headerName: "상세 코드 명",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "code_DESCRIPTION",
      headerName: "설명",
      width: 30,
      editable: false,
      headerAlign: "center",
      flex: 4,
    },
    {
      field: "use_YN",
      headerName: "사용",
      width: 60,
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "center",
    },
  ];
  // 변수 : 선택된 상위 공통 코드
  const [seletedUcode, setSeletedUcode] = useState(["미지정"]);

  const [Acodes, setAcodes] = useState([
    {
      period: "",
      common_CODE: "",
      upper_COMMON_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      use_YN: "",
      ref1: "",
      deleted_YN: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
    },
  ]);
  // 변수 : 그룹 코드
  const [Ucodes, setUcodes] = useState([
    {
      id: "",
      common_CODE: "",
      upper_COMMON_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      use_YN: "",
      deleted_YN: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
      nowdate: "",
    },
  ]);
  // 변수 : 상세 코드
  const [Ccodes, setCcodes] = useState([
    {
      id: "",
      idx: "",
      period: "",
      common_CODE: "",
      upper_COMMON_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      use_YN: "",
      deleted_YN: "",
      ref1: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
      nowdate: "0",
    },
  ]);

  const [SUcodes, setSUcodes] = useState([
    {
      id: "",
      common_CODE: "",
      upper_COMMON_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      use_YN: "",
      ref1: "",
      deleted_YN: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
      nowdate: "0",
    },
  ]);
  const [SCcodes, setSCcodes] = useState([
    {
      id: "",
      idx: "",
      period: "",
      common_CODE: "",
      upper_COMMON_CODE: "",
      code_NAME: "",
      code_DESCRIPTION: "",
      use_YN: "",
      ref1: "",
      deleted_YN: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
      nowdate: "0",
    },
  ]);

  const [selectionModel, setSelectionModel] = useState([]);
  const [CselectionModel, setCSelectionModel] = useState([]);

  const [modelAble, setModalAble] = useState(true);

  const [modalURegist, setModalURegist] = useState(false);
  const [modalUEdit, setModalUEdit] = useState(false);
  const [modalUDetail, setModalUDetail] = useState(false);

  const [modalCRegist, setModalCRegist] = useState(false);
  const [modalCEdit, setModalCEdit] = useState(false);
  const [modalCDetail, setModalCDetail] = useState(false);

  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchUse, setSearchUse] = useState(" ");

  const [searchKey, setSearchKey] = useState("Regist_date");
  const [searchValue, setSearchValue] = useState("2");

  const [regiUcode, setRegiUcode] = useState("1");
  const [regiCode, setRegiCode] = useState("");
  const [regiName, setRegiName] = useState("0");
  const [regiDes, setRegiDes] = useState("0");
  const [regiUse, setRegiUse] = useState("");
  const [regiRegiUsr, setRegiRegiUsr] = useState("");
  const [regiRegiDt, setRegiRegiDt] = useState("");
  const [regiModiUsr, setRegiModiUsr] = useState("");
  const [regiModiDt, setRegiModiDt] = useState("");
  const [regiPeriod, setRegiPeriod] = useState("");
  const [regiOrigin, setRegiOrigin] = useState("");
  const [regiSwitch, setRegiSwitch] = useState(true);
  const [regiRef1, setRegiRef1] = useState("");

  const [validUCode, setValidUCode] = useState("none");
  const [validCcode, setValidCcode] = useState("none");
  const [validName, setValidName] = useState("none");
  const [validDes, setValidDes] = useState("none");
  const [validRef1, setValidRef1] = useState("none");

  const [stateRegi, setStateRegi] = useState("null");

  const cleanRegi = () => {
    setRegiUcode("1");
    setRegiCode("");
    setRegiName("");
    setRegiDes("");
    setRegiUse("");
    setRegiRegiUsr("");
    setRegiRegiDt("");
    setRegiModiUsr("");
    setRegiModiDt("");
  };
  const toggleUDetail = (e) => {
    const Ecode = Acodes.find((code) => code.common_CODE == e.id);
    setRegiCode(Ecode.common_CODE);
    setRegiName(Ecode.code_NAME);
    setRegiDes(Ecode.code_DESCRIPTION);
    if (Ecode.use_YN == "N") {
      setRegiSwitch(false);
    } else {
      setRegiSwitch(true);
    }
    setRegiRegiUsr(Ecode.registrant);
    setRegiRegiDt(Ecode.regist_DATE);
    setRegiModiUsr(Ecode.modifier);
    setRegiModiDt(Ecode.modify_DATE);
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalUDetail(!modalUDetail);
  };
  const toggleUDetailclo = () => {
    setRegiUcode("");
    setRegiCode("");
    setRegiName("");
    setRegiDes("");
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalUDetail(!modalUDetail);
  };
  // modal : 등록창 열기
  const toggleURegi = () => {
    setStateRegi("U");
    setRegiCode("");
    setRegiUcode("");
    setRegiName("");
    setRegiDes("");
    setRegiSwitch("true");
    setRegiRegiUsr("");
    setRegiRegiDt("");
    setRegiModiUsr("");
    setRegiModiDt("");
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalURegist(!modalURegist);
  };
  const toggleURegiclo = () => {
    setModalURegist(!modalURegist);
  };

  const [wayIn, setWayIn] = useState("null");

  const toggleUEditBT = () => {
    if (selectionModel.length == 1) {
      const Ecode = Acodes.find((code) => code.common_CODE == selectionModel[0]);
      setRegiCode(Ecode.common_CODE);
      setRegiName(Ecode.code_NAME);
      setRegiDes(Ecode.code_DESCRIPTION);
      setRegiRegiUsr(Ecode.registrant);
      setRegiRegiDt(Ecode.regist_DATE);
      setRegiModiUsr(Ecode.modifier);
      setRegiModiDt(Ecode.modify_DATE);
      setRegiUse(Ecode.use_YN);
      setRegiRef1(Ecode.ref1);
      if (Ecode.use_YN == "N") {
        setRegiSwitch(false);
      } else {
        setRegiSwitch(true);
      }
      setValidUCode("none");
      setValidCcode("none");
      setValidDes("none");
      setValidName("none");
      setModalUEdit(!modalUEdit);
    } else {
      alert("경고");
    }
    setWayIn("0");
  };
  const toggleUEdit = (e) => {
    const Ecode = Acodes.find((code) => code.common_CODE == e.id);
    setRegiCode(Ecode.common_CODE);
    setRegiName(Ecode.code_NAME);
    setRegiDes(Ecode.code_DESCRIPTION);
    setRegiRegiUsr(Ecode.registrant);
    setRegiRegiDt(Ecode.regist_DATE);
    setRegiModiUsr(Ecode.modifier);
    setRegiModiDt(Ecode.modify_DATE);
    setRegiUse(Ecode.use_YN);
    setRegiRef1(Ecode.ref1);

    if (Ecode.use_YN == "N") {
      setRegiSwitch(false);
    } else {
      setRegiSwitch(true);
    }
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalUEdit(!modalUEdit);
    setWayIn("1");
  };
  const toggleUEditclo = () => {
    setModalUEdit(!modalUEdit);
  };

  // CcodeList toggle
  const toggleCDetail = (e) => {
    const Ecode = Acodes.find((code) => code.common_CODE == e.id);
    setRegiCode(Ecode.common_CODE);
    setRegiName(Ecode.code_NAME);
    setRegiDes(Ecode.code_DESCRIPTION);
    setRegiRegiUsr(Ecode.registrant);
    setRegiRegiDt(Ecode.regist_DATE);
    setRegiModiUsr(Ecode.modifier);
    setRegiModiDt(Ecode.modify_DATE);
    if (Ecode.use_YN == "N") {
      setRegiSwitch(false);
    } else {
      setRegiSwitch(true);
    }
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalCDetail(!modalCDetail);
  };
  const toggleCDetailclo = () => {
    setRegiUcode("");
    setRegiCode("");
    setRegiName("");
    setRegiDes("");
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalCDetail(!modalCDetail);
  };
  // modal : 등록창 열기
  const toggleCRegi = () => {
    setStateRegi("C");
    if (seletedUcode == "미지정") {
      alert("그룹코드를 먼저 선택해주세요");
    } else {
      setRegiUcode(seletedUcode);
      setRegiCode("");
      setRegiName("");
      setRegiDes("");
      setRegiSwitch("true");
      setRegiRegiUsr("");
      setRegiRegiDt("");
      setRegiModiUsr("");
      setRegiModiDt("");
      setRegiRef1("");
      setValidUCode("none");
      setValidCcode("none");
      setValidDes("none");
      setValidName("none");
      setModalCRegist(!modalCRegist);
    }
  };
  const toggleCRegiclo = () => {
    setModalCRegist(!modalCRegist);
  };
  const toggleCEdit = (e) => {
    const Ecode = Acodes.find((code) => code.common_CODE == e.id);
    setRegiOrigin(Ecode.period);
    setRegiPeriod(Ecode.period);
    setRegiCode(Ecode.common_CODE);
    setRegiName(Ecode.code_NAME);
    setRegiDes(Ecode.code_DESCRIPTION);
    setRegiRegiUsr(Ecode.registrant);
    setRegiRegiDt(Ecode.regist_DATE);
    setRegiModiUsr(Ecode.modifier);
    setRegiModiDt(Ecode.modify_DATE);
    setRegiUse(Ecode.use_YN);
    setRegiRef1(Ecode.ref1);

    if (Ecode.use_YN == "N") {
      setRegiSwitch(false);
    } else {
      setRegiSwitch(true);
    }
    setValidUCode("none");
    setValidCcode("none");
    setValidDes("none");
    setValidName("none");
    setModalCEdit(!modalCEdit);
    setWayIn("0");
  };
  const toggleCEditclo = () => {
    setModalCEdit(!modalCEdit);
  };
  const toggleCEditBT = () => {
    if (CselectionModel.length == 1) {
      const Ecode = Acodes.find((code) => code.common_CODE == CselectionModel[0]);
      setRegiOrigin(Ecode.period);
      setRegiPeriod(Ecode.period);
      setRegiCode(Ecode.common_CODE);
      setRegiName(Ecode.code_NAME);
      setRegiDes(Ecode.code_DESCRIPTION);
      setRegiRegiUsr(Ecode.registrant);
      setRegiRegiDt(Ecode.regist_DATE);
      setRegiModiUsr(Ecode.modifier);
      setRegiModiDt(Ecode.modify_DATE);
      setRegiUse(Ecode.use_YN);
      setRegiRef1(Ecode.ref1);

      if (Ecode.use_YN == "N") {
        setRegiSwitch(false);
      } else {
        setRegiSwitch(true);
      }
      setValidUCode("none");
      setValidCcode("none");
      setValidDes("none");
      setValidName("none");
      setModalCEdit(!modalCEdit);
    } else {
      alert("한가지만 선택해주세요");
    }
    setWayIn("1");
  };

  const [stateU, setStateU] = useState("null");
  const [stateC, setStateC] = useState("0");

  // axios : 상위 & 공통 코드 상세 정보 axios & setUsestate
  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response);
    });
    axios
      .get("http://192.168.0.200:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.200:8080/KPI/CcodeList.do?seletedUcode=" +
          seletedUcode +
          "&searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCcodes(response.data);
        if (response.data == 0) {
          setStateC("00");
        }
      });
  }, [seletedUcode, searchKey, searchValue]);

  const loadSearch = () => {
    axios
      .get(
        "http://192.168.0.200:8080/KPI/UcodeList.do?searchCode=" +
          searchCode +
          "&searchName=" +
          searchName +
          "&searchUse=" +
          searchUse
      )
      .then((response) => {
        setUcodes(response.data);
        setStateU("start1");
      });
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.200:8080/KPI/CcodeList.do?seletedUcode=" +
          seletedUcode +
          "&searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCcodes(response.data);
        setStateU("start2");
      });
  };
  const reLoad2 = () => {
    axios
      .get("http://192.168.0.200:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.200:8080/KPI/CcodeList.do?seletedUcode=" +
          seletedUcode +
          "&searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCcodes(response.data);
      });
  };
  const reLoad3 = () => {
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.200:8080/KPI/CcodeList.do?seletedUcode=" +
          seletedUcode +
          "&searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCcodes(response.data);
        setStateC("Load4");
      });
  };
  const reLoad4 = () => {
    setSearchCode("");
    setSearchCode("");
    setSearchUse("Y");
    setSelectionModel([]);
    setSeletedUcode("미지정");
    axios.get("http://192.168.0.200:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get("http://192.168.0.200:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
    axios
      .get(
        "http://192.168.0.200:8080/KPI/CcodeList.do?seletedUcode=" +
          seletedUcode +
          "&searchKey=" +
          searchKey +
          "&searchValue=" +
          searchValue
      )
      .then((response) => {
        setCcodes(response.data);
      });
  };

  useEffect(() => {
    const array = Ucodes.map((item) => {
      var yes = "";
      if (item.use_YN == "Y") {
        yes = "사용";
      }
      if (item.use_YN == "N") {
        yes = "미사용";
      }
      return { ...item, use_YN: yes };
    });
    setSUcodes(array);
  }, [Ucodes[0]]);

  useEffect(() => {
    if (Ccodes.length > 1) {
      if (Ccodes[0].nowdate != stateU) {
        setStateC(Ccodes[0].nowdate);
        setStateU(Ccodes[0].nowdate);
      }
    }
  }, [Ccodes]);

  useEffect(() => {
    const array = Ccodes.map((item) => {
      var period = 0;
      if (selectedRow == "연구직") {
        period = item.period - 100;
      }
      var yes = "";
      if (item.use_YN == "Y" || yes == "사용") {
        yes = "사용";
      }
      if (item.use_YN == "N" || yes == "미사용") {
        yes = "미사용";
      }
      return { ...item, use_YN: yes };
    });
    setSCcodes(array);
    Ccodes.map((item, index) => {
      const per = Number(index) + 1;
      axios
        .post("http://192.168.0.200:8080/KPI/CodeSort.do?key=" + item.common_CODE + "&value=" + per)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    });
  }, [stateC]);

  // MUI : checked box 목록 가져오기
  useEffect(() => {
    setSelectionModel([]);
  }, []);

  // axios : 공통 코드 삭제
  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.post("http://192.168.0.200:8080/KPI/CodeDelete.do", selectionModel).then((response) => {
        setSelectionModel([]);
        loadSearch();
        reLoad3();
        stateC(response);
      });
    }
  };

  const onClickCDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/CodeDelete.do", CselectionModel)
        .then((response) => {
          if ((response.data = 1)) {
            reLoad3();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // axios onClick : 코드 등록
  const handlerCodeSave = (e) => {
    let data = {};
    let approved = 0;

    if (regiName.length < 1 || regiDes.length < 1) {
      approved = approved + 1;
      alert("필수 정보를 입력해주세요");
    }
    if (validUCode == "block" || validCcode == "block") {
      approved = approved + 1;
      alert("공통코드입력이 유효하지 않습니다.");
    }
    if (validName == "block") {
      approved = approved + 1;
      alert("공통코드 코드명이 유효하지 않습니다.");
    }
    if (validDes == "block") {
      approved = approved + 1;
      alert("공통코드 상세정보가 유효하지 않습니다.");
    }

    var YN = "";
    if (regiSwitch === false) {
      YN = "N";
    } else {
      YN = "Y";
    }
    const params = new URLSearchParams();

    if (stateRegi == "U") {
      params.append("COMMON_CODE", regiUcode);
      params.append("UPPER_COMMON_CODE", "");
      params.append("CODE_NAME", regiName);
      params.append("CODE_DESCRIPTION", regiDes);
      params.append("USE_YN", YN);
      params.append("PERIOD", "");
      params.append("REGISTRANT", sessionStorage.getItem("id"));
      params.append("MODIFIER", sessionStorage.getItem("id"));
      params.append("REF1", "");
      params.append("DELETE_YN", "N");
    }
    if (stateRegi == "C") {
      setSelectionModel([]);
      params.append("COMMON_CODE", "");
      params.append("UPPER_COMMON_CODE", regiUcode);
      params.append("CODE_NAME", regiName);
      params.append("CODE_DESCRIPTION", regiDes);
      params.append("USE_YN", YN);
      params.append("PERIOD", Ccodes.length + 1);
      params.append("REGISTRANT", sessionStorage.getItem("id"));
      params.append("MODIFIER", sessionStorage.getItem("id"));
      params.append("REF1", regiRef1);
      params.append("DELETE_YN", "N");
    }

    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null" || value.length == 0) {
        obj.set(key, "");
      }
    });

    if (approved == 0) {
      axios
        .post("http://192.168.0.200:8080/KPI/CodeRegist.do?" + params)
        .then((response) => {
          if (stateRegi == "U") {
            reLoad2();
            toggleURegiclo();
          }
          if (stateRegi == "C") {
            reLoad3();
            toggleCRegiclo();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // axios onClick : 코드 수정
  const handlerCodeEdit = (e) => {
    let data = {};
    let approved = 0;

    if (validName == "block") {
      approved = approved + 1;
      alert("공통코드 코드명이 유효하지 않습니다.");
    }
    if (validDes == "block") {
      approved = approved + 1;
      alert("공통코드 상세정보가 유효하지 않습니다.");
    }
    var YN = "";
    if (regiSwitch === false) {
      YN = "N";
    } else {
      YN = "Y";
    }

    if (approved == 0) {
      if (regiRef1 == null) {
        data = {
          COMMON_CODE: regiCode,
          CODE_NAME: regiName,
          CODE_DESCRIPTION: regiDes,
          REF1: "",
          USE_YN: YN,
          PERIOD: regiPeriod,
          REGISTRANT: sessionStorage.getItem("id"),
          MODIFIER: sessionStorage.getItem("id"),
        };
      } else {
        data = {
          COMMON_CODE: regiCode,
          CODE_NAME: regiName,
          CODE_DESCRIPTION: regiDes,
          REF1: regiRef1,
          USE_YN: YN,
          PERIOD: regiPeriod,
          REGISTRANT: sessionStorage.getItem("id"),
          MODIFIER: sessionStorage.getItem("id"),
        };
      }
      axios
        .post("http://192.168.0.200:8080/KPI/CodeUpdate.do", data)
        .then((response) => {
          if ((response.data = 1)) {
            if (regiCode.length == 2) {
              toggleUEditclo();
            } else {
              toggleCEditclo();
            }
            loadSearch();
            cleanRegi();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const regexNum = /^[0-9]+$/;
  const regKor = /^[가-힣a-zA-Z0-9`~!@#$%^&*()-_=+\|{};:'",.<>/?\s]+$/;
  const regexCode = /[a-z\uAC00-\uD7AF]+/g;
  const eng = /^[a-zA-Z]*$/;
  const regEnt = /\s/g;

  // onChange : 코드 등록
  const onChangeInput = (e) => {
    if (selectedRow == "RK") {
      setRegiDes(searchValue);
    }

    if (e.target.id == "regiCode") {
      setRegiCode((e.target.value = e.target.value.replace(/[^0-9]/g, "")));
      setValidCcode("none");
      for (let i = 0; Acodes.length > i; i++) {
        if (regiUcode + e.target.value == Acodes[i].common_CODE && e.target.value.length > 2) {
          setValidCcode("block");
        }
      }
    }

    if (e.target.id == "regiCode_up" && eng.test(e.target.value) == true) {
      setRegiUcode(
        (e.target.value = e.target.value.replace(regexCode, function (match) {
          return match.toUpperCase();
        }))
      );
      setValidUCode("none");
      for (let i = 0; Acodes.length > i; i++) {
        if (e.target.value == Acodes[i].common_CODE) {
          setValidUCode("block");
        }
      }
    }

    if (e.target.id == "regiName") {
      if (regKor.test(e.target.value) == true || e.target.value.length < 1) {
        setValidName("none");
      } else {
        setValidName("block");
      }
      setRegiName(e.target.value);
    }

    if (e.target.id == "regiDes") {
      if (regKor.test(e.target.value || e.target.value.length < 1) == true) {
        setValidDes("none");
      } else {
        setValidDes("block");
      }
      setRegiDes(e.target.value);
    }
    if (e.target.id == "regiSwitch") {
      setRegiSwitch(!regiSwitch);
    }
    if (e.target.id == "regiPeriod") {
      setRegiPeriod((e.target.value = e.target.value.replace(/[^0-9]/g, "")));
    }
    if (e.target.id == "regiRef1") {
      if (regKor.test(e.target.value) == true || e.target.value.length < 1) {
        setValidRef1("none");
      } else {
        setValidRef1("block");
      }
      setRegiRef1(e.target.value);
    }
  };

  const yesyn = () => {
    setRegiSwitch(!regiSwitch);
  };

  //datagird 클릭 이벤트
  const handlerCellClick = (e) => {
    setSeletedUcode(e.id);
  };

  const onChangeSearch = (e) => {
    if (e.target.id == "searchCode") {
      setSearchCode(e.target.value);
    }
    if (e.target.id == "searchName") {
      setSearchName(e.target.value);
    }
    if (e.target.id == "searchUse") {
      setSearchUse(e.target.value);
    }
  };

  const onClickSearch = (e) => {
    setSeletedUcode("미지정");
    loadSearch();
  };

  const headerStyle = {
    display: "unset",
    overflow: "hidden",
  };
  const dataG = {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 195px)",
  };

  const Ctable = {
    display: "flex",
    flexDirection: "column",
    height: "58vh",
    border: "none",
    fontSize: "13px",
  };
  const getRowClassName = (params) => {
    if (params.id == selectedRow) {
      return "selected-row"; // 클래스 이름 반환
    }
    return "";
  };

  const handleRowClick = (params, event) => {
    setSelectedRow2(null);
    const selectedRow = params.id; // 선택된 row의 데이터 가져오기
    setSearchKey("Regist_date");
    if (selectedRow == "RK") {
      setSearchValue("99999");
    } else {
      setSearchValue("2");
    }

    setSeletedUcode(selectedRow);
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

  //DnD
  const handleRowOrderChange = (params) => {
    const Change = params.targetIndex + 1;
    const Origin = params.oldIndex + 1;
    const target = params.row["id"];

    if (Origin > Change) {
      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          if (Number(item.period) >= Change && Number(item.period) < Origin) {
            axios
              .post(
                "http://192.168.0.200:8080/KPI/CodeSort.do?key=" +
                  item.common_CODE +
                  "&value=" +
                  (Number(item.period) + 1)
              )
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
          }
        }
        axios
          .post("http://192.168.0.200:8080/KPI/CodeSort.do?key=" + target + "&value=" + Change)
          .then((response) => {
            reLoad3();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    if (Origin < Change) {
      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          if (Number(item.period) > Origin && Number(item.period) <= Change) {
            axios
              .post(
                "http://192.168.0.200:8080/KPI/CodeSort.do?key=" +
                  item.common_CODE +
                  "&value=" +
                  (Number(item.period) - 1)
              )
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
          }
        }
        axios
          .post("http://192.168.0.200:8080/KPI/CodeSort.do?key=" + target + "&value=" + Change)
          .then((response) => {
            reLoad3();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };
  const [modalStateBT, setModalStateBT] = useState(false);

  const MadalEDBT = () => {
    setModalStateBT(!modalStateBT);
  };

  const onChangeDept = (e) => {
    setSearchKey("CODE_DESCRIPTION");
    setSearchValue(e.target.value);
  };

  const selectModelData = (e) => {
    console.log(e);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={0} mb={1.5}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MDBox>
              <Card>
                <div>
                  <div className="sCard">
                    <div className="sAreaSearch">
                      <div style={{ fontWeight: "bold" }}>그룹코드 검색</div>
                      <div>
                        <button
                          className="sButton"
                          style={{
                            background: "rgb(67 79 106)",
                          }}
                          onClick={onClickSearch}
                        >
                          검색
                        </button>
                        <button
                          className="sButton"
                          style={{
                            background: "#c23535",
                          }}
                          onClick={reLoad4}
                        >
                          초기화
                        </button>
                      </div>
                    </div>
                    <table className="sTable" style={{ marginTop: "20px" }}>
                      <tbody>
                        <tr>
                          <th className="sTh">그룹 코드</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <input
                                  placeholder="그룹 코드를 입력하세요.."
                                  type="text"
                                  className="sInput"
                                  id="searchCode"
                                  name="regiUcode"
                                  value={searchCode}
                                  onChange={onChangeSearch}
                                />
                              </div>
                            </div>
                          </td>
                          <th className="sTh">그룹코드 명</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <input
                                  placeholder="그룹코드 명을 입력하세요.."
                                  type="text"
                                  className="sInput"
                                  id="searchName"
                                  name="regiUcode"
                                  value={searchName}
                                  onChange={onChangeSearch}
                                />
                              </div>
                            </div>
                          </td>
                          <th className="sTh">사용 여부</th>
                          <td className="sTd">
                            <div className="sTdCell">
                              <div>
                                <select
                                  className="sInput"
                                  id="searchUse"
                                  name="regiUcode"
                                  type={"select"}
                                  value={searchUse}
                                  onChange={onChangeSearch}
                                >
                                  <option defaultValue value={" "}>
                                    == 전체 ==
                                  </option>
                                  <option value={"Y"}>사용</option>
                                  <option value={"N"}>미사용</option>
                                </select>
                              </div>
                            </div>
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
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <MDBox padding={2}>
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
                                <div>그룹 코드</div>
                                <div>
                                  <RenewalTableHeadAddButton clickEvent={toggleURegi} />
                                  <RenewalTableHeadModButton clickEvent={toggleUEditBT} />
                                  <RenewalTableHeadDelButton clickEvent={onClickDelete} />
                                  {/* EX) <RenewalTableHeadAddButton clickEvent={함수}/> */}
                                </div>
                              </div>
                            </MDTypography>
                          </div>
                        </div>
                        <MDBox>
                          <div style={{ height: "calc(100vh - 400px)", border: "none" }}>
                            <DataGrid
                              columns={Ucolumn}
                              rows={SUcodes}
                              initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 100,
                                  },
                                },
                              }}
                              rowHeight={40}
                              selectionModel={selectionModel}
                              // onSelectionModelChange={selectModelData}
                              onSelectionModelChange={(e) => {
                                setSelectionModel(e);
                              }}
                              checkboxSelection
                              pageSizeOptions={[100]}
                              onCellDoubleClick={toggleUEdit}
                              // onCellClick={handlerCellClick}
                              getCellClassName={getCellClassNames}
                              disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                              getRowClassName={getRowClassName}
                              onRowClick={handleRowClick}
                              components={{
                                Pagination: CustomPagination,
                              }}
                              style={{ height: "100%", fontSize: "13px" }}
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
                                  // height: "360px!important",
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
                                "& .MuiDataGrid-footerContainer": {
                                  backgroundColor: "#dee2e5",
                                },
                              }}
                            ></DataGrid>
                            {/*========= 그룹! 모달부분 등록 =========*/}
                            <Modal isOpen={modalURegist} toggle={toggleURegi} size="md">
                              <ModalHeader>그룹코드 등록</ModalHeader>
                              <ModalBody>
                                <table
                                  className="sTable"
                                  style={{ marginTop: "20px", marginRight: "0px" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>그룹코드
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            maxLength={2}
                                            id="regiCode_up"
                                            name="regiCode_up"
                                            value={regiUcode}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "11px",
                                            color: "#909090",
                                            paddingBottom: "padding-bottom: 6%",
                                            position: "relative",
                                            top: "6px",
                                          }}
                                        >
                                          대문자 영문 2 글자를 입력해주세요
                                        </div>
                                        <div
                                          style={{
                                            position: "relative",
                                            color: "red",
                                            fontSize: "11px",
                                            display: validUCode,
                                            position: "relative",
                                            top: "6px",
                                          }}
                                        >
                                          해당 코드가 존재합니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>그룹코드 명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiName"
                                            name="regiName"
                                            value={regiName}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",
                                            display: validName,
                                            position: "relative",
                                            top: "6px",
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>그룹코드 설명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="textArea"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiDes"
                                            name="regiDes"
                                            value={regiDes}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />{" "}
                                        </div>
                                        <tr></tr>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validDes,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>사용여부
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <Space direction="vertical">
                                            <Switch
                                              checkedChildren="YES"
                                              unCheckedChildren="NO"
                                              checked={regiSwitch}
                                              onChange={yesyn}
                                            />
                                          </Space>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </ModalBody>
                              <ModalFooter className="modal-button">
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={handlerCodeSave}
                                  id="UCode"
                                >
                                  등록
                                </button>
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={toggleURegi}
                                  id="UCode"
                                >
                                  취소
                                </button>
                              </ModalFooter>
                            </Modal>
                            {/*========= 그룹! 모달부분 수정 =========*/}
                            <Modal isOpen={modalUEdit} toggle={toggleUEditclo} size="md">
                              {wayIn == "0" ? (
                                <ModalHeader>그룹코드 수정</ModalHeader>
                              ) : (
                                <ModalHeader>그룹코드 정보</ModalHeader>
                              )}
                              <ModalBody>
                                <table
                                  className="sTable"
                                  style={{ marginTop: "20px", marginRight: "0px" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>그룹코드
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            disabled
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            maxLength={2}
                                            id="regiCode_up"
                                            name="regiCode_up"
                                            value={seletedUcode}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>그룹코드 명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiName"
                                            name="regiName"
                                            value={regiName}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validName,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>그룹코드 설명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="textArea"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiDes"
                                            name="regiDes"
                                            value={regiDes}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <tr></tr>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validDes,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>사용여부
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <Space direction="vertical">
                                            <Switch
                                              checkedChildren="YES"
                                              unCheckedChildren="NO"
                                              checked={regiSwitch}
                                              onChange={yesyn}
                                            />
                                          </Space>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiDt}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh" style={{ fontSize: "15px" }}>
                                        <span style={{ color: "red" }}>* </span>수정자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>수정일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiDt}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </ModalBody>
                              <ModalFooter className="modal-button">
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={handlerCodeEdit}
                                  id="UCode"
                                >
                                  저장
                                </button>
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={toggleUEditclo}
                                  id="UCode"
                                >
                                  취소
                                </button>
                              </ModalFooter>
                            </Modal>
                          </div>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox padding={2}>
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
                                <div>상세 코드</div>
                                <div>
                                  <RenewalTableHeadAddButton clickEvent={toggleCRegi} />
                                  <RenewalTableHeadModButton clickEvent={toggleCEditBT} />
                                  <RenewalTableHeadDelButton clickEvent={onClickCDelete} />
                                  {/* EX) <RenewalTableHeadAddButton clickEvent={함수}/> */}
                                </div>
                              </div>
                            </MDTypography>
                          </div>
                        </div>
                        <MDBox>
                          <div style={{ height: "calc(100vh - 400px)", border: "none" }}>
                            <DataGridPro
                              style={{ height: "100%", fontSize: "13px" }}
                              rowReordering
                              onRowOrderChange={handleRowOrderChange}
                              columns={column}
                              rows={SCcodes}
                              rowHeight={40}
                              initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 100,
                                  },
                                },
                              }}
                              selectionModel={CselectionModel}
                              checkboxSelection
                              pageSizeOptions={[100]}
                              onCellDoubleClick={toggleCEdit}
                              disableSelectionOnClick
                              getRowClassName={getRowClassName2}
                              onRowClick={handleRowClick2}
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
                                  // height: "360px!important",
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
                                "& .MuiDataGrid-footerContainer": {
                                  backgroundColor: "#dee2e5",
                                },
                              }}
                              components={{
                                Pagination: CustomPagination2,
                              }}
                              onSelectionModelChange={(newSelection) => {
                                setCSelectionModel(newSelection);
                              }}
                            ></DataGridPro>
                            {/*========= 상세! 모달부분 등록 =========*/}
                            <Modal isOpen={modalCRegist} toggle={toggleCRegi} size="md">
                              <ModalHeader>상세코드 등록</ModalHeader>
                              <ModalBody>
                                <table
                                  className="sTable"
                                  style={{ marginTop: "20px", marginRight: "0px" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>상세코드 명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiName"
                                            name="regiName"
                                            value={regiName}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",
                                            position: "relative",
                                            top: "6px",
                                            display: validName,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>상세코드 설명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiDes"
                                            name="regiDes"
                                            value={regiDes}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <tr></tr>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validDes,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    {selectedRow == "PT" || selectedRow == "RK" ? (
                                      <tr>
                                        <td className="sTh" style={{ width: "40%" }}>
                                          분류
                                        </td>
                                        <td className="sTd">
                                          <div className="sTdCell">
                                            <select
                                              className="sInput"
                                              style={{ width: "17rem" }}
                                              id="regiRef1"
                                              name="regiRef1"
                                              value={regiRef1}
                                              onChange={(e) => {
                                                onChangeInput(e);
                                              }}
                                            >
                                              <option
                                                defaultValue
                                                value={""}
                                                style={{ display: "none" }}
                                              >
                                                == 분류 선택 ==
                                              </option>
                                              <option defaultValue value={"1"}>
                                                공통직급
                                              </option>
                                              <option defaultValue value={"2"}>
                                                연구직
                                              </option>
                                              <option defaultValue value={"3"}>
                                                일반사무
                                              </option>
                                            </select>
                                          </div>
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "11px",

                                              position: "relative",
                                              top: "6px",
                                              display: validName,
                                            }}
                                          >
                                            입력값이 유효하지 않습니다.
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr>
                                        <td className="sTh" style={{ width: "40%" }}>
                                          참조
                                        </td>
                                        <td className="sTd">
                                          <div className="sTdCell">
                                            <input
                                              type="text"
                                              className="sInput"
                                              style={{ width: "17rem" }}
                                              id="regiRef1"
                                              name="regiRef1"
                                              value={regiRef1}
                                              onChange={(e) => {
                                                onChangeInput(e);
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "11px",

                                              position: "relative",
                                              top: "6px",
                                              display: validRef1,
                                            }}
                                          >
                                            입력값이 유효하지 않습니다.
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>사용여부
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <Space direction="vertical">
                                            <Switch
                                              checkedChildren="YES"
                                              unCheckedChildren="NO"
                                              checked={regiSwitch}
                                              onChange={yesyn}
                                            />
                                          </Space>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </ModalBody>
                              <ModalFooter className="modal-button">
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={handlerCodeSave}
                                  id="Ccode"
                                >
                                  등록
                                </button>
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={toggleCRegiclo}
                                  id="Ccode"
                                >
                                  취소
                                </button>
                              </ModalFooter>
                            </Modal>
                            {/*========= 상세! 모달부분 수정 =========*/}
                            <Modal isOpen={modalCEdit} toggle={toggleCEditclo} size="md">
                              {wayIn == "1" ? (
                                <ModalHeader>상세코드 수정</ModalHeader>
                              ) : (
                                <ModalHeader>상세코드 정보</ModalHeader>
                              )}
                              <ModalBody>
                                <table
                                  className="sTable"
                                  style={{ marginTop: "20px", marginRight: "0px" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>상세코드 명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiName"
                                            name="regiName"
                                            value={regiName}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",
                                            position: "relative",
                                            top: "6px",
                                            display: validName,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>상세코드 설명
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <input
                                            type="text"
                                            className="sInput"
                                            style={{ width: "17rem" }}
                                            id="regiDes"
                                            name="regiDes"
                                            value={regiDes}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                          />
                                        </div>
                                        <tr></tr>
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validDes,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>

                                    {selectedRow == "PT" || selectedRow == "RK" ? (
                                      <tr>
                                        <td className="sTh" style={{ width: "40%" }}>
                                          분류
                                        </td>
                                        <td className="sTd">
                                          <div className="sTdCell">
                                            <select
                                              className="sInput"
                                              style={{ width: "17rem" }}
                                              id="regiRef1"
                                              name="regiRef1"
                                              value={regiRef1}
                                              onChange={(e) => {
                                                onChangeInput(e);
                                              }}
                                            >
                                              <option
                                                defaultValue
                                                value={""}
                                                style={{ display: "none" }}
                                              >
                                                == 분류 선택 ==
                                              </option>
                                              <option defaultValue value={"1"}>
                                                공통직급
                                              </option>
                                              <option defaultValue value={"2"}>
                                                연구직
                                              </option>
                                              <option defaultValue value={"3"}>
                                                일반사무
                                              </option>
                                            </select>
                                          </div>
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "11px",

                                              position: "relative",
                                              top: "6px",
                                              display: validName,
                                            }}
                                          >
                                            입력값이 유효하지 않습니다.
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr>
                                        <td className="sTh" style={{ width: "40%" }}>
                                          참조
                                        </td>
                                        <td className="sTd">
                                          <div className="sTdCell">
                                            <input
                                              type="text"
                                              className="sInput"
                                              style={{ width: "17rem" }}
                                              id="regiRef1"
                                              name="regiRef1"
                                              value={regiRef1}
                                              onChange={(e) => {
                                                onChangeInput(e);
                                              }}
                                            />
                                          </div>
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "11px",

                                              position: "relative",
                                              top: "6px",
                                              display: validRef1,
                                            }}
                                          >
                                            입력값이 유효하지 않습니다.
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td className="sTh" style={{ width: "40%" }}>
                                        <span style={{ color: "red" }}>* </span>사용여부
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <Space direction="vertical">
                                            <Switch
                                              checkedChildren="YES"
                                              unCheckedChildren="NO"
                                              checked={regiSwitch}
                                              onChange={yesyn}
                                            />
                                          </Space>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiDt}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh" style={{ fontSize: "15px" }}>
                                        <span style={{ color: "red" }}>* </span>수정자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>수정일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiDt}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </ModalBody>
                              <ModalFooter className="modal-button">
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={handlerCodeEdit}
                                  id="UCode"
                                >
                                  저장
                                </button>
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={toggleCEditclo}
                                  id="UCode"
                                >
                                  취소
                                </button>
                              </ModalFooter>
                            </Modal>
                            {/*========= 상세! 모달부분 조회 =========*/}
                            <Modal isOpen={modalCDetail} toggle={toggleCDetailclo} size="md">
                              <ModalHeader>상세코드 조회</ModalHeader>
                              <ModalBody>
                                <table
                                  style={{
                                    borderSpacing: "20px 10px",
                                    borderCollapse: "separate",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span style={{ color: "red" }}>* </span>그룹코드
                                      </td>
                                      <td>
                                        <Input
                                          id="regiUcode"
                                          name="regiUcode"
                                          type={"text"}
                                          value={seletedUcode}
                                          readOnly
                                        ></Input>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <span style={{ color: "red" }}>* </span>상세코드
                                      </td>
                                      <td>
                                        <Input
                                          readOnly
                                          id="regiCode_up"
                                          name="regiCode_up"
                                          type={"text"}
                                          value={regiCode}
                                          onChange={(e) => {
                                            onChangeInput(e);
                                          }}
                                        ></Input>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        <span style={{ color: "red" }}>* </span>상세코드 명
                                      </td>
                                      <td>
                                        <Input
                                          id="regiName"
                                          name="regiName"
                                          type={"text"}
                                          value={regiName}
                                          onChange={(e) => {
                                            onChangeInput(e);
                                          }}
                                          readOnly
                                        />
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "11px",

                                            position: "relative",
                                            top: "6px",
                                            display: validName,
                                          }}
                                        >
                                          입력값이 유효하지 않습니다.
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ color: "red" }}>* </span>상세코드 설명
                                      </td>
                                      {selectedRow == "RK" ? (
                                        <td></td>
                                      ) : (
                                        <td>
                                          <TextArea
                                            id="regiDes"
                                            name="regiDes"
                                            type={"text"}
                                            value={regiDes}
                                            onChange={(e) => {
                                              onChangeInput(e);
                                            }}
                                            readOnly
                                          />
                                          <tr></tr>
                                          <div
                                            style={{
                                              color: "red",
                                              fontSize: "11px",

                                              position: "relative",
                                              top: "6px",
                                              display: validDes,
                                            }}
                                          >
                                            입력값이 유효하지 않습니다.
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                    <tr>
                                      <td>
                                        <span style={{ color: "red" }}>* </span>사용여부
                                      </td>
                                      <td>
                                        <Space direction="vertical">
                                          <Switch
                                            checkedChildren="YES"
                                            unCheckedChildren="NO"
                                            checked={regiSwitch}
                                            onChange={yesyn}
                                            disabled
                                          />
                                        </Space>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>등록일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiRegiDt}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh" style={{ fontSize: "15px" }}>
                                        <span style={{ color: "red" }}>* </span>수정자
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiUsr}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="sTh">
                                        <span style={{ color: "red" }}>* </span>수정일
                                      </td>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{ fontSize: "15px" }}>
                                          {regiModiDt}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </ModalBody>
                              <ModalFooter className="modal-button">
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={handlerCodeEdit}
                                  id="UCode"
                                >
                                  저장
                                </button>
                                <button
                                  className="sButton"
                                  style={{
                                    background: "rgb(67 79 106)",
                                  }}
                                  onClick={toggleUEditclo}
                                  id="UCode"
                                >
                                  취소
                                </button>
                              </ModalFooter>
                              <ModalFooter className="modal-button">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={toggleCDetailclo}
                                  sx={{
                                    marginLeft: "20px",
                                    backgroundColor: "#2b496e",
                                    height: "33px",
                                    marginLeft: "6px",
                                    padding: "4px",
                                  }}
                                >
                                  <span style={{ fontWeight: "lighter" }}>닫기</span>
                                  <FaRedoAlt style={{ marginLeft: "5px" }} />
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </div>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Codes;
