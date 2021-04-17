<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class PatientStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_number' => ['required', 'max:50', Rule::unique('patients')],
            'nhif_number' => ['nullable', 'max:50', Rule::unique('patients')],
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'clinic_id' => ['nullable', Rule::exists('clinics', 'id')->where(function ($query) {
                $query->where('clinic_id', Auth::user()->clinic_id);
            })],
            'email' => ['nullable', 'max:50', 'email'],
            'phone' => ['required', 'max:50'],
            'expected_delivery' => ['required', 'max:150']
        ];
    }
}
