<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TariffSeeder extends Seeder
{
    public function run()
    {
        DB::table('tariffs')->insert([
            [
                'id' => 1,
                'ration_name' => 'Стандартный рацион',
                'cooking_day_before' => true,
            ],
            [
                'id' => 2,
                'ration_name' => 'Спортивный рацион',
                'cooking_day_before' => false,
            ],
            [
                'id' => 3,
                'ration_name' => 'Вегетарианский рацион',
                'cooking_day_before' => true,
            ],
        ]);
    }
}
