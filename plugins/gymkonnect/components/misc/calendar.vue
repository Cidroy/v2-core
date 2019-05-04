<template>
	<v-card flat>
		<v-layout row wrap>
			<v-btn icon flat disabled class="my-3"> <v-icon class="orange--text text--darken-2">chevron_left</v-icon> </v-btn>
			<v-flex xs6 sm3 md2>
				<v-select v-model="calendarViewMode" :items="CalendarViewModes" :prepend-inner-icon="calendarViewModeIcon" item-text="name" item-value="type" item-avatar="icon" color="orange darken-2" class="pt-3" flat solo box no-hint>
					<template #item="{ item }"> <span> <v-icon left :color="item.type===calendarViewMode?'orange darken-2':''">{{ item.icon }}</v-icon> {{ item.name }} </span> </template>
				</v-select>
			</v-flex>
			<v-spacer />
			<v-flex class="py-4"> <h2><v-icon left>event</v-icon>Availability</h2> </v-flex>
			<v-spacer />
			<v-btn icon flat disabled class="my-3"> <v-icon class="orange--text text--darken-2">chevron_right</v-icon> </v-btn>
		</v-layout>

		<v-calendar v-model="calendar" :type="calendarViewMode" :now="(new Date()).toISOString().substr(0,10)" ref="calendar" color="orange darken-2"
			@click:date="onDateClicked"
		>
			<template #day="{ present, past, date }">
				<v-layout fill-height>
					<p></p>
					<template>
						<v-sheet @click.native.stop="onDateClicked(date)" title="Full" color="red darken-4" width="70%" height="100%" tile/>
						<v-sheet @click.native.stop="onDateClicked(date)" title="Available" color="green darken-4" width="30%" height="100%" tile/>
					</template>
				</v-layout>
			</template>
		</v-calendar>

	</v-card>

</template>
