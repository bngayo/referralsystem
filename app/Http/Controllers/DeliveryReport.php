<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeliveryReport extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Reports/Delivery/Index', [
            'filters' => Request::all('search', 'trashed'),
            'referrals' => ReferralResource::collection(
                Referral::orderByDateCreated()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }
}
