<template>
	<!-- TODO: UI -->
	<v-dialog v-if="$permission(PERMISSION.gymkonnect.SMS_SEND)" v-model="showSheet" fullscreen hide-overlay transition="dialog-bottom-transition">
		<slot slot="activator"/>
		<v-card>
			<v-toolbar>
				<v-toolbar-title> <v-icon left>sms</v-icon> Send Message</v-toolbar-title>
				<v-spacer />
				<v-tooltip left>
					<v-btn icon @click="showSheet = false" slot="activator"> <v-icon>close</v-icon> </v-btn>
					<span>Cancel</span>
				</v-tooltip>
			</v-toolbar>
			<v-layout fill-height fluid>
				<v-flex xs12 lg5 class="elevation-5">
					<v-toolbar>
						<v-toolbar-title> <v-icon left>short_text</v-icon> Quick Message</v-toolbar-title>
						<v-spacer />
						<v-tooltip left>
							<v-btn fab dark small color="orange darken-2" slot="activator"> <v-icon>add</v-icon> </v-btn>
							<span>Add Quick Message</span>
						</v-tooltip>
					</v-toolbar>
					<v-progress-linear v-if="loadingTemplate" :indeterminate="true" color="orange darken-2"/>
					<v-list two-line subheader>
						<template v-for="template in SMSTemplates">
							<v-list-tile :key="template.id" @click="message = template.message">
								<v-list-tile-content>
									<v-list-tile-title v-text="template.name"/>
									<v-list-tile-sub-title class="text-truncate" v-text="template.message"/>
								</v-list-tile-content>
								<v-list-tile-action>
									<v-btn icon ripple> <v-icon color="grey lighten-1">more_vert</v-icon> </v-btn>
								</v-list-tile-action>
							</v-list-tile>
							<v-divider :key="'divider-'+template.id" />
						</template>
					</v-list>
				</v-flex>
				<v-container fill-height fluid>
					<v-layout align-center justify-center class="pa-2">
						<v-flex xs12 lg9>
							<v-card class="elevation-5 mb-4">
								<v-card-text>
									<v-layout row wrap>
										<v-flex xs6> <h2 class="text-xs-left font-weight-regular"> SMS Balance : </h2> </v-flex>
										<v-flex xs6> <h2 class="text-xs-right"> {{ smsBalance }} / {{ smsAlloted }} </h2> </v-flex>
									</v-layout>
								</v-card-text>
							</v-card>
							<v-card class="elevation-10">
								<v-card-text>
									<v-textarea v-model="message" outline placeholder="Your Message" :counter="messageMaxLength" color="orange darken-2" autofocus/>
									<v-btn @click.native.stop="smsSend" :disabled="smsSending" :loading="smsSending" block dark color="orange darken-2"> <v-icon left>send</v-icon> Send</v-btn>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
				<v-flex xs12 lg5 class="elevation-5">
					<v-toolbar>
						<v-toolbar-title> <v-icon left>people</v-icon> Members</v-toolbar-title>
					</v-toolbar>
					<v-progress-linear v-if="loadingMembers" :indeterminate="true" color="orange darken-2"/>
					<v-list three-line subheader>
						<template v-for="member in Members">
							<v-list-tile :key="member.id">
								<v-list-tile-avatar> <v-icon class="grey darken-2" dark>person</v-icon> </v-list-tile-avatar>
								<v-list-tile-content avatar>
									<v-list-tile-sub-title class="text-truncate" >
										<v-icon small class="fas">fa-hashtag</v-icon> {{ member.badgenumber }}
									</v-list-tile-sub-title>
									<v-list-tile-title class="text-truncate" v-text="`${member.firstName} ${member.middleName} ${member.lastName}`"/>
									<v-list-tile-sub-title class="text-truncate">
										<v-icon small>call</v-icon> {{ member.mobile }}
									</v-list-tile-sub-title>
								</v-list-tile-content>
								<v-list-tile-action>
									<!-- FIXME: does not rerender -->
									<v-btn icon ripple @click="removeMember(member.id)"> <v-icon color="grey lighten-1">close</v-icon> </v-btn>
								</v-list-tile-action>
							</v-list-tile>
							<v-divider :key="'divider-'+member.id" />
						</template>
					</v-list>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>
