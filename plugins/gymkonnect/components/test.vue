<template>
	<div>
		test page
		<v-btn @click="profile = true">Profile</v-btn>
		<profile-modal v-model="profile"/>
		<testuserprofile />
	</div>
</template>