import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    nhif_number: '',
    id_number: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    expected_delivery: '',
    last_period: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('patients.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('patients')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Patients
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
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
              label="Last Period"
              name="last_period"
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
              disabled
              onChange={e => setData('expected_delivery', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Patient
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Patient" children={page} />;

export default Create;
