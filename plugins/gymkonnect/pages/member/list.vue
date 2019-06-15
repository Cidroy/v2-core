<template>
	<Layout>
		<v-toolbar>
			<v-layout row>
				<v-flex xs12 md7> <h1 class="text-md-right text-xs-center"> <v-icon left>people</v-icon> Members List </h1> </v-flex>
				<v-flex xs12 md5>
					<v-layout justify-end>
						<v-tooltip left>
							<v-btn @click="refresh" :disabled="refreshing" :loading="refreshing" outline icon slot="activator"> <v-icon>refresh</v-icon> </v-btn>
							<span>Refresh</span>
						</v-tooltip>
						<v-tooltip left>
							<v-btn outline slot="activator" @click.native.stop="print" :loading="printing"> <v-icon>print</v-icon> </v-btn>
							<span>Print List</span>
						</v-tooltip>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-toolbar>
		<v-toolbar>
			<v-layout row wrap pt-2>
				<!-- TODO: Implement filter -->
				<v-flex v-if="false" xs12 md6 lg3 px-2>
					<v-overflow-btn v-model="filter" :items="FILTERS" :label="FILTER_DEFAULT" color="orange darken-2">
						<!-- FIXME: color does not change when selected, user `prepend-inner-icon` and fix this -->
						<v-icon slot="prepend-inner" class="ma-2 mr-0">filter_list</v-icon>
					</v-overflow-btn>
				</v-flex>
				<v-spacer />
				<v-flex xs12 md6 lg5 px-2>
					<v-text-field v-model="search" single-line hide-details prepend-inner-icon="search" label="Search Member List" color="orange darken-2" class="pt-2" />
				</v-flex>
			</v-layout>
		</v-toolbar>
		<v-data-table v-model="members" :headers="tableHeaders" :items="tableItems" :search="search" :pagination.sync="tablePagination" :rowsPerPageItems="[30, 50, 100]" item-key="id"  select-all class="elevation-1">
			<template #no-data>
				<v-layout row wrap justify-center align-center class="py-4">
					<v-spacer />
					<v-flex align-center v-if="refreshing" class="pa-4">
						<v-progress-circular :indeterminate="true" color="orange darken-2" />
						<h3 v-text="'Loading'" />
					</v-flex>
					<v-flex align-center v-else>
						<v-avatar> <v-icon large right>warning</v-icon> </v-avatar>
						<h3 v-text="'No Users'" />
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
					<td>{{ props.item.badgenumber }}</td>
					<td>{{ UserMode(props.item.mode) }}</td>
					<td>{{ props.item.name }}</td>
					<td>{{ props.item.endDate }}</td>
					<td>{{ props.item.membership }}</td>
					<td>{{ props.item.package }}</td>
					<td>{{ props.item.mobile }}</td>
					<td>
						<v-tooltip left>
							<v-icon medium :color="props.item.enrolled?'green':'red'+' lighten-1'" slot="activator">fingerprint</v-icon>
							<span v-text="props.item.enrolled?'Enrolled':'Not Enrolled'"/>
						</v-tooltip>
					</td>
				</tr>
			</template>
		</v-data-table>
		<v-menu v-model="showMemberContextMenu" :position-x="memberContextMenuPoint.x" :position-y="memberContextMenuPoint.y" absolute offset-y>
			<v-list>
				<v-list-tile v-for="context in memberContextMenu" :key="context.name" @click="context.action" >
					<v-list-tile-title> <v-icon :class="context.iconClass" left>{{ context.icon }}</v-icon> {{ context.name }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
		<send-message-fab v-if="0 && members.length" />
	</Layout>
</template>
