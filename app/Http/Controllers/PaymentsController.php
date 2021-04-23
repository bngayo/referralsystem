<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentStoreRequest;
use App\Http\Requests\PaymentUpdateRequest;
use App\Http\Resources\PaymentCollection;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\ReferralResource;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Referral;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class PaymentsController extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Index', [
            'filters' => Request::all('search', 'trashed'),
            'payments' => PaymentResource::collection(
                Payment::with('referral')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(Referral $referral)
    {
        return Inertia::render('Payments/Create', [
            'referral' => new ReferralResource($referral)
        ]);
    }

    public function store(Referral $referral, PaymentStoreRequest $request)
    {
        $payment = $request->validated();
        $payment['user_id'] = Auth::user()->id;

        $referral->payments()->create($payment);

        return Redirect::route('payments')->with('success', 'Payment saved successfully.');
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', [
            'payment' => new PaymentResource($payment)
        ]);
    }

    public function update(Contact $payment, ContactUpdateRequest $request)
    {
        $payment->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Contact updated.');
    }

    public function destroy(Contact $payment)
    {
        $payment->delete();

        return Redirect::back()->with('success', 'Contact deleted.');
    }

    public function restore(Contact $payment)
    {
        $payment->restore();

        return Redirect::back()->with('success', 'Contact restored.');
    }
}
