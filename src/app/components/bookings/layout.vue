<template>
	<div>
		<v-layout row wrap>
			<v-form lazy-validation ref="form" v-model="formValid">
				<v-layout class="pl-4 pt-2" row wrap>
					<v-flex lg3 class="mr-3">
						<v-text-field v-model="firstName" prepend-icon="fas fa-user" counter maxlength="15"
							label="First Name" required :rules="rules.firstName"></v-text-field>
					</v-flex>
					<v-flex lg3 class="mr-3">
						<v-text-field v-model="middleName" counter maxlength="15" label="Middle Name"></v-text-field>
					</v-flex>
					<v-flex lg3 class="mr-3">
						<v-text-field counter maxlength="15" label="Last Name" :rules="rules.lastName"
							v-model="lastName"></v-text-field>
					</v-flex>
				</v-layout>

				<v-layout row wrap class="pl-4">
					<v-flex xs6>
						<v-radio-group prepend-icon="fas fa-transgender-alt" label="Gender" v-model="radioGroup1" row>
							<v-radio v-for="(name, value) in GENDERS" :label="name" :value="value" :key="value"
								:readonly="Readonly"></v-radio>
						</v-radio-group>
					</v-flex>

					<v-flex xs4>
						<v-combobox prepend-icon="work" :items="items" label="Occupation"></v-combobox>
					</v-flex>

					<v-flex xs6 lg6 class="pr-4">
						<v-text-field prepend-icon="fas fa-envelope" v-model="email" :rules="emailRules"
							label="Email address" type="email"></v-text-field>
					</v-flex>

					<v-flex xs3>
						<v-text-field v-model="whatsappNumber" prepend-icon="fab fa-whatsapp" label="Whatsapp Number"
							mask="##########" :rules="rules.phone"></v-text-field>
					</v-flex>
					<v-flex xs3>
						<v-checkbox label="Same As Phone Number"></v-checkbox>
					</v-flex>

					<v-flex xs6 class="pr-4">
						<v-textarea prepend-icon="place" name="input-7-1" label="Residential Address"
							:rules="rules.address"></v-textarea>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>

				<v-layout row wrap class="pt-4 pl-4">
					<v-flex xs12>
						<h4 class="title">Select SPA Plan</h4>
					</v-flex>

					<v-flex xs12>
						<v-radio-group v-model="radios1" :mandatory="false">
							<v-layout row align-start>
								<v-radio v-for="(name, value) in GENDERS" :label="name" :value="value" :key="value"
									:readonly="Readonly"></v-radio>
							</v-layout>
						</v-radio-group>
					</v-flex>
				</v-layout>

				<v-card width="100%" height="50px" color="transparent">
					<div class="right pr-2">
						<v-btn dark @click.native.stop="formReset">Cancel</v-btn>
						<v-btn dark color="orange darken-4" @click.native.stop="Submit" class="mb-2">Submit</v-btn>
					</div>
				</v-card>
			</v-form>
		</v-layout>

		<v-btn v-show="showDelete" @click.native.stop="deleteLayout" flat float>
			<v-icon>close</v-icon>
		</v-btn>
	</div>
</template>