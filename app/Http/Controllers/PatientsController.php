<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientStoreRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Http\Resources\PatientCollection;
use App\Http\Resources\PatientResource;
use Inertia\Inertia;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class PatientsController extends Controller
{
    public function index()
    {
        return Inertia::render('Patients/Index', [
            'filters' => Request::all('search', 'trashed'),
            'patients' => new PatientCollection(
                Patient::with('clinic')
                    ->orderByDateCreated()
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Patients/Create', [
            'organizations' => new UserOrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    public function store(PatientStoreRequest $request)
    {
        Auth::user()->account->Patients()->create(
            $request->validated()
        );

        return Redirect::route('patients')->with('success', 'Patient created.');
    }

    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/Edit', [
            'patient' => new PatientResource($patient),
            'organizations' => new UserOrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->get()
            ),
        ]);
    }

    public function update(Patient $patient, PatientUpdateRequest $request)
    {
        $patient->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Patient updated.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();

        return Redirect::back()->with('success', 'Patient deleted.');
    }

    public function restore(Patient $patient)
    {
        $patient->restore();

        return Redirect::back()->with('success', 'Patient restored.');
    }
}
