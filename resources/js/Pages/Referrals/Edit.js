import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import TextArea from '@/Shared/TextArea';
import TrashedMessage from '@/Shared/TrashedMessage';

const Edit = () => {
  const { referral } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: referral.name || '',
    email: referral.email || '',
    phone: referral.phone || '',
    nhif_number: referral.nhif_number || '',
    id_number: referral.id_number || '',
    expected_delivery: referral.expected_delivery || '',
    notes: referral.notes || '',
    clinic: referral.clinic || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('referrals.update', referral.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this referral?')) {
      Inertia.delete(route('referrals.destroy', referral.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this referral?')) {
      Inertia.put(route('referrals.restore', referral.id));
    }
  }

  return (
    <div>
      <Helmet title={`${data.name}`} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('referrals')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Referrals
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.clinic}
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.name}
        </h1>
      </div>

      {referral.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This referral has been deleted.
        </TrashedMessage>
      )}
      <div className="w-full overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Name"
              name="name"
              errors={errors.name}
              value={data.name}
              disabled
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={data.email}
              disabled
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="phone"
              type="text"
              errors={errors.phone}
              value={data.phone}
              disabled
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="NHIF No"
              name="nhif_number"
              type="text"
              errors={errors.nhif_number}
              value={data.nhif_number}
              disabled
              onChange={e => setData('nhif_number', e.target.value)}
            />
             <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="ID No"
              name="id_number"
              type="text"
              errors={errors.id_number}
              value={data.id_number}
              disabled
              onChange={e => setData('id_number', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Expected Delivery Date"
              name="expected_delivery"
              type="date"
              errors={errors.expected_delivery}
              value={data.expected_delivery}
              disabled
              onChange={e => setData('expected_delivery', e.target.value)}
            />
             <TextArea
              className="w-full pb-8 pr-6 lg:w-full"
              label="Notes"
              name="notes"
              errors={errors.notes}
              value={data.notes}
              onChange={e => setData('notes', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!referral.deleted_at && (
              
              <DeleteButton onDelete={destroy}>Delete Referral</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Referral
            </LoadingButton>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="mt-6 text-3xl font-bold">Payments</h2>
          <InertiaLink
            href={route('referrals')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Make Payment
          </InertiaLink>
      </div>

      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Ref No</th>
              <th className="px-6 pt-5 pb-4">Amount</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {referral.payments.map(
              ({ id, name, phone, city, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {name}
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
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {city}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {phone}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('payments.edit', id)}
                        className="flex items-center px-4"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </InertiaLink>
                    </td>
                  </tr>
                );
              }
            )}
            {referral.payments.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

Edit.layout = page => <Layout title="Update Referral" children={page} />;

export default Edit;
