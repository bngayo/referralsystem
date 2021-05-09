<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentReport extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Reports/Payments/Index', [
            'filters' => Request::all('search', 'trashed'),
            'payments' => PaymentResource::collection(
                Payment::with('referral')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }
}
