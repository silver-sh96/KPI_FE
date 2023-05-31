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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import React from "react";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Codes from "layouts/code";
import Goods from "layouts/goods";
import Employee from "layouts/employee";
import Dept from "layouts/dept";
import ApprovalList from "layouts/approvalList";
import ApprovalChoice from "layouts/approvalChoice";
import ApprovalWrite from "layouts/approvalWrite";
import ApprovalProcess from "layouts/approvalProcess";
import ApprovalView from "layouts/approvalView";
import Business from "layouts/businessRelatons";
import BusinessDetail from "layouts/businessRelatons/brDetail.js";

// @mui icons
import Icon from "@mui/material/Icon";
import { Badge } from "@mui/material";

const cnt = localStorage.getItem('cnt')

const routes = [
  {
    type: "collapse",
    name: "대쉬보드",
    key: "dashboard",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    breadCrumbName: "대쉬보드",
    description: "대쉬보드 화면입니다",
  },
  {
    type: "collapse",
    name: "거래처 관리",
    key: "company",
    icon: <Icon fontSize="small">domain</Icon>,
    route: "/company",
    component: <Business />,
    breadCrumbName: "거래처 관리",
    description: "거래처 관리 화면입니다",
  },
  {
    type: "none",
    name: "거래처 상세정보 정보",
    key: "companyDetail",
    icon: <Icon fontSize="small">domain</Icon>,
    route: "/company/companyDetail",
    component: <BusinessDetail />,
    breadCrumbName: "거래처 상세정보 정보",
    description: "거래처 상세정보 화면입니다",
  },
  {
    type: "none",
    name: "견적 관리",
    key: "estimate",
    icon: <Icon fontSize="small">feed</Icon>,
    route: "/estimate",
    component: <Dashboard />,
    breadCrumbName: "견적 관리",
    description: "견적 관리 화면입니다",
  },
  {
    type: "none",
    name: "주문 관리",
    key: "order",
    icon: <Icon fontSize="small">task</Icon>,
    route: "/order",
    component: <Dashboard />,
    breadCrumbName: "주문 관리",
    description: "주문 관리 화면입니다",
  },
  {
    type: "title",
    title: "결재 관리",
    key: "approval",
    icon: <Icon fontSize="small">receipt_long</Icon>,
  },
  {
    type: "collapse",
    name: "결재 문서 작성",
    key: "approvalChoice",
    icon: <Icon fontSize="small">edit_note</Icon>,
    route: "/approvalChoice",
    component: <ApprovalChoice />,
    breadCrumbName: "결재 문서 작성",
    description: "결재 문서 작성 화면입니다",
  },
  {
    type: "collapse",
    name: "결재 문서함",
    key: "approvalList",
    icon: <Icon fontSize="small">library_books</Icon>,
          /* cnt !== '0' ?
            <Badge badgeContent={cnt} color="primary">
              <Icon fontSize="small">library_books</Icon>
            </Badge> : 
            <Icon fontSize="small">library_books</Icon>
          , */
    route: "/approvalList",
    component: <ApprovalList />,
    breadCrumbName: "결재 문서함",
    description: "결재 문서함 화면입니다",
  },
  {
    type: "title",
    title: "공통 관리",
    key: "common",
    icon: <Icon fontSize="small">receipt_long</Icon>,
  },
  {
    type: "collapse",
    name: "공통코드 관리",
    key: "codes",
    icon: <Icon fontSize="small">code</Icon>,
    route: "/codes",
    component: <Codes />,
    breadCrumbName: "공통코드 관리",
    description: "공통코드 관리 화면입니다",
  },
  {
    type: "collapse",
    name: "품목 관리",
    key: "goods",
    icon: <Icon fontSize="small">inventoryIcon</Icon>,
    route: "/goods",
    component: <Goods />,
    breadCrumbName: "품목 관리",
    description: "품목 관리 화면입니다",
  },
  {
    type: "collapse",
    name: "사원 통합 관리",
    key: "employee",
    icon: <Icon fontSize="small">person_outline</Icon>,
    route: "/employee",
    component: <Employee />,
    breadCrumbName: "사원 통합 관리",
    description: "사원 통합 관리 화면입니다",
  },
  {
    type: "collapse",
    name: "조직도 관리",
    key: "dept",
    icon: <Icon fontSize="small">segment</Icon>,
    route: "/dept",
    component: <Dept />,
    breadCrumbName: "조직도 관리",
    description: "조직도 관리 화면입니다",
  },
  {
    type: "none",
    name: "알람",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    breadCrumbName: "알람",
  },
  {
    type: "none",
    name: "프로필",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    breadCrumbName: "프로필",
  },
  {
    type: "none",
    name: "로그인",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    breadCrumbName: "로그인",
  },
  {
    type: "none",
    name: "회원가입",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    breadCrumbName: "회원가입",
  },
  {
    type: "none",
    name: "결재 문서 작성",
    key: "approvalWrite",
    icon: <Icon fontSize="small">buildIcon</Icon>,
    route: "/approvalWrite",
    component: <ApprovalWrite />,
    breadCrumbName: "결재 문서 작성",
    description: "결재 문서 작성 화면입니다",
  },
  {
    type: "none",
    name: "결재처리",
    key: "approvalProcess",
    icon: <Icon fontSize="small">buildIcon</Icon>,
    route: "approvalList/approvalProcess",
    component: <ApprovalProcess />,
    breadCrumbName: "결재처리",
    description: "결재처리 화면입니다",
  },
  {
    type: "none",
    name: "결재문서확인",
    key: "approvalView",
    icon: <Icon fontSize="small">buildIcon</Icon>,
    route: "approvalList/approvalView",
    component: <ApprovalView />,
    breadCrumbName: "결재문서확인",
    description: "결재문서확인 화면입니다",
  },

  // route 이름에 따라서 breadCrumb 이름이 바뀜
  // 로그인과 회원가입을 제외하고 key값과 route 이름을 같게 해줘야 됨 [/]제외
  // breadCrumbName에 값으로 헤더에 표시 됨
];

export default routes;
