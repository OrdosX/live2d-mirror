<template>
	<b-col cols="8">
		<b-card>
			<p>本网页为由于ajax.googleapis.com被墙而无法点击按钮下载Live2D Cubism的同学服务。</p>
			<p>详细情况，请点击<a href="https://www.bilibili.com/read/cv3927825">我的B站专栏</a></p>
			<p>网页作者仅保证网页中列出官网链接的可用性以及通过镜像链接下载的文件与官网内容的一致性</p>
			<p>继续使用，即代表您同意<a href="https://www.live2d.com/download/cubism/">ソフトウェア使用許諾契約書</a></p>
			<b-button variant="success" class="float-right" @click="$emit('announce-agree')"><b-icon icon="play"></b-icon>继续</b-button>
		</b-card>
	</b-col>
</template>

<script>
	export default {
		name: 'AnnounceBlock',
	}
</script>

<style>
</style>
