function createUtilFunctions() {
    window.utils = {};

    window.utils.clamp = function clamp(x, min, max) {
        return x >= min ? x <= max ? x : max : min;
    }

    window.utils.polarToVector = function polarToVector(angle, r) {
        return {
            x: r * Math.cos(angle),
            y: r * Math.sin(angle)
        }
    }

    window.utils.scaleVector = function scaleVector(vec, scale) {
        let newObj = {};
        const attributeNames = Object.keys(vec);
        attributeNames.forEach(key => {
            newObj[key] = vec[key] * scale;
        });
        return newObj;
    }

    //Both objects have to share the same key names for the interpolation to work
    //Both objects have to have their respective values as numbers
    window.utils.perAttributeTransformation = function perAttributeTransformation(obj1, obj2, tFunction) {
        let newObj = {};
        const attributeNames = Object.keys(obj1);
        attributeNames.forEach(key => {
            newObj[key] = tFunction(obj1[key], obj2[key])
        });
        return newObj;
    }

    window.utils.lerp = function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    window.utils.invLerp = function invLerp(a, b, t) {
        return (t - a) / (b - a);
    }

    window.utils.remap = function remap(iMin, iMax, oMin, oMax, t) {
        return window.utils.lerp(oMin, oMax, window.utils.invLerp(iMin, iMax, t));
    }

    window.utils.remapVec = function remapVec(iMin, iMax, oMin, oMax, t) {
        return window.utils.perAttributeTransformation(iMin, iMax, oMin, oMax, (a, b, c, d) => {
            return window.utils.remap(a, b, c, d, t);
        });
    }

    window.utils.addVectors = function addVectors(vec1, vec2) {
        return window.utils.perAttributeTransformation(vec1, vec2, (a, b) => { return a + b })
    }

    window.utils.lerpVec = function lerpVec(obj1, obj2, t) {
        return window.utils.perAttributeTransformation(obj1, obj2, (a, b) => {
            return window.utils.lerp(a, b, t);
        });
    }

    window.utils.bezierCurve = function bezierCurve(A, B, C, D, t) {
        const lerpAB = window.utils.lerpVec(A, B, t);
        const lerpBC = window.utils.lerpVec(B, C, t);
        const lerpCD = window.utils.lerpVec(C, D, t);

        const lerpABC = window.utils.lerpVec(lerpAB, lerpBC, t);
        const lerpBCD = window.utils.lerpVec(lerpBC, lerpCD, t);

        return window.utils.lerpVec(lerpABC, lerpBCD, t);
    }

    window.utils.invLerpVec = function invLerpVec(obj1, obj2, t) {
        return window.utils.perAttributeTransformation(obj1, obj2, (a, b) => {
            return window.utils.invLerp(a, b, t);
        });
    }

    //Animation functions

    //Sine
    window.utils.easeInSine = function easeInSine(x) {
        return 1 - Math.cos((x * Math.PI) / 2);
    }
    window.utils.easeOutSine = function easeOutSine(x) {
        return Math.sin((x * Math.PI) / 2);
    }
    window.utils.easeInOutSine = function easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    //Cubic
    window.utils.easeInCubic = function easeInCubic(x) {
        return x * x * x;
    }
    window.utils.easeOutCubic = function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }
    window.utils.easeInOutCubic = function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    //Quint
    window.utils.easeInQuint = function easeInQuint(x) {
        return x * x * x * x * x;
    }
    window.utils.easeOutQuint = function easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }
    window.utils.easeInOutQuint = function easeInOutQuint(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    }

    //Circ
    window.utils.easeInCirc = function easeInCirc(x) {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }
    window.utils.easeOutCirc = function easeOutCirc(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }
    window.utils.easeInOutCirc = function easeInOutCirc(x) {
        return x < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }

    //Elastic
    window.utils.easeInElastic = function easeInElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }
    window.utils.easeOutElastic = function easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }
    window.utils.easeInOutElastic = function easeInOutElastic(x) {
        const c5 = (2 * Math.PI) / 4.5;

        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }

    //Quad
    window.utils.easeInQuad = function easeInQuad(x) {
        return x * x;
    }
    window.utils.easeOutQuad = function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }
    window.utils.easeInOutQuad = function easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    //Quart
    window.utils.easeInQuart = function easeInQuart(x) {
        return x * x * x * x;
    }
    window.utils.easeOutQuart = function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }
    window.utils.easeInOutQuart = function easeInOutQuart(x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }

    //Expo
    window.utils.easeInExpo = function easeInExpo(x) {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }
    window.utils.easeOutExpo = function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }
    window.utils.easeInOutExpo = function easeInOutExpo(x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    //Back
    window.utils.easeInBack = function easeInBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
    }
    window.utils.easeOutBack = function easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }
    window.utils.easeInOutBack = function easeInOutBack(x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }

    //Bounce
    window.utils.easeOutBounce = function easeOutBounce(x) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }
    window.utils.easeInBounce = function easeInBounce(x) {
        return 1 - window.utils.easeOutBounce(1 - x);
    }
    window.utils.easeInOutBounce = function easeInOutBounce(x) {
        return x < 0.5
            ? (1 - window.utils.easeOutBounce(1 - 2 * x)) / 2
            : (1 + window.utils.easeOutBounce(2 * x - 1)) / 2;
    }

    window.utils.transformColorToHex = function transformColorToHex(color) {
        const hexColor = (Math.floor(color.R) << 16) + (Math.floor(color.G) << 8) + Math.floor(color.B);
        return window.utils.clamp(Math.floor(hexColor), 0, 0xFFFFFF);
    }

    window.utils.max = function max(values){
        if(values.length > 0){
            let max = values[0];
            for (let i = 1; i < values.length; i++) {
                if(values[i] > max){
                    max = values[i];
                }
            }
            return max;
        }
        return values;
    }

    window.utils.min = function min(values){
        if(values.length > 0){
            let min = values[0];
            for (let i = 1; i < values.length; i++) {
                if(values[i] < min){
                    min = values[i];
                }
            }
            return min;
        }
        return values;
    }

    window.utils.transformRGBToHSV = function transformRGBToHSV(color){
        const pR = color.R / 255;
        const pG = color.G / 255;
        const pB = color.B / 255;

        const cMax = window.utils.max([pR,pG,pB]);
        const cMin = window.utils.min([pR,pG,pB]);

        const delta = cMax - cMin;

        let H = 0;
        if(delta == 0){
            H = 0
        }else if(cMax == pR){
            H = 60 * (((pG - pB) / delta) % 6);
        }else if(cMax == pG){
            H = 60 * (((pB - pR) / delta) + 2);
        }else if(cMax == pB){
            H = 60 * (((pR - pG) / delta) + 4)
        }

        H = H > 360 ? H - 360 : H < 0 ? 360 + H : H;

        let S = cMax == 0 ? 0 : (delta / cMax);

        let V = cMax;

        return {
            H: H,
            S: S,
            V: V
        }
    }

    window.utils.transformHSVtoRGV = function transformHSVtoRGV(color){
        const C = color.V * color.S;
        const X = C * (1 - Math.abs(((color.H / 60) % 2) - 1));
        const m = color.V - C;

        let pColor = {pR:0, pG:0, pB:0};

        if(color.H >= 0 && color.H < 60){
            pColor = {
                pR: C,
                pG: X,
                pB: 0
            }
        }else if(color.H >= 60 && color.H < 120){
            pColor = {
                pR: X,
                pG: C,
                pB: 0
            }
        }else if(color.H >= 120 && color.H < 180){
            pColor = {
                pR: 0,
                pG: C,
                pB: X
            }
        }else if(color.H >= 180 && color.H < 240){
            pColor = {
                pR: 0,
                pG: X,
                pB: C
            }
        }else if(color.H >= 240 && color.H < 300){
            pColor = {
                pR: X,
                pG: 0,
                pB: C
            }
        }else if(color.H >= 300 && color.H <= 360){
            pColor = {
                pR: C,
                pG: 0,
                pB: X
            }
        }

        return {
            R: (pColor.pR + m) * 255,
            G: (pColor.pG + m) * 255,
            B: (pColor.pB + m) * 255
        }
    }

    window.utils.interpolateColorHSV = function interpolateColorHSV(colorA, colorB, t) {
        const colorAHSV = window.utils.transformRGBToHSV(colorA);
        const colorBHSV = window.utils.transformRGBToHSV(colorB);

        const interpColorHSV = window.utils.lerpVec(colorAHSV, colorBHSV, t);

        return window.utils.transformHSVtoRGV(interpColorHSV);
    }
}

export default createUtilFunctions;