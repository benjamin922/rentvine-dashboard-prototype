import { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import HomeLanding from './views/HomeLanding';
import PropertiesLanding from './views/PropertiesLanding';
import PropertiesListView from './views/PropertiesListView';
import AccountingLanding from './views/AccountingLanding';
import MaintenanceLanding from './views/MaintenanceLanding';
import DashboardManager from './views/DashboardManager';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [subView, setSubView] = useState(null);

  const handleNavigate = (section) => {
    setActiveSection(section);
    setSubView(null);
  };

  const handleSubNavigate = (view) => {
    setSubView(view);
  };

  const renderContent = () => {
    if (subView === 'properties-list') {
      return <PropertiesListView onBack={() => setSubView(null)} />;
    }

    switch (activeSection) {
      case 'home':
        return <HomeLanding onNavigate={handleNavigate} />;
      case 'dashboards':
        return <DashboardManager />;
      case 'properties':
        return <PropertiesLanding onNavigate={handleSubNavigate} />;
      case 'accounting':
        return <AccountingLanding />;
      case 'maintenance':
        return <MaintenanceLanding />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary capitalize">{activeSection}</p>
              <p className="text-sm text-text-secondary mt-1">This section is available in the full product.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
        {renderContent()}
      </div>
    </div>
  );
}
