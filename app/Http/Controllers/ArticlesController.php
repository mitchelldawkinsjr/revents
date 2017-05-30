<?php

namespace App\Http\Controllers;

use App\Article;
use App\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

class ArticlesController extends Controller {

    public function index()
    {
        $articles = Article::paginate(10);
        $articles->setPath('articles/');

        return view('article.index', compact('articles'));
    }

	public function show($slug)
	{
		$article = Article::findBySlugOrId($slug);

		return view('article.view', compact('article'));
    }

    public function join()
    {
        $id = Input::get('article_id');
        $userId = Auth::id();

        if(isset($id) && ($userId) )
        {
            $attend = new Attendance;
            $attend->user_id=$userId;
            $attend->article_id=$id;
            $attend->save();

            $article = Article::find($id);
        }

        return view('pages.joined',compact('article'));
    }
}
