function setCancellableTimeout(callback, delay, ...params){
	const timeoutID = setTimeout(callback, delay, params);
	
	return function cancel() {clearTimeout(timeoutID);};
}

let i = 0;
const cancel = setCancellableTimeout(() => {
  i++;
}, 100);
setTimeout(() => {cancel(); console.log('The last value of i:', i); console.log('Canceled');}, 50);
