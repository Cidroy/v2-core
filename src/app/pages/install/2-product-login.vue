<template>
	<v-layout column align-space-around justify-space-between fill-height>
		<v-dialog v-model="showErrorDialog" persistent max-width="300">
			<v-card>
				<v-card-title class="headline">
					<v-spacer />
					<v-icon large color="red" class="mr-2" v-text="'error'" />
					<v-spacer />
				</v-card-title>
				<v-card-text v-text="error" />
				<v-card-actions>
					<v-btn block flat @click.native.stop="error = ''" v-text="$t('okay')" />
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-flex class="px-5" v-if="!loading" style="overflow-y:scroll; max-height:300px">
			<v-form ref="loginForm" v-model="valid" lazy-validation>
				<v-text-field v-model="username" :label="$t('login.username')" :rules="rules.username" prepend-icon="person" clearable required />
				<v-text-field v-model="password" :label="$t('login.password')" :rules="rules.password" prepend-icon="lock" clearable required @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'visibility_off' : 'visibility'" :type="showPassword ? 'text' : 'password'" />
				<v-text-field v-model="key" :label="$t('install.steps.product_key')" prepend-icon="vpn_key" clearable required />
			</v-form>
			<p class="font-weight-bold white--text text-xs-center">or</p>
			<v-btn large block> <v-icon class="fab" left>fa-google</v-icon> Sign in with Google </v-btn>
		</v-flex>
		<v-layout v-else  style="overflow-y:scroll;">
			<v-spacer />
			<v-progress-circular :size="50" color="orange darken-2" indeterminate />
			<label v-text="$t('install.steps.please_wait')" />
			<v-spacer />
		</v-layout>
		<v-btn large block class="ma-0 orange darken-2" @click.native.stop="next">{{ $t('next') }}</v-btn>
	</v-layout>
</template>
