<template>
	<v-card class="px-2" color="transparent">
		<v-layout row wrap>
			<v-flex xs9>
				<v-form lazy-validation ref="form" v-model="formValid">
					<v-layout row wrap>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field prepend-icon="fas fa-user" v-model="firstName" :rules="rules.firstName" counter maxlength="15" label="First Name" required :readonly="Readonly" color="orange darken-2" autofocus/>
						</v-flex>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field v-model="middleName" counter maxlength="15" label="Middle Name" :readonly="Readonly" color="orange darken-2" />
						</v-flex>
						<v-flex xs12 lg4 class="px-1">
							<v-text-field v-model="lastName" counter maxlength="15" label="Last Name" :readonly="Readonly" color="orange darken-2" />
						</v-flex>

						<v-flex xs12 lg6 class="px-2">
							<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="gender" row>
								<v-radio v-for="(value, name) in GENDERS" :label="name" :value="value" :key="value" :readonly="Readonly" color="orange darken-2"/>
							</v-radio-group>
						</v-flex>
						<v-flex xs12 lg6 class="px-2">
							<v-text-field color="orange darken-2" v-model="dobFormatted" @blur="dob = parseDate(dobFormatted)" @click:prepend="dobMenu = true" label="Date of Joining" placeholder="DD/MM/YYYY" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
							<v-menu ref="dobMenu" :close-on-content-click="false" v-model="dobMenu" lazy transition="scale-transition" >
								<div slot="activator" data-id="dob"/>
								<v-date-picker v-model="dob" no-title @input="dobMenu = false"  color="orange darken-2"/>
							</v-menu>
						</v-flex>

						<v-flex xs12 lg6 class="px-2">
							<v-select v-model="idType" prepend-icon="fas fa-id-card" :items="IDTypes" item-text="name" item-value="id" label="ID Proof" :readonly="Readonly"  color="orange darken-2"/>
						</v-flex>
						<v-flex xs12 lg6 class="px-2">
							<v-text-field v-model="idNumber" prepend-icon="fas fa-hashtag" label="ID Number" required :rules="rules.idNumber" :readonly="Readonly"  color="orange darken-2"/>
						</v-flex>

						<v-flex xs12 lg6 class="px-2">
							<v-select v-model="occupation" prepend-icon="work" :items="Occupations" item-text="name" item-value="id" label="Occupation"  :readonly="Readonly" color="orange darken-2"/>
						</v-flex>

						<v-flex xs12 class="px-2">
							<v-text-field v-model="badgenumber" label="Member ID" placeholder="Enter or Generate Member Id" prepend-icon="fas fa-hashtag">
								<v-fade-transition slot="append">
									<v-btn dark :loading="loading" :disabled="loading" color="secondary" @click.native.stop="generateMemberId">Generate</v-btn>
								</v-fade-transition>
							</v-text-field>
						</v-flex>

					</v-layout>
				</v-form>
			</v-flex>
			<v-flex xs3 class="pa-4">
				<import-from-enquiry v-show="allowImportFromEnquiry" @badgenumber="b => {badgenumber = b}" title="Import Details from Enquiry">
					<v-btn outline block slot="activator" color="orange darken-4">Import from Enquiry</v-btn>
				</import-from-enquiry>
				<add-user-photo v-model="photo" :Readonly="Readonly"/>
			</v-flex>
		</v-layout>
		<v-card-actions>
			<v-btn dark @click.native.stop="formReset" tabindex="-1"> <v-icon left>close</v-icon> Cancel</v-btn>
			<v-spacer />
			<v-btn dark color="orange darken-4" @click.native.stop="formNext" :loading="saving" :disabled="saving"> <v-icon left>done</v-icon> NEXT </v-btn>
		</v-card-actions>
	</v-card>
</template>