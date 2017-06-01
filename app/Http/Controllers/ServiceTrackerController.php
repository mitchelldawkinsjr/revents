<?php

namespace App\Http\Controllers;

use App\ServiceTrackerView;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Http\Requests\Admin\ServiceTrackerRequest;
use App\ServiceTracker;
use Illuminate\Support\Facades\Auth;

use Datatables;

class ServiceTrackerController extends Controller
{

    public function __construct()
    {
        view()->share('type', 'service');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "Add An Entry";

        return view('tracker.view.index',  compact('title'));
    }

    public function details()
    {
        $title = "All Services Tracked";

        return view('admin.tracker.index',  compact('title'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function history()
    {
        $title = "Service Portfolio";

        return view('tracker.view.history',  compact('title'));
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(ServiceTrackerRequest $request)
    {
        $service= new ServiceTracker($request->all());
        $service -> user_id = Auth::id();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceTrackerRequest $request)
    {
        $service = new ServiceTracker($request->all());

        if(isset($service))
        {
            $service->user_id = Auth::id();
            $service->save();
        }
        return view('tracker.view.inserted');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Pulls all service data tracked and adds it to admin panel
     * @return mixed
     */
    public function adminServiceData()
    {
        $services = ServiceTrackerView::all()
            ->map(function ($service) {
                return [
                    'user' => $service->name,
                    'name' => $service->org_name,
                    'date' => $service->date,
                    'time' => $service->time,
                    'description' => $service->description,
                    'created' => $service->created_at->format('d-M-Y'),
                ];
            });

        return Datatables::of($services)
//            ->add_column('actions', '<a href="{{{ url(\'admin/article/\' . $id . \'/edit\' ) }}}" class="btn btn-success btn-sm iframe" >
//                    <span class="glyphicon glyphicon-pencil"></span>  {{ trans("admin/modal.edit") }}</a>
//                    <a href="{{{ url(\'admin/article/\' . 1 . \'/delete\' ) }}}" class="btn btn-sm btn-danger iframe">
//                    <span class="glyphicon glyphicon-trash"></span> {{ trans("admin/modal.delete") }}</a>
//                    <input type="hidden" name="row" value="1" id="row">' )
            ->make();
    }


    /**
     * Show a list of all the languages posts formatted for Datatables.
     *
     * @return Datatables JSON
     */
    public function data()
    {
        $services = ServiceTracker::all()
            ->map(function ($service) {
                return [
                    'name' => $service->name,
                    'date' => $service->date,
                    'time' => $service->time,
                    'description' => $service->description,
                    'created' => $service->created_at->format('d-M-Y'),
                ];
            });

        return Datatables::of($services)
//            ->add_column('actions', '<a href="{{{ url(\'admin/article/\' . $id . \'/edit\' ) }}}" class="btn btn-success btn-sm iframe" >
//                    <span class="glyphicon glyphicon-pencil"></span>  {{ trans("admin/modal.edit") }}</a>
//                    <a href="{{{ url(\'admin/article/\' . 1 . \'/delete\' ) }}}" class="btn btn-sm btn-danger iframe">
//                    <span class="glyphicon glyphicon-trash"></span> {{ trans("admin/modal.delete") }}</a>
//                    <input type="hidden" name="row" value="1" id="row">' )
            ->make();
    }
}
