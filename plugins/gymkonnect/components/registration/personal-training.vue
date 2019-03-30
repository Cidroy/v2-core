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
							<v-list-tile-title> {{ item.name }} <v-icon small class="mr-1">phone</v-icon> <span v-html="clientSearch?item.mobile.replace(clientSearch, clientSearch.bold()):item.mobile"/> </v-list-tile-title>
							<v-list-tile-sub-title>
								<v-icon class="fas mr-1" small>fa-hashtag</v-icon> <span v-html="clientSearch?item.badgenumber.replace(clientSearch, clientSearch.bold()):item.badgenumber"/>
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
				<step-finished v-else-if="clientId" :value="clientData" class="elevation-10">
						<v-divider />
						<v-layout row wrap class="mt-2 px-2">
							<v-flex xs12> <h2> <v-icon left>timer</v-icon> Current Package </h2> </v-flex>
							<v-flex xs12 md6 class="px-2"> <v-text-field :value="Current.Membership.name" label="Current Membership" tabindex="-1" prepend-icon="fas fa-info-circle" readonly /> </v-flex>
							<v-flex xs12 md6 class="px-2"> <v-text-field :value="Current.Package.name" label="Current Package" tabindex="-1" prepend-icon="fas fa-calendar-alt" readonly /> </v-flex>
							<v-flex xs12 md6 class="px-2"> <v-text-field :value="formatDate(Current.StartDate)" label="Package Start Date" tabindex="-1" prepend-icon="event" readonly /> </v-flex>
							<v-flex xs12 md6 class="px-2"> <v-text-field :value="formatDate(Current.EndDate)" label="Package End Date" tabindex="-1" prepend-icon="event" readonly /> </v-flex>
						</v-layout>
				</step-finished>
				<v-layout row wrap class="pa-4" v-else>
					<v-flex xs12 class="pa-4">
						<h2 class="text-xs-center"> <v-icon left>warning</v-icon> Please select a Member</h2>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs12 class="my-2 mt-4">
				<v-card class="elevation-10 px-4" color="transparent">
					<v-layout row wrap>
						<v-flex xs12 md9>
							<v-radio-group :prepend-icon="UsersCount===1?'person':'people'" label="Booking for" v-model="grouping" row>
								<v-radio v-for="(grouping, index) in GROUPINGS" :label="grouping.name" :value="grouping.id" :key="index" color="orange darken-2"/>
							</v-radio-group>
						</v-flex>
						<v-flex xs12 md3 class="px-2">
							<v-text-field color="orange darken-2" v-model="dojFormatted" @blur="doj = parseDate(dojFormatted)" @click:prepend="dojMenu = true" label="Date of Joining" placeholder="DD/MM/YYYY" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
							<v-menu ref="dojMenu" :close-on-content-click="false" v-model="dojMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width>
								<div slot="activator"/>
								<v-date-picker v-model="doj" :min="minDoj" :max="maxDoj" no-title @input="dojMenu = false"  color="orange darken-2"/>
							</v-menu>
							<v-checkbox class="ma-0" label="Allow Back Dates" v-model="allowBackDating" color="orange"/>
						</v-flex>

						<v-flex xs12 class="mb-2"> <v-divider/> </v-flex>
						<v-flex xs12>
							<h3>Purpose for Personal Training</h3>
							<v-layout align-start row wrap>
								<v-flex v-for="(purpose, index) in PURPOSES" :key="index" xs12 sm6 md4> <v-checkbox v-model="purposes" :value="purpose.id" :label="purpose.name" color="orange darken-2"/> </v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs12 class="mb-2"> <v-divider/> </v-flex>
						<v-flex xs12>
							<h3>Personal Training Program</h3>
							<v-radio-group v-model="packagex" row>
								<v-radio v-for="(Xpackage, index) in PACKAGES" :label="Xpackage.name" :value="Xpackage.id" :key="index" color="orange darken-2"/>
							</v-radio-group>
						</v-flex>
						<v-flex xs12 class="mb-2"> <v-divider/> </v-flex>
						<v-flex xs12>
							<h3>Trainer Type</h3>
							<v-radio-group v-model="trainerType" row>
								<v-radio v-for="(XtrainerType, index) in TRAINER_TYPES" :label="XtrainerType.name" :value="XtrainerType.id" :key="index" color="orange darken-2"/>
							</v-radio-group>
						</v-flex>
						<v-flex xs12 class="mb-2"> <v-divider/> </v-flex>
						<v-flex xs12>
							<h3>Preffered Time</h3>
							<v-layout row wrap>
								<v-flex xs12 lg6 class="px-2">
									<v-text-field color="orange darken-2" v-model="timeFrom" @click:prepend="timeFromMenu = true" label="From" prepend-icon="event" mask="##:##" return-masked-value persistent-hint />
									<v-menu v-model="timeFromMenu" ref="timeFromMenu" :close-on-content-click="false" lazy transition="scale-transition" >
										<div slot="activator" data-id="timeFrom"/>
										<v-time-picker v-model="timeFrom" @input="timeFromMenu = false"  color="orange darken-2"/>
									</v-menu>
								</v-flex>
								<v-flex xs12 lg6 class="px-2">
									<v-text-field color="orange darken-2" v-model="timeTo" @click:prepend="timeToMenu = true" label="From" prepend-icon="event" mask="##:##" return-masked-value persistent-hint />
									<v-menu v-model="timeToMenu" ref="timeToMenu" :close-on-content-click="false" lazy transition="scale-transition" >
										<div slot="activator" data-id="timeTo"/>
										<v-time-picker v-model="timeTo" @input="timeToMenu = false"  color="orange darken-2"/>
									</v-menu>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
					<v-flex xs12 class="mb-2"> <v-divider/> </v-flex>
					<v-slide-y-reverse-transition>
						<v-alert v-if="!!error" color="red darken-3" type="error" :value="true" >{{ error }}</v-alert>
					</v-slide-y-reverse-transition>
					<v-card-actions>
						<v-layout row wrap>
							<v-flex xs12 lg3> <v-text-field v-model="quantity" :min="QuantityMin" :max="QuantityMax" type="number" label="Quantity" prepend-icon="add" color="orange darken-2" /> </v-flex>
							<v-spacer />
							<v-flex xs12 lg3 class="px-2"> <v-text-field v-model="price" tabindex="-1" label="SubTotal" prefix="₹" :suffix="`X ${quantity}`" readonly color="orange darken-2"/> </v-flex>
							<v-flex xs12 lg3 class="px-2"> <v-text-field :value="Amount" :loading="priceLoading" label="Total" prefix="₹" outline readonly color="orange darken-2"/> </v-flex>
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
		<general-payment-modal v-model="paymentModel" @pay="data => pay(data)" :User="clientData" DateTitle="Billing Date" :Qty="quantity" :Price="price" :Amount="Amount" :Description="PaymentDescription" />
	</div>
</template>