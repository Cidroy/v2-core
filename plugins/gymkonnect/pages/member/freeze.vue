<template>
	<Layout>
		<v-toolbar>
			<v-layout row>
				<v-flex v-if="clientId" xs1 class="py-3"> <v-btn icon float @click="goBackSimon"><v-icon>arrow_back</v-icon></v-btn> </v-flex>
				<v-flex xs11 class="py-4"> <h1 class="text-xs-center"> <v-icon left>timer_off</v-icon> Membership Freezing </h1> </v-flex>
			</v-layout>
		</v-toolbar>
		<v-slide-y-transition mode="out-in">
			<v-layout v-if="!clientId" row wrap class="pa-4">
				<v-flex xs12>
					<v-autocomplete v-model="clientId" :items="Clients" :search-input.sync="clientSearch" :loading="clientSearching" clearable item-text="name" item-value="id" prepend-icon="search" :label="label" :placeholder="label" autofocus no-filter color="orange darken-2" auto-select-first>
						<v-list-tile slot="no-data">
							<v-list-tile-title v-text="'No User Found'"/>
						</v-list-tile>
						<template #item="{ item }">
							<v-avatar v-text="item.name.charAt(0)" size="30" color="orange darken-4" class="white--text font-weight-light"/>
							<v-list-tile-content class="ml-2 my-2">
								<v-list-tile-title> {{ item.name }} <v-icon small class="mr-1">phone</v-icon> <span v-html="clientSearch?(item.mobile || '').replace(clientSearch, clientSearch.bold()):item.mobile"/> </v-list-tile-title>
								<v-list-tile-sub-title>
									<v-icon class="fas mr-1" small>fa-hashtag</v-icon> <span v-html="clientSearch?(item.badgenumber || '').replace(clientSearch, clientSearch.bold()):item.badgenumber"/>
								</v-list-tile-sub-title>
							</v-list-tile-content>
						</template>
					</v-autocomplete>
				</v-flex>
			</v-layout>
			<v-layout v-else-if="clientDataLoading" row wrap class="pa-4">
				<v-flex xs12 style="padding-top:25vh"> <h1 class="text-xs-center"> <v-icon large left>person</v-icon> {{ clientName }}</h1> </v-flex>
				<v-flex xs1 md4/>
				<v-flex xs10 md4> <v-progress-linear :indeterminate="true" color="orange darken-2" /> </v-flex>
				<v-flex xs1 md4/>
			</v-layout>
			<div v-else>
				<v-layout row wrap class="pa-4">
					<v-flex xs12 class="elevation-10 mb-4">
						<m-registration-step-finished :value="Client" >
							<div v-if="!!Group.members.length" class="mb-4">
								<v-divider />
								<v-layout row wrap class="mt-2 px-2">
									<v-flex xs12>
										<!-- TODO: [Vicky] make this component -->
										<h2> <v-icon left>people</v-icon> {{ GroupName }} {{  Group.members.length > 1?"with":"" }} <small class="text--secondary" v-text="`(${Group.name})`"/> </h2>
										<v-list two-line v-if="Group.members.length > 1">
											<!-- TODO: add context menu same as member-list -->
											<v-list-tile v-for="member in Group.members" :key="member.id" v-show="member.id!==clientId" @click="false">
												<v-avatar v-text="member.name.charAt(0)" size="30" color="orange darken-4" class="white--text font-weight-light"/>
												<v-list-tile-content class="ml-2 my-2">
													<v-list-tile-title>
														<v-flex>
															{{ member.name }}
															<v-icon class="fas ml-4" small>fa-hashtag</v-icon> <span v-text="member.badgenumber"/>
														</v-flex>
													</v-list-tile-title>
													<v-list-tile-sub-title>
														<v-icon small class="mr-1">phone</v-icon> <span v-text="member.mobile"/>
													</v-list-tile-sub-title>
												</v-list-tile-content>
												<v-list-tile-action>
													<span > <v-icon small>history</v-icon> Ends on: {{ formatDate(member.end) }} </span>
												</v-list-tile-action>
											</v-list-tile>
										</v-list>
									</v-flex>
								</v-layout>
							</div>
							<v-divider />
							<v-layout row wrap class="mt-2 px-2">
								<v-flex xs12> <h2> <v-icon left>timer</v-icon> Current Package </h2> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="Current.Membership.name" label="Current Membership" tabindex="-1" prepend-icon="fas fa-info-circle" readonly /> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="Current.Package.name" label="Current Package" tabindex="-1" prepend-icon="fas fa-calendar-alt" readonly /> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="formatDate(Current.StartDate)" label="Package Start Date" tabindex="-1" prepend-icon="event" readonly /> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="formatDate(Current.EndDate)" label="Package End Date" tabindex="-1" prepend-icon="event" readonly /> </v-flex>
							</v-layout>
							<v-divider />
							<v-layout row wrap class="mt-2 px-2">
								<v-flex xs12 class="mb-2"> <h2> <v-icon left>timer_off</v-icon> Freezing Balance </h2> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="`${RemainingFreezeCount} Freezings Left`" prepend-icon="info" color="orange darken-2" readonly tabindex="-1"/> </v-flex>
								<v-flex xs12 md6 class="px-2"> <v-text-field :value="`${RemainingFreezeDays} Days of Freezings Left`" prepend-icon="info" color="orange darken-2" readonly tabindex="-1"/> </v-flex>
								<v-flex xs12 class="px-2"> <v-checkbox class="ma-0" label="Ignore Balance Restrictions" v-model="ignoreRemainingRestrictions" color="orange darken-2"/> </v-flex>
							</v-layout>
						</m-registration-step-finished>
					</v-flex>
					<v-flex xs12>
						<v-layout row wrap class="pt-2">
							<v-flex xs12>
								<v-alert v-if="!!FreezeWarning" color="yellow darken-4" type="warning" :value="true" >Warning : {{ FreezeWarning }}</v-alert>
								<v-alert v-if="!!FreezeError" color="red darken-3" type="error" :value="true" >Error : {{ FreezeError }}</v-alert>
								<v-card color="transparent" class="pa-4 elevation-10">
									<v-layout row wrap>
										<v-flex xs12 class="px-2"> <p class="text--secondary"><b>NOTE :</b> Both the Dates are Inclusive</p> </v-flex>
										<v-flex xs12 md4 class="px-2">
											<v-text-field v-model="freezeStartFormatted" @blur="freezeStart = parseDate(freezeStartFormatted)" @click:prepend="freezeStartMenu = true" label="Freezing Start Date" placeholder="DD/MM/YYYY" color="orange darken-2" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
											<v-checkbox class="ma-0" label="Allow Back Dating" v-model="allowBackDating" color="orange darken-2"/>
											<v-menu v-model="freezeStartMenu" ref="freezeStartMenu" :close-on-content-click="false" lazy transition="scale-transition" >
												<div slot="activator" data-id="freezeStart"/>
												<v-date-picker v-model="freezeStart" no-title @input="freezeStartMenu = false" :min="freezeStartMin"  :max="freezeStartMax" color="orange darken-2"/>
											</v-menu>
										</v-flex>

										<v-flex xs12 md4 class="px-2">
											<v-text-field v-model="freezeEndFormatted" @blur="freezeEnd = parseDate(freezeEndFormatted)" @click:prepend="freezeEndMenu = true" label="Freezing End Date" placeholder="DD/MM/YYYY" color="orange darken-2" prepend-icon="event" mask="##/##/####" return-masked-value persistent-hint />
											<v-menu v-model="freezeEndMenu" ref="freezeEndMenu" :close-on-content-click="false" lazy transition="scale-transition" >
												<div slot="activator" data-id="freezeEnd"/>
												<v-date-picker v-model="freezeEnd" no-title @input="freezeEndMenu = false" :min="freezeEndMin"  :max="freezeEndMax" color="orange darken-2"/>
											</v-menu>
										</v-flex>

										<v-flex xs12 md4 class="px-2">
											<v-text-field v-model="freezingPeriod" :min="MinimumPeriod" :max="MaximumPeriod" suffix="Days" :hint="`Minimum ${MinimumPeriod} Day${MinimumPeriod>1?'s':''}`" prepend-icon="fas fa-calendar-minus" label="Freezing Period" persistent-hint type="number" />
											<v-checkbox class="ma-0" label="Ignore Minimum Period" v-model="noMinimumPeriod" color="orange darken-2"/>
										</v-flex>
									</v-layout>
								</v-card>
							</v-flex>
							<!-- TODO: [Vicky] wait for nikhil to give History -->
							<v-flex v-if="0" xs12 md3 class="pl-4">
								<v-card class="elevation-5" color="transparent">
									<h2 class="pa-2"> <v-icon>history</v-icon> Other Freezings </h2>
									<v-list v-if="History.length > 0" two-line class="py-0">
										<v-divider />
										<template v-for="(h, index) in History">
											<v-list-tile @click="false" :key="`list-${index}`">
												<v-list-tile-content>
													<v-list-tile-title> {{ formatDate(h.start) }} - {{ formatDate(h.end) }} </v-list-tile-title>
													<v-list-tile-sub-title> {{ moment(h.end).diff(h.start, "days")+1 }} Days </v-list-tile-sub-title>
												</v-list-tile-content>
											</v-list-tile>
											<v-divider :key="`divider-${index}`"/>
										</template>
									</v-list>
									<v-list v-else>
										<v-list-tile>
											<v-list-tile-content>
												<v-list-tile-title> None </v-list-tile-title>
											</v-list-tile-content>
										</v-list-tile>
									</v-list>
								</v-card>
							</v-flex>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-slide-y-reverse-transition>
					<v-footer v-if="!error && !FreezeError" height="auto" color="primary lighten-1" >
						<v-layout justify-center row justify-end align-end class="px-4 py-2">
							<v-btn :loading="paying" :disable="paying" color="darken-4" class="white--text" @click.native.stop="pay()"> <v-icon class="fas" left>fa-cash-register</v-icon> Pay Later </v-btn>
							<v-spacer />
							<v-btn v-if="payed" outline @click.native.stop="print"> <v-icon left>print</v-icon> Print Receipt </v-btn>
							<v-btn v-else :loading="paying" :disable="paying" color="orange darken-4" class="white--text" @click.native.stop="paymentModel = true"> <v-icon class="fas" left>fa-cash-register</v-icon> Make Payment </v-btn>
						</v-layout>
					</v-footer>
				</v-slide-y-reverse-transition>
				<freeze-payment-modal v-model="paymentModel" :user="Client" :transaction="TransactionData" :currentTransactionId="TransactionId" @pay="data => pay(data)" />
			</div>
		</v-slide-y-transition>
	</Layout>
</template>