const inputVariables = `[
    {
        name: "gridWidth",
        type: "number",
        defaultValue: 150
    },
    {
        name: "startPos",
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
        name: "endSizeDelta",
        type: "number",
        defaultValue: 5
    },
    {
        name: "endPos",
        type: "position",
        defaultValue: {
            x:100, y:100
        }
    },
    {
        name: "lineParticleCount",
        type: "number",
        defaultValue: 20
    }
]`

const BoxMovementFnString = `const maxParticleDelay = window.animationController.maxParticleDelay;
const particleCount = window.animationController.particleCount;

const gridXNormalized = (i % window.localVariables.lineParticleCount) / (window.localVariables.lineParticleCount - 1);
const gridYNormalized = Math.floor(i / window.localVariables.lineParticleCount) / (window.localVariables.lineParticleCount - 1);

const gridWidth = window.localVariables.gridWidth;
const startPos = window.localVariables.startPos;

const finalPos = {
    x: window.utils.remap(0, 1, -1, 1, gridXNormalized) * gridWidth / 2 + window.localVariables.endPos.x,
    y: window.utils.remap(0, 1, -1, 1, gridYNormalized) * gridWidth / 2 + window.localVariables.endPos.y
}

const particleDelay = (1 - Math.abs(window.utils.remap(0, 1, -1, 1, gridXNormalized)) * Math.abs(window.utils.remap(0, 1, -1, 1, gridYNormalized))) * maxParticleDelay;
const animTDelayed = window.utils.clamp(animT - particleDelay, 0, 1);

const particleSize = window.localVariables.startSize + window.localVariables.endSizeDelta * window.utils.easeInOutBack(animTDelayed);

const particlePos = window.utils.lerpVec(startPos, finalPos, window.utils.easeOutBounce(animTDelayed));

return {
    position: {
        //The variables are offseted to place them in the center of the canvas
        x: particlePos.x,
        y: particlePos.y
    },
    size: {
        x: particleSize,
        y: particleSize
    },
    color: {
        base: 0x000000,
        alpha: animTDelayed
    },
    type: "circle"
}`

export default {
    inputVariables:inputVariables,
    BoxMovementFnString:BoxMovementFnString
}