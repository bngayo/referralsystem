import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';

const Index = () => {
  const { payments } = usePage().props;
  const {
    data,
    meta: { links }
  } = payments;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Payments</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Patient ID No</th>
              <th className="px-6 pt-5 pb-4">Patient Name</th>
              {/* <th className="px-6 pt-5 pb-4">Clinic</th> */}
              <th className="px-6 pt-5 pb-4">Ref No</th>
              <th className="px-6 pt-5 pb-4">Mode</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, referral, reference_no, payment_mode, amount, deleted_at }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('payments.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {referral.nhif_number ? referral.nhif_number : referral.id_number }
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
                    href={route('payments.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {referral.name}
                  </InertiaLink>
                </td>
                {/* <td className="border-t">
                  <InertiaLink
                    tabIndex="1"
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    href={route('payments.edit', id)}
                  >
                    {clinic}
                  </InertiaLink>
                </td> */}
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {reference_no}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {payment_mode}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {amount}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
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
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="5">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </div>
  );
};

Index.layout = page => <Layout title="Payents" children={page} />;

export default Index;
