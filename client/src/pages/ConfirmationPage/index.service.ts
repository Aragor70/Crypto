import JSZip from "jszip";
import { saveAs } from "file-saver";

export const download = (input: any, type: string) => {
    
    const anchor = document.createElement('a');

    if (type === "text/plain") {

        const url = new Blob([input], {type: 'text/plain;charset=utf-8'});
        anchor.href = URL.createObjectURL(url);

        anchor.setAttribute('download', 'key.txt');

    }
    if (type === "image/png") {

        anchor.href = `data:${"image/png"};base64,${input.imageBlob}`;

        anchor.setAttribute('download', 'image.png');

    }
    if (type === "application/zip") {

        const zip = new JSZip();

        input.forEach((xor: any, index: number) => {

            zip.file(`image-${index}.png`, xor.imageBlob, { base64: true });
            const keyBlob = new Blob([xor.key], {type: 'text/plain;charset=utf-8'});
            zip.file(`key-${index}.txt`, keyBlob, { base64: true });
        });

        return zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "xor.zip");
        });

    }

    document.body.appendChild(anchor);
    anchor.click();

}


/* function composeImagesToZip(images) {
  const zip = new JSZip();

  images.forEach((image, index) => {
    zip.file(`image-${index}.jpg`, image.data, { base64: true });
  });

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "images.zip");
  });
} */