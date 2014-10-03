/**
*
*	COMPUTE: mmin
*
*
*	DESCRIPTION:
*		- Compute module.
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

    /**
    * FUNCTION: getArray(W)
    *   Returns an array pre-initialized to 0.
    * 
    * @private
    * @param {Number} x - array size
    * @returns {Array} array
    */
    function getArray(x) {
        var array = new Array(x);
        for (var i = 0; i < x; i++) {
            array[i] = 0;
        }
        return array;
    } // end FUNCTION getArray()

	/**
	* FUNCTION: mmin( arr , window )
	*	Computes the minimum value in an array of values.
	*
	* @param {Array} arr - array of data values.
	* @param {Number} window - size of moving window.
	* @returns {Array} array of minimim values.
	*/
	function mmin( arr , window ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mmin::invalid input argument. Must provide an array.' );
		}
		if ( typeof window !== 'number' || window !== window) {
            throw new TypeError( 'mmin()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( window ) !== window ) {
            throw new TypeError( 'mmin()::invalid input argument. Window must be an integer value.' );
        }
		if ( window > arr.length ) {
			throw new TypeError( 'mmin()::invalid input argument. Window must be <= array size.' );
		}
		if ( window <= 0 ) {
			throw new TypeError( 'mmin()::invalid input argument. Window size must be > 0.' );
		}

		var lenIn = arr.length,
			W = window,
			lenOut = arr.length - W + 1,
			outArr = getArray(lenOut),
			winMin = Number.POSITIVE_INFINITY;

		for ( var i = 0; i < W; i++ ) {
			if (arr[i] < winMin) {
				winMin = arr[i];
			}
		}

		outArr[0] = winMin;

		for ( var i = W; i < lenIn; i++ ) {
			
			// Case 1:
			if ( arr[i] < winMin ) {
				winMin = arr[i];
			}

			// Case 2:
			if ( arr[i-W] === winMin && arr[i] > winMin ) {
				winMin = arr[i-W+1];
				for (var j = i-W+2; j <= i; j++) {
					if (arr[j] < winMin) {
						winMin = arr[j];
					}
				}
			}

			outArr[i-W+1] = winMin;
			}		

		return outArr;
	} // end FUNCTION mmin()


	// EXPORTS //

	module.exports = mmin;

})();