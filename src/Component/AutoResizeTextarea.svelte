<script>
    import { afterUpdate } from "svelte";
    export let value = "";

    let textAreaRef;
    const textAreaInputhandler = () => {
        console.log("called");
        if (!textAreaRef) return;
        const newHeight = (value.split("\n").length + 1) * 20;
        textAreaRef.style.height = `${newHeight}px`;
    };

    afterUpdate(() => {
        textAreaInputhandler();
    });
</script>

<textarea wrap="off" bind:value bind:this={textAreaRef} />

<style>
    textarea {
        resize: none;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        line-height: 20px;
    }
</style>
