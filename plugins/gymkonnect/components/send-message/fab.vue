<template>
	<v-speed-dial v-if="$permission(permissions)" v-model="sendMessageFAB" class="mb-4" fixed bottom right direction="top" transition="slide-y-reverse-transition">
		<template #activator>
			<v-btn v-model="sendMessageFAB" color="orange darken-4" dark fab class="pb-4">
				<v-icon>send</v-icon>
				<v-icon>close</v-icon>
			</v-btn>
		</template>
		<sms-sheet :members="members">
			<v-tooltip left>
				<v-btn fab dark small color="orange darken-2" slot="activator"> <v-icon dark>sms</v-icon> </v-btn>
				<span>Send SMS</span>
			</v-tooltip>
		</sms-sheet>
		<email-sheet :members="members">
			<v-tooltip left>
				<v-btn fab dark small color="orange darken-2" slot="activator"> <v-icon dark>email</v-icon> </v-btn>
				<span>Send Email</span>
			</v-tooltip>
		</email-sheet>
	</v-speed-dial>
</template>
