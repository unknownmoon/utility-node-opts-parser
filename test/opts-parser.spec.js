import { expect } from 'chai';
import {
  getEnv,
  getArgv,
  getCanonicalOptName,
  hasOptsInEnv,
  hasOptsInArgv,
  hasOpts,
  getOptsFromEnv,
  getOptsFromArgv,
  getOpts
} from '../index';

describe( 'opts-parser', function ( ) {

  it( 'should be able to get the environment variables', function ( ) {

    const env = getEnv( );

    // `FORCE_COLOR` is set when start the testing, hence should be `'true'`
    expect( env )
      .to.have.property( 'FORCE_COLOR', 'true' );

  } );

  it( 'should be able to get the arguments to start the application', function ( ) {

    const args = getArgv( );

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( args )
      .to.include.members( [ '--compilers', 'js:babel-register' ] );

  } );

  it( 'should be able to check the existence of options in the environment variables', function ( ) {

    const result = hasOptsInEnv( ...[ 'a', 'FORCE_COLOR' ] );

    expect( result.get( 'a' ) )
      .to.be.false;

    // `FORCE_COLOR` is set when start the testing, hence should be `'true'`
    expect( result.get( 'FORCE_COLOR' ) )
      .to.be.true;

  } );

  it( 'should be able to get the canonical option name with `-` prefixed', function ( ) {

    expect( getCanonicalOptName( 'opt' ) )
      .to.equal( '--opt' );

    expect( getCanonicalOptName( 'o' ) )
      .to.equal( '-o' );

    expect( getCanonicalOptName( '--opt' ) )
      .to.equal( '--opt' );

    expect( getCanonicalOptName( '-o' ) )
      .to.equal( '-o' );

    expect( getCanonicalOptName( '-' ) )
      .to.equal( '--' );

  } );

  it( 'should be able to check the existence of options in the arguments', function ( ) {

    const result = hasOptsInArgv( ...[ 'a', '--compilers', 'compilers', '-R', 'R' ] );

    expect( result.get( 'a' ) )
      .to.be.false;

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( 'compilers' ) )
      .to.be.true;

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( '--compilers' ) )
      .to.be.true;

    // the `R` opts should be set, hence verify that
    expect( result.get( 'R' ) )
      .to.be.true;

    // the `R` opts should be set, hence verify that
    expect( result.get( '-R' ) )
      .to.be.true;

  } );

  it( 'should be able to check the existence of options in both the environment variables and the arguments', function ( ) {

    const result = hasOpts( ...[ 'a', 'FORCE_COLOR', '--compilers', 'compilers', '-R', 'R' ] );

    expect( result.get( 'a' ) )
      .to.be.false;

    // `FORCE_COLOR` is set when start the testing, hence should be `'true'`
    expect( result.get( 'FORCE_COLOR' ) )
      .to.be.true;

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( 'compilers' ) )
      .to.be.true;

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( '--compilers' ) )
      .to.be.true;

    // the `R` opts should be set, hence verify that
    expect( result.get( 'R' ) )
      .to.be.true;

    // the `R` opts should be set, hence verify that
    expect( result.get( '-R' ) )
      .to.be.true;

  } );

  it( 'should be able to get the value of options in the environment variables', function ( ) {

    const result = getOptsFromEnv( ...[ 'a', 'FORCE_COLOR' ] );

    expect( result.get( 'a' ) )
      .to.be.null;

    // `FORCE_COLOR` is set when start the testing, hence should be `'true'`
    expect( result.get( 'FORCE_COLOR' ) )
      .to.equal( 'true' );

  } );

  it( 'should be able to get the value of options in the arguments', function ( ) {

    const result = getOptsFromArgv( ...[ 'a', '--compilers', 'compilers', '-R', 'R', 'check-leaks' ] );

    expect( result.get( 'a' ) )
      .to.be.null;

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( 'compilers' ) )
      .to.equal( 'js:babel-register' );

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( '--compilers' ) )
      .to.equal( 'js:babel-register' );

    // the `R` opts should be set, hence verify that
    expect( result.get( 'R' ) )
      .to.not.be.null;

    // the `R` opts should be set, hence verify that
    expect( result.get( '-R' ) )
      .to.not.be.null;

    // the `check-leaks` opts should be set, but it has no value, hence should be `null`
    expect( result.get( 'check-leaks' ) )
      .to.be.null;

  } );

  it( 'should be able to get the value of options in both the environment variables and the arguments', function ( ) {

    const lastArg = process.argv[ process.argv.length - 1 ];
    const result = getOpts( ...[ 'a', 'FORCE_COLOR', '--compilers', 'compilers', '-R', 'R', 'check-leaks', lastArg ] );

    expect( result.get( 'a' ) )
      .to.be.null;

    // `FORCE_COLOR` is set when start the testing, hence should be `'true'`
    expect( result.get( 'FORCE_COLOR' ) )
      .to.equal( 'true' );

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( 'compilers' ) )
      .to.equal( 'js:babel-register' );

    // the `compilers` opts should be set to `js:babel-register`, hence verify that
    expect( result.get( '--compilers' ) )
      .to.equal( 'js:babel-register' );

    // the `R` opts should be set, hence verify that
    expect( result.get( 'R' ) )
      .to.not.be.null;

    // the `R` opts should be set, hence verify that
    expect( result.get( '-R' ) )
      .to.not.be.null;

    // the `check-leaks` opts should be set, but it has no value, hence should be `null`
    expect( result.get( 'check-leaks' ) )
      .to.be.null;

    // since the last argument has no next value, hence it should be `null`
    expect( result.get( lastArg ) )
      .to.be.null;

  } );

} );
