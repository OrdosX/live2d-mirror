<template>
	<div id="app">
		<b-container>
			<p class="heading">获取Live2D Cubism</p>
			<b-row align-h="center">
				<download-block v-if="announceAgree"></download-block>
				<announce-block v-else @announce-agree="announceAgree=true"></announce-block>
			</b-row>
			<about-bar></about-bar>
		</b-container>
	</div>
</template>

<script>
	import DownloadBlock from "@/components/Download.vue";
	import AnnounceBlock from "@/components/Announce.vue";
	import AboutBar from "@/components/About.vue";
	export default {
		name: 'app',
		components:{
			DownloadBlock,
			AnnounceBlock,
			AboutBar
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
