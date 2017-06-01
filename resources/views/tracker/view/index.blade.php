@extends('layouts.app')
@section('title') Service Tracker :: @parent @endsection
@section('content')
    <div class="container-fluid secondary-header">
        <div class="col-md-10 col-md-offset-1">
            <img  class="img-fluid" style=" width: 100%;  margin:20px 0 20px 0 ;" src="{{URL::to('/')}}/images/operation_love.png" >
        </div>
    </div>

    <div class="container-fluid single-event-page" id="main">
        <div class="row event-action-bar">
            <div class="col-xs-6 pull-left">
                <a href="/" class="text-link return-link"><i class="fa fa-arrow-circle-o-left fa-2x"></i>ALL EVENTS</a>
            </div>
            <div class="col-xs-6 pull-right social">
                {{--<a class="twitter" href="https://twitter.com/therevolutioncm" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>--}}
                {{--<a class="facebook" href="https://www.facebook.com/operationlovegr/" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>--}}
                <a style="margin:20px 0 20px 0;" href="{{url('tracker/history')}}"class="text-link filter-events">View My Service Portfolio<i class="fa fa-arrow-circle-o-right"></i></a>
            </div>

        </div>
        <div class="row single-event-wrapper">
            <div class="col-xs-12 event-main">
                <div class="event-top">
                    <h1 style="margin-bottom:10px;" class="event-title">{{$title}}</h1>
                    <div class="event-description-wrapper">
                        <p class="description">
                        <div style="padding-top:5px;" class="event-column col-xs-12 col-md-12 center col-xs-12 col-md-12 center img-fluid">
                            <div class="center col-xs-12 col-md-10 col-md-offset-1">
                                <i class="fa fa-info fa-lg" style="margin-right:10px;"></i>
                                <span style="font-size:20px; font-weight: 400;">Service Type Disclaimer</span>
                                <br>
                                <span style="font-size:20px;">The service hours I am reporting were spent directly serving individuals or volunteering with a nonprofit, community organization or neighborhood clean-up.</span>
                            </div>
                        </div>
                        </p>
                    </div>
                </div>
                {!! Form::open(array('url' => url('tracker/service'), 'method' => 'POST', 'files'=> true )) !!}

                <div style="max-width:none;" class="login-page event-bottom" >
                    <div class="event-bottom-content center-block">
                        <div style="color:#fff;"class="row form-row">
                            <div class="form-group col-md-12 {{ $errors->has('title') ? 'has-error' : '' }}">
                                {!! Form::label('name', trans("Organization Name"), array('class' => 'control-label')) !!}
                                <div class="controls">
                                    {!! Form::text('name', null, array('class' => 'form-control','maxlength' => 35)) !!}
                                    <span class="help-block">{{ $errors->first('name', ':message') }}</span>
                                </div>
                            </div>
                            <div class="form-group col-md-12  {{ $errors->has('title') ? 'has-error' : '' }}">
                                {!! Form::label('date', trans("Date of Service"), array('class' => 'control-label')) !!}

                                <div class="controls">
                                    {!! Form::text('date', null, array('class' => 'form-control','maxlength' => 10)) !!}
                                    <span class="help-block">{{ $errors->first('date', ':message') }}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-12  {{ $errors->has('title') ? 'has-error' : '' }}">
                                {!! Form::label('time', trans("Time Volunteered (hours)"), array('class' => 'control-label')) !!}
                                <div class="controls">
                                    {!! Form::text('time', null, array('class' => 'form-control','maxlength' => 3)) !!}
                                    <span class="help-block">{{ $errors->first('time', ':message') }}</span>
                                </div>
                            </div>

                            <div class="form-group col-md-12 {{ $errors->has('title') ? 'has-error' : '' }}">
                                {!! Form::label('description', trans("Description Of Service"), array('class' => 'control-label')) !!}
                                <div class="controls">
                                    {!! Form::textarea('description', null, array('class' => 'form-control','maxlength' => 200)) !!}
                                    <span class="help-block">{{ $errors->first('description', ':message') }}</span>
                                </div>
                            </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12">
                            <button type="reset" class="btn btn-sm btn-default">
                                <span class="glyphicon glyphicon-remove-circle"></span> {{trans("Clear") }}
                            </button>
                            <button type="submit" class="btn btn-sm btn-success">
                                <span class="glyphicon glyphicon-ok-circle"></span> {{trans("Add") }}
                            </button>
                        </div>
                    </div>
                </div>
                {!! Form::close() !!}
            </div>
        </div>
        </div>
    </div>

@endsection
