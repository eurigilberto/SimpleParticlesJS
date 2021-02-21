<script>
    import Point from "./Common/Point.svelte";
    import VariableName from "./Common/VariableName.svelte";
    import RenderCurve from "./Common/RenderCurve.svelte";

    export let variableName = "bezier";
    export let defaultValue = null;

    let posA;
    let posB;
    let posC;
    let posD;

    if (defaultValue) {
        posA = defaultValue.posA;
        posB = defaultValue.posB;
        posC = defaultValue.posC;
        posD = defaultValue.posD;
    }

    const getOffset = () => {
        const canvasContainer = document.getElementById("canvasInnerContainer");
        const boundingRect = canvasContainer.getBoundingClientRect();
        return {
            x: boundingRect.x,
            y: boundingRect.y,
        };
    };

    window.localVariables[variableName] = {
        posA: posA,
        posB: posB,
        posC: posC,
        posD: posD,
    };

    $: {
        window.localVariables[variableName] = {
            posA: posA,
            posB: posB,
            posC: posC,
            posD: posD,
        };
    }
</script>

<div>
    <VariableName varName={variableName} />
    <RenderCurve {posA} {posB} {posC} {posD} {getOffset} />
    <Point bind:currentValue={posA} {getOffset} />
    <Point bind:currentValue={posB} {getOffset} />
    <Point bind:currentValue={posC} {getOffset} />
    <Point bind:currentValue={posD} {getOffset} />
</div>

<style>
</style>
