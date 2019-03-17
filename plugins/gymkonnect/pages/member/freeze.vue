<template>
	<Layout>
		<v-toolbar>
			<v-layout row>
				<v-flex v-if="clientId" xs1 class="py-3"> <v-btn icon float @click="goBackSimon"><v-icon>arrow_back</v-icon></v-btn> </v-flex>
				<v-flex xs11 class="py-4"> <h1 class="text-xs-center"> <v-icon left>timer_off</v-icon> Membership Freezing </h1> </v-flex>
			</v-layout>
		</v-toolbar>
		<v-slide-y-transition mode="out-in">
			<v-layout v-if="!clientId" row wrap class="pa-4">
				<v-flex xs12>
					<v-autocomplete v-model="clientId" :items="Clients" :search-input.sync="clientSearch" :loading="clientSearching" clearable item-text="name" item-value="id" prepend-icon="search" :label="label" :placeholder="label" autofocus no-filter color="orange darken-2" auto-select-first>
						<v-list-tile slot="no-data">
							<v-list-tile-title v-text="'No User Found'"/>
						</v-list-tile>
						<template v-slot:item="{ item }">
							<v-avatar v-text="item.name.charAt(0)" size="30" color="orange darken-4" class="white--text font-weight-light"/>
							<v-list-tile-content class="ml-2 my-2">
								<v-list-tile-title> {{ item.name }} <v-icon small class="mr-1">phone</v-icon> <span v-html="item.mobile.replace(clientSearch, clientSearch.bold())"/> </v-list-tile-title>
								<v-list-tile-sub-title>
									<v-icon class="fas mr-1" small>fa-hashtag</v-icon> <span v-html="item.badgenumber.replace(clientSearch, clientSearch.bold())"/>
								</v-list-tile-sub-title>
							</v-list-tile-content>
						</template>
					</v-autocomplete>
				</v-flex>
			</v-layout>
			<v-layout v-else-if="clientDataLoading" row wrap class="pa-4">
				<v-flex xs12 style="padding-top:25vh"> <h1 class="text-xs-center"> <v-icon large left>person</v-icon> {{ clientName }}</h1> </v-flex>
				<v-flex xs1 md4/>
				<v-flex xs10 md4> <v-progress-linear :indeterminate="true" color="orange darken-2" /> </v-flex>
				<v-flex xs1 md4/>
			</v-layout>
			<div v-else>
				<v-layout row wrap class="pa-4">
					<v-flex xs12 class="elevation-10 mb-4"> <m-registration-step-finished :value="Client" /> </v-flex>
					<v-flex xs12 class="elevation-10 mb-4">
						<v-card>
							<h4 class="title pl-4 pt-2">Current Status</h4>
							<v-layout row wrap class="pl-4 pt-2">
								<v-flex xs6 md3 class="px-1"> <v-text-field box prepend-icon="fas fa-info-circle" value="Gold Solo" label="Current Program" readonly /> </v-flex>
								<v-flex xs6 md3 class="px-1"> <v-text-field box prepend-icon="fas fa-calendar-alt" value="Yearly" label="Current Package" readonly /> </v-flex>
								<v-flex xs6 md3 class="px-1"> <v-text-field box prepend-icon="event" value="21/12/2018" label="Package Start Date" readonly /> </v-flex>
								<v-flex xs6 md3 class="px-1"> <v-text-field box prepend-icon="event" value="20/12/2019" label="Package End Date" readonly /> </v-flex>
							</v-layout>

							<v-layout row wrap class="pl-4 pt-2">
								<v-flex xs3>
									<v-text-field box prepend-icon="fas fa-hourglass-start" value="40 days" label="No. of Days Freezing Eligible" readonly ></v-text-field>
								</v-flex>
								<v-flex xs3 class="pl-4">
									<v-text-field box prepend-icon="fas fa-hourglass-half" value="5 days" label="No. of Days Freezing Used" readonly ></v-text-field>
								</v-flex>
							</v-layout>
							<v-divider></v-divider>

							<h4 class="title pl-4 pt-4">Let's Freeze</h4>
							<v-layout row wrap class="pl-4 pt-2">
								<v-flex xs3 class="mb-2">
									<v-menu ref="freeze1" :close-on-content-click="false" v-model="freeze1" :nudge-right="40" lazy transition="scale-transition"
									offset-y full-width max-width="290px" min-width="290px">
										<v-text-field slot="activator" v-model="startDateFormatted" label="Freezing Start Date"
										hint="DD/MM/YYYY format" persistent-hint prepend-icon="event" @blur="startDate = parseDate(startDateFormatted)"></v-text-field>
										<v-date-picker v-model="startDate" no-title @input="freeze1 = false" :min="minStartDate"></v-date-picker>
									</v-menu>
								</v-flex>
								<v-flex xs3 class="pl-4 mb-2">
									<v-menu ref="freeze2" :close-on-content-click="false" v-model="freeze2" :nudge-right="40" lazy transition="scale-transition"
										offset-y full-width>
										<v-text-field slot="activator" v-model="endDateFormatted" label="Freezing End Date" hint="DD/MM/YYYY" persistent-hint prepend-icon="event" @blur="date = parseDate(endDateFormatted)"></v-text-field>
										<v-date-picker  v-model="endDate" no-title @input="freeze2 = false"  :min="minEndDate"></v-date-picker>
									</v-menu>
								</v-flex>
								<v-flex xs3 class="pl-4">
									<v-text-field box prepend-icon="fas fa-calendar-minus" :value="period" label="Freezing Period" readonly :rules="freezingPeriod" ></v-text-field>
								</v-flex>
							</v-layout>

						</v-card>
					</v-flex>
				</v-layout>
				<v-footer height="auto" color="primary lighten-1" >
					<v-layout justify-center row justify-end align-end class="px-4 py-2">
						<v-spacer />
						<v-btn v-if="payed" outline> <v-icon left>print</v-icon> Print Reciept </v-btn>
						<v-btn v-else :loading="paying" :disable="paying" color="orange darken-4" class="white--text" @click.native.stop="paymentModel = true"> <v-icon class="fas" left>fa-cash-register</v-icon> Make Payment </v-btn>
					</v-layout>
				</v-footer>
				<single-payment-modal v-model="paymentModel" :users="{ renew: Client }" :transaction="transactionData" :group="grouping" @pay="data => pay(data)" bill-title="Membership Renewal Bill"/>
			</div>
		</v-slide-y-transition>
	</Layout>
</template>