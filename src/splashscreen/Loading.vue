<template>
	<div class="loader">
		<div class="ball"></div>
	</div>
</template>

<style>
.loader {
	position: absolute;
	width: 100%;
	height: 5px;
	overflow: hidden;
}

.loader .ball {
	height: 5px;
	width: 0;
	background: #E65100;
	position: relative;
	margin: 0;
}

.loader .ball:nth-child(1) {
	-webkit-animation: ball 4s ease-in-out infinite;
	animation: ball 4s ease-in-out infinite;
}

.loader .ball:nth-child(2) {
	-webkit-animation: ball 4s ease-in-out .2s infinite;
	animation: ball 4s ease-in-out .2s infinite;
}

.loader .ball:nth-child(3) {
	-webkit-animation: ball 4s ease-in-out .4s infinite;
	animation: ball 4s ease-in-out .4s infinite;
}

@-webkit-keyframes ball {
	0% { left: 0; width: 0px; }
	25% { left: 0; width: 100%; }
	50% { left: 100%; width: 0px; }
	75% { left: 0; width: 100%; }
	100% { left: 0; width: 0px; }
}

@keyframes ball {
	0% { left: 0; width: 0px; }
	25% { left: 0; width: 100%; }
	50% { left: 100%; width: 0px; }
	75% { left: 0; width: 100%; }
	100% { left: 0; width: 0px; }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class SplashcreenPage extends Vue.default {}
</script>
