<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $orderId = DB::table('orders')->insertGetId([
            'client_name' => 'Иван Иванов',
            'client_phone' => '79991112233',
            'tariff_id' => 1,
            'schedule_type' => 'EVERY_DAY',
            'comment' => 'Без лука',
            'created_at' => now(),
            'first_date' => '2025-02-01',
            'last_date' => '2025-02-07',
        ]);

        $dates = [];
        for ($i = 1; $i <= 7; $i++) {
            $deliveryDate = Carbon::parse("2025-02-$i");
            $cookingDate = $deliveryDate->copy()->subDay();

            DB::table('rations')->insert([
                'order_id' => $orderId,
                'cooking_date' => $cookingDate,
                'delivery_date' => $deliveryDate,
            ]);
        }
    }
}
