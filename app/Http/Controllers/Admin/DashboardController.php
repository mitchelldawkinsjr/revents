<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Article;
use App\ArticleCategory;
use App\ServiceTrackerView;
use App\User;
use App\Photo;
use App\PhotoAlbum;
use Illuminate\Support\Facades\DB;

class DashboardController extends AdminController {

    public function __construct()
    {
        parent::__construct();
        view()->share('type', '');
    }

	public function index()
	{
        $title = "Dashboard";

        $news = Article::count();
        $newscategory = ArticleCategory::count();
        $users = User::count();
        $photo = Photo::count();
        $photoalbum = PhotoAlbum::count();
        $totalHoursObj = DB::table('overall_service_tracker')
            ->select('time', DB::raw('SUM(time) as time'))
            ->get();
        $totalHours = $totalHoursObj[0]->time;

		return view('admin.dashboard.index',  compact('title','news','newscategory','photo','photoalbum','users','totalHours'));
	}
}