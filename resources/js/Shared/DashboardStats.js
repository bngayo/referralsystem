import React from 'react';
import DashboardStat from './DashboardStat';

export default ({title, number}) => {

    return (
        <div id="wrapper" class="max-w-xl px-4 py-4 mx-auto">
            <div class="grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                <DashboardStat title = "Clinics" number="43" percentage="6%" textColor="text-green-500" iconName="positive"/>
                <DashboardStat title = "Patients" number="150" percentage="0%" textColor="text-gray-500" iconName="neutral"/>
                <DashboardStat title = "Referrals" number="74" percentage="2%" textColor="text-red-500" iconName="negative"/>
            </div>
        </div>
    );
}

