<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidOrderDates implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $firstDate = request()->input('first_date');
        $lastDate = request()->input('last_date');

        if ($firstDate && $lastDate) {
            if ($firstDate > $lastDate) {
                $fail('Дата первой доставки не может быть позже последней.');
            }

            if ($firstDate < now()->toDateString() || $lastDate < now()->toDateString()) {
                $fail('Даты доставки не могут быть в прошлом.');
            }
        }
    }
}
