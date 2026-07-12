import { useEffect, useState } from 'react';
import DashboardHeader from "../../components/admin/layout/DashboardHeader";

import StatsGrid from "../../components/admin/widgets/StatsGrid";
import RegistrationChart from "../../components/admin/widgets/RegistrationChart";
import RecentSubmission from "../../components/admin/widgets/RecentSubmission";
import RecentActivity from "../../components/admin/widgets/RecentActivity";
import QuickActions from "../../components/admin/widgets/QuickActions";

import HackathonTable from "../../components/admin/tables/HackathonTable";

import { getDashboardData } from "../../services/dashboardAPI";
import { quickActions as quickActionsData } from "../../data/admin/mockDashboard";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getDashboardData().then((res) => {
      if (mounted) {
        setData(res);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <DashboardHeader />

      <StatsGrid stats={data?.stats || []} loading={loading} />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-8">
          <div className="section-card h-100">
            <div className="section-card-header">
              <span className="section-card-title">Hackathons Overview</span>
              <span className="link-teal" role="button" onClick={() => navigate('/admin/hackathons')}>View All Hackathons</span>
            </div>
            <HackathonTable hackathons={data?.hackathons || []} />
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <RegistrationChart data={data?.chart || []} />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-4">
          <RecentSubmission submissions={data?.recentSubmissions || []} />
        </div>
        <div className="col-12 col-lg-4">
          <RecentActivity activity={data?.recentActivity || []} />
        </div>
        <div className="col-12 col-lg-4">
          <QuickActions actions={quickActionsData} />
        </div>
      </div>
    </div>
  );
}
