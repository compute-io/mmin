'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isFunction = require( 'validate.io-function' );


// MOVING MIN //

/**
* FUNCTION: mmin( arr , window[, options] )
*	Computes a moving minimum over a numeric array.
*
* @param {Array} arr - array of data values
* @param {Number} window - size of moving window
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array of window minima
* @returns {Array} array of minimum values
*/
function mmin( arr , W, options ) {

	var copy = true,
		clbk;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'mmin()::invalid input argument. Must provide an array.' );
	}
	if ( !isPositiveInteger( W ) ) {
        throw new TypeError( 'mmin()::invalid input argument. Window must be a positive integer. Value: `' + W + '`.' );
    }
	if ( arguments.length > 2 ) {
			if ( !isObject( options ) ) {
				throw new TypeError( 'mmin()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
			}
			if ( options.hasOwnProperty( 'accessor' ) ) {
				clbk = options.accessor;
				if ( !isFunction( clbk ) ) {
					throw new TypeError( 'mmin()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
				}
			}
			if ( options.hasOwnProperty( 'copy' ) ) {
				copy = options.copy;
				if ( !isBoolean( copy ) ) {
					throw new TypeError( 'mmin()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
				}
			}
		}
		if ( W > arr.length ) {
			throw new Error( 'mmin()::invalid input argument. Window cannot exceed the array length.' );
		}
	var len = arr.length,
		out,
		min,
		val,
		i, j, k, n;


	if ( copy ) {
		out = new Array( len - W + 1 );
	} else {
		out = arr;
	}

	if ( clbk ) {
		min = clbk( arr[ 0 ], 0 );
		// Compute the minimum for the first window...
		for ( i = 1; i < W; i++ ) {
			val = clbk( arr[ i ], i );
			if ( val < min ) {
				min = val;
			}
		}
		out[ 0 ] = min;

		// Compute the remaining window minimums..
		for ( j = W; j < len; j++ ) {
			val = clbk( arr[ j ], j );
			k = j - W;

			// Cases:
			// [1] Incoming value is less than current minimum. New minimum value.
			// [2] Outgoing value is the current minimum and the new value is greater than the minimum. Find a new minimum among the current values.
			// [3] Minimum does not change. Move along.

			if ( val < min ) {
				min = val;
			}
			else if ( clbk( arr[ k ], k ) === min && val > min ) {
				min = clbk( arr[ k+1 ], k+1 );
				for ( n = k+2; n <= j; n++ ) {
					val = clbk( arr[ n ], n );
					if ( val < min ) {
						min = val;
					}
				}
			}
			out[ k+1 ] = min;
		}
		// Trim the output array
		out.length = len - W + 1;
		return out;
	} else {
		min = arr[ 0 ];
		// Compute the minimum for the first window...
		for ( i = 1; i < W; i++ ) {
			val = arr[ i ];
			if ( val < min ) {
				min = val;
			}
		}
		out[ 0 ] = min;

		// Compute the remaining window minimums..
		for ( j = W; j < len; j++ ) {
			val = arr[ j ];
			k = j - W;

			// Cases:
			// [1] Incoming value is less than current minimum. New minimum value.
			// [2] Outgoing value is the current minimum and the new value is greater than the minimum. Find a new minimum among the current values.
			// [3] Minimum does not change. Move along.

			if ( val < min ) {
				min = val;
			}
			else if ( arr[ k ] === min && val > min ) {
				min = arr[ k+1 ];
				for ( n = k+2; n <= j; n++ ) {
					val = arr[ n ];
					if ( val < min ) {
						min = val;
					}
				}
			}
			out[ k+1 ] = min;
		}

		// Trim the output array
		out.length = len - W + 1;
		return out;
	}
} // end FUNCTION mmin()


// EXPORTS //

module.exports = mmin;
