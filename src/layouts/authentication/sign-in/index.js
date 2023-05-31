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

import React, { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import blurBg from "assets/images/blurBg_skyblue.jpg";
import logo from "assets/images/sy_logo.png";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email,setEmail] = useState('tesssss@syinet.com');
  const [password,setPassword] = useState('a!077217')

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const emailChange = (e) =>{
    setEmail(e.target.value);
  }

  const passwordChage = (e) =>{
    setPassword(e.target.value);
  }

  const history = useNavigate();

  const clickLogin = () =>{



    axios.post(
      "http://192.168.0.200:8080/KPI/login.do?employeeId="+
      email + 
      "&employeePw="+
      password
    )
    .then((re)=>{
      console.log(re)
      //ID가 없거나 패스워드 틀림
      if(re.data == 0){
        alert('입력정보를 확인해 주세요')
      }
      //로그인 성공
      else{
        axios
        .get("http://192.168.0.200:8080/KPI/receptApproval.do?id="+re.data.id)
        .then((response) => {

            sessionStorage.setItem('employeeFullName',re.data.employeeFullName)
            sessionStorage.setItem('id',re.data.id)
            sessionStorage.setItem('employeeId',re.data.employeeId)
            sessionStorage.setItem('approvalCnt', response.data.filter(r=>r.documentStatus === '미결재').length)
            
            //location.href ='/dashboard';
            history('/dashboard')
        });

        
      }
      
    })
  }
  
  return (
    <>
    <BasicLayout image={blurBg}>
      <Card style={{
        backgroundColor:"rgba(255, 255, 255, 1.0)",
        height:"600px",
        paddingTop:"60px"
      }}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"200px"}}>
          <img src={logo} style={{width:"300px"}} />
        </div>
        <MDBox pt={3} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mt={2} mb={2}>
              <MDInput type="email" label="이메일" fullWidth onChange={emailChange} value={email}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="패스워드" fullWidth  onChange={passwordChage} value={password}/>
            </MDBox>
            <MDBox mt={3} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={clickLogin} style={{height:"60px"}}>
                로그인
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
    {/* <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            세연아이넷
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="이메일" fullWidth onChange={emailChange} value={email}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="패스워드" fullWidth  onChange={passwordChage} value={password}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={clickLogin}>
                로그인
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                {" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout> */}
    
  </>
  );
}

export default Basic;
