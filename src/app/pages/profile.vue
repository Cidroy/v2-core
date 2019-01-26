<template>
	<v-container>
		<v-layout>
			<v-spacer />
			<h1>
				yo
			</h1>
			<v-spacer />
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component, Watch, Vue } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
})
export default class Home extends Vue{
	
}
</script>
