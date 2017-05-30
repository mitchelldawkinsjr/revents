<div id="menu" class="col-xs-12 col-md-12 ">
    <a class="text-link filter-events pull-right" role="button" data-toggle="collapse" href="#filterEvents" aria-expanded="false" aria-controls="collapseExample">FILTER EVENTS<i class="fa fa-arrow-circle-o-down"></i></a>
    <div class="filter-events collapse" id="filterEvents" aria-expanded="false">
        <div class="well filter-well">
            <form action="{{url('home/filter')}}" method="get" name="filterForm" id="filterForm">
                <div class="form-full">
                    <div class="form-row center">
                        <div class="date-range" id="datetimepicker1">
                            <span class="filter-date"><i class="fa fa-calendar"></i><p>DATE RANGE</p></span>
                            <ul>
                                <li>
                                    <input class="" type="text" name="date_start" placeholder="From" id="date_start" size="7" value="" tabindex="16">
                                    <input class="" type="text" name="date_end" placeholder="To" id="date_end" size="7" value="" tabindex="17">
                                </li>
                            </ul>
                        </div>
                        <div >
                            <div class="category-select">
                                <span class="filter-category"><i class="fa fa-tag"></i><p>CATEGORY</p></span>
                                <div class="filter-select categories">
                                    @foreach ($articleCategories as $category)
                                        <input type="checkbox" name="category[{{$category->id}}]" id="{{strtolower($category->title)}}" value="{{$category->id}}" tabindex="18">
                                        <label for="{{strtolower($category->title)}}"><span></span>{{$category->title}}</label>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="filter-inputs">
                    <input style="margin-bottom:20px;" class="submit filter-submit" type="submit" value="GO" tabindex="29">
                    {{--<a href="/?page=1&amp;tags%5B0%5D=family-friendly" class="text-link family-friendly">Family Friendly Events<i class="icon-arrow-right-circle"></i></a>--}}
                </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div style="height:20px;"></div>


