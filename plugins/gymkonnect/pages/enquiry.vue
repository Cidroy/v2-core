<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> Enquiry </h1> </v-flex>
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
				<v-flex xs12 md9>
					<v-radio-group :prepend-icon="usersCount===1?'person':'people'" label="Registration Type" v-model="grouping" row>
						<v-radio v-for="(grouping, index) in GROUPINGS" :label="grouping.name" :value="grouping.id" :key="index" color="orange darken-2"/>
					</v-radio-group>
				</v-flex>
				<v-flex xs12 md3 v-if="allowAddPeople || allowDeletePeople">
					<h3 class="text-xs-right py-2">
						<v-btn small flat icon :disabled="!allowDeletePeople" @click.native.stop="deletePeople(secondaryStepperIndex)"> <v-icon>remove</v-icon> </v-btn>
						{{ usersCount }} / {{ this.GROUPINGS[this.groupIndex].max }} People
						<v-btn small flat icon :disabled="!allowAddPeople" @click.native.stop="addPeople"> <v-icon>add</v-icon> </v-btn>
					</h3>
				</v-flex>
				<v-flex xs12 md2 v-else> <h3 class="text-xs-right py-2">{{ usersCount }} {{ usersCount===1?"Person":"People" }}</h3> </v-flex>
			</v-layout>
		</v-toolbar>
		<v-layout row wrap class="pa-4 pb-5">
			<v-flex xs12 class="pb-4"> <stepper v-model="users[primaryStepperIndex]" class="elevation-10" @deleteStepper="()=>{ deleteStepper(primaryStepperIndex) }" @finished="clientId => stepperComplete(primaryStepperIndex, clientId)" :exclude="['badgenumber']"/> </v-flex>
			<v-flex xs12 class="elevation-10 mb-4"> <step-three v-model="transactionData" :group="grouping" :quantity="usersCount" @error="(e) => { error = e }" /> </v-flex>
			<v-flex xs12 class="elevation-10 mb-4"> <step-four v-model="transactionData" :exclude="['toc']"/> </v-flex>
		</v-layout>
		<v-footer v-if="allSteppersComplete" height="auto" color="primary lighten-1" absolute bottom>
			<v-layout justify-center row justify-end align-end class="px-4 py-2">
				<v-spacer />
				<v-btn :loading="saving" :disable="saving" color="orange darken-4" class="white--text" @click.native.stop="save"> <v-icon left>save</v-icon> Save </v-btn>
			</v-layout>
		</v-footer>
	</Layout>
</template>