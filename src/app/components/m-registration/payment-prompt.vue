<template>
	<v-dialog v-model="confirmModal" persistent max-width="400px">
		<v-card>
			<v-toolbar card dark color="orange darken-4" height="50px">
				<v-toolbar-title>Alert!</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<label class="title">Do you want to Proceed for payments?</label>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn dark color="orange darken-4" @click="submit">Yes</v-btn>
				<v-btn dark @click="cancelled">No</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>


<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from "vue-property-decorator"

@Component({})
export default class PaymentPromt extends Vue{
	private confirmModal = false

	@Emit("input") public inputEmitter(){ 
		this.confirmModal = false
		return this.confirmModal 
	}
	@Emit("cancelled") public cancelled(){
		this.inputEmitter()
		return this.confirmModal
	}
	@Emit("submit") public submit(){
		this.inputEmitter()
		return true
	}
	@Prop({ type: Boolean, default: false }) value!: boolean
	@Watch("value") onValueChange(){ this.confirmModal = this.value }
}
</script>
