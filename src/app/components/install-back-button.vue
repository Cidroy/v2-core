<template>
	<div>
		<v-btn icon flat @click.native.stop="back"> <v-icon>arrow_back</v-icon> </v-btn>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { MAIN } from "@/classes/setup"

// @ts-ignore
@Component({})
export default class InstallExitButton extends Vue.default {
	private back(){ MAIN.previous() }
}
</script>
