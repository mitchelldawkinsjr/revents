@extends('layouts.app')
@section('title') Home :: @parent @endsection
@section('content')
    @include('partials.secondary-banner')
    {{--@include('partials.filter')--}}

    <div id="menu" class="col-xs-12  col-md-10 col-md-offset-1">
        <div class="alert alert-success">
            <strong>Success!</strong> Thank you for signing up to attend {{$article->title}}.
            {{--<div id="cal-event"></div>--}}
        </div>

        <a style="margin:20px 0 20px 0;" href="{{url('/')}}"class="text-link filter-events pull-left"><i class="fa fa-arrow-circle-o-left"></i>BACK TO EVENTS</a>
    </div>

    <script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>

    {{--<script>--}}
        {{--$('#cal-event').icalendar({--}}
            {{--sites: [],--}}
            {{--start: new Date(2008, 1-1, 26, 11, 30, 00),--}}
            {{--end: new Date(2008, 1-1, 26, 12, 45, 00),--}}
            {{--echoUrl: '/article/ics',--}}
            {{--title: 'Australia Day lunch'});--}}
    {{--</script>--}}
@endsection

