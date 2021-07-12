export function createImageData(videoMemory, width, height) {
    const buffer = new Uint8ClampedArray(width * height * 4);
    let index = 0;
    videoMemory.forEach((elem) => {
        if (elem === 0) {
            buffer[index] = 0;
            buffer[index + 1] = 0;
            buffer[index + 2] = 0;
        } else {
            buffer[index] = 255;
            buffer[index + 1] = 255;
            buffer[index + 2] = 255;
        }
        buffer[index + 3] = 255;
        index += 4;
    });
   
    const imageData = new ImageData(buffer, width, height);
    return imageData;
}