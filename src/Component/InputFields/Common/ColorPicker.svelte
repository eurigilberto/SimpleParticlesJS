<script>
    import InputSlider from "./InputSlider.svelte";
    export let R = 0;
    export let G = 0;
    export let B = 0;

    let hexVal = 0x000000;

    $:{
        hexVal = window.utils.transformColorToHex({
            R:R,
            G:G,
            B:B
        })
    }
</script>

<div class="container">
    <div>
        <div class="colorComponent">
            <div class="component">R</div>
            <InputSlider min={0} max={255} bind:value={R}/>
        </div>
        <div class="colorComponent">
            <div class="component">G</div>
            <InputSlider min={0} max={255} bind:value={G}/>
        </div>
        <div class="colorComponent">
            <div class="component">B</div>
            <InputSlider min={0} max={255} bind:value={B}/>
        </div>
    </div>
    <div class="colorBox" style={`background-color:#${hexVal.toString(16).padStart(6, "0")}`}/>
</div>

<style>
    .colorComponent{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1em;
    }
    .component{
        font-size: 2em;
        font-weight: 600;
    }
    .container{
        display: grid;
        grid-template-columns: 2fr 1fr;
    }
    .colorBox{
        border-radius: 30px;
    }
</style>