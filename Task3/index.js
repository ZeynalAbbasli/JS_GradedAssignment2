let sleep = (time) => {
	return new Promise( (resolve, reject) => {
		setTimeout( resolve, time);
	});
};

async function greeting() {
	console.log('hello');
	await sleep(2000);
	console.log('bye');
    await sleep(2000);
    console.log("Hello again");
};

greeting();