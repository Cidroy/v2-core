<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> Member Registration </h1> </v-flex>
				<v-flex xs12 md5>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn outline slot="activator" :disabled="printingBlank" :loading="printingBlank" @click.native.stop="printBlank"> <v-icon>print</v-icon> </v-btn>
							<span>Print Blank Form</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout slot="extension" class="px-2">
				<v-flex xs12 md10>
					<v-radio-group :prepend-icon="usersCount===1?'person':'people'" label="Registration Type" v-model="grouping" row>
						<v-radio v-for="(grouping, index) in GROUPINGS" :label="grouping.name" :value="grouping.id" :key="index" color="orange darken-2"/>
					</v-radio-group>
				</v-flex>
				<v-flex xs12 md2 v-if="allowAddPeople || allowDeletePeople"> <h3 class="text-xs-right py-2">{{ usersCount }} / {{ this.GROUPINGS[this.groupIndex].max }} People</h3> </v-flex>
				<v-flex xs12 md2 v-else> <h3 class="text-xs-right py-2">{{ usersCount }} {{ usersCount===1?"Person":"People" }}</h3> </v-flex>
			</v-layout>
		</v-toolbar>
		<v-layout row wrap class="pa-4">
			<v-flex xs12 v-for="(user, index) in users" :key="index" class="pb-4">
				<h2 v-if="usersCount>1" v-text="`Person #${getIndex(index)}`"/>
				<stepper v-model="users[index]" class="elevation-10" :showDelete="allowDeletePeople" @deleteStepper="()=>{ deleteStepper(index) }" @finished="clientId => stepperComplete(index, clientId)"/>
			</v-flex>
			<v-flex xs12 v-show="allowAddPeople" class="mb-4"> <v-btn @click.native.stop="addPeople" flat block large outline> <v-icon left>add</v-icon> Add People </v-btn> </v-flex>
			<v-flex xs12 class="elevation-10 mb-4"> <step-three v-model="transactionData" :group="grouping" :quantity="usersCount" @error="(e) => { error = e }" /> </v-flex>
			<v-flex xs12 class="elevation-10 mb-4"> <step-four v-model="transactionData" /> </v-flex>
		</v-layout>
		<payment-single v-model="paymentModel" :users="users" :transaction="transactionData" :group="grouping" @pay="data => pay(data)" bill-title="Registration Bill" add-admission-fee />
		<v-footer v-if="allSteppersComplete && !error" height="auto" color="primary lighten-1" >
			<v-layout justify-center row justify-end align-end class="px-4 py-2">
				<v-spacer />
				<v-btn :loading="paying" :disable="paying" color="orange darken-4" class="white--text" @click.native.stop="paymentModel = true"> <v-icon class="fas" left>fa-cash-register</v-icon> Make Payment </v-btn>
			</v-layout>
		</v-footer>
	</Layout>
</template>
