<template>
	<v-card color="transparent" class="pa-4">
		<v-layout row wrap>

			<!-- TODO: max 3 elements only -->
			<v-flex xs12 class="px-1"> <v-combobox prepend-icon="fas fa-star" v-model="purposes" :items="Purposes" item-text="name" item-value="id" label="Purpose of Joining Gym" multiple chips hint="Maximum 3 choices" persistent-hint clearable deletable-chips color="orange darken-2"/> </v-flex>

			<v-flex xs12 class="pt-2 px-2">
				<span class="title font-weight-regular">Allow Door Access</span>
				<v-layout align-start row>
					<v-switch v-model="allowedDoors" v-for="door in DOORS" :key="door.id" :label="door.name" :value="door.id" color="orange darken-2"/>
				</v-layout>
			</v-flex>

			<v-flex xs12 class="pt-2 px-2">
				<span class="title font-weight-regular">How did you hear of us?</span>
				<v-layout align-start row>
					<v-checkbox v-model="utmSource" v-for="source in UTM_SOURCES" :key="source.id" :label="source.name" :value="source.id" color="orange darken-2" />
				</v-layout>
			</v-flex>

			<v-flex xs12 px-2>
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

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"
import { MiscStore } from "@/state/modules/misc"
import { TMRegistrationStep4, defaultRegistrationStep4User } from "@/classes/types/registration"

@Component({
	created(){
		this.allowedDoors = [ this.DOORS[0].id ]
		this.utmSource = this.UTM_SOURCES[0].id
	}
})
export default class MRegistrationStep4 extends Vue{
	private confirmModal = false

	private utmSource: boolean | string | number = false
	private toc = false
	private allowedDoors: (number|string)[] = []
	private purposes: (string| number)[] = []
	private get Purposes(){return MiscStore.PURPOSES }

	private get DOORS(){ return MiscStore.DOORS }
	private get UTM_SOURCES(){ return MiscStore.UTM_SOURCES }

	private get userData(){
		return {
			...this.value,
			utmSource : this.value.utmSource,
			toc : this.value.toc,
			allowedDoors : this.value.allowedDoors,
			purposes : this.value.purposes,
		}
	}
	@Prop({
		type: Object,
		default: () => defaultRegistrationStep4User
	}) private value !: TMRegistrationStep4
	@Emit("input") public inputEmitter(){ return this.userData }
	@Emit("nextStep") public nextStep(){ return true }
	@Watch("value") private onValueChange(){
		this.utmSource = this.value.utmSource
		this.toc = this.value.toc
		this.allowedDoors = this.value.allowedDoors
		this.purposes = this.value.purposes
	}

	private showToc(){}
	private showRules(){}
	private formNext(){
		this.inputEmitter()
		this.nextStep()
	}
	private formReset(){}

	@Watch("utmSource")
	@Watch("toc")
	@Watch("allowedDoors")
	@Watch("purposes")
	private doInputEmit(){ this.inputEmitter() }
}
</script>