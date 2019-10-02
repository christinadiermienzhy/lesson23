const gulp = require ( 'gulp' ) ;
const gulpScss = require ( 'gulp-sass' ) ;
const removeFiles = require ( 'gulp-remove-files' ) ;
const connect = require ( 'gulp-connect' ) ;
const babel = require ( 'gulp-babel' ) ;


gulp.task ( 'clear', done => {
	gulp.src ('./src/dist/*')
		.pipe ( removeFiles ( ) );
	done ( ) ;
})

gulp.task ( 'styles', done => {
	gulp.src ( 'src/style/style.scss' )
		.pipe ( gulpScss ( ) )
		.pipe ( gulp.dest ( './src/dist' ) )
	done ( ) ;
});

gulp.task ( 'connect', done => {
	connect.server ( {  
		root: ['src'], 
		port: 8080,  
		keepalive: true,  
		open: { browser: 'chrome' },
		livereload:true
	} ) 
	done ( ) ;
} ) ;

gulp.task ( 'babel', done => {
	gulp.src ( './src/script/script.js' )
        .pipe(babel({
            presets: [['@babel/preset-env']]
        }))
        .pipe ( gulp.dest ( './src/dist' ) )
	done ( ) ;
} ) ;

gulp.task ( 'watch', ( ) => {
	gulp.watch ( 'src/style/style.scss', gulp.series ( 'styles' ) ) ;
	gulp.watch ( 'src/script/script.js', gulp.series ( 'babel' ) ) ;
})
gulp.task ( 'default' , gulp.series ('connect', 'clear','styles', 'babel', 'watch') ) ;