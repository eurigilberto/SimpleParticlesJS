<script>
    import { onMount } from "svelte";
    import AniamtionSystem from "../AnimationSystem/AnimationSystem";
    import ParticleInputVariables from "./ParticleInputVariables.svelte";

    import CircleGeneration from "../Examples/CircleGeneration";
    import BoxGeneration from "../Examples/BoxGeneration";
    import HeartGeneration from "../Examples/HeartGeneration";

    let animationSystem;

    let GenerateInputs;

    onMount(() => {
        animationSystem = new AniamtionSystem("canvasInnerContainer");
    });

    export let setInputAndFunction;

    let setupCircleSystem = () => {
        setInputAndFunction(
            CircleGeneration.inputVariables,
            CircleGeneration.particleFunctionString
        );
    };

    let setupBoxSystem = () => {
        setInputAndFunction(
            BoxGeneration.inputVariables,
            BoxGeneration.BoxMovementFnString
        );
    };

    let setupHeartSystem = () => {
        setInputAndFunction(
            HeartGeneration.inputVariables,
            HeartGeneration.hearGenFuncString
        );
    };

    export const setupSystem = (inputString, funcString) => {
        const getInputs = window.Function(`return ${inputString}`);
        GenerateInputs(getInputs());
        const particleFunction = window.Function(
            "i",
            "animT",
            "width",
            "height",
            funcString
        );
        animationSystem.selectedFunction(particleFunction);
    };
</script>

<div class="canvasVariablesContainer">
    <div class="canvasContianer">
        <div class="canvasLabel">Canvas</div>
        <div class="canvasInnerContainer" id={"canvasInnerContainer"} />
    </div>

    <div class="variablesContainer">
        <ParticleInputVariables bind:GenerateInputs />
    </div>
</div>

<div class="buttonsContainer">
    <div
        class:button={true}
        on:click={() => {
            setupCircleSystem();
        }}
    >
        Circle
    </div>
    <div
        class:button={true}
        on:click={() => {
            setupBoxSystem();
        }}
    >
        Square
    </div>
    <div
        class:button={true}
        on:click={() => {
            setupHeartSystem(2);
        }}
    >
        Heart
    </div>
</div>

<style>
    .canvasVariablesContainer {
        display: grid;
        grid-template-columns: auto auto;
        height: 700px;
    }
    .variablesContainer {
        height: 100%;
        overflow-y: auto;
    }
    .buttonsContainer {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 20px;
        width: min-content;
        color: white;
        margin-top: 1em;
    }
    .button {
        padding: 5px;
        border-radius: 5px;
        background-color: black;
        font-size: 1.5em;
        font-weight: 300;
        cursor: pointer;
    }
    .canvasInnerContainer {
        border-style: solid;
        line-height: 0;
    }
    .canvasLabel {
        font-weight: 800;
        font-size: 2em;
        user-select: none;
    }
    .canvasContianer {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: auto;
        place-items: center;
    }
</style>
