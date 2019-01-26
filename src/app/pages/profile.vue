<template>
	<v-container>
		<v-layout>
			<v-card width="100%" color="transparent" height="500px">
					<v-flex xs4>
				<v-layout justify-center row/>

								<v-avatar  size="200">
								<v-img :src="cards[0].src" height="200px" />
								</v-avatar>
								<v-spacer/>
								<span class=" title font-weight-black" style="width: 190px">Kundan Singh</span>
					
				
					</v-flex>
				<v-flex xs8>
				</v-flex>
			</v-card>
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
	cards = [
		{ src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
	]
}
</script>
