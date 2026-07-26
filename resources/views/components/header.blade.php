<header class="site-header">
    <div class="container flex" style="justify-content: space-between; align-items: center; width: 100%;">
        <div class="site-logo">
            <a href="{{ route('home') }}">
                <img src="/assets/images/Hello-Superstars-png-Logo-150x150.png" alt="Hello Superstar Logo">
            </a>
        </div>
        <nav class="site-nav">
            <ul class="nav-menu">
                <li><a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active-menu' : '' }}">Home</a></li>
                <li><a href="{{ route('about') }}" class="{{ request()->routeIs('about') ? 'active-menu' : '' }}">About</a></li>
                <li><a href="{{ route('team') }}" class="{{ request()->routeIs('team') ? 'active-menu' : '' }}">Our Team</a></li>
                <li><a href="{{ route('service') }}" class="{{ request()->routeIs('service') ? 'active-menu' : '' }}">Our Services</a></li>
                <li><a href="{{ route('clients') }}" class="{{ request()->routeIs('clients') ? 'active-menu' : '' }}">Our Clients</a></li>
                <li><a href="{{ route('contact') }}" class="{{ request()->routeIs('contact') ? 'active-menu' : '' }}">Contact Us</a></li>
            </ul>
        </nav>
    </div>
</header>
