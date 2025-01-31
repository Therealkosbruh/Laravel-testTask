<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tariffs', function (Blueprint $table) {
            $table->bigIncrements('id');  
            $table->string('ration_name');
            $table->boolean('cooking_day_before');
            $table->timestamps();
            $table->engine = 'InnoDB';  
        });
    }

    public function down()
    {
        Schema::dropIfExists('tariffs');
    }
};
