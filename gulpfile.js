var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var merge       = require('merge-stream');
var path        = require('path');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var fs          = require('fs');
var del         = require('del');

var dev_path =
    {
        jade: 'dev/jade/',
        sass: 'dev/sass/',
        js:   'dev/js/'
    };

var build_path =
    {
        html: 'build/',
        css:  'build/css/',
        js:   'build/js/',
        img:  'build/img/'
    };

var clean_paths = [
    build_path.html + '*.html',
    build_path.css + '*.css',
    build_path.js + '*.js'
];

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('jade', function(err) {
    if (err) {
        console.log(err);
    }
    return gulp.src(dev_path.jade + '*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log)
        .pipe(gulp.dest(build_path.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function(err) {
    if(err) {
        console.log(err);
    }
    return gulp.src(dev_path.sass + '*.scss')
        .pipe(sass())
        .pipe(gulp.dest(build_path.css))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(dev_path.js+ '*.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(build_path.js));
});

// 1 js file per folder
gulp.task('js-combine', function (err) {
     var folders = getFolders(dev_path.js);

    var tasks = folders.map(function(folder) {
    // concat into foldername.js
    // write to output
    // minify
    // rename to folder.min.js
    // write to output again
    return gulp.src(path.join(dev_path.js, folder, '/**/*.js'))
        .pipe(concat(folder + '.js'))
        .pipe(gulp.dest(build_path.js))
        .pipe(uglify())
        .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(build_path.js));
    });

   // process all remaining files in scriptsPath root into main.js and main.min.js files
   var root = gulp.src(path.join(dev_path.js, '/*.js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(build_path.js))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(build_path.js));

   return merge(tasks, root);
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('bower', function() {
    fs.createReadStream('bower_components/angular/angular.js')
    .pipe(fs.createWriteStream(build_path.js+'angular.js'));
});

gulp.task('serve', ['jade', 'js', 'sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch(dev_path.js + '*.js', ['js-watch']);
    gulp.watch(dev_path.sass + '*.scss', ['sass']);
    gulp.watch(dev_path.jade + '*.jade', ['jade']);
});

gulp.task('clean', function() {
    del(clean_paths, function(err, paths) {
        console.log('Deleted files/folders:\n',paths.join('\n'));
    });
});

gulp.task('default', ['serve']);
