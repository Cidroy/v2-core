<template>
	<v-card class="pa-4" color="transparent">
		<v-layout row wrap>
			<v-flex xs9>
				<v-layout row wrap>
					<v-flex xs12 class="pr-2">
						<v-text-field prepend-icon="fas fa-user" v-model="fullName" label="Full Name" readonly tabindex="-1" color="orange darken-2"/>
					</v-flex>
					

					<v-flex xs12 lg6 class="pr-2"> <v-text-field prepend-icon="fas fa-transgender-alt" :value="GENDERS[gender]" label="Gender" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="pl-2"> <v-text-field v-model="dobFormattedDate" label="Date of Birth" placeholder="Date of Birth" persistent-hint prepend-icon="event" readonly tabindex="-1" color="orange darken-2"/> </v-flex>

					<v-flex xs12 lg6 class="pr-2"> <v-text-field prepend-icon="fas fa-mobile-alt" v-model="mobile" label="Mobile Number" mask="##### ##### #####" readonly tabindex="-1" color="orange darken-2"/> </v-flex>
					<v-flex xs12 lg6 class="pl-2"> <v-text-field prepend-icon="fab fa-whatsapp" v-model="whatsappNumber" label="Whatsapp Number" mask="##### ##### #####" readonly tabindex="-1" color="orange darken-2" /> </v-flex>
					<v-flex xs12 class="pr-2">
						<v-text-field prepend-icon="fas fa-envelope" v-model="email" label="Email address" type="email" readonly tabindex="-1" color="orange darken-2" />
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs3 class="pa-4">
				<v-flex xs12 lg10 class="pl-2">
					<v-text-field v-model="badgenumber" prepend-icon="fas fa-hashtag" label="Badge Number" readonly tabindex="-1" color="orange darken-2"/>
				</v-flex>
				<add-user-photo v-model="photo" :Readonly="true"/>
			</v-flex>
		</v-layout>
	</v-card>
</template>