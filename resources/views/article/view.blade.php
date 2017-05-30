@extends('layouts.app')

{{-- Event Title --}}
@section('title') {!!  $article->title !!} :: @parent @endsection

{{-- Content --}}
@section('content')

    @include('partials.secondary-banner')

    <div class="container-fluid single-event-page" id="main">
        <div class="row event-action-bar">
            <div class="col-xs-6 pull-left">
                <a href="/" class="text-link return-link"><i class="fa fa-arrow-circle-o-left fa-2x"></i>ALL EVENTS</a>
            </div>
            <div class="col-xs-6 pull-right social">
                <a class="twitter" href="https://twitter.com/therevolutioncm" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                <a class="facebook" href="https://www.facebook.com/operationlovegr/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="row single-event-wrapper">
            <div class="col-xs-12 event-main">
                <div class="event-top">
                    <h1 class="event-title">{{$article->title}}</h1>
                    <div class="event-description-wrapper">
                        <p class="description">
                        <div class="col-xs-12 col-md-12 center col-xs-12 col-md-12 center img-fluid"> 
                        <!--@if (isset($article->picture))-->
                        <!--<img class="" src="{{URL::to('/')}}/images/{{$article->picture}}">-->
                        <!--@endif-->
                        <!--    <div style="height:30px;"> </div>-->
                            <div class="center col-xs-12 col-md-10 col-md-offset-1"> {{$article->content}}</div>
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
                                <p class="date">{{$article->date}}</p>
                            </div>
                            <div class="pull-right event-location-wrapper event-column">
                                <i class="fa fa-map-marker pull-left"></i>
                                <p class="organization">{{$article->location_name}}</p><br>
                                <p class="location">{{$article->address}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="pull-left event-time-wrapper event-column">
                                <i class="fa fa-clock-o"></i>
                                <p>Starts</p>
                                <p class="time-begins">{{$article->start_time}}</p>
                            </div>
                            <div class="pull-left event-time-wrapper event-column">

                                <i class="fa fa-clock-o"></i>
                                <p>Ends</p>
                                <p class="time-ends">{{$article->end_time}}</p>
                            </div>
                            <a href="mailto:{{$article->contact_email}}">
                                <div class="pull-right event-host-wrapper event-column">
                                    <i class="fa fa-envelope"></i>
                                    <p>Event Host</p>
                                    <p class="host">{{$article->contact_email}}</p>
                                </div>
                            </a>
                        </div>
                        <div class="row form-row">
                            <div class="col-md-12 event-form-wrapper">
                                {!! Form::open(array('url' => url('/join'), 'method' => 'post')) !!}
                                    <div class="row form-row waiver_section">
                                        <div id="waiver_wrapper" class="col-md-12 event-column">
                                            {!! Form::hidden('article_id', $article->id ) !!}
                                            <i class="fa fa-info-circle"></i><a class="waiver-link" href="" target="_blank">Acknowledgements and Release Form</a>
                                            <br>
                                            <br>
                                            <input type="checkbox" id="waivercheck"><span style="margin-left:20px;" class="agree-copy pull-right">I agree.</span>
                                        </div>
                                    </div>
                                    <div class="row form-row submit_row">
                                        {!! Form::submit('Join Now', ['class' => '"submit join-button']) !!}
                                    </div>
                                {!! Form::close() !!}

                               </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
@endsection
