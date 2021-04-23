<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'reference_no' => $this->reference_no,
            'payment_mode' => $this->payment_mode,
            'amount' => $this->amount,
            'referral' => new ReferralResource($this->whenLoaded('referral')),
            'user' => $this->whenLoaded('user'),
            'deleted_at' => $this->deleted_at,
            
        ];
    }
}
