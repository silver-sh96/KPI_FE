import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";
import Footer from "examples/Footer";
import { DataGridPro, useGridApiContext, useGridSelector } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";

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
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
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

import { CircularProgress } from "@mui/material";

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
import { Empty } from "antd/es";
import { char } from "stylis";
function Business() {
  const LoadingOverlay = () => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <CircularProgress />
    </div>
  );

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

  var column = [
    {
      field: "charge_CODE",
      headerName: "담당자 코드",
      width: 180,
      editable: false,
      headerAlign: "center",
      flex: 2,
    },
    {
      field: "first_NAME",
      headerName: "이름",
      width: 30,
      headerAlign: "center",
      flex: 2,
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            onChangeCharge(e, params);
          }}
          onBlur={(e) => {
            onBlurHandler(e, params);
          }}
          style={{ border: "none" }}
        />
      ),
    },
    {
      field: "rank",
      headerName: "직급",
      width: 60,
      headerAlign: "center",
      flex: 2,
      align: "center",
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            onChangeCharge(e, params);
          }}
          onBlur={(e) => {
            onBlurHandler(e, params);
          }}
          style={{ border: "none", width: "120px" }}
        />
      ),
    },
    {
      field: "email",
      headerName: "이메일",
      width: 60,
      headerAlign: "center",
      flex: 2,
      align: "center",
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            onChangeCharge(e, params);
          }}
          onBlur={(e) => {
            onBlurHandler(e, params);
          }}
          style={{ border: "none", width: "120px" }}
        />
      ),
    },
    {
      field: "phone_NUMBER",
      headerName: "전화번호",
      width: 60,
      headerAlign: "center",
      flex: 2,
      align: "center",
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            onChangeCharge(e, params);
          }}
          onBlur={(e) => {
            onBlurHandler(e, params);
          }}
          style={{ border: "none", width: "120px" }}
        />
      ),
    },
    {
      field: "company_EXTENSION_NUMBER",
      headerName: "내선번호",
      width: 60,
      headerAlign: "center",
      flex: 2,
      align: "center",
      editable: true,
      renderCell: (params) => (
        <input
          type="text"
          value={params.value}
          onChange={(e) => {
            onChangeCharge(e, params);
          }}
          onBlur={(e) => {
            onBlurHandler(e, params);
          }}
          style={{ border: "none", width: "120px" }}
        />
      ),
    },
    {
      field: "registran",
      headerName: "등록자",
      width: 60,
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "center",
    },
    {
      field: "regist_DATE",
      headerName: "등록일",
      width: 60,
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "center",
    },
    {
      field: "modifier",
      headerName: "수정자",
      width: 60,
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "center",
    },
    {
      field: "modify_DATE",
      headerName: "수정일",
      width: 60,
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "center",
    },
  ];

  const [comData, setComData] = useState({
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
  });

  const [charges, setCharges] = useState({
    company_CODE: "",
    charge_CODE: "",
    name: "",
    rank: "",
    email: "",
    phone_NUMBER: "",
    company_EXTENSION_NUMBER: "",
    delete_YN: "",
    registran: "",
    regist_DATE: "",
    modifier: "",
    modify_DATE: "",
  });
  const [searchComp, setSearchComp] = useState([{ crno: "" }]);
  const [searchComp2, setSearchComp2] = useState([{ crno: "1" }]);
  var columnSearchComp = [
    {
      field: "crno",
      headerName: "법인등록번호",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "corpNm",
      headerName: "법인명",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "enpRprFnm",
      headerName: "대표자",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "bzno",
      headerName: "사업자등록번호",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "enpOzpno",
      headerName: "우편번호",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "enpBsadr",
      headerName: "본점소재지",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
    {
      field: "enpDtadr",
      headerName: "사업장소재지",
      width: 150,
      editable: false,
      headerAlign: "center",
      flex: 3,
    },
  ];

  const [regiCODE, setRegiCODE] = useState("");
  const [regiNAME, setRegiNAME] = useState("");
  const [regiREPRESENTATIVE, setRegiREPRESENTATIVE] = useState("");
  const [regiLICENSE_NUMBER, setRegiLICENSE_NUMBER] = useState("");
  const [regiCLASSIFICATION, setRegiCLASSIFICATION] = useState("");
  const [regiRegiSTRATION_NUMBER, setregiRegiSTRATION_NUMBER] = useState("");
  const [regiTAX_CLASSIFICATION, setRegiTAX_CLASSIFICATION] = useState("");
  const [regiBUSINESS, setRegiBUSINESS] = useState("");
  const [regiITEMS, setRegiITEMS] = useState("");
  const [income_YN, setincome_YN] = useState("");
  const [outcome_YN, setoutcome_YN] = useState("");
  const [regiESTABLISHMENT, setRegiESTABLISHMENT] = useState("");
  const [regiHEAD_OFFICE, setRegiHEAD_OFFICE] = useState("");
  const [regiPOST, setRegiPOST] = useState("");
  const [regiFAX, setRegiFAX] = useState("");
  const [regiWEB, setRegiWEB] = useState("");
  const [regiTRADE_PERMISSION_STATE, setRegiTRADE_PERMISSION_STATE] = useState("");
  const [regiSTATUS, setRegiSTATUS] = useState("");

  const [checkIncome_YN, setcheckIncome_YN] = useState(false);
  const [checkOutcome_YN, setcheckOutcome_YN] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  var id = searchParams.get("id");

  const [registState, setRegistState] = useState("");

  useEffect(() => {
    axios.post("http://192.168.0.200:8080/KPI/ComDetail.do?id=" + id).then((response) => {
      setComData(response.data);
    });
  }, [registState]);

  const [stateCharge, setSatateCharge] = useState("");

  useEffect(() => {
    axios.post("http://192.168.0.200:8080/KPI/ComCharges.do?id=" + id).then((response) => {
      setCharges(response.data);
    });
  }, [stateCharge]);

  useEffect(() => {
    setRegiCODE(comData.company_CODE);
    setRegiNAME(comData.company_NAME);
    setRegiREPRESENTATIVE(comData.company_REPRESENTATIVE);
    setRegiLICENSE_NUMBER(comData.company_LICENSE_NUMBER);
    setregiRegiSTRATION_NUMBER(comData.company_REGISTRATION_NUMBER);
    setRegiCLASSIFICATION(comData.company_CLASSIFICATION);
    setRegiTAX_CLASSIFICATION(comData.company_TAX_CLASSIFICATION);
    setRegiBUSINESS(comData.company_BUSINESS);
    setRegiITEMS(comData.company_ITEMS);
    if (comData.income_YN == "1") {
      setcheckIncome_YN(true);
      setincome_YN("1");
    } else setincome_YN("0");
    if (comData.outcome_YN == "1") {
      setcheckOutcome_YN(true);
      setoutcome_YN("1");
    } else setoutcome_YN("0");
    setRegiESTABLISHMENT(comData.company_ESTABLISHMENT);
    setRegiHEAD_OFFICE(comData.company_HEAD_OFFICE);
    setRegiPOST(comData.company_POST);
    setRegiFAX(comData.company_FAX);
    setRegiWEB(comData.company_WEB);
    setRegiTRADE_PERMISSION_STATE(comData.company_TRADE_PERMISSION_STATE);
    setRegiSTATUS(comData.company_STATUS);
  }, [comData]);

  const onChangeInput = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    if (id == "regiNAME") {
      setRegiNAME(val);
    }
    if (id == "regiREPRESENTATIVE") {
      setRegiREPRESENTATIVE(val);
    }
    if (id == "regiLICENSE_NUMBER") {
      setRegiLICENSE_NUMBER(val);
    }
    if (id == "regiCLASSIFICATION") {
      setRegiCLASSIFICATION(val);
    }
    if (id == "regiRegiSTRATION_NUMBER") {
      setregiRegiSTRATION_NUMBER(val);
    }
    if (id == "regiTAX_CLASSIFICATION") {
      setRegiTAX_CLASSIFICATION(val);
    }
    if (id == "regiBUSINESS") {
      setRegiBUSINESS(val);
    }
    if (id == "regiITEMS") {
      setRegiITEMS(val);
    }
    if (id == "regiESTABLISHMENT") {
      setRegiESTABLISHMENT(val);
    }
    if (id == "regiHEAD_OFFICE") {
      setRegiHEAD_OFFICE(val);
    }
    if (id == "regiPOST") {
      setRegiPOST(val);
    }
    if (id == "regiFAX") {
      setRegiFAX(val);
    }
    if (id == "regiWEB") {
      setRegiWEB(val);
    }
    if (id == "regiTRADE_PERMISSION_STATE") {
      setRegiTRADE_PERMISSION_STATE(val);
    }
    if (id == "regiSTATUS") {
      setRegiSTATUS(val);
    }
    if (id == "income_YN") {
      setcheckIncome_YN(!checkIncome_YN);
      var check = document.getElementById("income_YN").checked;
      if (check == true) {
        setincome_YN("1");
      } else {
        setincome_YN("0");
      }
    }
    if (id == "outcome_YN") {
      setcheckOutcome_YN(!checkOutcome_YN);
      var check = document.getElementById("outcome_YN").checked;
      if (check == true) {
        setoutcome_YN("1");
      } else {
        setoutcome_YN("0");
      }
    }
  };

  const [modalSearchComp, setModalSearchComp] = useState(false);
  const [scName, setscName] = useState("");
  const [scNum, setscNum] = useState("");

  const toggleSearchComp = () => {
    setSelectionModel([]);
    console.log(selectionModel);
    setModalSearchComp(!modalSearchComp);
  };

  const onChangeInputSearchComp = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    if (id == "scName") {
      setscName(val);
    }
    if (id == "scNum") {
      setscNum(val);
    }
  };
  const [loading, setLoading] = useState(false);

  const hanlerSearchComp = () => {
    setLoading(true);
    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2/getCorpOutline_V2?ServiceKey=Fv6r%2FH8uFzsWhwaW%2FmuSvA2SCeH3bdqEF0mEZu%2B7XuYaXPdE%2Bd2icw8qbbYhieTpzz9U%2BqFla2eQKf%2FUU3WQ0Q%3D%3D&pageNo=1&numOfRows=100&resultType=json&corpNm=" +
          scName +
          "&crno=" +
          scNum
      )
      .then((response) => {
        const data = response.data.response.body.items.item;
        if (data.length > 1) {
          setSearchComp(data);
        } else {
          alert("기업 정보가 존재하지 않습니다. ");
          setSearchComp2([{ crno: "" }]);
        }
        setLoading(false);
      });
  };

  const handlerSearchSeleted = () => {
    console.log(selectionModel);
    if (selectionModel.length == 1) {
      const compData = searchComp2.find((data) => data.crno == selectionModel);
      console.log(compData);
      setRegiNAME(compData.corpNm);
      setRegiPOST(compData.enpOzpno);
      setRegiFAX(compData.enpFxno);
      setRegiWEB(compData.enpHmpgUrl);
      setRegiREPRESENTATIVE(compData.enpRprFnm);
      setRegiLICENSE_NUMBER(compData.bzno);
      setregiRegiSTRATION_NUMBER(compData.crno);
      setRegiESTABLISHMENT(compData.enpBsadr);
      setRegiHEAD_OFFICE(compData.enpDtadr);
      setModalSearchComp(!modalSearchComp);
    } else {
      alert("기업을 선택해 주세요");
    }
  };

  useEffect(() => {
    var data = [{}];
    var row = 1;
    data[0] = searchComp[0];

    for (var i = 0; i < searchComp.length; i++) {
      if (searchComp[i].crno != data[row - 1].crno) {
        data[row] = searchComp[i];
        row++;
      }
    }
    setSearchComp2(data);
  }, [searchComp]);

  const history = useNavigate();

  const handlerSave = () => {
    var error = 0;

    console.log(regiSTATUS);
    const params = new URLSearchParams();
    params.append("OURCOMPANY_YN", "N");
    params.append("COMPANY_NAME", regiNAME);
    params.append("COMPANY_REPRESENTATIVE", regiREPRESENTATIVE);
    params.append("COMPANY_LICENSE_NUMBER", regiLICENSE_NUMBER);
    params.append("COMPANY_CLASSIFICATION", regiCLASSIFICATION);
    params.append("COMPANY_TAX_CLASSIFICATION", regiTAX_CLASSIFICATION);
    params.append("COMPANY_REGISTRATION_NUMBER", regiRegiSTRATION_NUMBER);
    params.append("COMPANY_BUSINESS", regiBUSINESS);
    params.append("COMPANY_ITEMS", regiITEMS);
    params.append("INCOME_YN", income_YN);
    params.append("OUTCOME_YN", outcome_YN);
    params.append("COMPANY_ESTABLISHMENT", regiESTABLISHMENT);
    params.append("COMPANY_HEAD_OFFICE", regiHEAD_OFFICE);
    params.append("COMPANY_POST", regiPOST);
    params.append("COMPANY_FAX", regiFAX);
    params.append("COMPANY_WEB", regiWEB);
    params.append("COMPANY_TRADE_PERMISSION_STATE", regiTRADE_PERMISSION_STATE);
    params.append("DELTET_YN", "N");
    params.append("COMPANY_STATUS", regiSTATUS);
    params.append("REGISTRANT", sessionStorage.getItem("id"));
    params.append("MODIFIER", sessionStorage.getItem("id"));

    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null") {
        obj.set(key, "");
      }
      if (value.length < 1 || value == "undefined") {
        if (
          key == "COMPANY_NAME" ||
          key == "COMPANY_REPRESENTATIVE" ||
          key == "COMPANY_CLASSIFICATION" ||
          key == "COMPANY_TAX_CLASSIFICATION" ||
          key == "COMPANY_TRADE_PERMISSION_STATE" ||
          key == "COMPANY_STATUS"
        ) {
          error = 1;
        }
      }
    });
    if (error == 0) {
      axios.post("http://192.168.0.200:8080/KPI/ComRegi.do?" + params).then((response) => {
        setRegistState(response.data.company_CODE);
        alert("등록 성공");
        history("/company/companyDetail?id=" + response.data.company_CODE);
        comData.company_CODE = response.data.company_CODE;
      });
    } else alert("필수 입력값이 부족합니다. ");
  };

  const handlerEdit = () => {
    var error = 0;

    const params = new URLSearchParams();
    params.append("COMPANY_CODE", id);
    params.append("OURCOMPANY_YN", "N");
    params.append("COMPANY_NAME", regiNAME);
    params.append("COMPANY_REPRESENTATIVE", regiREPRESENTATIVE);
    params.append("COMPANY_LICENSE_NUMBER", regiLICENSE_NUMBER);
    params.append("COMPANY_CLASSIFICATION", regiCLASSIFICATION);
    params.append("COMPANY_TAX_CLASSIFICATION", regiTAX_CLASSIFICATION);
    params.append("COMPANY_REGISTRATION_NUMBER", regiRegiSTRATION_NUMBER);
    params.append("COMPANY_BUSINESS", regiBUSINESS);
    params.append("COMPANY_ITEMS", regiITEMS);
    params.append("INCOME_YN", income_YN);
    params.append("OUTCOME_YN", outcome_YN);
    params.append("COMPANY_ESTABLISHMENT", regiESTABLISHMENT);
    params.append("COMPANY_HEAD_OFFICE", regiHEAD_OFFICE);
    params.append("COMPANY_POST", regiPOST);
    params.append("COMPANY_FAX", regiFAX);
    params.append("COMPANY_WEB", regiWEB);
    params.append("COMPANY_TRADE_PERMISSION_STATE", regiTRADE_PERMISSION_STATE);
    params.append("DELTET_YN", "N");
    params.append("COMPANY_STATUS", regiSTATUS);
    params.append("MODIFIER", sessionStorage.getItem("id"));

    params.forEach((value, key, obj) => {
      if (value == "undefined" || value == "null") {
        obj.set(key, "");
      }
      if (value.length < 1) {
        console.log(key);
        console.log(value);
        if (
          key == "COMPANY_NAME" ||
          key == "COMPANY_REPRESENTATIVE" ||
          key == "COMPANY_CLASSIFICATION" ||
          key == "COMPANY_TAX_CLASSIFICATION" ||
          key == "COMPANY_TRADE_PERMISSION_STATE" ||
          key == "COMPANY_STATUS"
        ) {
          error = 1;
        }
      }
    });
    if (error == 0) {
      axios.post("http://192.168.0.200:8080/KPI/ComEdit.do?" + params).then((response) => {
        alert("수정 성공");
      });
    } else alert("필수 입력값이 부족합니다. ");
  };

  const handleDeleteComp = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/ComDel.do?COMPANY_CODE=" + id)
        .then((response) => {
          history("/company");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionModelCharge, setSelectionModelCharge] = useState([]);

  const handleonSelectionModelChange = (newSelection) => {
    var arry = selectionModel;
    arry.push(newSelection);
    console.log(arry);
    if (arry.length > 1) {
      setSelectionModel([newSelection[1]]);
    } else {
      setSelectionModel(newSelection);
    }
  };

  const handleonSelectionModelCharge = (newSelection) => {
    setSelectionModelCharge(newSelection);
  };

  const [cgCharge, setcgCharge] = useState("");
  const [cgName, setcsName] = useState("");
  const [cgRank, setcsRank] = useState("");
  const [cgPhone, setcgPhone] = useState("");
  const [cgExtension, setcgExtension] = useState("");

  const handleAddRow = () => {
    if (searchParams.get("id").length < 1) {
      alert("먼저 거래처를 등록해주세요.");
    } else {
      const Uparams = new URLSearchParams();
      Uparams.append("COMPANY_CODE", searchParams.get("id"));
      Uparams.append("REGISTRAN", sessionStorage.getItem("id"));
      Uparams.append("MODIFIER", sessionStorage.getItem("id"));
      axios.post("http://192.168.0.200:8080/KPI/ChargeRegi.do?" + Uparams).then((response) => {
        setSatateCharge(response);
      });
    }
  };

  const handleDeleteCharges = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/ChargeDel.do", selectionModelCharge)
        .then((response) => {
          if ((response.data = 1)) {
            setSelectionModel([]);
            setSatateCharge(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const [editRowsModel, setEditRowsModel] = useState({});

  const onChangeCharge = (e, params) => {
    console.log(e.target.value.length);
    if (e.target.value.length >= 1) {
      const editData = charges;
      for (var i = 0; i < charges.length; i++) {
        if (charges[i].charge_CODE == params.id) {
          const field = params.field;
          editData[i][field] = e.target.value;
        }
      }
      setCharges(editData);
      const newData = [...editData];
      setCharges(newData);
    } else {
      const editData = charges;
      for (var i = 0; i < charges.length; i++) {
        if (charges[i].charge_CODE == params.id) {
          const field = params.field;
          editData[i][field] = "";
        }
      }
      setCharges(editData);
      const newData = [...editData];
      setCharges(newData);
    }
  };

  const onBlurHandler = (e, params) => {
    console.log(e.target.value.length);

    const code = params.id;
    const field = params.field;
    var val = "";
    var com = "";
    for (var i = 0; i < charges.length; i++) {
      if (charges[i].charge_CODE == params.id) {
        val = charges[i][field];
        com = charges[i].company_CODE;
      }
    }
    const Uparams = new URLSearchParams();
    if (e.target.value.length >= 1) {
      Uparams.append("COMPANY_CODE", com);
      Uparams.append("VALUE", val);
      Uparams.append("CHARGE_CODE", code);
      Uparams.append("FIELD", field);
      Uparams.append("REGISTRAN", sessionStorage.getItem("id"));
      Uparams.append("MODIFIER", sessionStorage.getItem("id"));
    } else {
      Uparams.append("COMPANY_CODE", com);
      Uparams.append("VALUE", "");
      Uparams.append("CHARGE_CODE", code);
      Uparams.append("FIELD", field);
      Uparams.append("REGISTRAN", sessionStorage.getItem("id"));
      Uparams.append("MODIFIER", sessionStorage.getItem("id"));
    }
    axios.post("http://192.168.0.200:8080/KPI/ChargeEdit.do?" + Uparams).then((response) => {
      setSatateCharge(response);
    });
  };

  const backToMain = () => {
    if (window.confirm("등록을 취소하고 거래처 목록화면으로 돌아가시겠습니까?")) {
      history("/company");
    }
  };
  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={0} pd={2} mb={1.5}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MDBox sx={{ width: "100%" }}>
                <Card sx={{ height: "calc(100vh + 130px)" }}>
                  <div>
                    <div className="sCard">
                      <div className="sAreaSearch">
                        <div>거래처 상세정보 정보</div>
                        {id.length == 0 ? (
                          <div>
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={toggleSearchComp}
                            >
                              기업 검색
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={handlerSave}
                            >
                              등록
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "#c23535",
                              }}
                              onClick={backToMain}
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={handlerEdit}
                            >
                              저장
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "#c23535",
                              }}
                              onClick={handleDeleteComp}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="sCard">
                      <table className="sTable">
                        <tbody>
                          <tr>
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>
                              기업명
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="기업명을 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    value={regiNAME}
                                    id="regiNAME"
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>대표자
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="대표자를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiREPRESENTATIVE"
                                    value={regiREPRESENTATIVE}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">사업자 등록번호</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="사업자 등록번호를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiLICENSE_NUMBER"
                                    value={regiLICENSE_NUMBER}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="sTh">법인 등록번호</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="법인 등록번호를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiRegiSTRATION_NUMBER"
                                    value={regiRegiSTRATION_NUMBER}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>사업자 분류
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="regiCLASSIFICATION"
                                    value={regiCLASSIFICATION}
                                    onChange={onChangeInput}
                                  >
                                    <option defaultValue="0" style={{ display: "none" }}>
                                      == 사업자 분류 ==
                                    </option>
                                    <option value="법인사업자">법인사업자</option>
                                    <option value="일반사업자">일반사업자</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>과세 분류
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="regiTAX_CLASSIFICATION"
                                    value={regiTAX_CLASSIFICATION}
                                    onChange={onChangeInput}
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
                                    className="sInput"
                                    id="regiBUSINESS"
                                    value={regiBUSINESS}
                                    onChange={onChangeInput}
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
                                    className="sInput"
                                    id="regiITEMS"
                                    value={regiITEMS}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">사업장 소재지</td>
                            <td className="sTd" colSpan={3}>
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="사업자 소재지를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiESTABLISHMENT"
                                    value={regiESTABLISHMENT}
                                    onChange={onChangeInput}
                                    style={{ width: "70.66rem" }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">본점 소재지</td>
                            <td className="sTd" colSpan={3}>
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="본점 소재지를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiHEAD_OFFICE"
                                    value={regiHEAD_OFFICE}
                                    onChange={onChangeInput}
                                    style={{ width: "70.66rem" }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">우편번호</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="우편번호를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiPOST"
                                    value={regiPOST}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="sTh">팩스번호</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="팩스번호를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiFAX"
                                    value={regiFAX}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">웹사이트</td>
                            <td className="sTd" colSpan={3}>
                              <div className="sTdCell">
                                <div>
                                  <input
                                    placeholder="웹사이트를 입력하세요.."
                                    type="text"
                                    className="sInput"
                                    id="regiWEB"
                                    value={regiWEB}
                                    onChange={onChangeInput}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>거래 허가 상태
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    value={regiTRADE_PERMISSION_STATE}
                                    onChange={onChangeInput}
                                    id="regiTRADE_PERMISSION_STATE"
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
                            <td className="sTh">
                              <span style={{ color: "red" }}>* </span>기업 운영 상태
                            </td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>
                                  <select
                                    className="sInput"
                                    id="regiSTATUS"
                                    value={regiSTATUS}
                                    onChange={onChangeInput}
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
                                  id="income_YN"
                                  checked={checkIncome_YN}
                                  onClick={onChangeInput}
                                  style={{ margin: "0px 7px", fontSize: "14px" }}
                                />
                                매입
                              </label>
                              <label style={{ fontSize: "14px" }}>
                                <input
                                  type="checkbox"
                                  id="outcome_YN"
                                  style={{ margin: "0px 7px", fontSize: "14px" }}
                                  checked={checkOutcome_YN}
                                  onClick={onChangeInput}
                                />
                                매출
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">등록자</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>{comData.registrant}</div>
                              </div>
                            </td>
                            <td className="sTh">등록일</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>{comData.regist_DATE}</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="sTh">수정자</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>{comData.modifier} </div>
                              </div>
                            </td>
                            <td className="sTh">수정일</td>
                            <td className="sTd">
                              <div className="sTdCell">
                                <div>{comData.modify_DATE}</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
                              <div>담당자 목록</div>
                              <div>
                                <RenewalTableHeadAddButton clickEvent={handleAddRow} />
                                <RenewalTableHeadDelButton clickEvent={handleDeleteCharges} />
                              </div>
                            </div>
                          </MDTypography>
                        </div>
                      </div>
                      <DataGridPro
                        getRowId={(row) => row.charge_CODE}
                        onEditCellChange={onChangeCharge}
                        editRowsModel={editRowsModel}
                        style={{
                          height: "calc(100vh - 530px)",
                          border: "1px solid rgb(205, 205, 205)",
                          marginRight: "44px",
                        }}
                        disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                        //getRowClassName={getRowClassName}
                        //onRowClick={handleRowClick}
                        //onPageChange={handlerpageChnage}
                        columns={column}
                        rows={charges}
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
                          "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "#dee2e5",
                          },
                        }}
                        components={{
                          Pagination: CustomPagination,
                        }}
                        pageSize={size}
                        selectionModel={selectionModelCharge}
                        onSelectionModelChange={handleonSelectionModelCharge}
                      ></DataGridPro>
                    </div>
                  </div>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      {/* 기업 정보 조회 창 */}
      <Modal isOpen={modalSearchComp} toggle={toggleSearchComp} size="xl">
        <ModalHeader>기업 정보 조회</ModalHeader>
        <ModalBody>
          <div
            style={{ display: "flex", alignItems: "row", marginBottom: "15px", marginTop: "10px" }}
          >
            <table className="sTable" style={{ margin: "0px" }}>
              <tbody>
                <tr>
                  <td className="sTh">법인명</td>
                  <td className="sTd">
                    <div className="sTdCell">
                      <div>
                        <input
                          type="text"
                          className="sInput"
                          value={scName}
                          id="scName"
                          onChange={onChangeInputSearchComp}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="sTh">법인등록번호</td>
                  <td className="sTd">
                    <div className="sTdCell">
                      <div>
                        <input
                          type="text"
                          className="sInput"
                          value={scNum}
                          id="scNum"
                          onChange={onChangeInputSearchComp}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="sButton"
              style={{
                background: "rgb(67 79 106)",
                margin: "0px",
                width: "72px",
                padding: "0px 9px",
                height: "41px",
              }}
              onClick={hanlerSearchComp}
            >
              검색
            </button>
          </div>
          <DataGrid
            loading={loading} // true , false
            components={{
              Loading: LoadingOverlay,
              Pagination: CustomPagination,
            }}
            getRowId={(row) => row.crno}
            style={{
              height: "calc(100vh - 485px)",
              border: "1px solid rgb(205, 205, 205)",
            }}
            disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
            selectionModel={selectionModel}
            onSelectionModelChange={handleonSelectionModelChange}
            columns={columnSearchComp}
            rows={searchComp2}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
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
              "& .MuiDataGrid-selectedRowCount": {
                marginRight: "-44px",
                fontSize: "0px",
              },
              "& .MuiDataGrid-footerContainer": {
                alignItems: "center",
                paddingLeft: "190px",
              },
            }}
            pageSize={size}
          ></DataGrid>
        </ModalBody>
        <ModalFooter className="modal-button">
          <button
            className="sButton"
            style={{
              background: "rgb(67 79 106)",
            }}
            onClick={handlerSearchSeleted}
          >
            완료
          </button>
          <button
            className="sButton"
            style={{
              background: "rgb(67 79 106)",
            }}
            onClick={toggleSearchComp}
          >
            닫기
          </button>
        </ModalFooter>
      </Modal>
      {/* 담당자 추가 */}
    </div>
  );
}

export default Business;
