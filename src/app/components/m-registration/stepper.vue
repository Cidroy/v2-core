<template>
	<div>
		<v-stepper v-if="!finished" v-model="step">
			<v-stepper-header>
				<v-stepper-step :editable="step > 1" :complete="step > 1" step="1">Personal Details </v-stepper-step> <v-divider />
				<v-stepper-step :editable="step > 2" :complete="step > 2" step="2">Contact Details</v-stepper-step> <v-divider />
				<v-divider v-show="showDelete" />
				<v-btn v-show="showDelete" @click.native.stop="deleteStepper" flat float> <v-icon>close</v-icon> </v-btn>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1"> <step-one v-model="userData" @nextStep="step2" allowImportFromEnquiry/> </v-stepper-content>
				<v-stepper-content step="2"> <step-two v-model="userData" @nextStep="finish"/>   </v-stepper-content>
			</v-stepper-items>
		</v-stepper>
		<step-finished v-model="userData" v-else />
	</div>
</template>