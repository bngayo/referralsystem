import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DashboardStats from '../../Shared/DashboardStats';

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <DashboardStats/>

      {/* <div>
        <InertiaLink className="mr-1 btn-indigo" href="/500">
          500 error
        </InertiaLink>
        <InertiaLink className="btn-indigo" href="/404">
          404 error
        </InertiaLink>
      </div> */}
    </div>
  );
};

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
