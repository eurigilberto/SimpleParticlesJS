<script>
    let positionX = -10;
    let positionY = 0;

    export let animTSlider = 0;
    export let giveControlToUser = ()=>{};
    export let updateSystemAnimTime;

    let lastWidth = 0;
    let currentWidth = 0;

    let controlContainer;
    let movable = false;

    const controlMouseDown = (e) => {
        giveControlToUser();
        movable = true;
    };
    const controlMouseUp = (e) => {
        movable = false;
    };
    const instantMove = (e) => {
        giveControlToUser();
        let boundingRect = controlContainer.getBoundingClientRect();
        let xPos = e.clientX - boundingRect.x;
        
        positionX =
            xPos > 0
                ? xPos <= boundingRect.width
                    ? xPos
                    : boundingRect.width
                : 0;

        positionX = positionX - 10;

        animTSlider = (positionX + 10) / boundingRect.width;
        updateSystemAnimTime(animTSlider)
        movable = true;
    };

    const getPositionFromAnimTime = (t)=>{
        const boundingRect = controlContainer.getBoundingClientRect();
        return boundingRect.width * t - 10;
    }

    const controlMouseMove = (e) => {
        if (movable) {
            let boundingRect = controlContainer.getBoundingClientRect();
            let xPos = e.clientX - boundingRect.x;
            
            positionX =
                xPos > 0
                    ? xPos <= boundingRect.width
                        ? xPos
                        : boundingRect.width
                    : 0;

            positionX = positionX - 10;

            animTSlider = (positionX + 10) / boundingRect.width;
            updateSystemAnimTime(animTSlider)
        }
    };

    const checkResize = () => {
        if (controlContainer) {
            lastWidth = currentWidth;
            let boundingRect = controlContainer.getBoundingClientRect();
            currentWidth = boundingRect.width;
            if (lastWidth != currentWidth) {
                positionX = getPositionFromAnimTime(animTSlider);
            }
        }

        requestAnimationFrame(checkResize);
    };

    checkResize();

    export const setSliderAnimTime = (newAnimT)=>{
        animTSlider = newAnimT;
        positionX = getPositionFromAnimTime(animTSlider);
    }
</script>

<svelte:window on:mousemove={controlMouseMove} on:mouseup={controlMouseUp} />

<div class="container">
    <div class="timelineBar" />
    <div
        bind:this={controlContainer}
        class="controlContainer"
        on:mousedown={instantMove}
    >
        <svg
            on:mousedown={controlMouseDown}
            class:svgControl={true}
            class:svgControlGrabbing={movable}
            width="20"
            viewBox="0 0 393 591"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={`left: ${positionX};`}
        >
            <path d="M393 0H0V393L196.75 590.25L393 393V0Z" fill="black" />
        </svg>
    </div>
</div>

<style>
    .svgControl {
        position: absolute;
        cursor: grab;
    }
    .svgControlGrabbing{
        cursor: grabbing;
    }
    .controlContainer {
        position: relative;
        width: calc(100% - 20px);
        padding: 0px 10px;
        height: 35px;
    }
    .timelineBar {
        position: absolute;
        width: 100%;
        top: 25px;
        height: 10px;
        background-color: darkgrey;
    }
    .container {
        position: relative;
        width: 100%;
    }
</style>
