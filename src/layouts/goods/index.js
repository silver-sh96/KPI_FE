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

import "../../components/Custom.css";
import { DataGrid, useGridApiContext, useGridSelector } from "@mui/x-data-grid";

import { DownOutlined, PlusSquareOutlined, MinusSquareOutlined } from "@ant-design/icons";
import { Tree } from "antd";
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

import axios from "axios";
import { Switch, Space } from "antd";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  FaRegPlusSquare,
  FaRegSun,
  FaRegTrashAlt,
  FaRedoAlt,
  FaCheck,
  FaEdit,
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
import MDAvatar from "components/MDAvatar";
import RenewalTableHeadAddButton from "components/CustomButton/Renewal/RenewalTableHeadAddButton";
import RenewalTableHeadModButton from "components/CustomButton/Renewal/RenewalTableHeadModButton";
import RenewalTableHeadDelButton from "components/CustomButton/Renewal/RenewalTableHeadDelButton";

function Goods() {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "54%",
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
            ".Mui-disabled": {
              border: "unset",
            },
          }}
        />
        <div style={{ marginRight: "5px" }}>
          <span style={{ marginLeft: 16, marginRight: 16 }}></span>
        </div>
      </div>
    );
  }

  // 변수 : 코드 상세 정보 테이블 컬럼
  const Goods = [
    {
      field: "goods_CODE",
      headerName: "상품 코드",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "item_CATEGORY",
      headerName: "상품 카테고리",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "goods_NAME",
      headerName: "상품명",
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "left",
    },
    {
      field: "spec",
      headerName: "스펙",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "left",
    },
    {
      field: "unit",
      headerName: "단위",
      editable: false,
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "purchase_COSE",
      headerName: "매입단가",
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "right",
    },

    {
      field: "selling_PRICE",
      headerName: "공급단가",
      editable: false,
      headerAlign: "center",
      flex: 2,
      align: "right",
    },
  ];
  // 변수 : 품목 리스트
  const [SGoodList, setSGoodList] = useState([
    {
      id: "",
      goods_CODE: "",
      item_CATEGORY: "",
      goods_NAME: "",
      unit: "",
      spec: "",
      selling_PRICE: "",
      purchase_COSE: "",
      registrant: "",
      regist_DATE: "",
      modifier: "",
      modify_DATE: "",
    },
  ]);

  const [GoodCategory, setGoodCategory] = useState([{ key: "", title: "", period: "" }]); // 변수 : 품목 카테고리 리스트

  const [selectedCategory, setSelectedCategory] = useState("no"); // 변수 : 선택된 카테고리
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchSpec, setSearchSpec] = useState("");
  const [searchUnit, setSearchUnit] = useState("");
  const [searchPur_s, setSearchPur_s] = useState("");
  const [searchPur_e, setSearchPur_e] = useState("");
  const [searchSell_s, setSearchSell_s] = useState("");
  const [searchSell_e, setSearchSell_e] = useState("");

  const [numder, setNumder] = useState("0");

  const headData = [
    {
      title: "품목 카테고리",
      key: "",
      children: GoodCategory,
    },
  ];

  const searchClean = () => {
    setSearchCategory("");
    setSearchCode("");
    setSearchName("");
    setSearchSpec("");
    setSearchUnit("");
    setSearchPur_s("");
    setSearchPur_e("");
    setSearchSell_s("");
    setSearchSell_e("");
  };

  const [stateCategory, setStateCategory] = useState("0");

  // axios : 품목 데이터 Select
  useEffect(() => {
    let data = {};
    data = {
      GOODS_CODE: "",
      ITEM_CATEGORY: "",
      GOODS_NAME: "",
      UNIT: "",
      SPEC: "",
      SELLING_PRICE: "",
      PURCHASE_COSE: "",
      SELLING_PRICE_E: "",
      PURCHASE_COSE_E: "",
    };
    axios.post("http://192.168.0.200:8080/KPI/CGoodsList.do", data).then((response) => {
      setGoodCategory(response.data);
    });
  }, [stateCategory]);

  // axios : 품목 데이터 조건별 Select
  useEffect(() => {
    setSearchCategory("null");
    let data = {};
    data = {
      GOODS_CODE: searchCode,
      ITEM_CATEGORY: selectedCategory,
      GOODS_NAME: searchName,
      UNIT: searchUnit,
      SPEC: searchSpec,
      SELLING_PRICE: priceToNumder(searchSell_s),
      PURCHASE_COSE: priceToNumder(searchPur_s),
      SELLING_PRICE_E: priceToNumder(searchSell_e),
      PURCHASE_COSE_E: priceToNumder(searchPur_e),
    };
    console.log(data);
    axios.post("http://192.168.0.200:8080/KPI/GoodsList.do", data).then((response) => {
      setSGoodList(response.data);
      setNumder(response.data);
    });
  }, [searchCategory]);

  useEffect(() => {
    let updatedItems = SGoodList;
    if (SGoodList.length != 0) {
      for (let i = 0; SGoodList.length > i; i++) {
        updatedItems[i].selling_PRICE = priceToString(SGoodList[i].selling_PRICE);
        updatedItems[i].purchase_COSE = priceToString(SGoodList[i].purchase_COSE);
      }
      if (updatedItems.length == SGoodList.length) {
        setSGoodList(updatedItems);
      }
    }
  }, [numder]);

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function priceToNumder(price) {
    return price.toString().replace(/[^0-9]/g, "");
  }
  function priceNoStartZ(price) {
    return price.toString().replace(/^0+/, "");
  }

  const onClickCategory = (e) => {
    if (e == "") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(e[0]);
    }
    searchClean();
    setSearchCategory("category");
  };

  const onchangeSearch = (e) => {
    if (e.target.id == "searchCode") {
      setSearchCode(e.target.value);
    }
    if (e.target.id == "searchName") {
      setSearchName(e.target.value);
    }
    if (e.target.id == "searchSpec") {
      setSearchSpec(e.target.value);
    }
    if (e.target.id == "searchUnit") {
      setSearchUnit(e.target.value);
    }
    if (e.target.id == "searchPur_s") {
      setSearchPur_s(priceToString(priceNoStartZ(priceToNumder(e.target.value))));
    }
    if (e.target.id == "searchPur_e") {
      setSearchPur_e(priceToString(priceNoStartZ(priceToNumder(e.target.value))));
    }
    if (e.target.id == "searchSell_s") {
      setSearchSell_s(priceToString(priceNoStartZ(priceToNumder(e.target.value))));
    }
    if (e.target.id == "searchSell_e") {
      setSearchSell_e(priceToString(priceNoStartZ(priceToNumder(e.target.value))));
    }
  };

  const onClickSearchBtn = (e) => {
    setSearchCategory("search");
  };
  const onClickSearchRest = () => {
    searchClean();
  };

  /* ================== Toggle 관련 ================== */

  const [selectionModel, setSelectionModel] = useState([]);

  const [modalRegist, setModalRegist] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [regiCode, setRegiCode] = useState("");
  const [regiCategory, setRegiCategory] = useState("");
  const [regiName, setRegiName] = useState("");
  const [regiSpec, setRegiSpec] = useState("");
  const [regiUnit, setRegiUnit] = useState("");
  const [regiPur, setRegiPur] = useState("");
  const [regiSel, setRegiSel] = useState("");
  const [regiRegi, setRegiRegi] = useState("");
  const [regiRegiDT, setRegiRegiDT] = useState("");
  const [regiModi, setRegiModi] = useState("");
  const [regiModiDT, setRegiModiDT] = useState("");

  const [validCategory, setValidCategory] = useState("none");
  const [validName, setValidName] = useState("none");
  const [validSpec, setValidSpec] = useState("none");
  const [validUnit, setValidUnit] = useState("none");
  const [validAll, setValidAll] = useState(false);
  const [validEmpty, setValidEmpty] = useState(false);

  console.log(selectedCategory);

  const regiClean = () => {
    setRegiCategory(selectedCategory);
    setRegiName("");
    setRegiSpec("");
    setRegiUnit("");
    setRegiPur("");
    setRegiSel("");
    setRegiRegi("");
    setRegiRegiDT("");
    setRegiModi("");
    setRegiModiDT("");
  };

  const cleanValid = () => {
    setValidCategory("none");
    setValidName("none");
    setValidSpec("none");
    setValidUnit("none");
  };

  const onChangeInput = (e) => {
    const regKor = /^[가-힣a-zA-Z0-9`~!@#$%^&*()-_=+\|{};:'",.<>/?\s]+$/;

    var id = e.target.id;
    var value = e.target.value;
    if (id == "regiCategory") {
      setRegiCategory(value);
    }
    if (id == "regiName") {
      if (regKor.test(value) == true || value.length < 1) {
        setValidName("none");
      } else {
        setValidName("block");
      }
      setRegiName(value);
    }
    if (id == "regiSpec") {
      if (regKor.test(value) == true || value.length < 1) {
        setValidSpec("none");
      } else {
        setValidSpec("block");
      }
      setRegiSpec(value);
    }
    if (id == "regiUnit") {
      if (regKor.test(value) == true || value.length < 1) {
        setValidUnit("none");
      } else {
        setValidUnit("block");
      }
      setRegiUnit(value);
    }
    if (id == "regiPur") {
      setRegiPur(priceNoStartZ(priceToString(priceToNumder(value))));
    }
    if (id == "regiSel") {
      setRegiSel(priceNoStartZ(priceToString(priceToNumder(value))));
    }
  };

  /* ================== [  등록창  ] ================== */

  const [stateEdit, setStateEdit] = useState("null");
  const toggleRegi = () => {
    cleanValid();
    regiClean();
    setRegiPur("0");
    setRegiSel("0");
    setModalRegist(!modalRegist);
  };

  const toggleEdit = (e) => {
    setStateEdit("D");
    cleanValid();
    const data = SGoodList.find((data) => data.goods_CODE == e.id);

    setRegiCode(data.goods_CODE);
    setRegiCategory(regiCategory);
    setRegiName(data.goods_NAME);
    setRegiSpec(data.spec);
    setRegiUnit(data.unit);
    setRegiSel(priceToString(data.selling_PRICE));
    setRegiPur(priceToString(data.purchase_COSE));
    setRegiRegi(data.registrant);
    setRegiRegiDT(data.regist_DATE);
    setRegiModi(data.modifier);
    setRegiModiDT(data.modify_DATE);

    setModalEdit(!modalEdit);
  };

  const toggleEditBT = () => {
    setStateEdit("B");

    cleanValid();
    if (selectionModel.length == 1) {
      const data = SGoodList.find((data) => data.goods_CODE == selectionModel[0]);

      setRegiCode(data.goods_CODE);
      setRegiCategory(setRegiCategory);
      setRegiName(data.goods_NAME);
      setRegiSpec(data.spec);
      setRegiUnit(data.unit);
      setRegiSel(priceToString(data.selling_PRICE));
      setRegiPur(priceToString(data.purchase_COSE));
      setRegiRegi(data.registrant);
      setRegiRegiDT(data.regist_DATE);
      setRegiModi(data.modifier);
      setRegiModiDT(data.modify_DATE);

      setModalEdit(!modalEdit);
    } else {
      alert("한가지만 선택해주세요");
    }
  };

  const toggleEditClo = () => {
    regiClean();
    setModalEdit(!modalEdit);
  };

  const handlerSave = () => {
    var error = 0;
    if (validName == "block" || validSpec == "block" || validUnit == "block") {
      alert("입력이 올바르지 않습니다.");
      //setValidAll(true);
      error = 1;
    }
    if (
      regiCategory.length < 1 ||
      regiName.length < 1 ||
      regiUnit.length < 1 ||
      regiSpec.length < 1
    ) {
      alert("필수 정보를 입력해주세요 ");
      //setValidEmpty(true);
      error = 1;
    }
    if (error != 1) {
      let data = {};
      data = {
        ITEM_CATEGORY: regiCategory,
        GOODS_NAME: regiName,
        UNIT: regiUnit,
        SPEC: regiSpec,
        SELLING_PRICE: priceToNumder(regiSel),
        PURCHASE_COSE: priceToNumder(regiPur),
        REGISTRANT: sessionStorage.getItem("id"),
        MODIFIER: sessionStorage.getItem("id"),
      };
      console.log(data);
      axios.post("http://192.168.0.200:8080/KPI/GoodsRegist.do", data).then((response) => {
        setNumder(response.data);
        setSearchCategory("edit");
        setModalRegist(!modalRegist);
      });
    }
  };

  const handlerEdit = () => {
    var error = 0;
    console.log(selectionModel);
    if (validName == "block" || validSpec == "block" || validUnit == "block") {
      alert("입력이 올바르지 않습니다.");
      error = 1;
      //setValidAll(true);
    }
    if (
      regiCategory.length < 1 ||
      regiName.length < 1 ||
      regiUnit.length < 1 ||
      regiSpec.length < 1
    ) {
      error = 1;

      alert("필수 정보를 입력해주세요 ");
      //setValidEmpty(true);
    }
    if (error == 0) {
      let data = {};
      data = {
        GOODS_CODE: regiCode,
        ITEM_CATEGORY: regiCategory,
        GOODS_NAME: regiName,
        UNIT: regiUnit,
        SPEC: regiSpec,
        SELLING_PRICE: priceToNumder(regiSel),
        PURCHASE_COSE: priceToNumder(regiPur),
        REGISTRANT: sessionStorage.getItem("id"),
        MODIFIER: sessionStorage.getItem("id"),
      };
      console.log(data);
      axios.post("http://192.168.0.200:8080/KPI/GoodsEdit.do", data).then((response) => {
        setNumder(response.data);
        setSearchCategory("edit");
        setModalEdit(!modalEdit);
      });
    }
  };

  const handlerDelete = () => {
    console.log("삭제");
    console.log(selectionModel);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.168.0.200:8080/KPI/GoodsDelete.do", selectionModel)
        .then((response) => {
          setNumder(response.data);
          setSearchCategory("delete");
        });
    }
  };

  const handleonSelectionModelChange = (newSelection) => {
    if (newSelection.length === SGoodList.length) {
      var end = (page + 1) * size;
      if ((page + 1) * size >= SGoodList.length) {
        end = SGoodList.length;
      }
      var filterSelection = newSelection.slice(page * size, end);
      setSelectionModel(filterSelection);
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
    const selectedRow = params.id; // 선택된 row의 데이터 가져오기
    setSelectedRow(selectedRow);
  };

  const onDragEnter = (e) => {
    console.log("onDragEnter");
  };
  const onDrop = (e) => {
    console.log("onDrop");
    console.log(e);
    console.log(e.dropPosition);
    console.log(e.dragNode.key);
    console.log(e.dragNode.period);

    const Change = Number(e.dropPosition) + 1;
    const Origin = Number(e.dragNode.period);
    const target = e.dragNode.key;

    console.log(Origin + "::" + Change);
    if (Origin > Change) {
      console.log(Origin + ">" + Change);

      GoodCategory.map((item) => {
        if (item.key != target) {
          console.log(
            Number(item.period) + ">=" + Change + "&&" + Number(item.period) + "<" + Origin
          );
          if (Number(item.period) >= Change && Number(item.period) < Origin) {
            console.log(
              "Update" +
                item.key +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) +
                "+" +
                1
            );
            axios
              .post(
                "http://192.168.0.200:8080/KPI/CodeSort.do?key=" +
                  item.key +
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
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      });
    }
    if (Origin < Change) {
      console.log(Origin + "<" + Change);

      GoodCategory.map((item) => {
        if (item.key != target) {
          if (Number(item.period) > Origin && Number(item.period) <= Change) {
            console.log(
              "Update" +
                item.key +
                "from :" +
                Number(item.period) +
                "-> to : " +
                Number(item.period) +
                "-" +
                1
            );
            axios
              .post(
                "http://192.168.0.200:8080/KPI/CodeSort.do?key=" +
                  item.key +
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
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      });
    }
    setStateCategory(target + Origin);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={0} mb={1.5}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <MDBox sx={{ width: "100%" }}>
              <Card sx={{ height: "calc(100vh - 190px)" }}>
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
                      <div style={{ color: "white" }}>품목 카테고리</div>
                    </div>
                  </MDTypography>
                </MDBox>
                <Tree
                  defaultExpandAll={true}
                  draggable
                  blockNode
                  onDragEnter={onDragEnter}
                  onDrop={onDrop}
                  showLine
                  onSelect={onClickCategory}
                  treeData={headData}
                  selectedKeys={selectedCategory}
                  style={{ marginTop: "10px" }}
                  expandIcon={<PlusSquareOutlined />}
                  collapseIcon={<MinusSquareOutlined />}
                />
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={10}>
            <MDBox>
              <Card>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <div>
                      <div className="sCard">
                        <div className="sAreaSearch">
                          <div style={{ fontWeight: "bold" }}>품목 검색</div>
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
                              onClick={onClickSearchRest}
                            >
                              초기화
                            </button>
                          </div>
                        </div>
                        <table className="sTable" style={{ marginTop: "20px" }}>
                          <tbody>
                            <tr>
                              <th className="sTh">품목 코드</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      placeholder="품목 코드을 입력하세요.."
                                      id="searchCode"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchCode}
                                      className="sInput"
                                    />
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">품목 명</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      placeholder="품목 명을 입력하세요.."
                                      id="searchName"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchName}
                                      className="sInput"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">스팩</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      placeholder="스팩을 입력하세요.."
                                      id="searchSpec"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchSpec}
                                      className="sInput"
                                    />
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">단위</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      placeholder="단위를 입력하세요.."
                                      id="searchUnit"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchUnit}
                                      className="sInput"
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <th className="sTh">매입단가</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      id="searchPur_s"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchPur_s}
                                      className="sInputNum"
                                    ></input>
                                    <span style={{ padding: "0px 10px" }}>~</span>
                                    <input
                                      id="searchPur_e"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchPur_e}
                                      className="sInputNum"
                                    ></input>
                                  </div>
                                </div>
                              </td>
                              <th className="sTh">공급단가</th>
                              <td className="sTd">
                                <div className="sTdCell">
                                  <div>
                                    <input
                                      id="searchSell_s"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchSell_s}
                                      className="sInputNum"
                                    ></input>
                                    <span style={{ padding: "0px 10px" }}>~</span>
                                    <input
                                      id="searchSell_e"
                                      name="regiUcode"
                                      type={"text"}
                                      onChange={onchangeSearch}
                                      value={searchSell_e}
                                      className="sInputNum"
                                    ></input>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: "-20px" }}>
                    <div style={{ width: "100%", height: "102%", border: "none" }}>
                      <MDBox>
                        <div className="sCard">
                          <div className="sTool">
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
                                  <div>상품 목록</div>
                                  <div>
                                    <RenewalTableHeadAddButton clickEvent={toggleRegi} />
                                    <RenewalTableHeadModButton clickEvent={toggleEditBT} />
                                    <RenewalTableHeadDelButton clickEvent={handlerDelete} />
                                    {/* EX) <RenewalTableHeadAddButton clickEvent={함수}/> */}
                                  </div>
                                </div>
                              </MDTypography>
                            </div>
                          </div>
                          <DataGrid
                            style={{
                              height: "calc(100vh - 458px)",
                              marginRight: "44px",
                              border: "1px solid rgb(205, 205, 205)",
                            }}
                            disableSelectionOnClick //row 클릭스 체크박스 자동으로 안되게
                            getRowClassName={getRowClassName}
                            onRowClick={handleRowClick}
                            onPageChange={handlerpageChnage}
                            columns={Goods}
                            rows={SGoodList}
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
                              " .MuiDataGrid-cell:focus": {
                                outline: "unset",
                              },
                              "& .MuiDataGrid-footerContainer": {
                                backgroundColor: "#dee2e5",
                              },
                            }}
                            components={{
                              Pagination: CustomPagination,
                            }}
                            pageSize={size}
                            selectionModel={selectionModel}
                            onCellDoubleClick={toggleEdit}
                            //onCellClick={handlerCellClick}
                            onSelectionModelChange={handleonSelectionModelChange}
                          ></DataGrid>
                        </div>
                        <Modal isOpen={modalRegist} toggle={toggleRegi} size="md">
                          <ModalHeader toggle={toggleRegi}>품목 등록</ModalHeader>

                          <ModalBody>
                            <table
                              className="sTable"
                              style={{ marginTop: "20px", marginRight: "0px" }}
                            >
                              <tbody>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    품목 카테고리
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <select
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiCategory"
                                        value={regiCategory}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      >
                                        <option defaultValue={0} style={{ display: "none" }}>
                                          == 카테고리 선택 ==
                                        </option>
                                        {GoodCategory.map((item, id) => (
                                          <option key={id} value={item.key}>
                                            {item.title}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    상품명
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiName"
                                        value={regiName}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />{" "}
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
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
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    스펙
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiSpec"
                                        value={regiSpec}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
                                        color: "red",
                                        fontSize: "11px",
                                        display: validSpec,
                                      }}
                                    >
                                      입력값이 유효하지 않습니다.
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    단위
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiUnit"
                                        value={regiUnit}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
                                        color: "red",
                                        fontSize: "11px",
                                        display: validUnit,
                                      }}
                                    >
                                      입력값이 유효하지 않습니다.
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    매입단가
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem", textAlign: "right" }}
                                        id="regiPur"
                                        value={regiPur}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    <span style={{ color: "red" }}>* </span>
                                    공급단가
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem", textAlign: "right" }}
                                        id="regiSel"
                                        value={regiSel}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
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
                              onClick={handlerSave}
                            >
                              등록
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={toggleRegi}
                            >
                              취소
                            </button>
                          </ModalFooter>
                        </Modal>
                        {/*========= 모달부분 수정 =========*/}
                        <Modal isOpen={modalEdit} toggle={toggleEditClo} size="md">
                          {stateEdit == "E" ? (
                            <ModalHeader>품목정보 수정</ModalHeader>
                          ) : (
                            <ModalHeader>품목정보</ModalHeader>
                          )}
                          <ModalBody>
                            <table
                              className="sTable"
                              style={{ marginTop: "20px", marginRight: "0px" }}
                            >
                              <tbody>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    품목 카테고리
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <select
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiCategory"
                                        value={regiCategory}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                        disabled
                                      >
                                        <option defaultValue={0} style={{ display: "none" }}>
                                          == 카테고리 선택 ==
                                        </option>
                                        {GoodCategory.map((item, id) => (
                                          <option key={id} value={item.key}>
                                            {item.title}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    상품명
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiName"
                                        value={regiName}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
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
                                  <td className="sTh" style={{ width: "40%" }}>
                                    스펙
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiSpec"
                                        value={regiSpec}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />{" "}
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
                                        color: "red",
                                        fontSize: "11px",
                                        display: validSpec,
                                      }}
                                    >
                                      입력값이 유효하지 않습니다.
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    단위
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem" }}
                                        id="regiUnit"
                                        value={regiUnit}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: "block",
                                        position: "relative",
                                        top: "6px",
                                        color: "red",
                                        fontSize: "11px",
                                        display: validUnit,
                                      }}
                                    >
                                      입력값이 유효하지 않습니다.
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    매입단가
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem", textAlign: "right" }}
                                        id="regiPur"
                                        value={regiPur}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ width: "40%" }}>
                                    공급단가
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell">
                                      <input
                                        className="sInput"
                                        style={{ width: "17rem", textAlign: "right" }}
                                        id="regiSel"
                                        value={regiSel}
                                        type={"text"}
                                        onChange={(e) => {
                                          onChangeInput(e);
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh">
                                    <span style={{ color: "red" }}>* </span>등록자
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell" style={{ fontSize: "15px" }}>
                                      {regiRegi}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh">
                                    <span style={{ color: "red" }}>* </span>등록일
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell" style={{ fontSize: "15px" }}>
                                      {regiRegiDT}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh" style={{ fontSize: "15px" }}>
                                    <span style={{ color: "red" }}>* </span>수정자
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell" style={{ fontSize: "15px" }}>
                                      {regiModi}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="sTh">
                                    <span style={{ color: "red" }}>* </span>수정일
                                  </td>
                                  <td className="sTd">
                                    <div className="sTdCell" style={{ fontSize: "15px" }}>
                                      {regiModiDT}
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
                              onClick={handlerEdit}
                            >
                              저장
                            </button>
                            <button
                              className="sButton"
                              style={{
                                background: "rgb(67 79 106)",
                              }}
                              onClick={toggleEditClo}
                            >
                              취소
                            </button>
                          </ModalFooter>
                        </Modal>
                      </MDBox>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer style={{ marginBottom: "0px" }} />
    </DashboardLayout>
  );
}

export default Goods;
