<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'nhif_number' => $this->nhif_number,
            'id_number' => $this->id_number,
            'expected_delivery' => $this->expected_delivery,
            'deleted_at' => $this->deleted_at,
            'clinic' => $this->whenLoaded('clinic')
        ];
    }
}
