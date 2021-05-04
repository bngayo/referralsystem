import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DashboardStat from '../../Shared/DashboardStat';

const Dashboard = () => {

  const { clinics, patients, referrals } = usePage().props;
  
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div id="wrapper" class="max-w-xl px-4 py-4 mx-auto">
            <div class="grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                <DashboardStat title = "Clinics" number={clinics} percentage="6%" textColor="text-green-500" iconName="positive"/>
                <DashboardStat title = "Patients" number={patients} percentage="0%" textColor="text-gray-500" iconName="neutral"/>
                <DashboardStat title = "Referrals" number={referrals} percentage="2%" textColor="text-red-500" iconName="negative"/>
            </div>
        </div>
    </div>
  );
};

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
