<script>
    import AnimationSlider from "./AnimationSlider.svelte";
    import Play from "./Icons/Play.svelte";
    import Pause from "./Icons/Pause.svelte";
    import ToStart from "./Icons/ToStart.svelte";
    import Loop from "./Icons/Loop.svelte";
    import { onMount } from "svelte";

    let animT;
    let particleCount = 1;

    let animTSlider;

    const AnimationStates = {
        Animating: "Animating",
        Stopped: "Stopped",
        ForceStopped: "ForceStopped",
        LoopingAnimation: "LoopingAniamtion",
    };

    let animationState = AnimationStates.Stopped;

    let timeAnimationStart = 0;

    let duration = 1000;
    let maxParticleDelay = 0;

    let forcedStop = false;

    let startAnimation = () => {
        timeAnimationStart = new Date().getTime();
        animationState = AnimationStates.Animating;
        animate();
    };

    let restartAnimation = () => {
        timeAnimationStart = new Date().getTime();
    };

    let stopAniamtion = () => {
        animationState = AnimationStates.Stopped;
    };

    let startLoopingAniamtion = () => {
        timeAnimationStart = new Date().getTime();
        const prevAnimState = animationState;
        animationState = AnimationStates.LoopingAnimation;
        if (prevAnimState != AnimationStates.Animating) {
            animate();
        }
    };

    let setSliderAnimTime = () => {};

    let updateSystemAnimTime = (t) => {
        animT = t * (1 + maxParticleDelay);
        window.animationSystem.animTimeUpdated(animT);
    }

    let setAnimTime = (t) => {
        setSliderAnimTime(t);
        updateSystemAnimTime(t);
    }

    let animate = () => {
        const currentTime = new Date().getTime();
        const deltaTime = currentTime - timeAnimationStart;
        const animPercentage = deltaTime / duration;

        if (animationState == AnimationStates.Animating) {
            if (animPercentage > 1) {
                stopAniamtion();
                setAnimTime(1);
            } else {
                setAnimTime(animPercentage);
                requestAnimationFrame(animate);
            }
        } else if (animationState == AnimationStates.Stopped) {
            setAnimTime(animPercentage);
        } else if (animationState == AnimationStates.ForceStopped) {
            //Nothing
        } else if (animationState == AnimationStates.LoopingAnimation) {
            if (animPercentage > 1) {
                timeAnimationStart = new Date().getTime();
                setAnimTime(1);
            } else {
                setAnimTime(animPercentage);
            }
            requestAnimationFrame(animate);
        }
    };

    let forceStopAnimation = () => {
        animationState = AnimationStates.ForceStopped;
    };

    onMount(() => {
        window.animationController = {
            duration: duration,
            particleCount: particleCount,
            maxParticleDelay: maxParticleDelay,
        };
    });

    $: {
        if (window.animationController) {
            window.animationController.particleCount = particleCount;
        }
    }
    $: {
        if (window.animationController) {
            window.animationController.maxParticleDelay = maxParticleDelay;
        }
    }
</script>

<div>
    <div class="controlCollection">
        <div class="controlContainer">
            <div
                class:controlButton={true}
                class:disabledControl={animationState !=
                    AnimationStates.Animating &&
                    animationState != AnimationStates.LoopingAnimation}
                on:click={restartAnimation}
            >
                <ToStart />
            </div>
            <div
                class:controlButton={true}
                class:disabledControl={animationState ==
                    AnimationStates.Animating}
                on:click={startAnimation}
            >
                <Play />
            </div>
            <div
                class:controlButton={true}
                class:disabledControl={animationState !=
                    AnimationStates.Animating &&
                    animationState != AnimationStates.LoopingAnimation}
                on:click={stopAniamtion}
            >
                <Pause />
            </div>
            <div
                class:controlButton={true}
                class:disabledControl={animationState ==
                    AnimationStates.LoopingAnimation}
                on:click={startLoopingAniamtion}
            >
                <Loop />
            </div>
        </div>
        <div>
            Duration (ms): <input bind:value={duration} type="number" />
        </div>
        <div>
            Particle Count: <input bind:value={particleCount} type="number" />
        </div>
        <div>
            Max Particle Delay (ms): <input
                bind:value={maxParticleDelay}
                type="number"
            />
        </div>
    </div>
    <div class="animSliderContainer">
        <AnimationSlider
            updateSystemAnimTime = {updateSystemAnimTime}
            giveControlToUser={forceStopAnimation}
            bind:animTSlider
            bind:setSliderAnimTime
        />
    </div>
</div>

<style>
    .controlCollection {
        display: grid;
        grid-template-columns: auto auto auto auto;
        user-select: none;
    }
    .controlContainer {
        display: grid;
        margin: 0 auto;
        width: min-content;
        grid-template-columns: auto auto auto auto;
        gap: 15px;
    }
    .controlButton {
        cursor: pointer;
        line-height: 0;
    }
    .disabledControl {
        opacity: 0.3;
        cursor: default;
        pointer-events: none;
    }
    .animSliderContainer {
        width: 90%;
        margin: 0 auto;
    }
</style>
