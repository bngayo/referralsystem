<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClinicStoreRequest;
use App\Http\Requests\ClinicUpdateRequest;
use App\Http\Resources\ClinicCollection;
use App\Http\Resources\ClinicResource;
use Inertia\Inertia;
use App\Models\Clinic;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class ClinicsController extends Controller
{
    public function index()
    {
        return Inertia::render('Clinics/Index', [
            'filters' => Request::all('search', 'trashed'),
            'clinics' => new ClinicCollection(
                Clinic::orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('Clinics/Create');
    }

    public function store(ClinicstoreRequest $request)
    {
        Auth::user()->account->clinics()->create(
            $request->validated()
        );

        return Redirect::route('clinics')->with('success', 'Clinic created.');
    }

    public function edit(Clinic $clinic)
    {
        return Inertia::render('Clinics/Edit', [
            'Clinic' => new ClinicResource($clinic),
        ]);
    }

    public function update(Clinic $clinic, ClinicUpdateRequest $request)
    {
        $clinic->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Clinic updated.');
    }

    public function destroy(Clinic $clinic)
    {
        $clinic->delete();

        return Redirect::back()->with('success', 'Clinic deleted.');
    }

    public function restore(Clinic $clinic)
    {
        $clinic->restore();

        return Redirect::back()->with('success', 'Clinic restored.');
    }
}
