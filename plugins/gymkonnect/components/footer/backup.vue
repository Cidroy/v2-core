<template>
	<v-btn @click="backup" :outline="!backingUp" small :loading="backingUp" :disabled="backingUp">
		<v-icon left>cloud_upload</v-icon>
		<span>BackUp</span>
		<template #loader>
			<v-progress-linear :indeterminate="true" color="orange darken-2" />
		</template>
	</v-btn>
</template>
