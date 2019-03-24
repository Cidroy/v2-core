<template>
	<v-container fill-height fluid>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md6 lg4>
				<v-card class="elevation-10 pa-3" dark>
					<v-tooltip left>
						<template #activator="{ on }">
							<v-btn flat icon absolute right style="z-index:3000" v-on="on" @click.native.stop="exit"> <v-icon>close</v-icon> </v-btn>
						</template>
						<span>Exit Application</span>
					</v-tooltip>
					<v-img :src="logo" contain max-height="100"/>
					<h3 class="text-xs-center">GymKonnect</h3>
					<v-form ref="loginForm">
						<v-layout row wrap>
							<v-flex xs12>
								<v-autocomplete v-model="username" :items="Usernames" :loading="loadingUsers" label="Username" placeholder="Username" prepend-icon="person" color="orange darken-2" autofocus auto-select-first :rules="rules.username" no-data-text="Unavailable"/>
							</v-flex>
							<v-flex xs12>
								<v-slide-y-transition mode="out-in">
									<v-text-field v-if="PasswordPrefered" v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'visibility_off' : 'visibility'" @click:append="showPassword = !showPassword"  prepend-icon="lock" append-outer-icon="dialpad" @click:append-outer="changeLoginPreferrence(PASSWORD_PREFERENCE.PIN)" color="orange darken-2" :rules="rules.password"/>
									<v-text-field v-else v-model="password" label="Pin" mask="############" prepend-icon="dialpad" type="password" append-outer-icon="vpn_key" @click:append-outer="changeLoginPreferrence(PASSWORD_PREFERENCE.PASSWORD)" color="orange darken-2" :rules="rules.pin"/>
								</v-slide-y-transition>
							</v-flex>
							<v-btn @click.native.stop="login" v-text="'login'" color="orange darken-2" block medium :disabled="loggingIn" :loading="loggingIn"/>
						</v-layout>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
		<v-dialog v-model="loggingIn" persistent width="300" >
			<v-card color="orange darken-4" dark>
				<v-card-text>
					Please Wait
					<v-progress-linear indeterminate color="white" class="mb-0" />
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container>
</template>