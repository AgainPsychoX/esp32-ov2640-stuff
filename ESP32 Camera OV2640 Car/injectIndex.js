const fs = require('fs');
const zlib = require('zlib');

inputData = fs.readFileSync('./index.html');
console.log(`Input data length: ${inputData.length}`);

compressedData = zlib.gzipSync(inputData);
console.log(`Compressed data length: ${compressedData.length}`);

hexString = compressedData.toString('hex');
hexDigitPairs = [];
while (hexString.length) {
    hexDigitPairs.push(hexString.substr(0, 2));
    hexString = hexString.substr(2);
}

fs.writeFileSync('./CameraWebServer/camera_index.h', (`
#define index_ov2640_html_gz_len ${hexDigitPairs.length}
const uint8_t index_ov2640_html_gz[] = {
${'0x' + hexDigitPairs.join(', 0x')}
};
`));