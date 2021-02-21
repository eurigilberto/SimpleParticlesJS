<script>
    export let value = false;
    let toggleCheckbox = ()=>{
        value = !value;
    }
</script>

<div
    on:click={toggleCheckbox}
    class:checkboxFalse={!value}
    class:checkboxTrue={value}
    class:hoverable={true}
/>

<style>
    .checkboxFalse {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: dimgray;
        cursor: pointer;
    }
    .checkboxTrue {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: rgb(0, 162, 255);
        cursor: pointer;
    }
    .hoverable:hover{
        transform: scale(1.5);
    }
</style>