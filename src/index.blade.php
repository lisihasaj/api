<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <link rel="apple-touch-icon" sizes="180x180" href="{{asset('images/favicon/apple-touch-icon.png')}}">
        <link rel="icon" type="image/png" href="{{asset('images/favicon/favicon-32x32.png')}}" sizes="32x32">
        <link rel="icon" type="image/png" href="{{asset('images/favicon/favicon-16x16.png')}}" sizes="16x16">
        <link rel="manifest" href="{{asset('images/favicon/site.webmanifest')}}">
        <link rel="mask-icon" href="{{asset('images/favicon/safari-pinned-tab.svg')}}" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content=""/>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <title></title>
        <script type="text/javascript">
            const user = '{!! Auth::user() !!}';
            var url = '{!! asset("") !!}';
            const window_locales = '{!! $locales !!}';
            const currentAppLocale = '{!! App::getLocale() !!}';
        </script>
        @include('app.analytics')
    </head>
    <body>
        @include('app.analytics-nonscript')
        <div id="app"></div>
    </body>
    <script src="{{ mix('js/app-vendors.js') }}"> </script>
    <script src="{{ mix('js/app.js') }}"> </script>
</html>