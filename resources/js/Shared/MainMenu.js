import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Clinics" link="clinics" icon="office" />
      <MainMenuItem text="Patients" link="patients" icon="users" />
      <MainMenuItem text="Referrals" link="referrals" icon="book" />
      <MainMenuItem text="Payments" link="payments" icon="store-front" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
    </div>
  );
};
