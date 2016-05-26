import path from 'path';
import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import through from 'through2';
import moment from 'moment';

const packageInfo = require( './package.json' );
const OUT_TIME_FMT = 'HH.mm.ss.SSS';

const cfg = {
  src: {
    root: '.',
    files: [ 'index.js', path.join( '.', 'lib', '**', '*.js' ) ]
  },
  prod: {
    root: 'dist',
    'es2015-node': `${ path.join( 'dist', 'es2015-node' ) }`
  }
}

function _formatFiles( filePaths ) {
  return '\t' + filePaths
    .join( '\n\t' );
}

gulp.task( 'prod.clean', ( ) => {

  return del( [ path.join( cfg.prod[ 'es2015-node' ], '**', '*' ), cfg.prod[ 'es2015-node' ], cfg.prod.root ] )
    .then( ( paths ) => {
      console.log( `[${ moment().format( OUT_TIME_FMT ) }] [LOG] Deleted files [${ paths.length }]: \n${ _formatFiles( paths ) }` )
    } );

} );

gulp.task( 'prod', [ 'prod.clean' ], ( ) => {

  const inFiles = cfg.src.files;
  const es2015Dest = cfg.prod[ 'es2015-node' ];
  const es2015NodeFiles = [ ];

  const es2015NodeStream = gulp.src( inFiles )
    .pipe( sourcemaps.init( ) )
    .pipe( babel( ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( gulp.dest( ( file ) => {
      return path.join( '.', es2015Dest, path.relative( process.cwd( ), file.base ) );
    } ) )
    .pipe( through.obj( function ( file, enc, callback ) {

      if ( file && file.path ) {
        es2015NodeFiles.push( file.path )
      }

      this.push( file );

      callback( );
    } ) )
    .on( 'end', ( ) => {

      console.log( `[${ moment().format( OUT_TIME_FMT ) }] [LOG] Generated ${ 'ES2015 NodeJS' } files [${ es2015NodeFiles.length }]: \n${ _formatFiles( es2015NodeFiles ) }` );

    } );

  return es2015NodeStream;

} );

gulp.task( 'default', [ 'prod' ] );
