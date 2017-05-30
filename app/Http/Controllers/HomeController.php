<?php

namespace App\Http\Controllers;

use App\Article;
use App\ArticleCategory;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Requests\Request;
use App\PhotoAlbum;
use DB;

class HomeController extends Controller {

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		$articles = Article::with('author')->orderBy('created_at', 'DESC')->get();
		$articleCategories = ArticleCategory::orderBy('created_at', 'DESC')->get();
		return view('pages.home', compact('articles','articleCategories'));
	}

    /**
     * @param UserRequest $request
     * @return \BladeView|bool|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function filter(UserRequest $request)
    {
        $params = $request->all();
        if(isset($params['category']))
        {
            $articles = Article::whereIn('article_category_id', array_keys($params['category']))->orderBy('created_at', 'DESC')->get();
        } else if(isset($params['date_start']) && isset($params['date_end'])) {
            $articles = Article::whereBetween('date', array($params['date_start'],$params['date_end']))->get();
        } else {
            $articles = Article::with('author')->orderBy('created_at', 'DESC')->get();
        }
        $articleCategories = ArticleCategory::orderBy('created_at', 'DESC')->get();

        return view('pages.home', compact('articles','articleCategories'));
    }


    public function search(UserRequest $request)
    {
        $params = $request->all();
        if(isset($params['term']))
        {
            $articleCategories = ArticleCategory::orderBy('created_at', 'DESC')->get();
            $sql = <<<SQL
select * from revents.articles where title like '%{$params['term']}%' OR address like '%{$params['term']}%' OR location_name like '%{$params['term']}%' OR date like '%{$params['term']}%' OR content like '%{$params['term']}%'
SQL;
            $articles = DB::select($sql);
        } else {
            $articles = Article::with('author')->orderBy('created_at', 'DESC')->get();
            $articleCategories = ArticleCategory::orderBy('created_at', 'DESC')->get();
        }
        return view('pages.home', compact('articles','articleCategories'));
    }

}