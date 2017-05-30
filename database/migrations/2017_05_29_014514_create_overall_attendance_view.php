<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOverallAttendanceView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
         CREATE VIEW overall_attendance AS
         (
         SELECT u.name, u.email, u.phone, aa.title, a.created_at
         FROM `users` u
         INNER JOIN attendance a ON a.user_id=u.id
         INNER JOIN articles aa ON aa.id=a.article_id
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
        DB::statement('DROP VIEW IF EXISTS overall_attendance');
    }
}
