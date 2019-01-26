<template>
	<Layout>
		<h1 class="text-md-center">Members List</h1>
		<div>
    		<v-toolbar flat>
      			<v-flex lg2 mt-3>
					<v-overflow-btn :items="dropdown_font" label="Lists" target="#dropdown-example"></v-overflow-btn>
				</v-flex>
				<v-flex lg4 mt-2>
					<v-text-field prepend-icon="search" label="Search" class="hidden-sm-and-down pt-2" />
				</v-flex>
				<v-spacer></v-spacer>
				<v-btn >Send Email</v-btn>
				<v-btn >Send MSG</v-btn>
				
    		</v-toolbar>
			
			<v-data-table v-model="selected" :headers="headers" :items="desserts" item-key="id" select-all class="elevation-1">
				<template slot="items" slot-scope="props">
					<tr @click="props.expanded = !props.expanded">
					<td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
					<td>{{ props.item.id }}</td>
					<td class="text-xs-right">{{ props.item.name }}</td>
					<td class="text-xs-right">{{ props.item.enrolstat }}</td>
					<td class="text-xs-right">{{ props.item.mbrstat }}</td>
					<td class="text-xs-right">{{ props.item.mobno }}</td>
					<td class="text-xs-right">{{ props.item.duedat }}</td>
					</tr>
				</template>
				<template slot="expand" slot-scope="props">
					<v-card flat>
						<v-layout  row wrap>
							<v-spacer :data="props"/>
							<v-btn to="/profile" >View Profile</v-btn>
							<v-btn >Send MSG</v-btn>
							<v-btn >Send Email</v-btn>
							<v-btn >Block</v-btn>
							<v-btn >Enroll</v-btn>
							<v-btn >Freeze</v-btn>
						</v-layout>
					</v-card>
				</template>
				
			</v-data-table>
		</div>		  
	</Layout>
</template>

<script lang="ts">
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component, Watch, Vue } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page: {
		title: "Home",
		meta: [{ name: "description", content: appConfig.description, },],
	},
	
})
export default class Home extends Vue {
	dropdown_font = ['Arial', 'Calibri', 'Courier', 'Verdana']
	headers = [
		{
			text: 'ID',
			align: 'left',
			value: 'id'
		},
		{ text: 'Name', value: 'name' },
		{ text: 'Enorll Status', value: 'enrolstat', sortable: false },
		{ text: 'Membership Status', value: 'mbrstat', sortable: false },
		{ text: 'Mobile No.', value: 'mobno', sortable: false },
		{ text: 'Due Date', value: 'duedat'}
	]
	selected= []
	
	editedIndex = -1
	expand: boolean = false
	
	defaultItem = {
		id: 0,
		name: '',
		enrolstat: 0,
		mbrstat: 0,
		mobno: 0,
		duedat: ''
	}

	desserts = [
			{
				id: 1,
				name: 'spiderman',
				enrolstat: 6.0,
				mbrstat: 24,
				mobno: 4.0,
				duedat: '12/2/19'
			},
			{
				id: 2,
				name: 'aquaman',
				enrolstat: 9.0,
				mbrstat: 37,
				mobno: 4.3,
				duedat: '12/2/19'
			},
			{
				id: 3,
				name: 'superman',
				enrolstat: 16.0,
				mbrstat: 23,
				mobno: 6.0,
				duedat: '12/2/19'
			},
			{
				id: 4,
				name: 'hitman',
				enrolstat: 3.7,
				mbrstat: 67,
				mobno: 4.3,
				duedat: '12/2/19'
			},
			{
				id: 5,
				name: 'saktiman',
				enrolstat: 16.0,
				mbrstat: 49,
				mobno: 3.9,
				duedat: '12/2/19'
			},
			{
				id: 6,
				name: 'heman',
				enrolstat: 0.0,
				mbrstat: 94,
				mobno: 0.0,
				duedat: '12/2/19'
			},
			{
				id: 7,
				name: 'ironman',
				enrolstat: 0.2,
				mbrstat: 98,
				mobno: 0,
				duedat: '12/2/19'
			},
			{
				id: 8,
				name: 'batman',
				enrolstat: 3.2,
				mbrstat: 87,
				mobno: 6.5,
				duedat: '12/2/19'
			},
			{
				id: 9,
				name: 'wonder woman',
				enrolstat: 25.0,
				mbrstat: 51,
				mobno: 4.9,
				duedat: '12/2/19'
			},
			{
				id: 10,
				name: 'SINGHAM',
				enrolstat: 26.0,
				mbrstat: 65,
				mobno: 7,
				duedat: '12/2/19'
			}
		]
	}


	

</script>