<script>
	import AniamtionController from "./Component/AnimationController.svelte";
	import AnimationContainer from "./Component/AnimationContianer.svelte";
	import ParticleDefinition from "./Component/ParticleDefinition.svelte";

	import createUtilFunctions from "./AnimationSystem/Utils";

	import { onMount } from "svelte";

	onMount(() => {
		createUtilFunctions();
	});

	let setInputAndFunction;
	let setupSystem;
</script>

<svelte:head>
	<title>Simple Particles JS</title>
</svelte:head>

<AniamtionController />
<AnimationContainer bind:setupSystem {setInputAndFunction}/>
<ParticleDefinition bind:setInputAndFunction {setupSystem}/>
