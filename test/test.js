/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mmin = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mmin', function tests() {

	it( 'should export a function', function test() {
		expect( mmin ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmin( value , 3 );
			};
		}

	});

	it( 'should throw an error if provided a window size which is not a positive integer', function test() {
		var values = [
			'5',
			2.7,
			-3,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmin( [] , value );
			};
		}
	});

	it( 'should throw an error if the window size is larger than the array size', function test() {
		var data = [ 1, 2, 3 ];

		expect( foo ).to.throw( Error );

		function foo() {
			mmin( data, data.length+1 );
		}

	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmin( [1,2,3,4,5], 2, value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmin( [1,2,3,4,5], 2, {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				mmin( [1,2,3,4,5], 2, {'copy': value} );
			};
		}
	});

	it( 'should find the minimum value in each window', function test() {
		var data, actual, expected, W;

		// Set the window size:
		W = 5;

		// Simulate some data...
		data = [ 8, 2, 2, 13, 41, 7, 9, 7, 12, 24, 7, 10, 4, 4, 3 ];

		// Expected values:
		expected = [ 2, 2, 2, 7, 7, 7, 7, 7, 4, 4, 3 ];

		// Actual minimum values:
		actual = mmin( data , 5 );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});



	it( 'should find the minimum value in each window using an accessor function', function test() {
		// Case 2: accessor, copy
		var data, actual, expected, W;

		W = 5;
		data = [
			{'x':8},
			{'x':2},
			{'x':2},
			{'x':13},
			{'x':41},
			{'x':7},
			{'x':9},
			{'x':7},
			{'x':12},
			{'x':24},
			{'x':7},
			{'x':10},
			{'x':4},
			{'x':4},
			{'x':3}
		];

		function getValue( d ) {
			return d.x;
		}

		expected = [ 2, 2, 2, 7, 7, 7, 7, 7, 4, 4, 3 ];

		actual = mmin( data, W, {'accessor': getValue} );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should find minimum value in each windown and mutate the input array', function test() {
		// Case 4: numeric, mutate
		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 1 ];

		actual = mmin( data, 3, {'copy':false} );
		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

	it( 'should find the minimum value in each window using an accessor and mutate the input array', function test() {
		// Case 3: accessor, mutate
		var data, expected, actual;

		data = [
			[0,1],
			[1,1],
			[2,1]
		];
		expected = [ 1 ];

		function getValue( d ) {
			return d[ 1 ];
		}

		actual = mmin( data, 3, {
			'copy': false,
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

});
