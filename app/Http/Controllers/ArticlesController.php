<?php

namespace App\Http\Controllers;

use App\Article;
use App\Attendance;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\EmailController;

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
        $user = new User();

        if(isset($id) && ($userId) )
        {
            $attend = new Attendance;
            $attend->user_id=$userId;
            $attend->article_id=$id;
            $attend->save();

            $article = Article::find($id);

            $email = new EmailController();
            $email->sendEmail($user::find($userId),$article);
        }

        return view('pages.joined',compact('article'));
    }
}
