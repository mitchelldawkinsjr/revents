@extends('layouts.app')

@section('content')
    @include('partials.secondary-banner')
    <div class="form-background container-fluid password-reset">
        <div class="signup-row-1">
            <h3 class="center">Resetting Password</h3>
            {!! Form::open(array('url' => url('password/email'), 'method' => 'post', 'files'=> true)) !!}
            <div class="form-group  {{ $errors->has('email') ? 'has-error' : '' }}">
                {!! Form::label('email', "E-Mail Address", array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::text('email', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('email', ':message') }}</span>
                </div>
                <div class="col-md-12">
                    <input type="submit" name="submit" value="RESET PASSWORD">
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>
@endsection
