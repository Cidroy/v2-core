<template>
	<v-card color="transparent" class="pa-4">
		<v-layout row wrap>

			<!-- TODO: max 3 elements only -->
			<v-flex xs12 class="px-1"> <v-combobox prepend-icon="fas fa-star" v-model="purposes" :items="Purposes" item-text="name" item-value="id" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices" persistent-hint clearable deletable-chips color="orange darken-2"/> </v-flex>

			<v-flex xs12 class="pt-2 px-2">
				<span class="title font-weight-regular">How did you hear of us?</span>
				<v-layout align-start row>
					<v-checkbox v-model="utmSource" v-for="source in UTM_SOURCES" :key="source.id" :label="source.name" :value="source.id" color="orange darken-2" />
				</v-layout>
			</v-flex>

			<v-flex xs12 px-2 v-if="!exclude.includes('toc')">
				<v-layout align-end justify-start reverse fill-height>
					<v-checkbox v-model="toc" color="orange darken-2">
						<div slot="label">
							I agree to Gym
							<v-tooltip bottom>
								<a slot="activator" class="blue--text text-lighten-1" @click.native.stop="showRules"> <u>Rules & Regulations</u></a>
								Show
							</v-tooltip>
							followed by
							<v-tooltip bottom>
								<a slot="activator" class="blue--text text-lighten-1" @click.native.stop="showToc"> <u>Terms & Conditions..</u></a>
								Show
							</v-tooltip>
						</div>
					</v-checkbox>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-card>
</template>
