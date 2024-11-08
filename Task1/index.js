function setCancellableInterval(callback, delay = 0, ...params) {
	const intervalID = setInterval(callback, delay, ...params);
	
	return function(a = intervalID) { clearInterval(a); };
}

let i = 0;
const cancel = setCancellableInterval(() => {
	i++;}, 100);


setTimeout(() => {cancel(); console.log('The last value of i: ', i); console.log('Cancelled');}, 250);
setTimeout(()=> {console.log(i)}, 300);

// delay values were increased for stable results