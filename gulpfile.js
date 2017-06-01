var gulp = require('gulp');
var bower = require('gulp-bower');
var elixir = require('laravel-elixir');

gulp.task('bower', function() {
    return bower();
});

var vendors = '../../../bower_components';

var paths = {
    'jquery': vendors + '/jquery/dist',
    'bootstrap': vendors + '/bootstrap/dist',
    'bootswatch': vendors + '/bootswatch/simplex',
    'fontawesome': vendors + '/font-awesome',
    'colorbox': vendors + '/jquery-colorbox',
    'dataTables': vendors + '/datatables/media',
    'dataTablesBootstrap3Plugin': vendors + '/datatables-bootstrap3-plugin/media',
    'flag': vendors + '/flag-sprites/dist',
    'metisMenu': vendors + '/metisMenu/dist',
    'datatablesResponsive': vendors + '/datatables-responsive',
    'select2': vendors + '/select2/dist',
    'jqueryui':  vendors + '/jquery-ui',
    'jqueryMask':  vendors + '/jquery-mask-plugin/dist/',
    'justifiedGallery':  vendors + '/Justified-Gallery/dist/'
};

elixir.config.sourcemaps = false;

elixir(function(mix) {

    // Run bower install
    mix.task('bower');

    // Copy fonts straight to public
    mix.copy(vendors + '/bootstrap/dist/fonts/**', 'public/fonts');
    mix.copy(vendors + '/font-awesome/fonts/**', 'public/fonts');
    // mix.copy(paths.summernote + '/font/**', 'public/fonts');

    // Copy images straight to public
    mix.copy('resources/vendor/jquery-colorbox/example3/images/**', 'public/css/images');
    mix.copy('resources/vendor/jquery-ui/themes/base/images/**', 'public/css/images');


    // Copy flag resources
    mix.copy(vendors + '/flag-sprites/dist/css/flag-sprites.min.css', 'public/css/flags.css');
    mix.copy(vendors + '/flag-sprites/dist/img/flags.png', 'public/img/flags.png');

    // Merge Site CSSs.
    mix.styles([
        paths.bootstrap + '/css/bootstrap.css',
        paths.bootstrap + '/css/bootstrap-theme.css',
        paths.fontawesome + '/css/font-awesome.css',
        paths.bootswatch + '/bootstrap.css',
        paths.colorbox + '/example3/colorbox.css',
        paths.justifiedGallery + '/css/justifiedGallery.css',
        paths.dataTables + '/css/dataTables.bootstrap.css',
        paths.dataTablesBootstrap3Plugin + '/css/datatables-bootstrap3.css',
        'jquery.icalendar.css',
        'main.css',
    ], 'public/css/site.css');

    // Merge Site scripts.
    mix.scripts([
        paths.bootstrap + '/js/bootstrap.js',
        paths.colorbox + '/jquery.colorbox.js',
        paths.dataTables + '/js/jquery.dataTables.js',
        paths.dataTables + '/js/dataTables.bootstrap.js',
        paths.dataTablesBootstrap3Plugin + '/js/datatables-bootstrap3.js',
        paths.datatablesResponsive + '/js/dataTables.responsive.js',
        paths.justifiedGallery + '/js/jquery.justifiedGallery.js',
        'bootstrap-dataTables-paging.js',
        'dataTables.bootstrap.js',
        'datatables.fnReloadAjax.js',
        'jquery.icalendar.js',
        'jquery.icalendar.min.js',
        'jquery.icalendar.pack.js',
        'custom.js'
    ], 'public/js/site.js');

    // Merge Admin CSSs.
    mix.styles([
        paths.bootstrap + '/css/bootstrap.css',
        paths.bootstrap + '/css/bootstrap-theme.css',
        paths.fontawesome + '-old/css/font-awesome.css',
        paths.fontawesome + '/css/font-awesome.css',
        paths.bootswatch + '/bootstrap.css',
        paths.colorbox + '/example3/colorbox.css',
        paths.dataTables + '/css/dataTables.bootstrap.css',
        paths.dataTablesBootstrap3Plugin + '/css/datatables-bootstrap3.css',
        paths.metisMenu + '/metisMenu.css',
        paths.select2 + '/css/select2.css',
        'sb-admin-2.css',
    ], 'public/css/admin.css');

    // Merge Admin scripts.
    mix.scripts([
        paths.bootstrap + '/js/bootstrap.js',
        paths.colorbox + '/jquery.colorbox.js',
        paths.dataTables + '/js/jquery.dataTables.js',
        paths.dataTables + '/js/dataTables.bootstrap.js',
        paths.dataTablesBootstrap3Plugin + '/js/datatables-bootstrap3.js',
        paths.datatablesResponsive + '/js/dataTables.responsive.js',
        paths.metisMenu + '/metisMenu.js',
        paths.select2 + '/js/select2.js',
        paths.jqueryMask + 'jquery.mask.js',
        'bootstrap-dataTables-paging.js',
        'dataTables.bootstrap.js',
        'datatables.fnReloadAjax.js',
        'sb-admin-2.js',
    ], 'public/js/admin.js');

});
