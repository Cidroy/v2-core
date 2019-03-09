<template>
	<v-footer app dark>
		<span class="pl-2" v-html="copyright" />
		<v-spacer />
		<backup v-if="$permission(PERMISSION.gymkonnect.BACKUP)"/>
		<messages v-if="$permission(PERMISSION.gymkonnect.MESSAGES_STATUS_VIEW)"/>
		<device-status v-if="$permission(PERMISSION.gymkonnect.DEVICE_STATUS_VIEW)"/>
	</v-footer>
</template>