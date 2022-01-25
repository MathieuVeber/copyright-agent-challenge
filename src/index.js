const { getColor } = require('./apiMock');

const SUPPORTED_FORMAT = ['HEX', 'RGB'];
const ASYNC_CHOICE = ['async', 'sync'];

async function getColorsAsync(colorsList) {
	const colors = colorsList.map(color => getColor(color));
	return await Promise.all(colors);
}

async function getColorsSync(colorsList, format) {
	for (const color of colorsList) {
			const APIColor = await getColor(color);
			console.log(APIColor[format]);
	}
}

async function colors() {
	if (process.argv[3] && !SUPPORTED_FORMAT.find(format => format === process.argv[3])) {
		console.error(`UNSUPPORTED_FORMAT; Usage: ${SUPPORTED_FORMAT.join(', ')}`);
		process.exit(1);
	}
	if (process.argv[4] && !ASYNC_CHOICE.find(asyncChoice => asyncChoice === process.argv[4])) {
		console.error(`UNSUPPORTED_FORMAT; Usage: ${SUPPORTED_FORMAT.join(', ')}`);
		process.exit(1);
	}

	const colorsList = JSON.parse(process.argv[2]);
	const format = process.argv[3] ?? 'HEX';
	const asyncChoice = process.argv[4] ?? 'async';

	if (asyncChoice === 'async') {
		await getColorsAsync(colorsList, format)
			.then(colors => colors.map(color => color[format]))
			.then(colors => console.log(colors));
	}
	else {
		getColorsSync(colorsList, format);
	}
}

colors();

/*
Usage:
	node src/index.js <Array of colors> <Format> <Async choice>
	Format: HEX | RGB (Default: HEX)
	Async choice: async | sync (Default: async)

Example:
	node src/index.js '["green","blue", "black", "red"]'
	node src/index.js '["white","red", "black"]' RGB sync
*/
