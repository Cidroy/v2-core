<template>
	<Layout>
		<h1 class="text-md-center">Member Freezing</h1>
		 <div>
    <v-tabs v-model="active" color="cyan  darken-4" dark slider-color="yellow">
      <v-tab v-for="(name, key) in tabsList" :key="key" ripple>
        {{ name }}
      </v-tab>
      <v-tab-item key="a">
        <v-card flat>
          <span>yeah</span>
        </v-card>
      </v-tab-item>
      <v-tab-item key="b">
        <v-card flat>
          <span>yeah b</span>
        </v-card>
      </v-tab-item>
      <v-tab-item key="c">
        <v-card flat>
          <span>yeah c</span>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click="next">
        next tab
      </v-btn>
    </div>
  </div>
			
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
	active: number = 0
	tabsList = {
		a: "a",
		b: "b",
		c: "c",
	}
	 next() {
        const active = parseInt(this.active.toString())
        this.active = (active < 2 ? active + 1 : 0)
      }
	
}
</script>