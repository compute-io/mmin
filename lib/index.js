/**
*
*	COMPUTE: mmin
*
*
*	DESCRIPTION:
*		- Computes a moving minimum over a numeric array.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MOVING MIN //

    /**
	* FUNCTION: mmin( arr , window )
	*	Computes a moving minimum over a numeric array.
	*
	* @param {Array} arr - array of data values
	* @param {Number} window - size of moving window
	* @returns {Array} array of minimum values
	*/
	function mmin( arr , W ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mmin()::invalid input argument. Must provide an array.' );
		}
		if ( typeof W !== 'number' || W !== W ) {
            throw new TypeError( 'mmin()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( W ) !== W || W < 1 ) {
            throw new TypeError( 'mmin()::invalid input argument. Window must be a positive integer.' );
        }
		if ( W > arr.length ) {
			throw new TypeError( 'mmin()::invalid input argument. Window cannot exceed array length.' );
		}
		var len = arr.length,
			out = new Array( len - W + 1 ),
			min = arr[ 0 ],
			val,
			i, j, k, n;

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
		return out;
	} // end FUNCTION mmin()


	// EXPORTS //

	module.exports = mmin;

})();