<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Запуск сидеров базы данных.
     */
    public function run()
    {
        $this->call([
            TariffSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
