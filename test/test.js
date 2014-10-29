
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
	'use strict';

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

		expect( foo ).to.throw( TypeError );

		function foo() {
			mmin( data, data.length+1 );
		}

	});

	it( 'should find the minimum value in the window', function test() {
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

});