@extends('admin.layouts.modal')
{{-- Content --}}
@section('content')
        <!-- Tabs -->
<ul class="nav nav-tabs">
    <li class="active"><a href="#tab-general" data-toggle="tab"> {{
			trans("admin/modal.general") }}</a></li>
</ul>
<!-- ./ tabs -->
@if (isset($article))
{!! Form::model($article, array('url' => url('admin/article') . '/' . $article->id, 'method' => 'put','id'=>'fupload', 'class' => 'bf', 'files'=> true)) !!}
@else
{!! Form::open(array('url' => url('admin/article'), 'method' => 'post', 'class' => 'bf','id'=>'fupload', 'files'=> true)) !!}
@endif
        <!-- Tabs Content -->
<div class="tab-content">
    <!-- General tab -->
    <div class="tab-pane active" id="tab-general">
        <div class="form-group">
            <div class="controls">
                {!! Form::hidden('language_id', 1)!!}
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6  {{ $errors->has('article_category_id') ? 'has-error' : '' }}">
                {!! Form::label('article_category_id', trans("admin/article.category"), array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::select('article_category_id', $articlecategories, @isset($article)? $article->article_category_id : '1', array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('article_category_id', ':message') }}</span>
                </div>
            </div>
            <div class="form-group col-md-6 {{ $errors->has('title') ? 'has-error' : '' }}">
                {!! Form::label('title', trans("admin/modal.title"), array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::text('title', null, array('class' => 'form-control','maxlength' => 35)) !!}
                    <span class="help-block">{{ $errors->first('title', ':message') }}</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-4  {{ $errors->has('date') ? 'has-error' : '' }}">
                {!! Form::label('date', trans("Date"), array('class' => 'control-label')) !!}
                <small> :: YYYY/MM/DD</small>
                <div class="controls">
                    {!! Form::text('date', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('date', ':message') }}</span>
                </div>
            </div>
            <div class="form-group col-md-4 {{ $errors->has('title') ? 'has-error' : '' }}">
                {!! Form::label('start_time', trans("Start time"), array('class' => 'control-label')) !!}
                <small> :: 00:00am/pm</small>
                <div class="controls">
                    {!! Form::text('start_time', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('start_time', ':message') }}</span>
                </div>
            </div>
            <div class="form-group col-md-4 {{ $errors->has('title') ? 'has-error' : '' }}">
                {!! Form::label('end_time', trans("End Time"), array('class' => 'control-label')) !!}
                <small> :: 00:00am/pm</small>
                <div class="controls">
                    {!! Form::text('end_time', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('end_time', ':message') }}</span>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-4  {{ $errors->has('article_category_id') ? 'has-error' : '' }}">
                {!! Form::label('location_name', trans("Location Name"), array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::text('location_name', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('location_name', ':message') }}</span>
                </div>
            </div>
            <div class="form-group col-md-4 {{ $errors->has('title') ? 'has-error' : '' }}">
                {!! Form::label('address', trans("Address"), array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::text('address', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('address', ':message') }}</span>
                </div>
            </div>
            <div class="form-group col-md-4 {{ $errors->has('title') ? 'has-error' : '' }}">
                {!! Form::label('openings', trans("# of Openings"), array('class' => 'control-label')) !!}
                <div class="controls">
                    {!! Form::text('openings', null, array('class' => 'form-control')) !!}
                    <span class="help-block">{{ $errors->first('openings', ':message') }}</span>
                </div>
            </div>
        </div>
        <div class="form-group  {{ $errors->has('source') ? 'has-error' : '' }}">
            {!! Form::label('contact_email', trans("Contact Email"), array('class' => 'control-label')) !!}
            <div class="controls">
                {!! Form::text('contact_email', null, array('class' => 'form-control')) !!}
                <span class="help-block">{{ $errors->first('contact_email', ':message') }}</span>
            </div>
        </div>

        <div class="form-group  {{ $errors->has('introduction') ? 'has-error' : '' }}">
            {!! Form::label('introduction', trans("admin/article.introduction"), array('class' => 'control-label')) !!}
            <div class="controls">
                {!! Form::textarea('introduction', null, array('class' => 'form-control','maxlength' => 113)) !!}
                <span class="help-block">{{ $errors->first('introduction', ':message') }}</span>
            </div>
        </div>
        <div class="form-group  {{ $errors->has('content') ? 'has-error' : '' }}">
            {!! Form::label('content', trans("admin/article.content"), array('class' => 'control-label')) !!}
            <div class="controls">
                {!! Form::textarea('content', null, array('class' => 'form-control')) !!}
                <span class="help-block">{{ $errors->first('content', ':message') }}</span>
            </div>
        </div>
        <div class="form-group {!! $errors->has('picture') ? 'error' : '' !!} ">
            <div class="col-lg-12">
                {!! Form::label('picture', trans("admin/article.picture"), array('class' => 'control-label')) !!}
                <input name="picture"
                       type="file" class="uploader" id="picture" value="Upload"/>
            </div>

        </div>
        <!-- ./ general tab -->
    </div>
    <!-- ./ tabs content -->
</div>

<!-- Form Actions -->

<div class="form-group">
    <div class="col-md-12">
        <button type="reset" class="btn btn-sm btn-warning close_popup">
            <span class="glyphicon glyphicon-ban-circle"></span> {{
						trans("admin/modal.cancel") }}
        </button>
        <button type="reset" class="btn btn-sm btn-default">
            <span class="glyphicon glyphicon-remove-circle"></span> {{
						trans("admin/modal.reset") }}
        </button>
        <button type="submit" class="btn btn-sm btn-success">
            <span class="glyphicon glyphicon-ok-circle"></span>
            @if	(isset($news))
                {{ trans("admin/modal.edit") }}
            @else
                {{trans("admin/modal.create") }}
            @endif
        </button>
    </div>
</div>
<!-- ./ form actions -->

        {!! Form::close() !!}
@endsection
