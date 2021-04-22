<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReferralResource extends JsonResource
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
            'name' => $this->whenLoaded('patient')->name,
            'email' => $this->whenLoaded('patient')->email,
            'phone' => $this->whenLoaded('patient')->phone,
            'nhif_number' => $this->whenLoaded('patient')->nhif_number,
            'id_number' => $this->whenLoaded('patient')->id_number,
            'expected_delivery' => $this->whenLoaded('patient')->expected_delivery,
            'deleted_at' => $this->deleted_at,
            'clinic' => $this->whenLoaded('clinic')->name,
            'user' => $this->whenLoaded('user')->name,
            'notes' => $this->notes,
            'payments' => $this->payments()->orderByDateCreated()->get()->map->only('id', 'reference_no', 'amount', 'notes'),
        ];
    }
}
