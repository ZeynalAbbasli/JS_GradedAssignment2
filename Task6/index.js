

function promisify(func) {
    return (...args) => {return new Promise((resolve, reject) => {
        func(...args, (err, result) => {
            if(err) {reject(err);}
            else {resolve(result);};
        })
    })}
}


  
function foo(url, options, callback) {
    fetch(url, options)
      .then((data) => callback(null, data))
      .catch((err) => callback(err));
  }


  // Convert `foo` to use promises
const promisifiedFoo = promisify(foo);
  
  // Using async/await with the promisified function
async function fetchData() {
    try {
        const data = await promisifiedFoo('https://www.youtube.com/', { method: 'GET' });
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
  
fetchData();
  