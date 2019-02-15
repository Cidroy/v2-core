<template>
	<v-layout align-center justify-center row fill-height style="height: 80vh">
		<v-flex xs10 lg6>
			<v-progress-linear :indeterminate="true" color="orange darken-2" />
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
	page : {		
		title: "Loading page...",
		meta: [ { name: "description", content: "Loading page...", }, ],
	},
})
export default class Loading extends Vue{}
</script>
