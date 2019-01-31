<template>
	<Layout>
		<h1 class="text-md-center">Enquiry</h1>
		<v-card class="mb-2" color="transparent" height="630px">
			<v-layout row wrap class="pl-4">
				<v-flex  class="px-1">
					<v-text-field prepend-icon="fas fa-user" v-model="firstname" :rules="nameRules" counter maxlength="15" label="First Name" required></v-text-field>
				</v-flex>
				<v-flex  class="px-1">
					<v-text-field counter maxlength="15" label="Middle Name"></v-text-field>
				</v-flex>
				<v-flex  class="px-1 pr-4">
					<v-text-field counter maxlength="15" label="Last Name"></v-text-field>
				</v-flex>
			</v-layout>

			<v-layout row wrap class="pl-4">
				<v-flex xs12 lg6>
					<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup2" row>
						<v-radio label="Male" value="radio-4"></v-radio>
						<v-radio label="Female" value="radio-5"></v-radio>
						<v-radio label="Others" value="radio-6"></v-radio>
					</v-radio-group>
				</v-flex>

				<v-flex xs12 lg6 class="pr-4">
					<v-combobox prepend-icon="work" :items="items" label="Occupation"></v-combobox>
				</v-flex>
			</v-layout>

			<v-layout row wrap class="pl-4">
				<v-flex xs3 lg4 class="pr-2">
					<v-text-field prepend-icon="fas fa-mobile-alt" v-model="phone" :rules="phoneRules" label="Mobile Number" mask="phone" required></v-text-field>
				</v-flex>
				<v-flex xs3 lg4 class="pl-2">
					<v-text-field prepend-icon="fab fa-whatsapp" label="Whatsapp Number" mask="phone"></v-text-field>
				</v-flex>
				<v-flex xs3 lg4>
					<v-checkbox label="Same As Phone Number"></v-checkbox>
				</v-flex>
			</v-layout>

			<v-layout row wrap class="pl-4">
				<v-flex xs12 lg6 class="pr-2">
					<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"></v-textarea>
				</v-flex>
				<v-flex xs6 lg6 class="pr-4">
					<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules" label="Email address" type="email"></v-text-field>
				</v-flex>
			</v-layout>
			<v-flex xs12 lg6 class="pl-4 pt-2">
				<v-combobox v-model="select" :items="purposes" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices"
				 persistent-hint clearable deletable-chips></v-combobox>
			</v-flex>
			<h3 class="pl-4 pt-4">Type Of Membership</h3>
			<v-layout row wrap xs6 class="pl-4">
				<v-checkbox class="ml-4" label="Gold"></v-checkbox>
				<v-checkbox label="Platinum"></v-checkbox>
			</v-layout>
			<h3 class="pl-4">Membership Duration</h3>
			<v-layout row wrap class="pl-4">
				<v-checkbox class="ml-4" label="Monthly"></v-checkbox>
				<v-checkbox label="Quaterly"></v-checkbox>
				<v-checkbox label="Half-Yearly"></v-checkbox>
				<v-checkbox label="Yearly"></v-checkbox>
			</v-layout>
			<v-card width="100%" height="50px" color="transparent">
				<div class="right pr-2"> 
					<v-btn dark>Cancel</v-btn>
					<v-btn dark color="orange darken-4" class="mb-2">Submit</v-btn>
				</div>
			</v-card>
		</v-card>
	</Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	firstname = ""
	phone = ""
	email = ""
	radioGroup2 = "radio-4"
	select = []
	purposes = [
		'General Fitness',
		'Lose Fat',
		'Gain Muscle',
		'Tone Up',
		'Sports Oriented',
		'Lifestyle',
		'Transform',
		'Specialized Training'
	]
	nameRules = [
		v => !!v || "Name is required",
		v => v.length <= 30 || "Name must be less than 30 characters",
	]
	items = [
		'Programming',
		'Design',
		'Vue',
		'Vuetify'
	]
	phoneRules = [
		v => !!v || "Number is required",
	]
	emailRules = [
		v => (v || '').match(/@/) || 'Please enter a valid email',
	]

	
}
</script>