<div id="header-wrapper" class="container-fluid">
    <div id="user-banner" class="row">
        <div id="main" class="col-xs-6 pull-left">
            <a href="/"><img class="header-branding outreachlogo img-responsive" src="http://64.150.180.44/~revoluti/web/wp-content/uploads/2016/07/The-Revolution-Logo-No-GR-White-1.png"></a>
        </div>
        <div class="col-xs-6 pull-right login-actions">
            {{--<span class="header-icon"><a class="btn admin" href="/login"><i class="simple-icon icon-login"></i>LOG IN</a></span>--}}
            {{--<span class="header-icon"><a class="btn admin" href="/register"><i class="simple-icon icon-user"></i>SIGN UP</a></span>--}}
            <ul class="nav navbar-nav navbar-right">
                @if (Auth::guest())
                    <li class="header-icon btn admin {{ (Request::is('auth/login') ? 'active' : '') }}"><a href="{{ url('auth/login') }}">
                            <i class="fa fa-sign-in fa-2x"></i> Log In</a></li>
                    <li class="header-icon btn admin {{ (Request::is('auth/register') ? 'active' : '') }}"><a href="{{ url('auth/register') }}">
                            <i class="header-icon fa fa-user-o fa-2x"></i>Sign Up</a></li>
                @else
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
