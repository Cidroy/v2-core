<template>
	<div>
		<v-tab-item key="a">
			<v-card color="transparent" height="610px">
				<v-layout row wrap>
					<v-flex class="pl-2 ml-2" xs12>
						<v-radio-group row label="SPA Booking Type: " v-model="grouping">
							<v-layout row align-start>
								<v-radio v-for="(value, name) in GROUPINGS" :label="name" :value="name" :key="name" />
							</v-layout>
						</v-radio-group>
					</v-flex>
					<v-flex xs12 v-if="allowAddPeople || allowDeletePeople"> {{ xLayouts }} /
						{{ this.GROUPINGS[this.grouping].max }} People </v-flex>
					<v-flex xs12 v-else> {{ xLayouts }} People </v-flex>
					<layout v-for="count in xLayouts" :key="count" :showDelete="allowDeletePeople"
						@deleteLayout="()=>{ deleteLayout(count) }" />
					<v-btn v-show="allowAddPeople" @click.native.stop="addPeople" flat block large>
						<v-icon>add</v-icon> Add People
					</v-btn>
					<v-flex xs2>
						<v-subheader class="title">Mobile No</v-subheader>
					</v-flex>
					<v-flex xs4>
						<v-text-field label="Enter Mobile No" single-line solo></v-text-field>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>

			</v-card>
		</v-tab-item>

	</div>
</template>