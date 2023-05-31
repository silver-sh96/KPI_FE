import { React, useState, useEffect } from "react";
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
} from "react-icons/fa";
import { FormFeedback, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import {
  Box,
  Button,
  Grid,
  MenuList,
  MenuItem,
  ListItemText,
  ListItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Stack,
  SwitchProps,
} from "@mui/material";
import TextArea from "antd/es/input/TextArea";
function uCodeList() {
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

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow2, setSelectedRow2] = useState(null);

  const [selectionModel, setSelectionModel] = useState([]);

  const [modalURegist, setModalURegist] = useState(false);
  const [modalUEdit, setModalUEdit] = useState(false);

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

  const [seletedUcode, setSeletedUcode] = useState("");

  const [searchKey, setSearchKey] = useState("Regist_date");
  const [searchValue, setSearchValue] = useState("2");

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

  const [stateU, setStateU] = useState("null");
  const [stateC, setStateC] = useState("0");

  // axios : 상위 & 공통 코드 상세 정보 axios & setUsestate
  useEffect(() => {
    console.log("start");
    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response);
    });
    axios
      .get("http://192.168.0.30:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
  }, []);

  useEffect(() => {
    console.log("seletedUcode");
    console.log(seletedUcode);

    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.30:8080/KPI/CcodeList.do?seletedUcode=" +
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
        "http://192.168.0.30:8080/KPI/UcodeList.do?searchCode=" +
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
    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.30:8080/KPI/CcodeList.do?seletedUcode=" +
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
      .get("http://192.168.0.30:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.30:8080/KPI/CcodeList.do?seletedUcode=" +
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
    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get(
        "http://192.168.0.30:8080/KPI/CcodeList.do?seletedUcode=" +
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
    axios.get("http://192.168.0.30:8080/KPI/AcodeList.do").then((response) => {
      setAcodes(response.data);
    });
    axios
      .get("http://192.168.0.30:8080/KPI/UcodeList.do?searchCode=&searchName=&searchUse=")
      .then((response) => {
        setUcodes(response.data);
      });
    axios
      .get(
        "http://192.168.0.30:8080/KPI/CcodeList.do?seletedUcode=" +
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

  const getCellClassNames = (params) => {
    if (params.field === "use_YN") {
      return "center-align";
    }
    return null;
  };

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
        .post("http://192.168.0.30:8080/KPI/CodeSort.do?key=" + item.common_CODE + "&value=" + per)
        .then((response) => {
          console.log(item.common_CODE);
          console.log(per);
        })
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
      axios
        .post("http://192.168.0.30:8080/KPI/CodeDelete.do", selectionModel)
        .then((response) => {
          if ((response.data = 1)) {
            setSelectionModel([]);
            loadSearch();
            reLoad3();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickCDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.30:8080/KPI/CodeDelete.do", CselectionModel)
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
    console.log(e);
    let data = {};
    let approved = 0;

    if (regiName.length < 1 || regiDes.length < 1) {
      approved = approved + 1;
      alert("필수 정보를 입력해주세요");
    }
    if (validUCode == "inline" || validCcode == "inline") {
      approved = approved + 1;
      alert("공통코드입력이 유효하지 않습니다.");
    }
    if (validName == "inline") {
      approved = approved + 1;
      alert("공통코드 코드명이 유효하지 않습니다.");
    }
    if (validDes == "inline") {
      approved = approved + 1;
      alert("공통코드 상세정보가 유효하지 않습니다.");
    }

    var YN = "";
    if (regiSwitch === false) {
      console.log("N");
      YN = "N";
    } else {
      console.log("Y");
      YN = "Y";
    }

    console.log(YN);

    if (stateRegi == "U") {
      console.log("상위 등록");
      data = {
        COMMON_CODE: regiUcode,
        UPPER_COMMON_CODE: "",
        CODE_NAME: regiName,
        CODE_DESCRIPTION: regiDes,
        USE_YN: YN,
        PERIOD: "",
        DELETE_YN: "N",
        REGISTRANT: "song",
        MODIFIER: "song",
      };
    }
    if (stateRegi == "C") {
      console.log("하위 등록");
      setSelectionModel([]);
      data = {
        COMMON_CODE: "",
        UPPER_COMMON_CODE: regiUcode,
        CODE_NAME: regiName,
        CODE_DESCRIPTION: regiDes,
        REF1: regiRef1,
        USE_YN: YN,
        PERIOD: Ccodes.length + 1,
        DELETE_YN: "N",
        REGISTRANT: "song",
        MODIFIER: "song",
      };
    }
    console.log(data);

    if (approved == 0) {
      axios
        .post("http://192.168.0.30:8080/KPI/CodeRegist.do", data)
        .then((response) => {
          if (stateRegi == "U") {
            reLoad2();
            toggleURegiclo();
          }
          if (stateRegi == "C") {
            console.log("CLoad");
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
    console.log("start" + regiSwitch);

    let data = {};
    let approved = 0;

    if (validName == "inline") {
      approved = approved + 1;
      alert("공통코드 코드명이 유효하지 않습니다.");
    }
    if (validDes == "inline") {
      approved = approved + 1;
      alert("공통코드 상세정보가 유효하지 않습니다.");
    }
    var YN = "";
    if (regiSwitch === false) {
      console.log("N");
      YN = "N";
    } else {
      console.log("Y");
      YN = "Y";
    }
    console.log("regiUse" + regiUse);

    if (approved == 0) {
      data = {
        COMMON_CODE: regiCode,
        CODE_NAME: regiName,
        CODE_DESCRIPTION: regiDes,
        REF1: regiRef1,
        USE_YN: YN,
        PERIOD: regiPeriod,
        REGISTRANT: "song",
        MODIFIER: "song",
      };
      axios
        .post("http://192.168.0.30:8080/KPI/CodeUpdate.do", data)
        .then((response) => {
          if ((response.data = 1)) {
            if (regiCode.length == 2) {
              console.log("toggleUEditclo");
              toggleUEditclo();
            } else {
              console.log("toggleCEditclo");
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
  const regEnt = /\s/g;

  // onChange : 코드 등록
  const onChangeInput = (e) => {
    console.log(e.target.id);

    if (selectedRow == "RK") {
      setRegiDes(searchValue);
    }

    if (e.target.id == "regiCode") {
      setRegiCode((e.target.value = e.target.value.replace(/[^0-9]/g, "")));
      setValidCcode("none");
      for (let i = 0; Acodes.length > i; i++) {
        if (regiUcode + e.target.value == Acodes[i].common_CODE && e.target.value.length > 2) {
          setValidCcode("inline");
        }
      }
    }

    if (e.target.id == "regiCode_up") {
      setRegiUcode(
        (e.target.value = e.target.value.replace(regexCode, function (match) {
          return match.toUpperCase();
        }))
      );
      console.log(regiUcode);
      setValidUCode("none");
      for (let i = 0; Acodes.length > i; i++) {
        if (e.target.value == Acodes[i].common_CODE) {
          setValidUCode("inline");
        }
      }
    }

    if (e.target.id == "regiName") {
      if (regKor.test(e.target.value) == true || e.target.value.length < 1) {
        setValidName("none");
      } else {
        setValidName("inline");
      }
      setRegiName(e.target.value);
    }

    if (e.target.id == "regiDes") {
      if (regKor.test(e.target.value || e.target.value.length < 1) == true) {
        setValidDes("none");
      } else {
        setValidDes("inline");
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
        setValidRef1("inline");
      }
      setRegiRef1(e.target.value);
    }
  };

  const yesyn = () => {
    setRegiSwitch(!regiSwitch);
    console.log(regiSwitch);
  };

  // PERIOD Sort 로직
  const sort_add = (inputP) => {
    console.log("sort");
    Ccodes.map((item) => {
      if (Number(inputP) <= Number(item.period)) {
        axios
          .post(
            "http://192.168.0.30:8080/KPI/CodeSort.do?key=" +
              item.common_CODE +
              "&value=" +
              (Number(item.period) + 1)
          )
          .then((response) => {
            console.log("성공");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const sort_edit = (Origin, Change, target) => {
    console.log(target);
    console.log(Ccodes);
    console.log(Origin + "::" + Change);

    if (Number(Origin) < Number(Change)) {
      console.log("??????????");
      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          console.log("Period" + Number(item.period));
          console.log("Change" + Change);
          console.log("Origin" + Origin);

          console.log(
            Change + ">=" + Number(item.period) + "&&" + Number(item.period) + ">=" + Origin
          );

          if (Change >= Number(item.period) && Number(item.period) >= Origin) {
            console.log(
              "Update" +
                item.common_CODE +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) -
                1
            );
            axios
              .post(
                "http://192.168.0.30:8080/KPI/CodeSort.do?key=" +
                  item.common_CODE +
                  "&value=" +
                  (Number(item.period) - 1)
              )
              .then((response) => {
                console.log("axios 성공 : " + (Number(item.period) - 1));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      });
    }

    if (Number(Origin) > Number(Change)) {
      console.log("!!!!!!!!!");
      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          if (Origin >= Number(item.period) && Number(item.period) >= Change) {
            console.log("Update" + item.common_CODE);
            console.log(
              "Update" +
                item.common_CODE +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) +
                1
            );
            axios
              .post(
                "http://192.168.0.30:8080/KPI/CodeSort.do?key=" +
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
      });
    }
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
      console.log(searchUse);
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
    width: "45vw",
    padding: "15px",
    margin: "0px 10px",
    // border: "solid 1px #d5d5d5",
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
    console.log("e params : ", params);

    const Change = params.targetIndex + 1;
    const Origin = params.oldIndex + 1;
    const target = params.row["id"];

    console.log(Origin + "::" + Change);
    if (Origin > Change) {
      console.log(Origin + ">" + Change);

      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          if (Number(item.period) >= Change && Number(item.period) < Origin) {
            console.log(
              "Update" +
                item.common_CODE +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) +
                "+" +
                1
            );
            axios
              .post(
                "http://192.168.0.30:8080/KPI/CodeSort.do?key=" +
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
          .post("http://192.168.0.30:8080/KPI/CodeSort.do?key=" + target + "&value=" + Change)
          .then((response) => {
            reLoad3();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    if (Origin < Change) {
      console.log(Origin + "<" + Change);

      Ccodes.map((item) => {
        if (item.common_CODE != target) {
          if (Number(item.period) > Origin && Number(item.period) <= Change) {
            console.log(
              "Update" +
                item.common_CODE +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) +
                "-" +
                1
            );
            axios
              .post(
                "http://192.168.0.30:8080/KPI/CodeSort.do?key=" +
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
          .post("http://192.168.0.30:8080/KPI/CodeSort.do?key=" + target + "&value=" + Change)
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

  return (
    <div style={{ height: "60vh", border: "none" }}>
      <DataGrid
        style={{ height: "58vh", border: "none", fontSize: "13px" }}
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
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgb(229 229 229)",
            fontWeight: "600",
            color: "#686c80",
          },
          "& 	.MuiDataGrid-columnHeader": {
            border: "none",
            backgroundColor: "#fffff",
            fontSize: "12px",
            color: "#90929c",
            marginBottom: "-15px",
          },
          "& 	.MuiDataGrid-footerContainer": {
            backgroundColor: "white",
            border: "none",
          },
          " .MuiDataGrid-cell:focus": {
            outline: "unset",
          },
        }}
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
      ></DataGrid>
      {/*========= 그룹! 모달부분 등록 =========*/}
      <Modal isOpen={modalURegist} toggle={toggleURegi} size="md">
        <ModalHeader>그룹코드 등록</ModalHeader>
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
                    maxLength={2}
                    id="regiCode_up"
                    name="regiCode_up"
                    type={"text"}
                    value={regiUcode}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  />

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#909090",
                      paddingBottom: "    padding-bottom: 6%",
                    }}
                  >
                    대문자 영문 2 글자를 입력해주세요
                  </div>
                  <div
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: validUCode,
                    }}
                  >
                    해당 코드가 존재합니다.
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>그룹코드 명
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
                  />
                  <div
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: validName,
                    }}
                  >
                    입력값이 유효하지 않습니다.
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>그룹코드 설명
                </td>
                <td>
                  <TextArea
                    id="regiDes"
                    name="regiDes"
                    value={regiDes}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  />
                  <tr></tr>
                  <div
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: validDes,
                    }}
                  >
                    입력값이 유효하지 않습니다.
                  </div>
                </td>
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
                    />
                  </Space>
                </td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter className="modal-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handlerCodeSave}
            id="UCode"
            style={{
              marginLeft: "20px",
              backgroundColor: "#2b496e",
              height: "33px",
              marginLeft: "6px",
              padding: "4px",
            }}
          >
            <span style={{ fontWeight: "lighter" }}>등록</span>
            <FaCheck style={{ marginLeft: "5px" }} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleURegi}
            sx={{
              marginLeft: "20px",
              backgroundColor: "#2b496e",
              height: "33px",
              marginLeft: "6px",
              padding: "4px",
            }}
          >
            <span style={{ fontWeight: "lighter" }}>취소</span>
            <FaRedoAlt style={{ marginLeft: "5px" }} />
          </Button>
        </ModalFooter>
      </Modal>
      {/*========= 그룹! 모달부분 수정 =========*/}
      <Modal isOpen={modalUEdit} toggle={toggleUEdit} size="md">
        {wayIn == "0" ? (
          <ModalHeader>그룹코드 수정</ModalHeader>
        ) : (
          <ModalHeader>그룹코드 정보</ModalHeader>
        )}
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
                    disabled
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
                  <span style={{ color: "red" }}>* </span>그룹코드 명
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
                  />
                  <div
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: validName,
                    }}
                  >
                    입력값이 유효하지 않습니다.
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>그룹코드 설명
                </td>
                <td>
                  <TextArea
                    id="regiDes"
                    name="regiDes"
                    type={"text"}
                    value={regiDes}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  />
                  <tr></tr>
                  <div
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: validDes,
                    }}
                  >
                    입력값이 유효하지 않습니다.
                  </div>
                </td>
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
                    />
                  </Space>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>등록자
                </td>
                <td>
                  <Input
                    readOnly
                    id="regiCode_up"
                    name="regiCode_up"
                    type={"text"}
                    value={regiRegiUsr}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                    disabled
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>등록일
                </td>
                <td>
                  <Input
                    id="regiCode_up"
                    name="regiCode_up"
                    type={"text"}
                    value={regiRegiDt}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                    disabled
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>수정자
                </td>
                <td>
                  <Input
                    disabled
                    id="regiCode_up"
                    name="regiCode_up"
                    type={"text"}
                    value={regiModiUsr}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ color: "red" }}>* </span>수정일
                </td>
                <td>
                  <Input
                    disabled
                    id="regiCode_up"
                    name="regiCode_up"
                    type={"text"}
                    value={regiModiDt}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  ></Input>
                </td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter className="modal-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handlerCodeEdit}
            sx={{
              marginLeft: "20px",
              backgroundColor: "#2b496e",
              height: "33px",
              marginLeft: "6px",
              padding: "4px",
            }}
          >
            <span style={{ fontWeight: "lighter" }}>저장</span>
            <FaCheck style={{ marginLeft: "5px" }} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleUEditclo}
            sx={{
              marginLeft: "20px",
              backgroundColor: "#2b496e",
              height: "33px",
              marginLeft: "6px",
              padding: "4px",
            }}
          >
            <span style={{ fontWeight: "lighter" }}>취소</span>

            <FaRedoAlt style={{ marginLeft: "5px" }} />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default uCodeList;
