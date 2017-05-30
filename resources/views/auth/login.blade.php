@extends('layouts.app-no-nav')

{{-- Web site Title --}}
@section('title') {!!  trans('site/user.login') !!} :: @parent @endsection

{{-- Content --}}
@section('content')
    <div class="container-fluid login-page center-block">
        <div class="row">
            <div class="small-12 columns text-center">
                <img class="img-responsive center-block login-branding" src="">
            </div>
        </div>
        <div class="row">
            <div class="small-12 columns">
            </div>
        </div>
        <div class="row content-row">
            <a class="text-link pull-left home-link" href="/"><i class="fa fa-arrow-circle-o-left"></i> HOME</a>
            <div class="col-md-12 login-form center-block">

                <div class="col-md-10 col-md-offset-1">
                    <img  class="img-fluid" style=" width: 100%;  margin:20px 0 20px 0 ;" src="{{URL::to('/')}}/images/operation_love.png" >
                </div>

                <div class="row">
                    {!! Form::open(array('url' => url('auth/login'), 'method' => 'post', 'files'=> true)) !!}
                    <div class="login-form-top">
                        <div style="margin-bottom:10px"  class="form-group form-email {{ $errors->has('email') ? 'has-error' : '' }}">
                            {!! Form::label('email', "E-Mail Address", array('class' => 'control-label')) !!}
                            <div class="controls">
                                {!! Form::text('email', null, array('class' => 'form-control')) !!}
                                <span class="help-block">{{ $errors->first('email', ':message') }}</span>
                            </div>
                        </div>
                        <div style="margin-bottom:10px"  class="form-group form-password {{ $errors->has('password') ? 'has-error' : '' }}">
                            {!! Form::label('password', "Password", array('class' => 'control-label')) !!}
                            <div class="controls">
                                {!! Form::password('password', array('class' => 'form-control')) !!}
                                <span class="help-block">{{ $errors->first('password', ':message') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-submit">	<input name="submit" type="submit" value="Login" class="button expand">
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
        <div class="col-md-12 login-buttons">
            <div style="margin-top:10px; margin-bottom:10px" class="col-xs-12 col-md-3 login-buttons">
                <a class="text-link register-button pull-left" href="{{url('/auth/register/')}}">Sign Up</a>
            </div>

            {{--<div class="col-xs-12 col-md-4 login-buttons ">--}}
                {{--<a class="text-link btn-facebook pull-left" href="{{ url('/redirect/') }}"><i class="fa fa-facebook"></i>Login With Facebook</a>--}}
            {{--</div>--}}

            <div class="col-xs-12 col-md-5 login-button">
                <a class="btn btn-block btn-social btn-facebook" href="{{ url('/redirect/') }}">
                    <i class="fa fa-facebook"></i> Login up with Facebook
                </a>
            </div>


            <div style="margin-top:10px" class="col-xs-12 col-md-4 login-buttons">
                <a class="text-link reset-button pull-right" href="{{ url('/password/email') }}">Forgot Password?</a>
            </div>
        </div>
@endsection
