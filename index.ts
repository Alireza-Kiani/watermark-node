import Jimp from 'jimp';

type Path = {
    source: string;
    target: string;
    resultPath: string
}

(async ({ source, target, resultPath }: Path): Promise<void> => {
    const image_binary: Jimp = await Jimp.read(target),
        logo: Jimp = await Jimp.read(source);
    logo.resize(image_binary.bitmap.width / 10, Jimp.AUTO);

    const xMargin = (image_binary.bitmap.width * 85) / 100,
        yMargin = (image_binary.bitmap.width * 5) / 100,
        X = image_binary.bitmap.width - logo.bitmap.width - xMargin,
        Y = image_binary.bitmap.height - logo.bitmap.height - yMargin,
        compositeOptions = {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.25,
            opacityDest: 1
        };        
    const result: Jimp = image_binary.composite(logo, X, Y, compositeOptions);
    result.write(resultPath);
})({
    source: './assets/watermark.png',
    target: './assets/sample.jpg',
    resultPath: './assets/watermarked.jpg'
});