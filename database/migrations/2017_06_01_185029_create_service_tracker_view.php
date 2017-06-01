<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceTrackerView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
         CREATE VIEW overall_service_tracker AS
         (
         SELECT u.name, b.name as org_name, b.time, b.date, b.description, b.created_at
         FROM `users` u
         INNER JOIN service_tracker b ON b.user_id=u.id
         )
    ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS overall_service_tracker');
    }
}
