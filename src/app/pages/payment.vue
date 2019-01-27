<template>
	<Layout>
		<h1 class="text-md-center">Payment</h1>
		
		<v-card color="transparent" height="600px">
			<v-layout class="pt-4 pl-4" row wrap>
				<v-flex xs6>
					<v-radio-group prepend-icon="fas fa-cash-register" label="Mode of Payment" v-model="radioPmode" row>
						<v-radio label="Cash" value="radio-1"></v-radio>
						<v-radio label="Card/Online" value="radio-2"></v-radio>
						<v-radio label="Cheque" value="radio-3"></v-radio>
					</v-radio-group>
				</v-flex>	
				<v-spacer></v-spacer>
				<v-flex xs3 class="pr-4">
					<v-text-field prepend-icon="fas fa-receipt" value="7384" label="Receipt No" readonly ></v-text-field>
				</v-flex>

				<v-flex xs6>
					<v-text-field prepend-icon="fas fa-user" value="John Doe" label="Name" readonly ></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout class="pl-4" row wrap>
				<v-flex xs6 class="pr-4">
					<v-text-field prepend-icon="fas fa-info-circle" value="Package Name" label="Payment Purpose" readonly ></v-text-field>
				</v-flex>
				<v-flex xs6 class="pr-4">
					<v-text-field prepend-icon="fas fa-calendar-alt" value="Package Duration" label="Payment Duration" readonly ></v-text-field>
				</v-flex>

				<v-flex xs12>
					<v-subheader class="title">Amount Breakdown</v-subheader>
				</v-flex>
			</v-layout>

			<v-card>
				<v-layout row wrap class="pl-4">
					<v-flex class="mt-2" xs2>
						<v-subheader class="body-2">Sub-Total</v-subheader>
					</v-flex>
					<v-flex xs2>
						<v-text-field value="2580.00" prefix="₹"></v-text-field>
					</v-flex>
				</v-layout>

				<v-layout row wrap class="pl-4">
					<v-flex class="mt-2" xs2>
						<v-subheader class="body-2">Select Offer</v-subheader>
					</v-flex>
					<v-flex xs2>
						
					</v-flex>
				</v-layout>

				<v-layout row wrap class="pl-4">
					<v-flex class="mt-2" xs2>
						<v-subheader class="body-2">Discount Amount</v-subheader>
					</v-flex>
					<v-flex xs2>
						<v-text-field prefix="₹"></v-text-field>
					</v-flex>
				</v-layout>

				<v-layout row wrap class="pl-4">
					<v-flex class="mt-2" xs2>
						<v-subheader class="subheading">Total Amount</v-subheader>
					</v-flex>
					<v-flex xs2>
						<v-text-field value="2080.00" prefix="₹"></v-text-field>
					</v-flex>
				</v-layout>
			</v-card>	
		</v-card>	
	</Layout>
</template>

<script lang="ts">
import Vue from "vue"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	radioPmode = "radio-1"

}
</script>