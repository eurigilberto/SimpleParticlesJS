<script>
    export let min = 0;
    export let max = 255;
    export let value = 0;
    let inputValue = value;
    let sliderValue = value;

    const sliderChange = () => {
        if (inputValue != sliderValue) {
            inputValue = sliderValue;
        }
    };

    const inputChange = () => {
        if (sliderValue != inputValue) {
            sliderValue = inputValue;
        }
    };

    $: {
        value = sliderValue;
        requestAnimationFrame(sliderChange);
    }

    $: {
        const clampedInputValue =
            inputValue >= max ? max : inputValue <= min ? min : inputValue;
        value = clampedInputValue;
        inputValue = clampedInputValue;
        requestAnimationFrame(inputChange);
    }
</script>

<div>
    <div>
        <input type="number" bind:value={inputValue} />
    </div>
    <div>
        <input type="range" {min} {max} bind:value={sliderValue} />
    </div>
</div>
