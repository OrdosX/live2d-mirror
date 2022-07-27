<template>
	<b-col cols="8">
		<b-card-group deck>
			<b-card>
				<b-collapse v-model="iconVisible">
					<b-card-img :src="require('@/assets/winx86.png')"></b-card-img>
				</b-collapse>
				<b-card-title>Windows 32位</b-card-title>
				<b-button variant="light" block @click="system === 1 ? system = 0 : system = 1">
					<b-icon icon="chevron-up" v-if="system === 1"></b-icon>
					<b-icon icon="chevron-down" v-else></b-icon>
				</b-button>
			</b-card>
			<b-card>
				<b-collapse v-model="iconVisible">
					<b-card-img :src="require('@/assets/winx64.png')"></b-card-img>
				</b-collapse>
				<b-card-title>Windows 64位</b-card-title>
				<b-button variant="light" block @click="system === 2 ? system = 0 : system = 2">
					<b-icon icon="chevron-up" v-if="system === 2"></b-icon>
					<b-icon icon="chevron-down" v-else></b-icon>
				</b-button>
			</b-card>
			<b-card>
				<b-collapse v-model="iconVisible">
					<b-card-img :src="require('@/assets/mac.png')"></b-card-img>
				</b-collapse>
				<b-card-title>Mac</b-card-title>
				<b-button variant="light" block @click="system === 3 ? system = 0 : system = 3">
					<b-icon icon="chevron-up" v-if="system === 3"></b-icon>
					<b-icon icon="chevron-down" v-else></b-icon>
				</b-button>
			</b-card>
		</b-card-group>
		<b-collapse v-model="downloadVisible">
			<b-overlay :show="overlayVisible">
				<b-card v-if="system === 1">
					新版本均不支持32位系统，最后一个支持的版本是6年前发布的<a href="https://sites.google.com/cybernoids.jp/cubism-editor2-e/editor-2-1/download">Cubism 2.1（已被墙）</a>。<br>
					用旧版本很容易出玄学bug，如果你执意下载，用这个链接：<a href="https://getl2d.ordosx.tech/files/Live2D_Cubism_Setup_2.1.16_2_zh.exe">中文版</a> <a href="https://getl2d.ordosx.tech/files/Live2D_Cubism_Setup_2.1.16_2_en.exe">英文版</a>
				</b-card>
				<b-card v-if="system === 2 || system === 3">
					<b-button variant="light-outline" @click="usingMirror = !usingMirror" class="float-right" v-b-tooltip.hover title="官方链接较慢则用镜像链接">
						官方链接
						<b-icon icon="toggle-on" v-if="usingMirror"></b-icon>
						<b-icon icon="toggle-off" v-else></b-icon>
						镜像链接
					</b-button>
					<b-card-title>中文版</b-card-title>
					<b-card-text>
						<b-button-group>
							<b-button @click="download(versions.latestVersion, 'zh')" variant="success">
								{{versions.latestVersion}}
							</b-button>
							<b-dropdown text="非最新的4.x.x" v-if="!usingMirror">
								<b-dropdown-item v-for="version in versions.versions" :key="version" @click="download(version, 'zh')">
									{{version}}
								</b-dropdown-item>
							</b-dropdown>
							<b-button @click="download('4.1.05', 'zh')" variant="success">4.1.05</b-button>
						</b-button-group>
					</b-card-text>
					<b-card-title>日文版</b-card-title>
					<b-card-text>
						<b-button-group>
							<b-button @click="download(versions.latestVersion, 'jp')" variant="success">
								{{versions.latestVersion}}
							</b-button>
							<b-dropdown text="非最新的4.x.x" v-if="!usingMirror">
								<b-dropdown-item v-for="version in versions.versions" :key="version" @click="download(version, 'jp')">
									{{version}}
								</b-dropdown-item>
							</b-dropdown>
							<b-button @click="download('4.1.05', 'jp')" variant="success">4.1.05</b-button>
							<b-button @click="download('3.3.03_1', 'jp')" variant="success">3.3.03_1</b-button>
							<b-button @click="download('3.2.07_1', 'jp')" v-if="!usingMirror">3.2.07_1</b-button>
						</b-button-group>
					</b-card-text>
					<b-card-title>英文版</b-card-title>
					<b-card-text>
						<b-button-group>
							<b-button @click="download(versions.latestVersion, 'en')" variant="success">
								{{versions.latestVersion}}
							</b-button>
							<b-dropdown text="非最新的4.x.x" v-if="!usingMirror">
								<b-dropdown-item v-for="version in versions.versions" :key="version" @click="download(version, 'en')">
									{{version}}
								</b-dropdown-item>
							</b-dropdown>
							<b-button @click="download('4.1.05', 'en')" variant="success">4.1.05</b-button>
							<b-button @click="download('3.3.03_1', 'en')" variant="success">3.3.03_1</b-button>
							<b-button @click="download('3.2.07_1', 'en')" v-if="!usingMirror">3.2.07_1</b-button>
						</b-button-group>
					</b-card-text>
				</b-card>
			</b-overlay>
		</b-collapse>
		<b-modal id="downloading" hide-footer centered size="lg">
			<template v-slot:modal-title>
				<b-spinner type="grow" label="Downloading..."></b-spinner>
				<span>下载中</span>
			</template>
			<p>如果下载并未开始，请点击或复制以下链接：</p>
			<a :href="downloadingURL">{{ downloadingURL }}</a>
			<br><br>
			<p>遇到困难？移步<a href="https://www.bilibili.com/read/cv3927825">B站专栏</a>反馈</p>
			<hr />
			<p>绝赞用爱发电中，如果对你有帮助，何不……(o゜▽゜)o☆</p>
			<b-img :src="require('@/assets/money.png')" fluid alt="恰饭"></b-img>
		</b-modal>
	</b-col>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Download',
		data: function() {
			return {
				versions: {},
				system: 0,
				usingMirror: false,
				overlayVisible: false,
				downloadingURL: ""
			}
		},
		computed: {
			downloadVisible: {
				get: function() {
					return this.system != 0;
				},
				set: function() {}
			},
			iconVisible: {
				get: function() {
					return this.system == 0;
				},
				set: function() {}
			}
		},
		watch: {
			system: function(n, o) {
				if (n > 1 && o > 1) {
					this.overlayVisible = true;
					setTimeout(() => {
						this.overlayVisible = false;
					}, 300);
				}
			}
		},
		methods: {
			download: function(version, language) {
				this.downloadingURL = '';
				if (this.usingMirror) {
					this.downloadingURL += window.location.origin + '/files/Live2D_Cubism_Setup_'
				} else {
					this.downloadingURL += 'https://cubism.live2d.com/editor/bin/Live2D_Cubism_Setup_';
				}
				this.downloadingURL += version;
				const NON_MULTILINGUAL_VERSIONS=["4.1.05","4.1.05 beta2","4.1.05 beta1","4.1.04","4.1.03","4.1.02","4.1.02 beta1","4.1.01","4.1.01 beta1","4.1.00","4.1.00 beta1","4.0.09","4.0.08","4.0.08 beta1","4.0.07","4.0.07 beta1","4.0.06","4.0.06 beta1","4.0.05","4.0.05 beta1","4.0.04","4.0.04-beta1","4.0.03","4.0.02","4.0.01","4.0.00","3.3.03_1","3.2.07_1"];
				if (NON_MULTILINGUAL_VERSIONS.includes(version)) {
					this.downloadingURL += '_' + language;
				}
				if (this.system === 3) {
					this.downloadingURL += '.pkg';
				} else {
					this.downloadingURL += '.exe';
				}
				window.open(this.downloadingURL, '_blank');
				//console.log(downloadingURL)
				this.$bvModal.show('downloading');
			}
		},
		mounted() {
			axios.get('/versions.json').then(res => {
				this.versions = res.data
			})
		}
	}
</script>

<style>
</style>
