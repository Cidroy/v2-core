<template>
	<div>
		<v-layout row wrap class="px-4 py-2">
			<v-flex xs12 class="my-2">
				<v-autocomplete v-model="clientId" :items="Clients" :search-input.sync="clientSearch" :loading="clientSearching" :label="label" clearable item-text="name" item-value="id" prepend-icon="search" :placeholder="label" autofocus no-filter color="orange darken-2" auto-select-first>
					<v-list-tile slot="no-data">
						<v-list-tile-title v-text="'No User Found'"/>
					</v-list-tile>
					<template #item="{ item }">
						<v-avatar v-text="item.name.charAt(0)" size="30" color="orange darken-4" class="white--text font-weight-light"/>
						<v-list-tile-content class="ml-2 my-2">
							<v-list-tile-title> {{ item.name }} <v-icon small class="mr-1">phone</v-icon> <span v-html="clientSearch?(item.mobile || '').replace(clientSearch, clientSearch.bold()):item.mobile"/> </v-list-tile-title>
							<v-list-tile-sub-title>
								<v-icon class="fas mr-1" small>fa-hashtag</v-icon> <span v-html="clientSearch?(item.badgenumber || '').replace(clientSearch, clientSearch.bold()):item.badgenumber"/>
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</template>

				</v-autocomplete>
			</v-flex>
			<v-flex xs12 class="my-2">
				<v-layout v-if="clientDataLoading" row wrap>
					<v-flex xs12 style="padding-top:10vh"> <h1 class="text-xs-center"> <v-icon large left>person</v-icon> {{ clientName }}</h1> </v-flex>
					<v-flex xs1 md4/>
					<v-flex xs10 md4> <v-progress-linear :indeterminate="true" color="orange darken-2" /> </v-flex>
					<v-flex xs1 md4/>
				</v-layout>
				<step-finished v-else-if="clientId" :value="clientData" class="elevation-10"/>
				<stepper v-else v-model="clientData" @finished="clientId => stepperComplete(clientId)" class="elevation-10"/>
			</v-flex>
			<v-flex xs12 class="my-2 mt-4">
				<v-card class="elevation-10 px-4" color="transparent">
					<v-layout>
						<v-flex xs12 lg6 md8 pt-2 pr-2>
							<v-sheet height="400">
								<v-calendar
								:now="today"
								:value="today"
								color="primary"
								>
								<template v-slot:day="{ present, past, date }">
									<v-layout
									fill-height
									>
									<template v-if="past && tracked[date]">
										<v-sheet
										v-for="(percent, i) in tracked[date]"
										:key="i"
										:title="category[i]"
										:color="colors[i]"
										:width="`${percent}%`"
										height="100%"
										tile
										></v-sheet>
									</template>
									</v-layout>
								</template>
									<!--popup-->
									<!--popup-->

								</v-calendar>
							</v-sheet>
						</v-flex>
						<v-flex row wrap>
							<v-flex xs12 md8>
								<v-radio-group :prepend-icon="UsersCount===1?'person':'people'" label="Booking for" v-model="grouping" row>
									<v-radio v-for="(grouping, index) in GROUPINGS" :label="grouping.name" :value="grouping.id" :key="index" color="orange darken-2"/>
								</v-radio-group>
							</v-flex>
							<v-layout>
								<v-flex xs12 md4 class="px-2">
									<v-text-field color="orange darken-2" v-model="dojFormatted" @blur="doj = parseDate(dojFormatted)" @click:prepend="dojMenu = true" label="Preffered Date" placeholder="DD/MM/YYYY" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
									<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
										<div slot="activator"/>
										<v-date-picker v-model="doj" :min="minDoj" :max="maxDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
									</v-menu>
									<!--v-checkbox class="ma-0" label="Allow Back Dates" v-model="allowBackDating" color="orange"/-->
								</v-flex>
								<v-flex xs12 md4 class="px-2">
									<v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy	full-width	width="290px">
										<template v-slot:activator="{ on }">
										<v-text-field v-model="time" label="Preffered Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
										</template>
										<v-time-picker v-if="modal2" v-model="time" full-width>
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
										<v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
										</v-time-picker>
									</v-dialog>
								</v-flex>
							</v-layout>

							<!-- TODO: add time picker for preffered time slot -->
							<v-flex xs12 class="mb-3"> <v-divider /> </v-flex>
							<v-flex xs12>
								<h3> <v-icon left>add</v-icon> Amenities</h3>
								<v-layout align-start row>
									<v-checkbox v-for="(amenity, index) in AMENITIES" :key="index" v-model="amenities" :value="amenity.id" :label="amenity.name" color="orange darken-2"/>
								</v-layout>
							</v-flex>
						</v-flex>
					</v-layout>
					<v-slide-y-reverse-transition>
						<v-alert v-if="!!error" color="red darken-3" type="error" :value="true" >{{ error }}</v-alert>
					</v-slide-y-reverse-transition>
					<v-card-actions>
						<v-layout row wrap>
							<v-flex xs12 lg3> <v-text-field v-model="attendeeCount" :min="AttendeeMin" :max="AttendeeMax" type="number" label="Total Attendees" prepend-icon="people" color="orange darken-2" /> </v-flex>
							<v-spacer />
							<v-flex xs12 lg3 class="px-2"> <v-text-field :value="amount" :loading="priceLoading" label="Total" prefix="₹" outline readonly color="orange darken-2"/> </v-flex>
						</v-layout>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
		<v-footer v-if="clientId && !error" height="auto" color="primary lighten-1" >
			<v-layout justify-center row justify-end align-end class="px-4 py-2">
				<v-btn :loading="paying" :disable="paying" color="darken-4" class="white--text" @click.native.stop="pay()"> <v-icon class="fas" left>fa-cash-register</v-icon> Book without Payment </v-btn>
				<v-spacer />
				<v-btn :loading="paying" :disable="paying" color="orange darken-4" class="white--text" @click.native.stop="paymentModel = true"> <v-icon class="fas" left>fa-cash-register</v-icon> Make Payment </v-btn>
			</v-layout>
		</v-footer>
		<spa-booking-modal v-model="paymentModel" :users="{ spaBooker: clientData }" :transaction="transaction" @pay="data => pay(data)" />
	</div>
</template>

