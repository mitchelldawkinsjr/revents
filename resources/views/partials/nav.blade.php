<div id="header-wrapper" class="container-fluid">
    <div id="user-banner" class="row">
        <div id="main" class="col-xs-4 pull-left">
            <a href="/"><img class="header-branding outreachlogo img-responsive" src="http://64.150.180.44/~revoluti/web/wp-content/uploads/2016/07/The-Revolution-Logo-No-GR-White-1.png"></a>
        </div>

        <div class="col-xs-8 pull-right login-actions">
            @if (Auth::guest())
                <span style="margin-left: 5px; margin-right:5px;" class="header-icon {{ (Request::is('auth/login') ? 'active' : '') }}"><a class="btn admin" href="{{ url('auth/login') }}"><i class="btn admin header-icon fa fa-sign-in"></i>Log In</a></span>
                <span style="margin-left: 5px; margin-right:5px;" class="header-icon {{ (Request::is('auth/login') ? 'active' : '') }}"><a class="btn admin" href="{{ url('auth/register') }}"><i class="btn admin header-icon fa fa-user-o"></i>Sign Up</a></span>
                <span class="header-icon {{ (Request::is('auth/login') ? 'active' : '') }}"><a class="btn admin" href="{{ url('tracker/view') }}"><i style="left: 30%;" class="btn admin header-icon fa fa-pencil"></i>Service Tracker</a></span>
            @else
        </div>


        <div class="col-xs-6 pull-right login-actions">
            <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <i class="fa fa-user"></i> {{ Auth::user()->name }} <i class="fa fa-caret-down"></i></a>
                        <ul class="dropdown-menu" role="menu">
                            @if(Auth::check())
                                @if(Auth::user()->admin==1)
                                    <li>
                                        <a href="{{ url('admin/dashboard') }}"><i class="fa fa-tachometer"></i> Admin Dashboard</a>
                                    </li>
                                @endif
                                    <li role="presentation" class="divider"></li>
                                    <li><a href="{{ url('tracker/view') }}"><i class="fa fa-pencil"></i> Service Tracker</a></li>
                                    <li role="presentation" class="divider"></li>
                            @endif
                            <li>
                                <a href="{{ url('auth/logout') }}"><i class="fa fa-sign-out"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</div>
