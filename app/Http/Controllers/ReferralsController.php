<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReferralsController extends Controller
{
    public function index()
    {
        return Inertia::render('Referrals/Index', [
            'filters' => Request::all('search', 'trashed'),
            'referrals' => new ReferralCollection(
                Referral::with('clinic')
                    ->orderByDateCreated()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Referrals/Create');
    }

    public function store(ReferralStoreRequest $request)
    {
        Auth::user()->clinic->Referrals()->create(
            $request->validated()
        );

        return Redirect::route('Referrals')->with('success', 'Referral created.');
    }

    public function edit(Referral $referral)
    {
        return Inertia::render('Referrals/Edit', [
            'referral' => new ReferralResource($referral)
        ]);
    }

    public function update(Referral $referral, ReferralUpdateRequest $request)
    {
        $referral->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Referral updated.');
    }

    public function destroy(Referral $referral)
    {
        $referral->delete();

        return Redirect::back()->with('success', 'Referral deleted.');
    }

    public function restore(Referral $referral)
    {
        $referral->restore();

        return Redirect::back()->with('success', 'Referral restored.');
    }
}
