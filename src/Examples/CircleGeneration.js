const inputVariables = `[
    {
        name: "circleRadius",
        type: "number",
        defaultValue: 70
    },
    {
        name: "particlePerRing",
        type: "number",
        defaultValue: 100
    },
    {
        name: "curvePoints",
        type: "bezier",
        defaultValue: {
            posA: {x:230,y:552},
            posB: {x:68,y:339},
            posC: {x:464,y:495},
            posD: {x:326,y:225}
        }
    },
    {
        name: "particleSize",
        type: "number",
        defaultValue: 0
    },
    {
        name: "addedParticleSize",
        type: "number",
        defaultValue: 20
    },
    {
        name: "colorA",
        type: "color",
        defaultValue: {
            R: 62,
            G: 255,
            B: 28
        }
    },
    {
        name: "colorB",
        type: "color",
        defaultValue: {
            R: 206,
            G: 255,
            B: 29
        }
    }
]`

const bezierMovementFnString = `const colorA = window.localVariables.colorA;

const colorB = window.localVariables.colorB;


const maxParticleDelay = window.animationController.maxParticleDelay;
const particleCount = window.animationController.particleCount;

const particleCountNorm = particleCount > 1 ? window.utils.remap(0, particleCount - 1, 0, 1, i) : 0;
const particleDelay = particleCountNorm * maxParticleDelay;
const newParticleAnim = window.utils.clamp(animT - particleDelay, 0 , 1);

//const maxParticleCount = particleCount > 1 ? particleCount - 1 : 2;

const circleIndexNormalized = 1 - (i % window.localVariables.particlePerRing) / (window.localVariables.particlePerRing - 1);
//const circleRingIndexNormalized = Math.floor(i / 200) / (maxParticleCount / 200);

const indexAngle = window.utils.remap(0, 1, 0, Math.PI * 2, circleIndexNormalized);

const circlePosition = {
    x: Math.cos(indexAngle),
    y: Math.sin(indexAngle)
}

const circleRingScale = window.utils.remap(0,0.8, 0, 1, window.utils.clamp(1 - particleCountNorm, 0, 0.8));

const particleCirclePositionB = window.utils.scaleVector(circlePosition, window.localVariables.circleRadius * 0.25 * circleRingScale)
const particleCirclePositionC = window.utils.scaleVector(circlePosition, window.localVariables.circleRadius * 0.5 * circleRingScale)
const particleCirclePositionD = window.utils.scaleVector(circlePosition, window.localVariables.circleRadius * 1 * circleRingScale)

const A = window.localVariables.curvePoints.posA;

//window.utils.addVectors
const B = window.utils.addVectors(window.localVariables.curvePoints.posB, particleCirclePositionB);
const C = window.utils.addVectors(window.localVariables.curvePoints.posC, particleCirclePositionC);
const D = window.utils.addVectors(window.localVariables.curvePoints.posD, particleCirclePositionD);

const particlePosition = window.utils.bezierCurve(A, B, C, D, window.utils.easeOutBounce(newParticleAnim));
const particleSize = window.localVariables.particleSize + window.localVariables.addedParticleSize * window.utils.easeOutBounce(newParticleAnim);

const particleColor = window.utils.interpolateColorHSV(colorA, colorB, particleCountNorm)

return {
    position: {
        //The variables are offseted to place them in the center of the canvas
        x: particlePosition.x,
        y: particlePosition.y
    },
    size: {
        x: particleSize,
        y: 5
    },
    color: {
        base: window.utils.transformColorToHex(particleColor),
        alpha: 1
    },
    type: "circle"
}`

export default {
    inputVariables: inputVariables,
    particleFunctionString: bezierMovementFnString
}