<nav class="navbar navbar-inverse navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/admin/dashboard">Service Tracker</a>
    </div>
    <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <li>
                    <a href="{{ url('') }}"><i class="fa fa-backward"></i>Back to Events</a>
                </li>
                <li>
                    <a href="{{url('tracker/dashboard')}}"> <i class="fa fa-dashboard fa-fw"></i> Add An Entry </a>
                </li>
                <li>
                    <a href="{{url('tracker/history')}}"> <i class="fa fa-check fa-fw"></i> Service Portfolio </a>
                </li>
                <li>
                    <a href="{{ url('auth/logout') }}"><i class="fa fa-sign-out"></i> Logout </a>
                </li>
            </ul>
        </div>
    </div>
</nav>