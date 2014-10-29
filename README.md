Moving Minimum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes a moving minimum over a numeric array.


## Installation

``` bash
$ npm install compute-mmin
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var mmin = require( 'compute-mmin' );
```

#### mmin( arr, window )

Slides a `window` over a numeric `array` to compute a moving minimum.

``` javascript
var data = [ 1, 3, 2, 5, 4 ];

mmin( data, 2 );
// returns [ 1, 2, 2, 4 ]
```

Note: the returned `array` has length `L - W + 1`, where `L` is the length of the input `array` and `W` is the `window` size. 


## Examples

``` javascript
var mmin = require( 'compute-mmin' );

// Simulate some data...
var data = new Array( 50 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

// Compute the moving minimum:
var arr = mmin( data, 7 );

console.log( arr.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


[npm-image]: http://img.shields.io/npm/v/compute-mmin.svg
[npm-url]: https://npmjs.org/package/compute-mmin

[travis-image]: http://img.shields.io/travis/compute-io/mmin/master.svg
[travis-url]: https://travis-ci.org/compute-io/mmin

[coveralls-image]: https://img.shields.io/coveralls/compute-io/mmin/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/mmin?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/mmin.svg
[dependencies-url]: https://david-dm.org/compute-io/mmin

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/mmin.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/mmin

[github-issues-image]: http://img.shields.io/github/issues/compute-io/mmin.svg
[github-issues-url]: https://github.com/compute-io/mmin/issues