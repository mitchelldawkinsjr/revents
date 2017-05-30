<?php

namespace App\Http\Controllers\Admin;

use App\AttendanceView;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Datatables;

class AttendanceController extends Controller
{
    public function __construct()
    {
        view()->share('type','attendance');
    }

    /**
     * Show a list of all data formatted for Datatables.
     *
     * @return Datatables JSON
     */
    public function data()
    {
        $attendees = AttendanceView::all()
            ->map(function ($attend) {
                return [
                    'Name' => $attend->name,
                    'Email' => $attend->email,
                    'Phone' => $attend->phone,
                    'Event' => $attend->title,
                    'Created' => $attend->created_at->format('d-M-Y'),
                ];
            });

        return Datatables::of($attendees)
//            ->add_column('actions', '<a href="{{{ url(\'admin/article/\' . $id . \'/edit\' ) }}}" class="btn btn-success btn-sm iframe" >
//                    <span class="glyphicon glyphicon-pencil"></span>  {{ trans("admin/modal.edit") }}</a>
//                    <a href="{{{ url(\'admin/article/\' . 1 . \'/delete\' ) }}}" class="btn btn-sm btn-danger iframe">
//                    <span class="glyphicon glyphicon-trash"></span> {{ trans("admin/modal.delete") }}</a>
//                    <input type="hidden" name="row" value="1" id="row">' )
            ->make();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.attendance.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
}
