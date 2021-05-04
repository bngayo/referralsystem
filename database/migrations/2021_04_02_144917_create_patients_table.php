<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('clinic_id')->index();
            $table->string('nhif_number', 25)->nullable();
            $table->string('id_number', 25);
            $table->string('first_name', 25);
            $table->string('last_name', 25);
            $table->string('phone', 50);
            $table->string('email', 50)->nullable();
            $table->date('last_period');
            $table->date('expected_delivery');
            $table->integer('created_by')->nullable();
            $table->integer('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
