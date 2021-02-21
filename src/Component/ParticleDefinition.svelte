<script>
    import AutoResizeTextarea from "./AutoResizeTextarea.svelte";

    let inputDefinition = "";
    let functionDefinition = "";

    export let setupSystem;
    export const setInputAndFunction = (inputDef, funcDef)=>{
        inputDefinition = inputDef;
        functionDefinition = funcDef;
    }
</script>

<div class="container">
    <div class="button" on:click={()=>{setupSystem(inputDefinition, functionDefinition)}}>Send To System</div>
    
    <div class="sectionTitle">Input Definitions</div>
    <AutoResizeTextarea bind:value={inputDefinition}/>

    <div class="sectionTitle">Particle Function</div>
    <AutoResizeTextarea bind:value={functionDefinition} />
</div>

<style>
    .container {
        padding-top: 1em;
    }
    .sectionTitle {
        font-size: 1.5em;
        font-weight: 600;
        padding-top: 2em;
    }
    .button {
        width: min-content;
        font-weight: 800;
        font-size: 1.5em;
        padding: 1em;
        border-radius: 5px;
        color: white;
        background-color: black;
        cursor: pointer;
    }
    .button:hover {
        transform: scale(1.1);
    }
</style>
