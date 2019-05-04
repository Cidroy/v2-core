<template>
	<Layout>
		<h1 class="text-md-center">Plans &amp; Offers settings</h1>
		 <v-card>

			<v-layout justify-space-between pa-3>
				<v-flex xs5>
					<v-treeview v-model="tree" :active.sync="active" :open="open" :items="items" activatable item-key="name" open-on-click></v-treeview>
				</v-flex>
				<v-flex d-flex text-xs-center>
					<v-scroll-y-transition mode="out-in">
					<div
						v-if="!selected"
						class="title grey--text text--lighten-1 font-weight-light"
						style="align-self: center;"
					>
						Select a User
					</div>
					<v-card
						v-else
						:key="selected.id"
						class="pt-4 mx-auto"
						flat
						max-width="400"
					>

						sds
					</v-card>
					</v-scroll-y-transition>
				</v-flex>
			</v-layout>
		</v-card>

	</Layout>
</template>
