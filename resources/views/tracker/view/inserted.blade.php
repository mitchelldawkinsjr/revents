@extends('layouts.app')
@section('title') Home :: @parent @endsection
@section('content')
    <div class="container-fluid secondary-header">
        <div class="col-md-10 col-md-offset-1">
            <img  class="img-fluid" style=" width: 100%;  margin:20px 0 20px 0 ;" src="{{URL::to('/')}}/images/operation_love.png" >
        </div>
    </div>

    <div id="menu" class="col-xs-12  col-md-10 col-md-offset-1">
        <div class="alert alert-success">
            <strong>Success!</strong> Thank you for you helping us reaching our 10,000 hour goal!
            <div id="cal-event"></div>
        </div>

        <div class ="pull-right">
            <a style="margin:20px 0 20px 0;" href="{{url('tracker/history')}}"class="text-link filter-events pull-left">View My Service Portfolio<i class="fa fa-arrow-circle-o-right"></i></a>
        </div>

        <div class ="pull-left">
            <a style="margin:20px 0 20px 0;" href="{{url('/')}}"class="text-link filter-events pull-left"><i class="fa fa-arrow-circle-o-left"></i>BACK TO EVENTS</a>
        </div>
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

