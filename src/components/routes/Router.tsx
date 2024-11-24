import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import AdminHome from "../page/AdminHome";
import Planning from "../page/SuvMenus/Planning";
import ViewAll from "../page/SuvMenus/ViewAll";
import CreateProduct from "../page/SuvMenus/CreateProduct";
import PlanningTeam from "../page/Teams/PlanningTeam";
import UWTeam from "../page/Teams/UWTeam";
import SalesEducationTeam from "../page/Teams/SalesEducationTeam";
import MarketingTeam from "../page/Teams/MarketingTeam";
import SalesManagementTeam from "../page/Teams/SalesManagementTeam";
import RecruitmentTeam from "../page/Teams/RecruitmentTeam";
import PayrollTeam from "../page/Teams/PayrollTeam";
import CompensationTeam from "../page/Teams/CompensationTeam";
import ContractManagementTeam from "../page/Teams/ContractManagementTeam";
import CustomerManagementTeam from "../page/Teams/CustomerManagementTeam";
import EmployeeManagementTeam from "../page/Teams/EmployeeManagementTeam";
import InsuranceList from "../page/SuvMenus/GetInsuranceList";
import InsuranceDetail from "../page/SuvMenus/InsuranceDetail";
import CreateContract from "../page/SuvMenus/CreateContract";
import MyPage from "../page/MyPage";
import ContractDetailsPage from "../page/SuvMenus/ContractDetails";
import AdminContracts from "../page/SuvMenus/AdminContracts";
import ContractReviewPage from "../page/SuvMenus/ContractReviewPage";
import PaymentPage from "../page/SuvMenus/PaymentPage";
import AccountInfoPage from "../page/SuvMenus/AccountInfoPage"; // 계좌정보 입력하기 페이지 추가
import PaymentSubmissionPage from "../page/SuvMenus/PaymentSubmissionPage"; // 납부하기 페이지 추가
import PaymentHistoryPage from "../page/SuvMenus/PaymentHistoryPage"; // 납부 내역 조회 페이지 추가
import AccidentReportPage from "../page/SuvMenus/AccidentReportPage"; // 사고 접수하기 페이지 추가
import AccidentListPage from "../page/SuvMenus/AccidentListPage"; // 사고 내역 조회 페이지 추가
import AccidentDetailsPage from "../page/SuvMenus/AccidentDetailsPage"; // 사고 상세 정보 페이지 추가
import CompensationTeam_Accident from "../page/Teams/CompensationTeam_Accident"; // 보험 지원팀 사고 관리 경로 추가
import CompensationTeam_Claim from "../page/Teams/CompensationTeam_Claim"; //이건 만약 보험 지원팀 페이지 안나누면 필요 없을 듯

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/planningTeam" element={<PlanningTeam />} />
                <Route path="/uwTeam" element={<UWTeam />} />
                <Route path="/salesEducationTeam" element={<SalesEducationTeam />} />
                <Route path="/marketingTeam" element={<MarketingTeam />} />
                <Route path="/salesManagementTeam" element={<SalesManagementTeam />} />
                <Route path="/recruitmentTeam" element={<RecruitmentTeam />} />
                <Route path="/payrollTeam" element={<PayrollTeam />} />
                <Route path="/compensationTeam" element={<CompensationTeam />} />
                <Route path="/contractManagementTeam" element={<ContractManagementTeam />} />
                <Route path="/customerManagementTeam" element={<CustomerManagementTeam />} />
                <Route path="/employeeManagementTeam" element={<EmployeeManagementTeam />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/viewAll" element={<ViewAll />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/insuranceList" element={<InsuranceList />} />
                <Route path="/insurance/:insuranceId" element={<InsuranceDetail />} />
                <Route path="/createContract/:insuranceId" element={<CreateContract />} />
                <Route path="/myPage/:subscriberId" element={<MyPage />} />
                <Route path="/contracts/details/:contractId" element={<ContractDetailsPage />} />
                <Route path="/admin/contracts" element={<AdminContracts />} />
                <Route path="/contract-review/:contractId" element={<ContractReviewPage />} />
                <Route path="/payments/contracts/:contractId" element={<PaymentPage />} />
                <Route path="/accounts/:contractId" element={<AccountInfoPage />} /> {/* 계좌정보 입력하기 */}
                <Route path="/payment-submission/:contractId" element={<PaymentSubmissionPage />} /> {/* 납부하기 */}
                <Route path="/payment-history/:contractId" element={<PaymentHistoryPage />} /> {/* 납부 내역 조회 */}
                <Route path="/accidents/report/:contractId" element={<AccidentReportPage />} /> {/* 사고 접수하기 */}
                <Route path="/accident-list" element={<AccidentListPage />} /> {/* 사고 내역 조회 */}
                <Route path="/accidents/details/:accidentId" element={<AccidentDetailsPage />} /> {/* 사고 상세 조회 */}
                <Route path="/compensation-team" element={<CompensationTeam />} />
                <Route path="/compensation-team/accidents" element={<CompensationTeam_Accident />} /> {/* 사건 전체 리스트 경로 추가 */}
                <Route path="/claims" element={<CompensationTeam_Claim />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
