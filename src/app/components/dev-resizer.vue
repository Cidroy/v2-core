<template>
    <v-dialog v-model="modal" max-width="200">
        <v-card>
            <v-card-title class="headline">Resize Application</v-card-title>
            <v-card-text>
				<v-btn block @click.native.stop="mobile">Mobile</v-btn>
				<v-btn block @click.native.stop="fullScreen">Full</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import ResizeWindow from "@@/electron/window-resizer"

@Component({})
export default class DevResizer extends Vue{
    @Prop({ type: Boolean, default: false }) show!: boolean
    modal: boolean = false

    @Watch("show")
    onShowChanged(){
		this.modal = this.show
	}

    mobile(){
        ResizeWindow.mobileSize()
    }

    fullScreen(){
        ResizeWindow.fullSize()
    }
}
</script>
