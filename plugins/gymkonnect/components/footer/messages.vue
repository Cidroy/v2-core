<template>
	<v-btn outline small @click="onClick">
		<v-icon left class="fas" small>fa-comment-alt</v-icon>
		Messages Left : {{ remainingMessages }}/{{ totalMessages }}
	</v-btn>
</template>
