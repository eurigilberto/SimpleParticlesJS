<script>
    import Checkbox from "./Checkbox.svelte";
    
    let showPoint = false;

    export let currentValue = { x: 0, y: 0 };
    export let getOffset = () => {};

    let pointMoving = false;
    let pointRenderPosition = {x:0, y:0};

    let mouseMoved = (e) => {
        if (pointMoving) {
            const posOffset = getOffset();

            currentValue.x = e.clientX - posOffset.x;
            currentValue.y = e.clientY - posOffset.y;
        }
    };
    let mouseUp = () => {
        pointMoving = false;
    };
    let mouseDown = () => {
        pointMoving = true;
    };

    $: {
        if(showPoint){
            setPointRenderPosition(currentValue);
        }
    }

    let setPointRenderPosition = (pos) => {
        const posOffset = getOffset();

        pointRenderPosition.x = posOffset.x + pos.x;
        pointRenderPosition.y = posOffset.y + pos.y;
    };

    $: {
        setPointRenderPosition(currentValue);
    }
</script>

<svelte:window on:mousemove={mouseMoved} on:mouseup={mouseUp} on:scroll={()=>{setPointRenderPosition(currentValue)}}/>

<div class="pointValueContainer">
    <div>x</div>
    <div>y</div>
    <div><input type="number" bind:value={currentValue.x} /></div>
    <div><input type="number" bind:value={currentValue.y} /></div>
</div>
<Checkbox bind:value={showPoint}/>

{#if showPoint}
    <div
        class="pointHolder"
        style={`top: ${pointRenderPosition.y}px; left: ${pointRenderPosition.x}px;`}
    >
        <div
            class:point={true}
            class:movingPoint={pointMoving}
            on:mousedown={mouseDown}
        />
    </div>
{/if}

<style>
    .pointHolder {
        position: fixed;
    }
    .point {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 40px;
        background-color: crimson;
        top: -10px;
        left: -10px;
        cursor: grab;
    }
    .pointValueContainer{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
    }
    .movingPoint {
        cursor: grabbing;
        background-color: deepskyblue;
    }
</style>