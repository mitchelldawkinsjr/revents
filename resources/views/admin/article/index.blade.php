@extends('admin.layouts.default')

{{-- Web site Title --}}
@section('title') Event :: @parent @endsection

{{-- Content --}}
@section('main')
    <div class="page-header">
        <h3>
            Event
            <div class="pull-right">
                <div class="pull-right">
                    <a href="{!! url('admin/article/create') !!}"
                       class="btn btn-sm  btn-primary iframe"><span
                                class="glyphicon glyphicon-plus-sign"></span> {{
					trans("admin/modal.new") }}</a>
                </div>
            </div>
        </h3>
    </div>

    <table id="table" class="table table-striped table-hover">
        <thead>
        <tr>
            <th>{{ trans("admin/modal.title") }}</th>
            <th>{{ trans("admin/article.category") }}</th>
            <th>{{ trans("Created") }}</th>
            <th>{{ trans("admin/admin.action") }}</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>
@endsection

{{-- Scripts --}}
@section('scripts')
@endsection
