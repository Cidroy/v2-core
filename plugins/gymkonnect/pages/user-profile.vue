<template>
	<v-container>
		<v-layout>
			<v-card width="100%" color="transparent" height="500px">
				<v-layout row wrap>
	
				<v-flex>
					<v-tabs v-model="active" color="transparent" slider-color="orange darken-4">
      				<v-tab v-for="(name, key) in tabsList" :key="key" ripple>{{ name }}</v-tab>
				
						<v-tab-item key="a">
							<v-card flat color="transparent" height="100px">
								<m-registration-step-finished>
								</m-registration-step-finished>
							</v-card>
						</v-tab-item>

						<v-tab-item key="b">
							<v-card flat color="transparent" height="100px">
								<v-container style="max-width: 700px;">
									<v-timeline dense clipped>

										<v-timeline-item class="mb-4" hide-dot>
											<span>TODAY</span>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" icon-color="grey lighten-2" small>
											<v-layout justify-space-between>
												<v-flex xs7>This order was archived.</v-flex>
												<v-flex xs5 text-xs-right>15:26 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												Digital Downloads fulfilled 1 item.
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												Order confirmation email was sent to John Leider (john@vuetifyjs.com).
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item class="mb-3" color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												A $15.00 USD payment was processed on PayPal Express Checkout
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

										<v-timeline-item color="orange darken-4" small>
											<v-layout justify-space-between>
											<v-flex xs7>
												John Leider placed this order on Online Store (checkout #1937432132572).
											</v-flex>
											<v-flex xs5 text-xs-right>15:25 EDT</v-flex>
											</v-layout>
										</v-timeline-item>

									</v-timeline>
								</v-container>
							</v-card>
						</v-tab-item>

						<v-tab-item key="c">
							<v-card flat color="transparent" height="100px">
								<v-flex xs class="px-2">
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
								<v-flex xs class="px-2">
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
							</v-card>
						</v-tab-item>

						<v-tab-item key="d">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

						<v-tab-item key="e">
							<v-card flat color="transparent" height="100px">
							</v-card>
						</v-tab-item>

					</v-tabs>
				</v-flex>
				</v-layout>
			</v-card>
		</v-layout>
	</v-container>
</template>