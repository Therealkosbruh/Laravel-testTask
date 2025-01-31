<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ration extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'cooking_date',
        'delivery_date',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
