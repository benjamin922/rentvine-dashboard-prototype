import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import PropertiesLanding from './features/properties/PropertiesLanding';
import PropertiesList from './features/properties/PropertiesList';
import AccountingLanding from './features/accounting/AccountingLanding';
import MaintenanceLanding from './features/maintenance/MaintenanceLanding';
import DashboardManager from './features/dashboards/DashboardManager';
import DashboardCanvas from './features/dashboards/DashboardCanvas';
import StubPage from './features/StubPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/manager/properties" replace />} />
      <Route path="/manager" element={<AppShell />}>
        <Route index element={<Navigate to="/manager/properties" replace />} />
        <Route path="properties" element={<PropertiesLanding />} />
        <Route path="properties/list" element={<PropertiesList />} />
        <Route path="accounting" element={<AccountingLanding />} />
        <Route path="maintenance" element={<MaintenanceLanding />} />
        <Route path="dashboards" element={<DashboardManager />} />
        <Route path="dashboards/canvas" element={<DashboardCanvas />} />
        <Route path="leasing" element={<StubPage title="Leasing" />} />
        <Route path="screening" element={<StubPage title="Screening" />} />
        <Route path="contacts" element={<StubPage title="Contacts" />} />
        <Route path="reports" element={<StubPage title="Reports" />} />
        <Route path="crm" element={<StubPage title="CRM" />} />
        <Route path="settings" element={<StubPage title="Settings" />} />
      </Route>
    </Routes>
  );
}
