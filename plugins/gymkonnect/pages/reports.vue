<template>
	<Layout>
		<v-toolbar extended>
			<v-layout row wrap>
				<v-flex xs12 md4/>
				<v-flex xs12 md4> <v-select v-model="report" :items="Object.values(REPORT_TYPES)" item-text="name" item-value="value" color="orange darken-2"  prepend-icon="fas fa-id-card"/> </v-flex>
				<v-flex xs12 md4>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn @click.native.stop="refresh" :disabled="refreshing" :loading="refreshing" outline icon slot="activator"> <v-icon>refresh</v-icon> </v-btn>
							<span>Refresh</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout slot="extension" class="px-2">
				<v-flex xs12 md3 class="px-2">
					<v-autocomplete v-model="timePeriod" :items="Object.values(TIME_PERIODS)" item-text="name" item-value="value" color="orange darken-2"  prepend-icon="history" auto-select-first/>
				</v-flex>
				<v-flex />
				<v-flex xs12 md3 class="px-2">
					<v-text-field color="orange darken-2" v-model="timePeriodStartFormatted" @blur="timePeriodStart = parseDate(timePeriodStartFormatted)" @click:prepend="timePeriodStartMenu = true" :disabled="!CustomRange" label="From" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
					<v-menu v-model="timePeriodStartMenu" ref="timePeriodStartMenu" :close-on-content-click="false" lazy transition="scale-transition" >
						<div slot="activator" data-id="timePeriodStart"/>
						<v-date-picker v-model="timePeriodStart" no-title @input="timePeriodStartMenu = false"  color="orange darken-2"/>
					</v-menu>
				</v-flex>
				<v-flex xs12 md3 class="px-2">
					<v-text-field color="orange darken-2" v-model="timePeriodEndFormatted" @blur="timePeriodEnd = parseDate(timePeriodEndFormatted)" @click:prepend="timePeriodEndMenu = true" :disabled="!CustomRange" label="To" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
					<v-menu v-model="timePeriodEndMenu" ref="timePeriodEndMenu" :close-on-content-click="false" lazy transition="scale-transition" >
						<div slot="activator" data-id="timePeriodEnd"/>
						<v-date-picker v-model="timePeriodEnd" no-title @input="timePeriodEndMenu = false" :min="timePeriodStart"  color="orange darken-2"/>
					</v-menu>
				</v-flex>
			</v-layout>
		</v-toolbar>
		<v-data-table v-model="selected" :headers="tableHeaders" :items="tableItems" :search="search" :pagination.sync="tablePagination" :rowsPerPageItems="[30, 50, 100]" item-key="id"  select-all class="elevation-1">
			<template #no-data>
				<v-layout row wrap justify-center align-center class="py-4">
					<v-spacer />
					<v-flex align-center v-if="refreshing" class="pa-4">
						<v-progress-circular :indeterminate="true" color="orange darken-2" />
						<h3 v-text="'Loading'" />
					</v-flex>
					<v-flex align-center v-else>
						<v-avatar> <v-icon large right>warning</v-icon> </v-avatar>
						<h3 v-text="'No Data'" />
					</v-flex>
				</v-layout>
			</template>
			<template #headers="props">
				<tr>
					<th> <v-checkbox  @click.stop="tableToggleAll" :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details color="orange darken-2"/> </th>
					<th v-for="header in props.headers" @click="tableChangeSort(header.value)" :key="header.text" :class="['column sortable', 'text-truncate', tablePagination.descending ? 'desc' : 'asc', header.value === tablePagination.sortBy ? 'active' : '']" :style="header.width?`max-width:${header.width}; width:${header.width}; min-width:${header.width}`:''" > {{ header.text }} <v-icon small>arrow_upward</v-icon> </th>
				</tr>
			</template>
			<template #items="props">
				<tr @contextmenu="e => memberContextMenuClicked(e, props.item.id)">
					<th><v-checkbox v-model="props.selected" primary hide-details color="orange darken-2"/></th>
					<td v-for="header in tableHeaders" :key="header.value">{{ props.item[header.value] }}</td>
				</tr>
			</template>
		</v-data-table>
		<v-menu v-model="showMemberContextMenu" :position-x="memberContextMenuPoint.x" :position-y="memberContextMenuPoint.y" absolute offset-y>
			<v-list>
				<v-list-tile v-for="context in memberContextMenu" :key="context.name" @click="context.action" >
					<v-list-tile-title> <v-icon :class="context.iconClass" left>{{ context.icon }}</v-icon> {{ context.name }}</v-list-tile-title>
				</v-list-tile>
				<v-list-tile v-if="memberContextMenu.length < 1" >
					<v-list-tile-title> <v-icon left>block</v-icon> No Actions</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</Layout>
</template>
