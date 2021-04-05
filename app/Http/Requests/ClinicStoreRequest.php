<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClinicStoreRequest extends FormRequest
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
            'name' => ['required', 'max:100'],
            'email' => ['nullable', 'max:50', 'email'],
            'phone' => ['required', 'max:50'],
            'address' => ['nullable', 'max:150'],
            'location' => ['required', 'max:50'],
            // 'contact_person' => ['required', 'max:100'],
        ];
    }
}
