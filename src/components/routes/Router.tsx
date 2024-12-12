import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import AdminLogin from "../page/AdminLogin";
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
import ContractDetailsClientPage from "../page/SuvMenus/ContractDetailsClientPage"; 
import AdminContracts from "../page/SuvMenus/AdminContracts";
import ContractReviewPage from "../page/SuvMenus/ContractReviewPage";
import PaymentPage from "../page/SuvMenus/PaymentPage";
import AccountInfoPage from "../page/SuvMenus/AccountInfoPage"; 
import PaymentSubmissionPage from "../page/SuvMenus/PaymentSubmissionPage"; 
import PaymentHistoryPage from "../page/SuvMenus/PaymentHistoryPage"; 
import AccidentReportPage from "../page/SuvMenus/AccidentReportPage"; 
import AccidentListPage from "../page/SuvMenus/AccidentListPage"; 
import AccidentDetailsPage from "../page/SuvMenus/AccidentDetailsPage"; 
import CompensationTeamAccident from "../page/Teams/CompensationTeamAccident"; 
import CompensationTeamClaim from "../page/Teams/CompensationTeamClaim";
import AdminContractDetails from "../page/SuvMenus/AdminContractDetails"; 

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
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
                <Route path="/contracts/details/client/:contractId" element={<ContractDetailsClientPage />} />
                <Route path="/admin/contracts" element={<AdminContracts />} />
                <Route path="/contract-review/:contractId" element={<ContractReviewPage />} />
                <Route path="/payments/contracts/:contractId" element={<PaymentPage />} />
                <Route path="/accounts/:contractId" element={<AccountInfoPage />} />
                <Route path="/payment-submission/:contractId" element={<PaymentSubmissionPage />} />
                <Route path="/payment-history/:contractId" element={<PaymentHistoryPage />} />
                <Route path="/accidents/report/:contractId" element={<AccidentReportPage />} /> {/* 사고 접수하기 */}
                <Route path="/accident-list" element={<AccidentListPage />} />
                <Route path="/accidents/details/:accidentId" element={<AccidentDetailsPage />} />
                <Route path="/compensation-team" element={<CompensationTeam />} />
                <Route path="/compensation-team/accidents" element={<CompensationTeamAccident />} />
                <Route path="/claims" element={<CompensationTeamClaim />} />
                <Route path="/adminContractDetails" element={<AdminContractDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
