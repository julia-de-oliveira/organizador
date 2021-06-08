<template>
	<div class="base-timer mx-auto mt-5">
		<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
			<g class="base-timer__circle">
				<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
				<path :stroke-dasharray="circleDasharray" class="base-timer__path-remaining" :class="remainingPathColor" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
			</g>
		</svg>
		
		<span class="base-timer__label">{{formattedTimeLeft}}</span>
	</div>
	<div class="mx-auto m-5">
		<button type="button" class="btn btn-sm m-2 rounded-circle" v-on:click="reset()">
			<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#d600a4" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
				<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
			</svg>
		</button>
		<button type="button" class="btn btn-sm m-2 rounded-circle" :class="{ disabled: isPlayActive }" v-on:click="playTimer()">
			<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7409b5" class="bi bi-play" viewBox="0 0 16 16">
				<path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
			</svg>
		</button>
		<button type="button" class="btn btn-sm m-2 rounded-circle" :class="{ disabled: isPauseActive }" v-on:click="pauseTimer()">
			<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7409b5" class="bi bi-pause" viewBox="0 0 16 16">
				<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
			</svg>
		</button>
	</div>
</template>

<script>
	import alarm from "@/assets/alarm.mp3";
	import { useToast } from "vue-toastification";

	const FULL_DASH_ARRAY = 283;
	const WARNING_THRESHOLD = 3*60;
	const ALERT_THRESHOLD = 1*60;

	const COLOR_CODES = {
		info: {
			color: "green"
		},
		
		warning: {
			color: "orange",
			threshold: WARNING_THRESHOLD
		},
		
		alert: {
			color: "red",
			threshold: ALERT_THRESHOLD
		}
	};

	export default {
		setup() {
			const toast = useToast();
			return { toast }
		},

		data() {
			return {
				timePassed: 0,
				timerInterval: null,

				isPlayActive: false,
				isPauseActive: false,
			};
		},

		props: {
			TIME_LIMIT: {
				type: Number,
				required: true
			}
		},

		computed: {
			circleDasharray() {
				return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
			},

			formattedTimeLeft() {
				const timeLeft = this.timeLeft;
				const minutes = Math.floor(timeLeft / 60);
				let seconds = timeLeft % 60;

				if (seconds < 10) {
					seconds = `0${seconds}`;
				}

				return `${minutes}:${seconds}`;
			},

			timeLeft() {
				return this.TIME_LIMIT - this.timePassed;
			},

			timeFraction() {
				const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
				return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
			},

			remainingPathColor() {
				const { alert, warning, info } = COLOR_CODES;

				if (this.timeLeft <= alert.threshold) {
					return alert.color;
				} else if (this.timeLeft <= warning.threshold) {
					return warning.color;
				} else {
					return info.color;
				}
			}
		},

		watch: {
			timeLeft(newValue) {
				if (newValue === 0) {
					this.onTimesUp();
				}
			}
		},

		methods: {
			onTimesUp() {
				this.isPauseActive = true;
				this.isPlayActive = false;

				this.timePassed = 0;
				clearInterval(this.timerInterval);
				this.emitter.emit("finished", true);
				var audio = new Audio(alarm);
				audio.play();

				this.toast.info("O tempo acabou! Prepare-se e passe para a próxima etapa", {
					position: "top-center",
					timeout: 15000,
					closeOnClick: true,
					pauseOnFocusLoss: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 0.6,
					showCloseButtonOnHover: true,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			},

			startTimer() {
				this.emitter.emit("finished", false);
				this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
			},

			reset() {
				this.timePassed = 0;
			},

			pauseTimer() {
				this.isPauseActive = true;
				this.isPlayActive = false;
				clearInterval(this.timerInterval);
				this.timerInterval = 0;
			},

			playTimer() {
				this.isPauseActive = false;
				this.isPlayActive = true;
				//this.timePassed = 0;
				this.startTimer();
			},
		}
	};
</script>

<style scoped lang="scss">
	.base-timer {
		position: relative;
		width: 300px;
		height: 300px;

		&__svg {
			transform: scaleX(-1);
		}

		&__circle {
			fill: none;
			stroke: none;
		}

		&__path-elapsed {
			stroke-width: 7px;
			stroke: grey;
		}

		&__path-remaining {
			stroke-width: 7px;
			stroke-linecap: round;
			transform: rotate(90deg);
			transform-origin: center;
			transition: 1s linear all;
			fill-rule: nonzero;
			stroke: currentColor;

			&.green {
				color: rgb(65, 184, 131);
			}

			&.orange {
				color: orange;
			}

			&.red {
				color: red;
			}
		}

		&__label {
			position: absolute;
			width: 300px;
			height: 300px;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 48px;
		}
	}
</style>
