<template>
	<v-container fill-height>
		<v-layout>
			<v-progress-linear :indeterminate="true" />
		</v-layout>
	</v-container>
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
