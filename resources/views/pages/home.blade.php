@extends('layouts.app')
@section('title') Home :: @parent @endsection
@section('content')
    @include('partials.secondary-banner')
    @include('partials.filter')
    @if(count($articles)>0)
        <div class="events-grid">
            <div class="events-row">
                @foreach ($articles as $post)
                    <div class="event col-md-4">
                        <a href="{{url('article/'.$post->slug.'')}}" class="event-link">
                            <div class="event-top">
                                <div class="openings-day-wrapper">
                                    {{--<div class="openings-wrapper">--}}
                                        {{--<div class="openings"><p><span class="badge">{{$post->openings}}</span></p></div><p class="openings-info">Opening(s)</p>--}}
                                    {{--</div>--}}
                                    <div class="day-wrapper"><span class="day">{{ date('D', strtotime($post->date)) }}</span>, <span class="date"> {{ date('M-Y', strtotime($post->date)) }} </span></div>
                                </div>
                                <span class="title">{{$post->title}}</span>
                                <span>{{$post->introduction}}</span>
                            </div>
                            <div class="event-bottom">
                                <span class="organization">{{$post->location_name}}</span><br>
                                <span class="city"><i class="icon-location-pin"></i>Grand Rapids, MI</span>
                                <div class="time-wrapper"><div class="time">{{$post->start_time}} - {{$post->end_time}}</div></div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    @endif
@endsection

