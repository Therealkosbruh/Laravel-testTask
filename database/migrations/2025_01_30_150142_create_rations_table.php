<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->date('cooking_date');
            $table->date('delivery_date');
            $table->timestamps();
            $table->engine = 'InnoDB';  
        });
    }

    public function down()
    {
        Schema::dropIfExists('rations');
    }
};
