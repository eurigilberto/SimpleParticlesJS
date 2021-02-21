<script>
    import Point from "./Common/Point.svelte";
    import VariableName from "./Common/VariableName.svelte";

    export let variableName = "position";
    let currentValue = {
        x: 0,
        y: 0,
    };

    export let defaultValue = null;

    if (defaultValue) {
        currentValue.x = defaultValue.x;
        currentValue.y = defaultValue.y;
    }

    window.localVariables[variableName] = currentValue;

    $: {
        window.localVariables[variableName].x = currentValue.x;
        window.localVariables[variableName].y = currentValue.y;
    }
</script>

<div>
    <VariableName varName={variableName}/>
    <Point
        bind:currentValue
        getOffset={() => {
            const canvasContainer = document.getElementById(
                "canvasInnerContainer"
            );
            const boundingRect = canvasContainer.getBoundingClientRect();
            return {
                x: boundingRect.x,
                y: boundingRect.y,
            };
        }}
    />
</div>
