var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var through2    = require('through2');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');

function buildSprite(props) {
    return gulp
        .src(props.path + '/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore({ inlineSvg: false }))
        .pipe(through2.obj(function(file, encoding, cb) {
            var $ = file.cheerio;
            var data = $('svg > symbol').map(function() {
                var $this  = $(this);
                var size   = $this.attr('viewBox').split(' ').splice(2);
                var name   = $this.attr('id');
                var ratio  = size[0] / size[1]; // symbol width / symbol height
                var fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
                var stroke = $this.find('[stroke]').attr('stroke');
                return {
                    name: name,
                    ratio: +ratio.toFixed(2),
                    fill: fill || 'initial',
                    stroke: stroke || 'initial'
                };
            }).get();
            this.push(file);
            gulp.src(__dirname + '/_sprite-svg.scss')
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(rename({ basename: '_'+props.name+'-svg' }))
                .pipe(gulp.dest(config.src.sassGen));
            gulp.src(__dirname + '/sprite.html')
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(gulp.dest(config.src.root));
            cb();
        }))
        .pipe(cheerio({
            run: function($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: props.name }))
        .pipe(gulp.dest(config.dest.img));
}

gulp.task('sprite:svg', function() {
    return buildSprite({
        path: config.src.iconsSvg,
        name: 'sprite'
    });
});

gulp.task('sprite:header:svg', function() {
    return buildSprite({
        path: config.src.root + '/spriteHeader',
        name: 'spriteHeader'
    });
});

gulp.task('sprite:nav:svg', function() {
    return buildSprite({
        path: config.src.root + '/spriteNav',
        name: 'spriteNav'
    });
});

gulp.task('sprite:vendors:svg', function() {
    return buildSprite({
        path: config.src.root + '/spriteVendors',
        name: 'spriteVendors'
    });
});

gulp.task('sprite:svg:watch', function() {
    gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
    gulp.watch(config.src.root + '/spriteHeader/*.svg', ['sprite:header:svg']);
    gulp.watch(config.src.root + '/spriteNav/*.svg', ['sprite:nav:svg']);
    gulp.watch(config.src.root + '/spriteVendors/*.svg', ['sprite:vendors:svg']);
});
