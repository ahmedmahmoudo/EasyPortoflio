<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/all.css">
        <link rel="stylesheet" href="/css/app.css">
        <meta name="csrf-token" content="{{csrf_token()}}" />
    </head>
    <body>
        <div id="app"></div>
        <script src="/js/jquery-3.3.1.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/app.js"></script>
    </body>
</html>
