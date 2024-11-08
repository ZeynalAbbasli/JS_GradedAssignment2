function debounce(cb, time) {
    let tm;
    return () => {
        clearTimeout(tm);
        tm = setTimeout( ()=>{cb()}, time);
    }
}

let i = 0;
function increment() {
	i++;
};

const debouncedIncrement = debounce(increment, 100);

setTimeout(() => {debouncedIncrement(); console.log(i)}, 0)
setTimeout(() => {debouncedIncrement(); console.log(i)}, 50);
setTimeout(() => {console.log(i)}, 100);
setTimeout(() => {console.log(i)}, 200);