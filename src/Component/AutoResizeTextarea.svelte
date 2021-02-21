<script>
    export let value = "";

    let textAreaRef;
    const textAreaInputhandler = () => {
        console.log("called");
        if (!textAreaRef) return;
        textAreaRef.style.height = "0px";
        textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
    };

    $: {
        value
        textAreaInputhandler();
    }
</script>

<textarea bind:value bind:this={textAreaRef} />

<style>
    textarea {
        resize: none;
        width: 100%;
        overflow: hidden
    }
</style>
