
export const generarNuevoColor = () => {
    let simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";
    for (var i = 0; i < 6; i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const invertColor = (hex:string, bw:boolean=true) => {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    let rTxt = (255 - r).toString(16);
    let gTxt = (255 - g).toString(16);
    let bTxt = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(rTxt) + padZero(gTxt) + padZero(bTxt);
}

function padZero(str:any, len:any=2) {
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

// function contrast(rgb:any) {
//     let C = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

//     for (var i = 0; i < C.length; ++i) {
//         if (C[i] <= 0.03928) {
//             C[i] = C[i] / 12.92;
//         } else {
//             C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
//         }
//     }
//     let L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];

//     if (L > 0.179) {
//         return "black";
//     } else {
//         return "white";
//     }
// }

function hexaToRGB(hexa:any) {
    var aRgbHex = hexa.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}