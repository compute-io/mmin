
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

	it( 'should throw an error if not provided a positive, numeric, integer window size', function test() {
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

		var testdata = [3,5,6,8,7,5,4,3,2,5,6,7,8,5,4]

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mmin( testdata , value );
			};
		}

	});

	it( 'should throw an error if the window size is smaller than the array size', function test() {

		var testdata = [3,5,6,8,7,5,4,3,2,5,6,7,8,5,4];

		expect( testValue( 20 ) ).to.throw( TypeError );

		function testValue( value ) {
			return function() {
				mmin( testdata , value);
			}
		}

	});

	it( 'should find the minimum value in the window', function test() {
		var data, expected;

		// Simulate some data
		data = [2,8,2,13,41,7,9,7,12,24,7,10,4,4,3];

		// Expected values of min in the moving window
		expected = [2,2,2,7,7,7,7,7,4,4,3];

		var testOut = mmin ( data , 5 );

		for ( var i = 0; i < expected.length; i++ ) {
			assert.strictEqual( testOut[i], expected[i] );
		}
	});

});