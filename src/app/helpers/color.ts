
export const generarNuevoColor = () => {
    let simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";
    for (var i = 0; i < 6; i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    return color;
}

function contrast(rgb:any) {
    let C = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

    for (var i = 0; i < C.length; ++i) {
        if (C[i] <= 0.03928) {
            C[i] = C[i] / 12.92;
        } else {
            C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
        }
    }
    let L = 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];

    if (L > 0.179) {
        return "black";
    } else {
        return "white";
    }
}

function hexaToRGB(hexa:any) {
    var aRgbHex = hexa.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}