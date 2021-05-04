import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import TrashedMessage from '@/Shared/TrashedMessage';

const Edit = () => {
  const { patient } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    first_name: patient.first_name || '',
    last_name: patient.last_name || '',
    email: patient.email || '',
    phone: patient.phone || '',
    nhif_number: patient.nhif_number || '',
    id_number: patient.id_number || '',
    expected_delivery: patient.expected_delivery || '',
    last_period: patient.last_period || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('patients.update', patient.id));
  }

  function onRefer() {
    if (confirm('Are you sure you want to refer this patient?')) {
      Inertia.get(route('referrals.create', patient.id));
    }
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this patient?')) {
      Inertia.delete(route('patients.destroy', patient.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this patient?')) {
      Inertia.put(route('patients.restore', patient.id));
    }
  }

  return (
    <div>
      <Helmet title={`${data.first_name} ${data.last_name}`} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('patients')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Patients
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.first_name} {data.last_name}
        </h1>
        {!patient.deleted_at && (
            <button
                className="btn-indigo"
                tabIndex="-1"
                type="button"
                onClick={onRefer}
              >
                Refer Patient to St Jude
          </button>
        )}
      </div>

      {patient.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This patient has been deleted.
        </TrashedMessage>
      )}
      <div className="w-full overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="First Name"
              name="first_name"
              errors={errors.first_name}
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Last Name"
              name="last_name"
              errors={errors.last_name}
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="phone"
              type="text"
              errors={errors.phone}
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="NHIF No"
              name="nhif_number"
              type="text"
              errors={errors.nhif_number}
              value={data.nhif_number}
              onChange={e => setData('nhif_number', e.target.value)}
            />
             <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="ID No"
              name="id_number"
              type="text"
              errors={errors.id_number}
              value={data.id_number}
              onChange={e => setData('id_number', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Expected Delivery Date"
              name="expected_delivery"
              type="date"
              errors={errors.last_period}
              value={data.last_period}
              onChange={e => setData('last_period', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Expected Delivery Date"
              name="expected_delivery"
              type="date"
              errors={errors.expected_delivery}
              value={data.expected_delivery}
              onChange={e => setData('expected_delivery', e.target.value)}
            />
            
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!patient.deleted_at && (
              
              <DeleteButton onDelete={destroy}>Delete patient</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update patient
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
