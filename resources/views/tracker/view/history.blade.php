@extends('tracker.layouts.default')
@section('title') Service Tracker :: @parent @endsection
@section('content')
    <div class="container-fluid secondary-header">
        <div class="col-md-10 col-md-offset-1">
            <img  class="img-fluid" style=" width: 100%;  margin:20px 0 20px 0 ;" src="{{URL::to('/')}}/images/operation_love.png" >
        </div>
    </div>

    <div class="page-header">
        <h3>
            Service Portfolio
            <div class="pull-right">
                <div class="pull-right">
                    <button id="csv" class="btn btn-sm btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> {{trans("Export to csv") }}</button>
                </div>
            </div>
        </h3>
    </div>

    <table id="table" class="table table-striped table-hover">
        <thead>
        <tr>
            <th value="Name">{{ trans("Organization Name") }}</th>
            <th value="Date">{{ trans("Date") }}</th>
            <th value="Hour">{{ trans("Hours") }}</th>
            <th value="Description">{{ trans("Description") }}</th>
            <th value="Created">{{ trans("Created") }}</th>
        </tr>
        </thead>
        <tbody></tbody>
    </table>

    <script>
        $('#csv').on('click',function(){
            $.get("/tracker/service/data", function( data ) {
                JSONToCSVConvertor(data,'Service_Summary',true);
            });
        });
        function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var CSV = '';

            //Set Report title in first row or line
            CSV += ReportTitle + '\r\n\n';
            var row ='';
            //This condition will generate the Label/Header
            if (ShowLabel) {
                var title = null;
                for (var index in arrData.data) {
                    switch (index) {
                        case '0' :
                            title = 'Organization Name';
                            break;
                        case '1' :
                            title = 'Date';
                            break;
                        case '2' :
                            title = 'Hours';
                            break;
                        case '3' :
                            title = 'Description';
                            break;
                        case '4' :
                            title = 'Created';
                            break;
                        default:
                            title = '';
                    }
                    //Now convert each value to string and comma-seprated
                    row += title + ',';
                }

                row = row.slice(0, -1);
                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.data.length; i++) {
                var row = "";
                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData.data[i]) {
                    row += '"' + arrData.data[i][index] + '",';
                }
                row.slice(0, row.length - 1);
                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    // </script>

@endsection
