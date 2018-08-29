function bind(callBack,context) {
	/* body... */
	var outArg= Array.prototype.slice.call(arguments, 2);
	return function () {
		var innerArg= Array.prototype.slice.call(arguments, 0);
		callBack.apply(context,outArg.concat(innerArg))
	}
}
function fn (a1,a2) {
	console.log(this,a1,a2)
}
var obj = {name:"Li"}
setTimeout(bind(fn,obj,100,200),1000)