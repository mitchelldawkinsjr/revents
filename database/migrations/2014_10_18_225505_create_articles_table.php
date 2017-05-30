<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Create the `Posts` table
		Schema::create('articles', function (Blueprint $table) {
			$table->engine = 'InnoDB';
			$table->increments('id')->unsigned();
            $table->unsignedInteger('language_id');
            $table->foreign('language_id')->references('id')->on('languages');
			$table->unsignedInteger('user_id')->nullable();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
			$table->unsignedInteger('article_category_id')->nullable();
			$table->foreign('article_category_id')->references('id')->on('article_categories')->onDelete('set null');
			$table->string('title');
			$table->string('slug');
            $table->date('date');
            $table->string('start_time');
            $table->string('end_time');
            $table->string('contact_email');
            $table->string('address');
            $table->string('location_name');
            $table->integer('openings');
			$table->text('introduction');
			$table->text('content');
			$table->string('source')->nullable();
			$table->string('picture')->nullable();
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
		Schema::drop('articles');
	}

}
