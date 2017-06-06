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



    <div class="container-fluid single-event-page" id="main">
        <div class="row single-event-wrapper">
            <div class="col-xs-12 event-main">
                <div class="event-top">
                    <h1 id="title" class="event-title">{{$article->title}}</h1>
                    <div class="event-description-wrapper">
                        <p class="description">
                        <div class="col-xs-12 col-md-12 center col-xs-12 col-md-12 center img-fluid">
                        <!--@if (isset($article->picture))-->
                        <!--<img class="" src="{{URL::to('/')}}/images/{{$article->picture}}">-->
                        <!--@endif-->
                            <!--    <div style="height:30px;"> </div>-->
                            <div id="about" class="center col-xs-12 col-md-10 col-md-offset-1"> {{$article->content}}</div>
                            <div style ="margin-top:20px;" class="col-md-6 col-md-offset-3">
                                <a href="https://www.facebook.com/sharer/sharer.php?u={{URL::to('/')}}/{{$article->slug}}&picture{{$article->picture}}&title={{$article->title}}&description={{$article->introduction}}" target="_blank" onclick="window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false">
                                    <button style="margin-top:10px;" type="button" style="width:100%;"class="btn btn-facebook btn-lg">
                                        <i class="fa fa-facebook fa-2"></i>Share
                                    </button>
                                </a>
                            </div>
                        </div>
                        </p>
                    </div>
                </div>
                <div class="event-bottom">
                    <div class="event-bottom-content center-block">
                        <div class="row">
                            <div class="pull-left event-day-wrapper event-column">
                                <i class="fa fa-calendar"></i>
                                <p class="day">{{ date('D', strtotime($article->date)) }} </p>
                                <p  class="date">{{$article->date}}</p>
                            </div>
                            <div class="pull-right event-location-wrapper event-column">
                                <i class="fa fa-map-marker pull-left"></i>
                                <p class="organization">{{$article->location_name}}</p><br>
                                <p id="location" class="location">{{$article->address}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="pull-left event-time-wrapper event-column">
                                <i class="fa fa-clock-o"></i>
                                <p>Starts</p>
                                <p style="display: none;" id="start" class="date">{{  date('Y-m-d', strtotime($article->date)) }}</p>
                                <p id="start_time" class="time-begins">{{ $article->start_time }}</p>
                            </div>
                            <div class="pull-left event-time-wrapper event-column">

                                <i class="fa fa-clock-o"></i>
                                <p>Ends</p>
                                <p style="display: none;" id="end" class="date">{{  date('Y-m-d', strtotime($article->date)) }}</p>
                                <p id="end_time" class="time-begins">{{ $article->end_time }}</p>
                            </div>
                            <a href="mailto:{{$article->contact_email}}">
                                <div class="pull-right event-host-wrapper event-column">
                                    <i class="fa fa-envelope"></i>
                                    <p>Event Host</p>
                                    <p id="host" class="host">{{$article->contact_email}}</p>
                                </div>
                            </a>
                        </div>

                        <button class="submit join-button" id="event"> Add to my Calendar</button>
                        {{--<div class="row form-row">--}}
                            {{--<div class="col-md-12 event-form-wrapper">--}}
                                {{--{!! Form::open(array('url' => url('/join'), 'method' => 'post')) !!}--}}
                                {{--<div class="row form-row waiver_section">--}}
                                    {{--<div id="waiver_wrapper" class="col-md-12 event-column">--}}
                                        {{--{!! Form::hidden('article_id', $article->id ) !!}--}}
                                        {{--<i class="fa fa-info-circle"></i><a class="waiver-link" href="" target="_blank">Acknowledgements and Release Form</a>--}}
                                        {{--<br>--}}
                                        {{--<br>--}}
                                        {{--<input type="checkbox" id="waivercheck"><span style="margin-left:20px;" class="agree-copy pull-right">I agree.</span>--}}
                                    {{--</div>--}}
                                {{--</div>--}}
                                {{--<div class="row form-row submit_row">--}}
                                    {{--{!! Form::submit('Join Now', ['class' => '"submit join-button']) !!}--}}
                                {{--</div>--}}
                                {{--{!! Form::close() !!}--}}

                            {{--</div>--}}
                        {{--</div>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>



    {{--<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>--}}

    {{--<script>--}}
        {{--$('#cal-event').icalendar({--}}
            {{--sites: [],--}}
            {{--start: new Date(2008, 1-1, 26, 11, 30, 00),--}}
            {{--end: new Date(2008, 1-1, 26, 12, 45, 00),--}}
            {{--echoUrl: '/article/ics',--}}
            {{--title: 'Australia Day lunch'});--}}
    {{--</script>--}}

    {{--<button id ="download">Demo</button>--}}

    {{--<script>--}}

        {{--var cal = ics();--}}

        {{--cal.download(cal);--}}

        {{--$("#download").on("click",function(){--}}
            {{----}}
        {{--})--}}
    {{--</script>--}}

    <script type="text/javascript" src="https://rawgithub.com/nwcell/ics.js/master/ics.deps.min.js"></script>

    {{--<script type="text/javascript" src="https://rawgithub.com/nwcell/ics.js/master/demo/demo.js"></script>--}}

    <script>

        $('#event').click(function(){
//            var start_time = new Date(year, month[, date[, hours[, minutes[, seconds[, milliseconds]]]]]);
//
//            var end_time = new Date(year, month[, date[, hours[, minutes[, seconds[, milliseconds]]]]]);
            var title = $('#title').html();
            var des = 'Start Time: ' + $('#start_time').html() + ' End Time: ' + $('#end_time').html() + $('#about').html();
            var loc = $('.location').html();
            var start =  $('#start').html();
            var end =  $('#end').html();
            var cal = ics();
            cal.addEvent(title,des,loc,start,end);
            cal.download();
        });
    </script>

@endsection

