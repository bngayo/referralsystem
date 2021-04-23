import React from 'react';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import TextArea from '@/Shared/TextArea';
import SelectInput from '@/Shared/SelectInput';
import 'react-day-picker/lib/style.css';

const Create = () => {
  const { referral } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: referral.name || '',
    clinic: referral.clinic || '',
    user: referral.user || '',
    nhif_number: referral.nhif_number || '',
    id_number: referral.id_number || '',
    reference_no: referral.reference_no || '',
    payment_mode: referral.payment_mode || '',
    amount: referral.amount || '',
    notes: referral.notes || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('payments.store', referral.id));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('payments')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Payments
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="w-full overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="ID/NHIF No"
              name="id_number"
              errors={errors.id_number}
              value={data.id_number}
              disabled
              onChange={e => setData('id_number', e.target.value)}
            />
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
              label="Referred From"
              name="clinic"
              type="clinic"
              errors={errors.clinic}
              value={data.clinic}
              disabled
              onChange={e => setData('clinic', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Referred By"
              name="clinic"
              type="text"
              errors={errors.user}
              value={data.user}
              disabled
              onChange={e => setData('user', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Payment Ref No"
              name="reference_no"
              type="text"
              errors={errors.reference_no}
              value={data.reference_no}
              onChange={e => setData('reference_no', e.target.value)}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Payment Mode"
              name="payment_mode"
              errors={errors.payment_mode}
              value={data.payment_mode}
              onChange={e => setData('payment_mode', e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Mpesa">Mpesa</option>
              <option value="Bank Deposit">Bank Deposit</option>
              <option value="Cheque">Cheque</option>
            </SelectInput>
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Amount Paid"
              name="amount"
              type="text"
              errors={errors.amount}
              value={data.amount}
              onChange={e => setData('amount', e.target.value)}
            />
             <TextArea
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Notes"
              name="note"
              errors={errors.note}
              value={data.note}
              onChange={e => setData('note', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Save Payment
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Make Payment" children={page} />;

export default Create;
