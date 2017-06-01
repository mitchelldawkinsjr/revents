@extends('admin.layouts.default')

{{-- Web site Title --}}
@section('title') {!! $title !!} :: @parent @endsection

{{-- Content --}}
@section('main')
    <h3>
        {{$title}}
    </h3>
    <div class="row">
        <div class="col-lg-3 col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="glyphicon glyphicon-bullhorn fa-3x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{$newscategory}}</div>
                            <div>{{ trans("admin/articlecategory.articlecategories") }}!</div>
                        </div>
                    </div>
                </div>
                <a href="{{url('admin/articlecategory')}}">
                    <div class="panel-footer">
                        <span class="pull-left">{{ trans("admin/admin.view_detail") }}</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>

                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="glyphicon glyphicon-list fa-3x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{$news}}</div>
                            <div>{{ trans("admin/article.article") }}!</div>
                        </div>
                    </div>
                </div>
                <a href="{{url('admin/article')}}">
                    <div class="panel-footer">
                        <span class="pull-left">{{ trans("admin/admin.view_detail") }}</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>

                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>

        <div class="col-lg-3 col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="glyphicon glyphicon-user fa-3x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{$users}}</div>
                            <div>{{ trans("admin/admin.users") }}!</div>
                        </div>
                    </div>
                </div>
                <a href="{{url('admin/user')}}">
                    <div class="panel-footer">
                        <span class="pull-left">{{ trans("admin/admin.view_detail") }}</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>

                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>

        <div class="col-lg-3 col-md-3">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-clock-o fa-3x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{$totalHours}}</div>
                            <div>{{ trans("Tracked Hours") }}!</div>
                        </div>
                    </div>
                </div>
                <a href="{{url('admin/tracker/details')}}">
                    <div class="panel-footer">
                        <span class="pull-left">{{ trans("admin/admin.view_detail") }}</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>

                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>

    </div>
@endsection
