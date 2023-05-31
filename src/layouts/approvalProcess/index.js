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

  //결재문서 전체조회 start
  const [receptApproval, setReceptApproval] = useState([{
    id : "",
    formClassifyCode : "",
    nowStep : "",
    documentStatus : "",
    totalStatus : "",
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
      .get("http://192.168.0.200:8080/KPI/receptApproval.do?id="+sessionId)
      .then((response) => {
        setReceptApproval(response.data);
      });
  }, []);

  useCallback(
    () => {
      setReceptApproval(receptApproval)
    },
    [receptApproval],
  )
  //결재문서 전체조회 end

  //대상문서 state start
  const [receptApprovalView, setReceptApprovalView] = useState([{
    id : "",
    formClassifyCode : "",
    documentStatus : "",
    totalStatus : "",
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
    setReceptApprovalView(receptApproval.filter(r=>(r.id === documentCode)))
  }, [receptApproval])
  
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

  // 결재선 카드선택 start
  const [opinionModal, setOpinionModal] = useState(false);
  const [target, setTarget] = useState("");

  const opinionToggle = () => {
    setOpinionModal(!opinionModal);
  }
  const onClickCard =(approval)=>{
    setTarget(approval)
    opinionToggle()
  }
  // 결재선 카드선택 end

  //결재처리 start
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setIsSign(true);
    setApprovalOpinion("");
    setModal(!modal);
  }

  const onClickProcess =()=>{
    const nowStep = approvalStage.filter(s=>s.approval === sessionId).map(s=>s.nowStep).toString()
    const approvalStep = approvalStage.filter(s=>s.approval === sessionId).map(s=>s.approvalStep).toString()
    console.log(nowStep, approvalStep)

    if(nowStep !== approvalStep){
      alert('이전 결재자의 결재가 진행되지 않았습니다. 이후에 다시 진행해주세요.')
      return false;
    }else{
      toggle();
    }
  }

  const [isSign, setIsSign] = useState(true);
  const onClickRadio =(e)=>{
    const value = e.target.value;
    console.log(value);
    if(value === '승인'){
      setIsSign(true);
    }else{
      setIsSign(false);
    }
  }

  const [approvalOpinion, setApprovalOpinion] = useState("");
  const onChangeOpinion =(e)=>{
    setApprovalOpinion(e.target.value)
  }

  const approvalProcess =()=>{
    const lineCnt = Number(receptApprovalView.map(r=>r.approvalLineDetail.split('▶').length))
    const nowStep = Number(approvalStage.filter(r=>r.approval === sessionId).map(r=>r.nowStep))
    console.log(isSign, approvalOpinion, lineCnt, nowStep)

    if(isSign === true){
      axios
      .post("http://192.168.0.200:8080/KPI/permissionProcess.do?id="+documentCode+"&approval="+sessionId+"&opinion="+approvalOpinion+"&lineCnt="+lineCnt+"&nowStep="+nowStep)
      .then((response) => {
        console.log(response.data);
        alert('결재처리 되었습니다.')
        history('/approvalList')
      });
    }else{
      console.log('반려')
      axios
      .post("http://192.168.0.200:8080/KPI/rejectApproval.do?id="+documentCode+"&approval="+sessionId+"&opinion="+approvalOpinion)
      .then((response) => {
        console.log(response.data);
        alert('결재처리 되었습니다.')
        history('/approvalList')
      });
    }
  }
  //결재처리 end

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
                    {receptApprovalView.map((r, idx)=>(
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
                              {}
                              <input type="text" style={{all:"unset", width:"500px", height:"500px"}} value={r.totalStatus ||''} readOnly  />
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
                            <Modal isOpen={opinionModal} toggle={opinionToggle} size="lg">
                            <ModalHeader toggle={opinionToggle}>결재 의견</ModalHeader>
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
                                onClick={opinionToggle}
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
                    {approvalStage.filter(s=>s.approval === sessionId).map(s=>s.approvalResult === '미결재' ?
                      <button
                        className="sButton"
                        style={{
                          background: "rgb(67 79 106)",
                        }}
                        onClick={onClickProcess}
                      >
                        결재처리
                      </button>
                    : <></>)}
                    
                    <button
                      className="sButton"
                      style={{
                        background: "gray",
                      }}
                      onClick={onClickCancle}
                    >
                      취소
                    </button>
                    {/* 결재 modal start */}
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                      <ModalHeader toggle={toggle}>결재 처리</ModalHeader>
                      <ModalBody>
                        <form>
                          <table style={{
                            margin: "0",
                            width: "100%",
                            fontSize: "15px"
                          }}>
                            <tbody>
                              <tr>
                                <th className="sTh">결재</th>
                                <td className="sTd">
                                  <div className="sTdCell">
                                    <div>
                                      <input style={{marginRight:"5px"}} type={"radio"} value={"승인"} onChange={onClickRadio} checked={isSign === true && true} />
                                      <label style={{marginRight:"15px"}}>승인</label>
                                      <input style={{marginRight:"5px"}} type={"radio"} value={"반려"} onChange={onClickRadio} checked={isSign === false && true} />
                                      <label>반려</label>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th className="sTh">결재의견</th>
                                <td className="sTd">
                                  <div className="sTdCell" style={{height:"200px"}}>
                                      <div>
                                        <textarea className="sInput" style={{height:"200px", maxHeight:"200px", width:"620px"}} onChange={onChangeOpinion} value={approvalOpinion || ""} />
                                      </div>
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
                            background: "rgb(67 79 106)",
                          }}
                          onClick={approvalProcess}
                        >
                          처리
                        </button>
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
                    {/* 결재 modal end */}
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
