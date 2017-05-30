<div class="container-fluid secondary-header">
    <div class="row">
        <div class="col-md-4 col-md-offset-4 searchbar-wrapper">
            <div class="searchbar">
                <form action="/home/search" method="get" name="Search" id="Search">
                    <span><i class="fa fa-search"></i></span><input class="search" placeholder="Search for an Event" type="text" name="term" id="term" tabindex="1">
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-10 col-md-offset-1">
        <img  class="img-fluid" style=" width: 100%;  margin:20px 0 20px 0 ;" src="{{URL::to('/')}}/images/operation_love.png" >
    </div>
</div>