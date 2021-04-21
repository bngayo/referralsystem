<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReferralStoreRequest;
use App\Http\Requests\ReferralUpdateRequest;
use App\Http\Resources\ReferralCollection;
use App\Http\Resources\ReferralResource;
use App\Http\Resources\PatientResource;
use Inertia\Inertia;
use App\Models\Referral;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class ReferralsController extends Controller
{
    public function index()
    {
        return Inertia::render('Referrals/Index', [
            'filters' => Request::all('search', 'trashed'),
            'referrals' => ReferralResource::collection(
                Referral::orderByDateCreated()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(Patient $patient)
    {
        return Inertia::render('Referrals/Create', [
            'patient' => new PatientResource($patient)
        ]);
    }

    public function store(Patient $patient, ReferralStoreRequest $request)
    {
        Referral::create([
            'clinic_id' => $patient->clinic_id,
            'patient_id' => $patient->id,
            'user_id' => Auth::user()->id,
            'notes' => $request->notes,
        ]);

        return Redirect::route('referrals')->with('success', 'Referral created.');
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
