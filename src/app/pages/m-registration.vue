<template>
	<Layout>
		<h1 class="text-md-center">Member Registration</h1>
		
		<v-stepper v-model="e1">
  		  <v-stepper-header>
    		<v-stepper-step :rules="[() => false]" editable :complete="e1 > 1" step="1">Personal Details
				<small>Alert message</small>
			</v-stepper-step>

      		<v-divider></v-divider>

      		<v-stepper-step editable :complete="e1 > 2" step="2">Contact Details</v-stepper-step>

      		<v-divider></v-divider>

        	<v-stepper-step editable :complete="e1 > 3" step="3">Members Plan</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step editable step="4">Members Plan</v-stepper-step>
    	 </v-stepper-header>

    	 <v-stepper-items>
      		<v-stepper-content step="1">
        		<v-card class="mb-5" color="transparent" height="400px">
					 <v-flex xs12 md6>
          				<v-text-field v-model="firstname" :rules="nameRules" :counter="30" placeholder="Full Name" required></v-text-field>
        			 </v-flex>
					 <v-radio-group label="Gender" row v-model="radioGroup">
        			 <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
    				 </v-radio-group>

					<v-flex xs12 lg6>
        <v-menu 
          ref="menu1"
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFormatted"
            label="Date"
            hint="MM/DD/YYYY format"
            persistent-hint
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <p>Date in ISO format: <strong>{{ date }}</strong></p>
      </v-flex>
					 

				</v-card>
        		<v-btn @click="e1 = 2">
          			NEXT
        		</v-btn>
        		<v-btn flat>Cancel</v-btn>
     		</v-stepper-content>

      	 <v-stepper-content step="2">
        	<v-card class="mb-5" color="transparent" height="400px"></v-card>

        	<v-btn  @click="e1 = 3">
          		NEXT
       		</v-btn>

        	<v-btn flat>Cancel</v-btn>
      	 </v-stepper-content>
		 
		 <v-stepper-content step="3">
        	<v-card class="mb-5" color="transparent" height="400px"></v-card>

        	<v-btn  @click="e1 = 4">
          		NEXT
       		</v-btn>

        	<v-btn flat>Cancel</v-btn>
      	 </v-stepper-content>

      	 	<v-stepper-content step="4">
         	<v-card class="mb-5" color="transparent" height="400px"></v-card>

        	<v-btn  @click="e1 = 1">
          		NEXT
        	</v-btn>

        	<v-btn flat>Cancel</v-btn>
      		</v-stepper-content>
   		 </v-stepper-items>
   		</v-stepper>
	</Layout>
</template>

<script lang="ts">
import Vue from "vue"
import appConfig from "@/app.config"
import Layout from "@/layouts/main.vue"
import SystemInformation from "@/components/system-information.vue"
import { Component } from "vue-property-decorator"

@Component({
	components: { Layout, SystemInformation, },
	page : {
		title: "Home",
		meta: [ { name: "description", content: appConfig.description, }, ],
	},
})
export default class Home extends Vue{
	data () {
      return {
	  valid: false,
      firstname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 30 || 'Name must be less than 30 characters'
      ],
		radioGroup: 1,
		e1: 0,
		date: new Date().toISOString().substr(0, 10),
      	menu1: false,
      
	  }
	  
    }
}
</script>