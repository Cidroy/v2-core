<template>
	<v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
		<v-card class="grey darken-4">
			<v-toolbar>
				<v-flex xs12 class="py-4"> <h1 class="text-xs-center"> Profile </h1> </v-flex>
				<v-layout justify-end>
					<v-btn @click="showModal = false" icon> <v-icon>close</v-icon> </v-btn>
				</v-layout>
			</v-toolbar>
			<v-layout xs12>
				<v-flex xs2 row wrap>

					<v-layout pt-2 class="justify-center">

							<v-avatar size="200">
							<v-img :src="cards[0].src" height="200px" />
							</v-avatar>
					</v-layout>
					<v-layout row wrap>
						<v-list class="grey darken-4">
							<v-list-tile  v-for="(item, index) in profileList" :key="index">
								<v-list-tile-title>{{ item.text }}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-layout>
					<v-layout  class="justify-center">
						<v-btn>Send SMS</v-btn>
						<v-btn>Send Email</v-btn>
					</v-layout>
										
				</v-flex>
				<v-flex xs5 row wrap>
					<v-card>
								Gender dob
					</v-card>
					<v-card>
								 dob
					</v-card>
				</v-flex>
				<v-flex xs5 row wrap>
					<v-card>
								Gender dob
					</v-card>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>
