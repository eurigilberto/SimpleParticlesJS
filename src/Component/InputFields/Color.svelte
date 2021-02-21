<script>
    import VariableName from "./Common/VariableName.svelte";
    import ColorPicker from "./Common/ColorPicker.svelte";

    export let variableName = "color";
    export let defaultValue = null;

    let R = defaultValue ? window.utils.clamp(defaultValue.R, 0, 255) : 0;
    let G = defaultValue ? window.utils.clamp(defaultValue.G, 0, 255) : 0;
    let B = defaultValue ? window.utils.clamp(defaultValue.B, 0, 255) : 0;

    window.localVariables[variableName] = {
        R: R,
        G: G,
        B: B,
    };

    $: {
        window.localVariables[variableName] = {
            R: window.utils.clamp(R, 0, 255),
            G: window.utils.clamp(G, 0, 255),
            B: window.utils.clamp(B, 0, 255),
        };
    }
</script>

<div>
    <VariableName varName={variableName} />
    <ColorPicker bind:R bind:G bind:B />
</div>
