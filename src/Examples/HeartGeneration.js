const inputVariables = `[
    {
        name: "particleCountPerRing",
        type: "number",
        defaultValue: 100
    },
    {
        name: "startPos",
        type: "position",
        defaultValue: {
            x:0, y:0
        }
    },
    {
        name: "colorA",
        type: "color",
        defaultValue: {
            R:0,G:0,B:0
        }
    },
    {
        name: "colorB",
        type: "color",
        defaultValue: {
            R:0,G:0,B:0
        }
    },
    {
        name: "endPos",
        type: "position",
        defaultValue: {
            x:0, y:0
        }
    },
    {
        name: "startSize",
        type: "number",
        defaultValue: 5
    },
    {
        name: "endSizeOffsetA",
        type: "number",
        defaultValue: 5
    },
    {
        name: "endSizeOffsetB",
        type: "number",
        defaultValue: 5
    }
]`

const hearGenFuncString = `const maxParticleDelay = window.animationController.maxParticleDelay;
const particleCount = window.animationController.particleCount;

const maxCount = particleCount > 1 ? particleCount - 1 : 1;

//Creating internal variables to drive the animation
const particleIndexA = (i % window.localVariables.particleCountPerRing) / (window.localVariables.particleCountPerRing - 1);
const particleIndexB = Math.floor(i / window.localVariables.particleCountPerRing);

const normalizedParticleIndexB = particleIndexB / (particleCount / window.localVariables.particleCountPerRing);

const particleIndexNormalized = i / maxCount;

//Particle delay
const particleDelay = (particleIndexB / (particleCount / window.localVariables.particleCountPerRing)) * maxParticleDelay;//Math.abs(((particleIndexNormalized - 0.5) * 2)) * maxParticleDelay;
//Animaiton time with the particle delay 
const newAnimTime = window.utils.clamp(animT - particleDelay, 0, 1);

const theta = Math.PI * 2 * particleIndexA //((particleIndexNormalized - 0.5) * 2) * 3.14;
const heartPos = {
    x: 16 * Math.pow(Math.sin(theta), 3),
    y: -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta))
}

const easedAnimTime = window.utils.easeOutElastic(newAnimTime);

//Creating the start and end position of this particle
const startPosition = window.localVariables.startPos;
const endPosition = window.utils.addVectors(window.utils.scaleVector(heartPos, particleIndexNormalized * 10 + 1), window.localVariables.endPos) ;
//Interpolated position
const lerpPosHeart = window.utils.lerpVec(startPosition, endPosition, easedAnimTime);

//Colors to interpolate
const colorA = window.localVariables.colorA

const colorB = window.localVariables.colorB
//Interpolated color using a custom interpolation variable
const lerpColor = window.utils.interpolateColorHSV(colorA, colorB, normalizedParticleIndexB);

return {
    position: {
        x: lerpPosHeart.x,
        y: lerpPosHeart.y
    },
    size: {
        x: window.localVariables.startSize + (window.localVariables.endSizeOffsetA * (1 - normalizedParticleIndexB) + window.localVariables.endSizeOffsetB) * newAnimTime,
        y: window.localVariables.startSize + (window.localVariables.endSizeOffsetA * (1 - normalizedParticleIndexB) + window.localVariables.endSizeOffsetB) * newAnimTime
    },
    color: {
        base: window.utils.transformColorToHex(lerpColor),
        alpha: newAnimTime
    },
    type: "circle"
}`;

export default {
    inputVariables: inputVariables,
    hearGenFuncString: hearGenFuncString
}