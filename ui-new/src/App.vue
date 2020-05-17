<template>
	<div id="app">
		<b-container>
			<p class="heading">获取Live2D Cubism</p>
			<b-row align-h="center">
				<download v-if="announceAgree"></download>
				<Announce v-else @announce-agree="announceAgree=true"></Announce>
			</b-row>
			<About></About>
		</b-container>
	</div>
</template>

<script>
	import Download from "./components/Download.vue";
	import Announce from "./components/Announce.vue";
	import About from "./components/About.vue";
	export default {
		name: 'app',
		components:{
			Download,
			Announce,
			About
		},
		data: function() {
			return {
				announceAgree: false
			}
		}
	}
</script>

<style>
	.heading {
		text-align: center;
		font-size: 2.5em;
		font-weight: bold;
		margin: 0.5em;
	}
</style>
