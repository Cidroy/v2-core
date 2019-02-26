<template>
	<Layout>
		<h1 class="text-md-center">Members List</h1>
		<div>
    		<v-toolbar dark flat>
      			<v-flex lg2 mt-3>
					<v-overflow-btn :items="dropdownFont" label="All" target="#dropdown-example"></v-overflow-btn>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex lg3 mt-2 pr-4>
					<v-text-field v-model="search" single-line hide-details append-icon="search" label="Search" color="orange darken-2" class="hidden-sm-and-down pt-2" />
				</v-flex>
				<v-btn dark color="orange darken-4">Send SMS</v-btn>
				<v-btn dark color="orange darken-4">Send Email</v-btn>
    		</v-toolbar>
			
			<v-data-table v-model="selected" :headers="headers" :items="desserts" item-key="id" select-all class="elevation-1">
				<template slot="items" slot-scope="props">
					<tr @click="props.expanded = !props.expanded">
					<td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
					<td>{{ props.item.id }}</td>
					<td>{{ props.item.name }}</td>
					<td>{{ props.item.enrolstat }}</td>
					<td>{{ props.item.mbrstat }}</td>
					<td>{{ props.item.mobno }}</td>
					<td>{{ props.item.duedat }}</td>
					</tr>
				</template>
				<template slot="expand" slot-scope="props">
					<v-card flat>
						<v-layout  row wrap>
							<v-spacer :data="props"/>
							<v-btn dark color="deep-purple darken-4" to="/user-profile" >View Profile</v-btn>
							<v-btn dark>Block</v-btn>
							<v-btn dark>Enroll</v-btn>
							<v-btn dark>Freeze</v-btn>
						</v-layout>
					</v-card>
				</template>
				
			</v-data-table>
		</div>		  
	</Layout>
</template>