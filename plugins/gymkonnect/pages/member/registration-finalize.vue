<template>
	<Layout>
		<v-toolbar>
			<v-layout row>
				<v-flex xs1> <v-btn icon flat @click="goBackSimon()"> <v-icon>arrow_back</v-icon> </v-btn> </v-flex>
				<v-flex xs11 md6> <h1 class="py-2 text-md-right text-xs-center"> <v-icon left>{{ usersCount>1?"people":"person" }}</v-icon> Registration Complete </h1> </v-flex>
				<v-flex xs12 md5>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn outline slot="activator"> <v-icon left>print</v-icon> Print Reciept </v-btn>
							<span>Print List</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-toolbar>
		<v-alert :value="true" class="white--text green font-weight-bold" type="success" dark> {{ usersCount }} New Member{{ usersCount>1?"s":"" }} Registered </v-alert>
		<v-container>
			<v-card v-if="Group && $permission(PERMISSIONS.gymkonnect.MEMBER_GROUP_RENAME)" class="mb-4 elevation-5">
				<v-layout row wrap>
					<v-flex xs12>
						<v-text-field v-model="Group.name" label="Group Name" class="px-4" color="orange darken-2">
							<v-icon slot="prepend-inner" class="pt-2" left >people</v-icon>
							<v-btn @click="renameGroup" block outline slot="append"> <v-icon>save</v-icon> Rename </v-btn>
						</v-text-field>
					</v-flex>
				</v-layout>
			</v-card>
			<template v-for="(user, index) in Users">
				<h2 v-if="usersCount>1" v-text="`Person #${getIndex(index)}`" :key="'header'+index"/>
				<m-registration-step-finished :key="index" :value="user" class="elevation-5 mb-5">
					<v-divider />
					<v-layout row wrap class="mt-2 px-2">
						<v-flex xs12>
							<h2 :class="healthRegisteredUsers.includes(Users[index].id)?'':'orange--text text--darken-2'">
								<v-icon :class="[ 'far', healthRegisteredUsers.includes(Users[index].id)?'':'orange--text text--darken-2']" left>fa-heartbeat</v-icon>
								Health Details
							</h2>
						</v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="Users[index].height" prepend-icon="vertical_align_top" label="Height" suffix="Cms" type="number" color="orange darken-2" :readonly="healthRegisteredUsers.includes(Users[index].id)" :tabindex="healthRegisteredUsers.includes(Users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="Users[index].weight" prepend-icon="fas fa-weight" label="Weight" suffix="Kgs" type="number" color="orange darken-2" :readonly="healthRegisteredUsers.includes(Users[index].id)" :tabindex="healthRegisteredUsers.includes(Users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-select v-model="Users[index].bodyType" :items="BODY_TYPES" label="Body Type" prepend-icon="accessibility" item-text="name" item-value="id" color="orange darken-2" :readonly="healthRegisteredUsers.includes(Users[index].id)" :tabindex="healthRegisteredUsers.includes(Users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-select v-model="Users[index].bloodGroup" :items="BLOOD_GROUPS" label="Blood Group" prepend-icon="fas fa-tint" item-text="name" item-value="id" color="orange darken-2" :readonly="healthRegisteredUsers.includes(Users[index].id)" :tabindex="healthRegisteredUsers.includes(Users[index].id)"/> </v-flex>
					</v-layout>
					<v-divider />
					<v-card-actions>
						<template v-if="!healthRegisteredUsers.includes(Users[index].id)">
							<v-btn @click="healthDataSave(Users[index].id)" :loading="healthDataSaving===Users[index].id" :disabled="healthDataSaving===Users[index].id" color="orange darken-4" dark> <v-icon left>save</v-icon> Save Health Details </v-btn>
							<v-spacer />
						</template>
						<!-- TODO: allow individual receipt printing -->
						<!-- <v-btn v-if="usersCount>1" outline> <v-icon left>print</v-icon> Print Individual Reciept </v-btn> -->
						<v-spacer />
						<v-btn @click="userEnrollFP(Users[index].id)" :outline="usersEnrolled.includes(Users[index].id)" :loading="userEnrollingFP===Users[index].id" :disabled="userEnrollingFP===Users[index].id" color="orange darken-4" dark> <v-icon left>border_horizontal</v-icon> Enroll Fingerprint </v-btn>
					</v-card-actions>
				</m-registration-step-finished>
			</template>
		</v-container>
	</Layout>
</template>