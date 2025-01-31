<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^7\d{10}$/', $value)) {
            $fail('Номер телефона должен начинаться с 7 и содержать 11 цифр.');
        }
    }
}
