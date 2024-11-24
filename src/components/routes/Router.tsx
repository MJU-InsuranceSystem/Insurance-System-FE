import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import AdminHome from '../page/AdminHome';
import Planning from '../page/SuvMenus/Planning';
import ViewAll from '../page/SuvMenus/ViewAll';
import CreateProduct from '../page/SuvMenus/CreateProduct';
import PlanningTeam from '../page/Teams/PlanningTeam';
import UWTeam from '../page/Teams/UWTeam';
import SalesEducationTeam from '../page/Teams/SalesEducationTeam';
import MarketingTeam from '../page/Teams/MarketingTeam';
import SalesManagementTeam from '../page/Teams/SalesManagementTeam';
import RecruitmentTeam from '../page/Teams/RecruitmentTeam';
import PayrollTeam from '../page/Teams/PayrollTeam';
import CompensationTeam from '../page/Teams/CompensationTeam';
import ContractManagementTeam from '../page/Teams/ContractManagementTeam';
import CustomerManagementTeam from '../page/Teams/CustomerManagementTeam';
import EmployeeManagementTeam from '../page/Teams/EmployeeManagementTeam';
import InsuranceList from '../page/SuvMenus/GetInsuranceList';
import InsuranceDetail from '../page/SuvMenus/InsuranceDetail';
import CreateContract from '../page/SuvMenus/CreateContract';
import MyPage from '../page/MyPage';
import ContractDetailsPage from '../page/SuvMenus/ContractDetails';
import AdminContracts from '../page/SuvMenus/AdminContracts'; // AdminContracts 컴포넌트 추가

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
                <Route path="/admin/contracts" element={<AdminContracts />} /> {/* AdminContracts 추가 */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
