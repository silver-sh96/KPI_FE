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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


function Tables() {

  const history = useNavigate();
  const sessionId = sessionStorage.getItem('id');

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

  //결재문서 전체조회 start
  const [requestApproval, setRequestApproval] = useState([{
    id : "",
    formClassifyCode : "",
    nowStep : "",
    documentStatus : "",
    contents : "",
    approvalLineDetail : "",
    title : "",
    attachmentPath : "",
    writer : "",
    writerDept : "",
    writerRank : "",
    remark : "",
    registrant : "",
    registDate : "",
    modifier : "",
    modifyDate : "",
  }])

  useEffect(() => {
    axios
      .get("http://192.168.0.200:8080/KPI/requestApproval.do?id="+sessionId)
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
  //결재문서 전체조회 start

  //대상문서 state start
  const [requestApprovalView, setRequestApprovalView] = useState([{
    id : "",
    formClassifyCode : "",
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
  //대상문서 state start

  //params 조회 start
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const documentCode = searchParams.get('id');
  
  useEffect(() => {
    setRequestApprovalView(requestApproval.filter(r=>(r.id === documentCode)))
  }, [requestApproval])
  
  //params 조회 end

  //결재단계 불러오기 start
  const [approvalStage, setApprovalStage] = useState([{
    id: "",
    approval: "",
    approvalName: "",
    approvalRank: "",
    nowStep: "",
    approvalResult: "",
    approvalStep: "",
    approvalDate: "",
    opinion: "",
    registrant: "",
    registDate: "",
    modifier: "",
    modifyDate: "",
  }])

  useEffect(() => {
    axios
    .get("http://192.168.0.200:8080/KPI/approvalStage.do?id="+documentCode)
    .then((response) => {
      setApprovalStage(response.data);
    });
  }, [])
  //결재단계 불러오기 end

  console.log(approvalStage)

  // 결재선 카드선택 start
  const [modal, setModal] = useState(false);
  const [target, setTarget] = useState("");

  const toggle = () => {
    setModal(!modal);
  }
  const onClickCard =(approval)=>{
    setTarget(approval)
    toggle()
  }
  // 결재선 카드선택 end

  //취소 start
  const onClickCancle =()=>{
    history('/approvalList')
  }
  //취소 end

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <div>
                <div className="sCard">
                  <table className="sTable" style={{ marginTop: "20px" }}>
                    {requestApprovalView.map((r, idx)=>(
                    <tbody key={idx}>
                      <tr>
                        <th className="sTh">문서번호</th>
                        <td className="sTd">
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.id ||''} readOnly />
                            </div>
                          </div>
                        </td>
                        <th className="sTh">분류</th>
                        <td className="sTd">
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.formClassifyCode ||''} readOnly />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">기안자</th>
                        <td className="sTd">
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.writer +'  '+ r.writerRank ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                        <th className="sTh">기안부서</th>
                        <td className="sTd">
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.writerDept ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">결재 진행상태</th>
                        <td className="sTd" colSpan={3}>
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset", width:"500px", height:"500px"}} value={r.documentStatus ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh" style={{height:"100px"}}>결재선</th>
                        <td className="sTd" colSpan={3}>
                          <div className="sTdCell">
                            <div style={{display:"flex"}}>
                                {approvalStage.map((a,idx)=>(
                                  <button key={idx} style={{all:"unset", cursor:"pointer"}} onClick={()=> onClickCard(a.approval)}>
                                    <div style={{display:"flex", alignItems:"center"}} >
                                      <Card
                                        style={
                                          a.nowStep !== a.approvalStep ?
                                          {
                                            width:"160px", 
                                            height:"70px", 
                                            textAlign:"center", 
                                            margin:"20px", 
                                            backgroundColor:"#E0F8F7",
                                            fontSize:"15px",
                                            border:"1px skyblue solid",
                                          } :
                                          {
                                            width:"160px", 
                                            height:"70px", 
                                            textAlign:"center", 
                                            margin:"20px", 
                                            backgroundColor:"#E0F8F7",
                                            fontSize:"15px",
                                            border:"2px red solid",
                                          }

                                        }
                                        >
                                        <div>{a.approvalResult ||""}</div>
                                        <div>{a.approvalName||""} {a.approvalRank||""}</div>
                                        {a.approvalDate !== null ? 
                                          <div>{a.approvalDate.slice(0,10) || '-'}</div> :
                                          <div>{a.approvalDate || '-'}</div>
                                        }
                                      </Card>
                                      {approvalStage.length !== idx+1 && <div>▶</div>}
                                    </div>
                                  </button>
                                ))}
                            </div>
                            {/* 결재의견 modal start */}
                            <Modal isOpen={modal} toggle={toggle} size="lg">
                            <ModalHeader toggle={toggle}>결재 의견</ModalHeader>
                            <ModalBody>
                              <form>
                                <table style={{
                                  margin: "0",
                                  width: "100%",
                                  fontSize: "15px"
                                }}>
                                  <tbody>
                                    <tr>
                                      <th className="sTh" style={{minWidth:"150px"}}>결재처리 결과</th>
                                      <td className="sTd">
                                        <div className="sTdCell">
                                          <div>
                                            {approvalStage.filter(a=>a.approval === target).map(a=>a.approvalResult)} 
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="sTh">결재의견</th>
                                      <td className="sTd">
                                        <div className="sTdCell" style={{height:"200px"}}>
                                            {approvalStage.filter(a=>a.approval === target).map(a=>a.opinion)}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </form>
                            </ModalBody>
                            <ModalFooter className="modal-button">
                              <button
                                className="sButton"
                                style={{
                                  background: "gray",
                                }}
                                onClick={toggle}
                              >
                                취소
                              </button>
                            </ModalFooter>
                          </Modal>
                          {/* 결재의견 modal end */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">제목</th>
                        <td className="sTd" colSpan={3}>
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.title ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">문서내용</th>
                        <td className="sTd" colSpan={4}>
                          <div className="sTdCell" style={{height:"500px"}}>
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.contents ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">비고</th>
                        <td className="sTd" colSpan={3}>
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.remark ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="sTh">첨부파일</th>
                        <td className="sTd" colSpan={3}>
                          <div className="sTdCell">
                            <div>
                              <input type="text" style={{all:"unset"}} value={r.attachmentPath ||''} readOnly  />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    ))}
                  </table>
                  <div style={{marginTop:"30px", display:"flex", justifyContent:"center"}}>
                    <button
                      className="sButton"
                      style={{
                        background: "gray",
                      }}
                      onClick={onClickCancle}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
