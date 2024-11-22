import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import Register from '../page/Register';
import AdminHome from '../page/AdminHome'; // AdminHome 컴포넌트 임포트
import Planning from '../page/SuvMenus/Planning'; // Planning 컴포넌트 임포트
import ViewAll from '../page/SuvMenus/ViewAll'; // ViewAll 컴포넌트 임포트
import Approve from '../page/SuvMenus/Approve'; // Planning 컴포넌트 임포트
import PlanningTeam from '../page/Teams/PlanningTeam'; // 각 부서별 컴포넌트 임포트
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

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 경로 */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adminHome" element={<AdminHome />} /> {/* AdminHome 경로 */}

                {/* 부서별 페이지 경로 */}
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

                {/* New Pages */}
                <Route path="/planning" element={<Planning />} />
                <Route path="/viewAll" element={<ViewAll />} /> {/* ViewAll 경로 */}
                <Route path="/approve" element={<Approve />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
