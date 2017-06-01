<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@section('title') The Revolution Events @show</title>
    @section('meta_keywords')
        <meta name="keywords" content="Events, Operation Love, RevoultionCM, Revolution, Grand Rapids, Michigan"/>
    @show @section('meta_author')
        <meta name="author" content="Mitchell Dawkins"/>
    @show @section('meta_description')
        <meta name="description"
              content="Lorem ipsum dolor sit amet, nihil fabulas et sea, nam posse menandri scripserit no, mei."/>
    @show

    <link href="{{ asset('css/site.css') }}" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://code.jquery.com/ui/1.12.1/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome-ie7.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="{{ asset('js/site.js') }}"></script>

    @yield('styles')

    <link rel="shortcut icon" href="http://23.91.64.138/~jermoneglen/wp-content/uploads/2016/09/rev-R.png">
</head>
<body>
@include('partials.nav')

<div id="main" class="container-fluid">
    @yield('content')
</div>
@include('partials.footer')

<!-- Scripts -->
@yield('scripts')

<script type="text/javascript">
            @if(isset($type))
    var oTable;
    $(document).ready(function () {
        oTable = $('#table').DataTable({
            "oLanguage": {
                "sProcessing": "{{ trans('table.processing') }}",
                "sLengthMenu": "{{ trans('table.showmenu') }}",
                "sZeroRecords": "{{ trans('table.noresult') }}",
                "sInfo": "{{ trans('table.show') }}",
                "sEmptyTable": "{{ trans('table.emptytable') }}",
                "sInfoEmpty": "{{ trans('table.view') }}",
                "sInfoFiltered": "{{ trans('table.filter') }}",
                "sInfoPostFix": "",
                "sSearch": "{{ trans('table.search') }}:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "{{ trans('table.start') }}",
                    "sPrevious": "{{ trans('table.prev') }}",
                    "sNext": "{{ trans('table.next') }}",
                    "sLast": "{{ trans('table.last') }}"
                }
            },
            "processing": true,
            "serverSide": true,
            "order": [],
            "ajax": "{{ url('tracker/'.$type.'/data') }}",
            "pagingType": "full_numbers",
            "fnDrawCallback": function (oSettings) {
                $(".iframe").colorbox({
                    iframe: true,
                    width: "80%",
                    height: "80%",
                    onClosed: function () {
                        oTable.ajax.reload();
                    }
                });
            },
        });
    });
    @endif
</script>


</body>
</html>
