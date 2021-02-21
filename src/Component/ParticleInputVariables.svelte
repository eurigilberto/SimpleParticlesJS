<script>
    import NumberInput from "./InputFields/NumberInput.svelte";
    import Position from "./InputFields/Position.svelte";
    import BezierCurve from "./InputFields/BezierCurve.svelte";
    import Color from "./InputFields/Color.svelte";

    let currentInputs = [];

    const getComponentFromType = (type) => {
        if (type == "number") {
            return NumberInput;
        } else if (type == "position") {
            return Position;
        } else if (type == "bezier") {
            return BezierCurve;
        } else if (type == "color") {
            return Color;
        }
    };

    export const GenerateInputs = (inputs) => {
        window.localVariables = {};
        currentInputs = [];

        requestAnimationFrame(() => {
            const newInputs = [];
            for (let i = 0; i < inputs.length; i++) {
                const cInput = inputs[i];

                newInputs.push({
                    name: cInput.name,
                    component: getComponentFromType(cInput.type),
                    defaultValue: cInput.defaultValue,
                });
            }
            currentInputs = [...newInputs];
        });
    };
</script>

{#each currentInputs as cIn}
    <div class="variableContainer">
        <svelte:component
            this={cIn.component}
            variableName={cIn.name}
            defaultValue={cIn.defaultValue}
        />
    </div>
{/each}

<style>
    .variableContainer {
        padding-bottom: 1.5em;
    }
</style>
