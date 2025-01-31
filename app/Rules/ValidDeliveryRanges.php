<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidDeliveryRanges implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value) || count($value) === 0) {
            $fail('Необходимо указать хотя бы один промежуток дат.');
            return;
        }

        foreach ($value as $range) {
            if (!isset($range['from']) || !isset($range['to'])) {
                $fail('Каждый промежуток должен содержать даты "от" и "до".');
                return;
            }

            if ($range['from'] > $range['to']) {
                $fail("Дата начала ({$range['from']}) не может быть позже даты конца ({$range['to']}).");
            }
        }
    }
}
