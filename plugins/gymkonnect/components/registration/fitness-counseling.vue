<template>
	<div>
		<v-dialog ref="datePicker" v-model="dojMenu" :return-value.sync="doj" persistent lazy full-width width="460px">
			<div slot="activator"/>
			<v-date-picker v-model="doj" scrollable color="orange darken-2" :min="MinSessionDate" :max="MaxSessionDate" landscape>
				<v-spacer />
				<v-btn flat color="orange darken-2" @click="dojMenu = false">Cancel</v-btn>
				<v-btn flat color="orange darken-2" @click="$refs.datePicker.save(doj)">OK</v-btn>
			</v-date-picker>
		</v-dialog>
		<!-- <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width width="290px">
			<div slot="activator" />
			<v-time-picker v-if="modal2" v-model="time" full-width landscape>
				<v-spacer />
				<v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
				<v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
			</v-time-picker>
		</v-dialog> -->
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
				<step-finished v-else-if="clientId" :value="clientData" class="elevation-10"/>
				<stepper v-else v-model="clientData" @finished="clientId => stepperComplete(clientId)" class="elevation-10"/>
			</v-flex>
			<v-flex xs12 class="my-2 mt-4">
				<v-card class="elevation-10 px-4" color="transparent">
					<v-layout row wrap>
						<v-flex xs12>
							<h3> Purpose of taking counselling:</h3>
							<v-layout align-start row>
								<v-checkbox v-model="purposes" v-for="(purpose,index) in PURPOSES" :key="index" :value="purpose.id" :label="purpose.name" color="orange darken-2"/>
							</v-layout>
						</v-flex>
					<v-flex xs12 md8>
						<v-radio-group label="Type of Counsellor:" row>
							<v-radio v-for="(XtrainerType, index) in COUNSELLORS" :label="XtrainerType.name" :value="XtrainerType.id" :key="index" color="orange darken-2"/>
						</v-radio-group>
					</v-flex>
					<v-flex xs12><v-text-field v-model="sessionCount" :min="MinSessionCount" :max="MaxSessionCount" type="number" label="No. of session"/></v-flex>
					<v-flex xs12>
						<v-layout row wrap class="hide-xs-lower">
							<v-flex xs6> <h3 class="text-xs-center underline">Counselling Date</h3> </v-flex>
							<v-flex xs6> <h3 class="text-xs-center underline">Counselling Time</h3> </v-flex>
						</v-layout>
						<v-layout row wrap v-for="(session, key) in sessions"  :key="`session-${key}`">
								<v-flex xs12 md6 class="px-2"> <v-text-field v-model="sessions[key].dateFormatted" @blur="sessions[key].date = parseDate(sessions[key].dateFormatted)" @click:prepend="showDatePicker(key)" color="orange darken-2" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint /> </v-flex>
								<v-flex xs11 md5 class="px-2"> <v-text-field v-model="sessions[key].time" @click:prepend="showTimePicker(key)" color="orange darken-2" prepend-icon="event" mask="##:##" return-masked-value /> </v-flex>
								<v-flex v-if="SessionsCount > MinSessionCount" xs1> <v-btn @click.native.stop="deleteSession(key)" icon small flat> <v-icon>cancel</v-icon> </v-btn> </v-flex>
						</v-layout>
					</v-flex>
					</v-layout>
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
	</div>
</template>