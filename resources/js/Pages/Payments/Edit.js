import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import SelectInput from '@/Shared/SelectInput';
import TextInput from '@/Shared/TextInput';
import TextArea from '@/Shared/TextArea';
import TrashedMessage from '@/Shared/TrashedMessage';

const Edit = () => {
  const { payment } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: payment.referral.name || '',
    id_number: payment.referral.id_number || '',
    clinic: payment.referral.clinic || '',
    user: payment.referral.user || '',
    payment_mode: payment.payment_mode || '',
    reference_no: payment.reference_no || '',
    amount: payment.amount || '',
    notes: payment.notes || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('payments.update', payment.id));
  }

  function onRefer() {
    if (confirm('Are you sure you want to refer this payment?')) {
      Inertia.get(route('referrals.create', payment.id));
    }
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this payment?')) {
      Inertia.delete(route('payments.destroy', payment.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this payment?')) {
      Inertia.put(route('payments.restore', payment.id));
    }
  }

  return (
    <div>
      <Helmet title="Payment" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('payments')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Payments
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {data.reference_no}
        </h1>
      </div>

      {payment.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This payment has been deleted.
        </TrashedMessage>
      )}
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
              disabled
              onChange={e => setData('reference_no', e.target.value)}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Payment Mode"
              name="payment_mode"
              errors={errors.payment_mode}
              value={data.payment_mode}
              disabled
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
              disabled
              onChange={e => setData('amount', e.target.value)}
            />
             <TextArea
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Notes"
              name="note"
              errors={errors.note}
              value={data.note}
              disabled
              onChange={e => setData('note', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!payment.deleted_at && (
              
              <DeleteButton onDelete={destroy}>Delete Payment</DeleteButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
