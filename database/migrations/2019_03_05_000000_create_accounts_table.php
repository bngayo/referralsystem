<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountsTable extends Migration
{
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
            $table->string('email', 50)->nullable();
            $table->string('phone', 50);
            $table->string('address', 150)->nullable();
            $table->string('location', 50);
            $table->timestamps();
        });
    }
}
