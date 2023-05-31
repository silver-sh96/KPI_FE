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
import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ImportRoutes from "../../routes";

function Breadcrumbs({ icon, title, route, light }) {
  var headName = ImportRoutes.find((v) => v.key === title);
  const routes = route.slice(0, -1);
  return (
    <MDBox mr={{ xs: 0, xl: 8 }} style={{ width: "calc(70vw - 20px)" }}>
      <MuiBreadcrumbs
        sx={{
          marginBottom: "15px",
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]), // BreadCrumbs 구분자[/] 색상 조절
          },
        }}
      >
        <Link to="/dashboard">
          <MDTypography
            component="span"
            variant="body2"
            fontWeight="bold"
            color={"#344767"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>

        {routes == "approvalList" || routes == "approvalChoice" ? (
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
            color={"dark"}
            // opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
           
          >
            결재 관리
          </MDTypography>
        ) : (
          ""
        )}

        {routes.map((el) => (
          <Link to={`/${el}`} key={el} >
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              textTransform="capitalize"
              color={'dark'}
              //opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {/* {el} */}
              {el === "company" ? "거래처 관리" : el === "approvalList" ? "결재 문서함" : el}
              {/* approvalList */}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
          color={"white"}
          sx={{ lineHeight: 0 ,color:'#344767'}}
        >
          {/* {title.replace("-", " ")} */}
          {headName.breadCrumbName == "공통코드 관리" ||
          headName.breadCrumbName == "사원 통합 관리" ||
          headName.breadCrumbName == "조직도 관리" ||
          headName.breadCrumbName == "품목 관리"
            ? "공통 관리 / "
            : ""}
          {headName.breadCrumbName == "결재 문서 작성" || headName.breadCrumbName == "결재 문서함"
            ? "결재 관리 / "
            : ""}
          {headName.breadCrumbName}
        </MDTypography>
      </MuiBreadcrumbs>
      <Card
        style={{
          backgroundColor: "#21457c2b",
          marginLeft: "-16px",
          width: "1622px",
          boxShadow: "none",
        }}
      >
        <div style={{ display: "flex", padding: "8px 7px 8px 7px", alignItems: "flex-end" }}>
          <MDTypography
            textTransform="capitalize"
            variant="h6"
            color={light ? "white" : "dark"}
            noWrap
          >
            {/* {title.replace("-", " ")} */}
            &nbsp;&nbsp;&nbsp;{headName.breadCrumbName}
          </MDTypography>
          <MDTypography
            fontWeight="bold"
            textTransform="capitalize"
            noWrap
            style={{ color: "#a18787", fontSize: "13px", paddingBottom: "2px" }}
          >
            {headName.breadCrumbName == "공통코드 관리" ||
            headName.breadCrumbName == "사원 통합 관리" ||
            headName.breadCrumbName == "조직도 관리" ||
            headName.breadCrumbName == "품목 관리"
              ? ": " + headName.description
              : ": " + headName.description}
          </MDTypography>
        </div>
      </Card>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
