import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Clinics" link="clinics" icon="office" />
      <MainMenuItem text="Patients" link="patients" icon="users" />
      <MainMenuItem text="Referrals" link="referrals" icon="users" />
      <MainMenuItem text="Payments" link="payments" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
    </div>
  );
};
