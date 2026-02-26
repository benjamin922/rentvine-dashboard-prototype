import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import HomePage from "./pages/dashboard/HomePage";
import DashboardsPage from "./pages/dashboard/DashboardsPage";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertiesListPage from "./pages/properties/PropertiesListPage";
import AccountingPage from "./pages/accounting/AccountingPage";
import MaintenancePage from "./pages/maintenance/MaintenancePage";

function StubPage({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-rv-blue-dark mb-2">
          {name}
        </h1>
        <p className="text-rv-gray">This page is coming soon.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboards" element={<DashboardsPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/list" element={<PropertiesListPage />} />
        <Route path="/accounting" element={<AccountingPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/leasing" element={<StubPage name="Leasing" />} />
        <Route path="/screening" element={<StubPage name="Screening" />} />
        <Route path="/contacts" element={<StubPage name="Contacts" />} />
        <Route path="/reports" element={<StubPage name="Reports" />} />
        <Route path="/crm" element={<StubPage name="CRM" />} />
        <Route path="/settings" element={<StubPage name="Settings" />} />
      </Route>
    </Routes>
  );
}
