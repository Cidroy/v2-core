<template>
	<v-card>
		<v-dialog v-model="cameraDialog" width="500" persistent>
			<v-card>
				<v-card-title class="headline orange darken-2 py-0 white--text" primary-title>
					<v-icon dark v-text="'photo_camera'" left/> Take Photo
					<v-spacer />
					<v-btn icon dark @click.native.stop="cameraDialog = false"> <v-icon v-text="'close'" /> </v-btn>
				</v-card-title>
					<v-layout class="pt-3">
						<v-spacer />
						<canvas v-show="captured" ref="outputCanvas" :height="cameraStreamHeight" :width="cameraStreamWidth" />
						<video v-show="!captured" ref="cameraOutput" :height="cameraStreamHeight" :width="cameraStreamWidth" autoplay/>
						<v-spacer />
					</v-layout>
				<v-card-text>
				<v-divider/>
				</v-card-text>
				<v-card-actions>
					<v-btn color="orange darken-2" dark v-if="!captured" @click="capture"> <v-icon v-text="'camera'" left/> Capture </v-btn>
					<v-btn color="orange darken-2" dark v-else @click="retake"> <v-icon v-text="'replay'" left/> Retake </v-btn>
					<v-select v-if="!captured" v-model="cameraID" :items="cameraList" menu-props="auto" label="Camera" hide-details prepend-icon="switch_camera" single-line item-text="label" item-value="deviceId" class="pa-2"/>
					<v-spacer v-else/>
					<v-btn color="orange darken-2" dark v-if="captured" @click="save"> <v-icon v-text="'save'" left/> Save </v-btn>
					<v-spacer v-else/>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-img :src="photo" height="200px" />
		<v-btn v-show="!Readonly" block dark color="orange darken-4" @click.native.stop="fromFile"> <v-icon left>photo</v-icon> Add Photo </v-btn>
		<v-btn v-show="!Readonly" block dark color="orange darken-4" @click.native.stop="fromCamera"> <v-icon left>camera_alt</v-icon> Camera </v-btn>
	</v-card>
</template>