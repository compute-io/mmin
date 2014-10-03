var mmin = require( './../lib' );

var data = new Array( 50 );
for ( var i = 0; i < data.length; i++ ) {
	data[i] = Math.random() * 100;
}

// Give function array of data and desired window size
var outArr = mmin( data, 5 );

for ( i = 0; i < outArr.length; i++) {
	console.log( outArr[i] );
}
