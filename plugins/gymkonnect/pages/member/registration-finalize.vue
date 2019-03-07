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
			<!-- TODO: group name wala shit -->
			<template v-for="(user, index) in users">
				<h2 v-if="usersCount>1" v-text="`Person #${getIndex(index)}`" :key="'header'+index"/>
				<m-registration-step-finished :key="index" :value="user" class="elevation-5 mb-5">
					<v-divider />
					<v-layout row wrap class="mt-2 px-2">
						<v-flex xs12>
							<h2 :class="healthRegisteredUsers.includes(users[index].id)?'':'orange--text text--darken-2'">
								<v-icon :class="[ 'far', healthRegisteredUsers.includes(users[index].id)?'':'orange--text text--darken-2']" left>fa-heartbeat</v-icon>
								Health Details
							</h2>
						</v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="users[index].height" prepend-icon="vertical_align_top" label="Height" suffix="Cms" type="number" color="orange darken-2" :readonly="healthRegisteredUsers.includes(users[index].id)" :tabindex="healthRegisteredUsers.includes(users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-text-field v-model="users[index].weight" prepend-icon="fas fa-weight" label="Weight" suffix="Kgs" type="number" color="orange darken-2" :readonly="healthRegisteredUsers.includes(users[index].id)" :tabindex="healthRegisteredUsers.includes(users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-select v-model="users[index].bodyType" :items="BODY_TYPES" label="Body Type" prepend-icon="accessibility" item-text="name" item-value="id" color="orange darken-2" :readonly="healthRegisteredUsers.includes(users[index].id)" :tabindex="healthRegisteredUsers.includes(users[index].id)"/> </v-flex>
						<v-flex xs12 lg6 class="px-2"> <v-select v-model="users[index].bloodGroup" :items="BLOOD_GROUPS" label="Blood Group" prepend-icon="fas fa-tint" item-text="name" item-value="id" color="orange darken-2" :readonly="healthRegisteredUsers.includes(users[index].id)" :tabindex="healthRegisteredUsers.includes(users[index].id)"/> </v-flex>
					</v-layout>
					<v-divider />
					<v-card-actions>
						<template v-if="!healthRegisteredUsers.includes(users[index].id)">
							<v-btn @click="healthDataSave(users[index].id)" :loading="healthDataSaving===users[index].id" :disabled="healthDataSaving===users[index].id" color="orange darken-4" dark> <v-icon left>save</v-icon> Save Health Details </v-btn>
							<v-spacer />
						</template>
						<!-- TODO: allow individual receipt printing -->
						<!-- <v-btn v-if="usersCount>1" outline> <v-icon left>print</v-icon> Print Individual Reciept </v-btn> -->
						<v-spacer />
						<v-btn @click="userEnrollFP(users[index].id)" :outline="usersEnrolled.includes(users[index].id)" :loading="userEnrollingFP===users[index].id" :disabled="userEnrollingFP===users[index].id" color="orange darken-4" dark> <v-icon left>border_horizontal</v-icon> Enroll Fingerprint </v-btn>
					</v-card-actions>
				</m-registration-step-finished>
			</template>
		</v-container>
	</Layout>
</template>