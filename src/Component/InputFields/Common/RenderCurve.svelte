<script>
    import Checkbox from "./Checkbox.svelte";

    export let posA;
    export let posB;
    export let posC;
    export let posD;

    let svgWidth = 0;
    let svgHeight = 0;

    let movePos = "0,0";
    let curvePos = "30,90 25,10 50,10"
    let controlPointLines = "";

    let topPosition = {x:0,y:0};

    export let getOffset;

    let getMin = (arr)=>{
        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if(arr[i] < min){
                min = arr[i];
            }
        }
        return min;
    }

    let getMax = (arr)=>{
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if(arr[i] > max){
                max = arr[i];
            }
        }
        return max;
    }

    let addVectors = (vecA, vecB)=>{
        return {
            x: vecA.x + vecB.x,
            y: vecA.y + vecB.y
        }
    }

    let subVectors = (vecA, vecB)=>{
        return {
            x: vecA.x - vecB.x,
            y: vecA.y - vecB.y
        }
    }

    let generateCurveValues = ()=>{
        const xPositions = [
            posA.x,
            posB.x,
            posC.x,
            posD.x
        ];

        const yPositions = [
            posA.y,
            posB.y,
            posC.y,
            posD.y
        ]

        const topLeftCorner = {
            x: getMin(xPositions),
            y: getMin(yPositions)
        }
        
        topPosition = addVectors(topLeftCorner, getOffset());

        const bottomRightCorner = {
            x: getMax(xPositions),
            y: getMax(yPositions)
        }

        svgWidth = bottomRightCorner.x - topLeftCorner.x;
        svgHeight = bottomRightCorner.y - topLeftCorner.y;

        const offPosA = subVectors(posA, topLeftCorner);
        const offPosB = subVectors(posB, topLeftCorner);
        const offPosC = subVectors(posC, topLeftCorner);
        const offPosD = subVectors(posD, topLeftCorner);

        movePos = `${offPosA.x},${offPosA.y}`;
        curvePos = `${offPosB.x},${offPosB.y} ${offPosC.x},${offPosC.y} ${offPosD.x},${offPosD.y}`;

        controlPointLines = `M ${offPosA.x},${offPosA.y} L ${offPosB.x},${offPosB.y} M ${offPosC.x},${offPosC.y} L ${offPosD.x},${offPosD.y}`
    }

    let showCurve = false;

    $:{
        if(posA && posB && posC && posD){
            generateCurveValues();
        }
    }
    $:{
        if(showCurve){
            generateCurveValues();
        }
    }
</script>

<svelte:window on:scroll={()=>{if(showCurve){generateCurveValues()}}}/>

<div class="show">
    <div>Show curve</div>
    <Checkbox bind:value={showCurve} />
</div>

{#if showCurve}
    <svg style={`top: ${topPosition.y}px; left: ${topPosition.x}px; width: ${svgWidth}px; height: ${svgHeight}px;`} class="svgCurve" viewBox={`0 0 ${svgWidth} ${svgHeight}`} xmlns="http://www.w3.org/2000/svg">
        <!-- LineTo commands with absolute coordinates -->
        <path fill="none" stroke="red"
        class="curvePath"
        d={`M ${movePos} 
            C ${curvePos}`} />
        
        <path fill="none" stroke="grey"
        class="controlPath"
        d={controlPointLines}/>
    </svg>
{/if}

<style>
    .svgCurve{
        position: fixed;
        pointer-events: none;
    }
    .curvePath{
        stroke-width: 5px;
    }
    .controlPath{
        stroke-width: 3px;
        stroke-dasharray: 10;
    }
    .show {
        display: grid;
        grid-template-columns: auto auto;
    }
</style>
