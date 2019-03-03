<template>
				<v-card width="30%" color="transparent" height="500px">
					<v-layout pt-2 class="justify-center" row wrap>

						<h3>Forgot Password</h3>

						<h3 mt-5>Enter the registered Email ID</h3>

					</v-layout>

					<v-layout pt-5 class="justify-center" row wrap>
						<v-flex lg9>
							<v-text-field v-model="email" placeholder="Email ID" single-line required :rules="emailRules"></v-text-field>
						</v-flex>

						<v-dialog v-model="dialog" persistent max-width="400px">
							<v-btn dark slot="activator" color="orange darken-4" class="mt-5">Submit</v-btn>
							<v-card>
									<v-toolbar card dark color="orange darken-4" height="50px">
										<v-toolbar-title>Alert!</v-toolbar-title>
									</v-toolbar>
									<v-card-text>
										<label class="title">Check Your Email</label>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn dark color="orange darken-4" @click="dialog = false">OK</v-btn>
									</v-card-actions>
							</v-card>
						</v-dialog>

					</v-layout>
				</v-card>
</template>
