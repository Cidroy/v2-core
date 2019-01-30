<template>
	<v-container>
		<v-layout>
			<v-card width="100%" color="transparent" height="500px">
				<v-layout row wrap>
					<v-flex xs4>
						<v-card height="500px">
							<v-layout row wrap>
								<v-layout pt-2 class="justify-center">

										<v-avatar size="200">
										<v-img :src="cards[0].src" height="200px" />
										</v-avatar>
								</v-layout>
								<v-list>
									<v-list-tile  v-for="(item, index) in profileList" :key="index">
										<v-list-tile-title>{{ item.text }}</v-list-tile-title>
									</v-list-tile>
								</v-list>

							</v-layout>

							<v-layout  class="justify-center">
							
										<v-btn>Send SMS</v-btn>
										<v-btn>Send Email</v-btn>
							</v-layout>
						
						</v-card>
					</v-flex>

				<v-flex xs8>
					<v-tabs v-model="active" color="transparent" slider-color="orange darken-4">
      				<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
				
						<v-tab-item key="a">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

						<v-tab-item key="b">
							<v-card flat color="transparent" height="100px">
								<v-container style="max-width: 700px;">
									<v-timeline dense clipped>

										<v-timeline-item class="mb-4" hide-dot>
											<span>TODAY</span>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" icon-color="grey lighten-2" small>
											<v-layout justify-space-between>
												<v-flex xs7>This order was archived.</v-flex>
												<v-flex xs5 text-xs-right>15:26 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												Digital Downloads fulfilled 1 item.
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												Order confirmation email was sent to John Leider (john@vuetifyjs.com).
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												A $15.00 USD payment was processed on PayPal Express Checkout
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												John Leider placed this order on Online Store (checkout #1937432132572).
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

									</v-timeline>
								</v-container>
							</v-card>
						</v-tab-item>

						<v-tab-item key="c">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

						<v-tab-item key="d">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

						<v-tab-item key="e">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

					</v-tabs>
				</v-flex>
				</v-layout>
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
	active: number = 0
	tabsList = {
		e: "Overview",
		a: "Activities",
		b: "Transaction",
		c: "Membership",
		d: "Details",
	}
	 profileList: { icon?: string, text: string }[] = [
        { text: "Name: Kundan Singh", },
        { text: "Status:", },
        { text: "Phone:", },
		{ text: "Email: kundan785@gmail.com", },
	];
	cards = [
		{ src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
	]
}
</script>
