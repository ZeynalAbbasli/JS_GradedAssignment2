function throttle(callback, time) {
    let waiting = false;
    return () => {
        if(waiting) return;
        callback();
        waiting = true;
        setTimeout(() => {waiting = false}, time)
    }
};


let i = 0;
function increment() {
    i++;
};

const throttledIncrement = throttle(increment, 100);

setTimeout(() => {throttledIncrement(); console.log(i);}, 0);

setTimeout(() => {throttledIncrement(); console.log(i);}, 50);

setTimeout(() => {throttledIncrement(); console.log(i);}, 130);