<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PhoneNumber;
use App\Rules\ValidOrderDates;
use App\Rules\ValidDeliveryRanges;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'client_name'   => ['required', 'string', 'max:255'],
            'client_phone'  => ['required', 'string', 'unique:orders,client_phone', new PhoneNumber()],
            'tariff_id'     => ['required', 'exists:tariffs,id'],
            'schedule_type' => ['required', 'in:EVERY_DAY,EVERY_OTHER_DAY,EVERY_OTHER_DAY_TWICE'],
            'comment'       => ['nullable', 'string'],
            'first_date'    => ['required', 'date', new ValidOrderDates()],
            'last_date'     => ['required', 'date'],
            'delivery_ranges' => ['required', 'array', new ValidDeliveryRanges()],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
