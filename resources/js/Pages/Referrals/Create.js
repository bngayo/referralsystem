import React from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import TextArea from '@/Shared/TextArea';

const Create = () => {
  const { patient } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: patient.first_name + " " + patient.last_name || '',
    email: patient.email || '',
    phone: patient.phone || '',
    nhif_number: patient.nhif_number || '',
    id_number: patient.id_number || '',
    expected_delivery: patient.expected_delivery || '',
    notes: patient.notes || '',
  });


  function handleSubmit(e) {
    e.preventDefault();
    post(route('referrals.store', patient.id));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('referrals')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Referrals
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Refer Patient
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Refer Patient" children={page} />;

export default Create;
