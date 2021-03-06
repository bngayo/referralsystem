<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Clinic;
use App\Models\Referral;
use App\Models\Patient;
use App\Http\Resources\ReferralResource;
use App\Http\Resources\ReferralCollection;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Index', [
            'clinics'=> Clinic::count(),
            'patients'=> Patient::count(),
            'referrals'=> Referral::count(),
            'latest_referrals' => new ReferralCollection(
                Referral::orderByDateCreated()->limit(10)->get()
            ),
        ]);
    }
}
