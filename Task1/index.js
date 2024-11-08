function setCancellableInterval(callback, delay = 0, ...params) {
	const intervalID = setInterval(callback, delay, params);
	
	
	return function(a = intervalID) { clearInterval(a); };
}

let i = 0;
const cancel = setCancellableInterval(() => {
	i++;}, 10);


setTimeout(() => {cancel(); console.log('The last value of i: ', i); console.log('Cancelled');}, 25);
