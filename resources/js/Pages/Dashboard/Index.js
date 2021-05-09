import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DashboardStat from '../../Shared/DashboardStat';

const Dashboard = () => {

  const { clinics, patients, referrals, latest_referrals } = usePage().props;
  
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

        <div class="mb-8 w-full px-4 py-4 mx-auto overflow-x-auto bg-white rounded shadow">
            <div class="grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                <DashboardStat title = "Clinics" number={clinics} percentage="6%" textColor="text-green-500" iconName="positive"/>
                <DashboardStat title = "Patients" number={patients} percentage="0%" textColor="text-gray-500" iconName="neutral"/>
                <DashboardStat title = "Referrals" number={referrals} percentage="2%" textColor="text-red-500" iconName="negative"/>
            </div>
        </div>

        <h1 className="mt-8 mb-8 text-3xl font-bold">Latest Referrals</h1>
     
        <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">ID/NHIF No</th>
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">Phone</th>
              <th className="px-6 pt-5 pb-4">
                Expected Delivery
              </th>
              <th className="px-6 pt-5 pb-4">
                Referred From
              </th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Referred By
              </th>
            </tr>
          </thead>
          <tbody>
            {latest_referrals.map(({ id, id_number, nhif_number, name, phone, expected_delivery, clinic, user, deleted_at }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {nhif_number ? nhif_number : id_number}
                    {deleted_at && (
                      <Icon
                        name="trash"
                        className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                      />
                    )}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {name}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {phone}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {expected_delivery}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {clinic}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('referrals.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {user}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('referrals.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                    <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 text-gray-400 fill-current"
                    />
                  </InertiaLink>
                </td>
              </tr>
            ))}
            {latest_referrals.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;

export default Dashboard;
