<template>
	<v-dialog v-model="showModal" fullscreen hide-overlay transition="dialog-bottom-transition">
		<v-card class="grey darken-4">
			<v-toolbar>
				<v-flex xs12 class="py-4"> <h1 class="text-xs-center"> Profile </h1> </v-flex>
				<v-layout justify-end>
					<v-btn @click="showModal = false" icon> <v-icon>close</v-icon> </v-btn>
				</v-layout>
			</v-toolbar>
			<v-layout xs12>
				<v-flex xs2>

					<v-layout pt-2 class="justify-center">

							<v-avatar size="200">
							<v-img :src="cards[0].src" height="200px" />
							</v-avatar>
					</v-layout>
					<v-layout row wrap>
						<v-list class="grey darken-4">
							<v-list-tile  v-for="(item, index) in profileList" :key="index">
								<v-list-tile-title>{{ item.text }}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-layout>
					<v-layout  class="justify-center">
						<v-btn>Send SMS</v-btn>
						<v-btn>Send Email</v-btn>
					</v-layout>
										
				</v-flex>
				<v-layout xs12 row wrap>
					<v-flex>
						<h3>Personal</h3>
						<v-card class="elevation-10">
							<m-registration-step-finished>
							</m-registration-step-finished>
						</v-card>
					</v-flex>					
					<v-flex xs6 class="px-2">
						<h3>Transection</h3>

						
							<v-card class="elevation-10">
									<!-- Transection List Start -->
										<v-data-table :headers="headers" :items="desserts" item-key="name">
											<template slot="items" slot-scope="props">
												<tr @click="props.expanded = !props.expanded">
													<td>{{ props.item.name }}</td>
													<td>{{ props.item.package }}</td>
													<td>{{ props.item.startDate }}</td>
													<td>{{ props.item.endDate }}</td>
												</tr>
											</template>
										</v-data-table>
										<!-- Transection List End -->
							</v-card>
						
					</v-flex>
					<v-flex xs6 class="px-2">
						<h3>Freezing</h3>
							<v-card>
								<!-- Freezing List Start -->
									<v-data-table :headers="headers2" :items="desserts2" item-key="name2">
										<template slot="items" slot-scope="props">
											<tr @click="props.expanded = !props.expanded">
												<td>{{ props.item.name2 }}</td>
												<td>{{ props.item.endDate }}</td>
												<td>{{ props.item.days }}</td>
											</tr>
										</template>
									</v-data-table>
								<!-- Freezing List End -->
							</v-card>
					</v-flex>
				
				</v-layout>
			</v-layout>
			
		</v-card>
	</v-dialog>
</template>
