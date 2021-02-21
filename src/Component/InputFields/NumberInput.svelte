<script>
    import VariableName from "./Common/VariableName.svelte";

    export let variableName = "number";
    export let currentValue = 1;
    export let defaultValue = null;

    if(defaultValue){
        currentValue = defaultValue;
    }

    window.localVariables[variableName] = currentValue;

    $: {
        window.localVariables[variableName] = currentValue;
    }


</script>

<div>
    <VariableName varName={variableName}/>
    <input type="number" bind:value={currentValue} />
</div>
