<template>
	<v-card color="transparent"  class="pa-4">
		<v-form lazy-validation ref="form" v-model="formValid">
			<v-layout row wrap>
				<v-flex xs12 lg6 class="px-2">
					<v-select v-model="category" prepend-icon="list" :items="Categories" item-text="name" item-value="id" label="Category" color="orange darken-2"/>
				</v-flex>
				<v-flex xs12 lg6 class="px-2">
					<v-text-field color="orange darken-2" v-model="dojFormatted" @blur="doj = parseDate(dojFormatted)" @click:prepend="dojMenu = true" label="Date of Joining" placeholder="DD/MM/YYYY" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
					<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
						<div slot="activator"/>
						<v-date-picker v-model="doj" :min="minDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
					</v-menu>
					<v-checkbox class="ma-0" label="Allow Back Dates" v-model="allowBackDating" color="orange"/>
				</v-flex>
				<v-flex xs12>
					<h3>Type Of Membership</h3>
					<v-layout row wrap class="ml-4">
						<v-checkbox v-for="mt in MEMBERSHIP_TYPES" :key="mt.id" v-model="membershipType" :label="mt.name" :value="mt.id" color="orange darken-2"/>
					</v-layout>
					<v-divider/>
				</v-flex>
				<v-flex xs12>
					<h3 class="pt-2">Membership Duration</h3>
					<v-layout row wrap class="ml-4">
						<v-checkbox v-model="packageType" v-for="Package in PACKAGES" :key="Package.id" :label="Package.name" :value="Package.id"  color="orange darken-2"/>
					</v-layout>
					<v-divider></v-divider>
				</v-flex>
				<v-flex xs12>
					<h3 class="pt-2">Preferable Time Slot:</h3>
					<v-layout row wrap class="ml-4">
						<v-radio-group v-model="timeSlot" :mandatory="false" row color="orange darken-2">
							<v-radio v-for="(slot, index) in TIME_SLOTS" :key="index" :label="slot.name" :value="slot.id"  color="orange darken-2"/>
						</v-radio-group>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-form>
		<v-card-actions>
			<v-layout row wrap>
				<v-flex xs12 lg3> <v-text-field v-model="packageMagnitude" type="number" label="Quantity" color="orange darken-2" :min="1" :max="packageMagnitudeMax" /> </v-flex>
				<v-flex xs12 lg3/>
				<v-flex xs12 lg3 class="px-2"> <v-text-field v-model="subTotal" tabindex="-1" label="SubTotal" prefix="₹" :suffix="`X ${quantity}`" readonly color="orange darken-2"/> </v-flex>
				<v-flex xs12 lg3 class="px-2"> <v-text-field v-model="total" label="Total" prefix="₹" outline readonly :loading="priceLoading" color="orange darken-2"/> </v-flex>
			</v-layout>
		</v-card-actions>
	</v-card>
</template>