import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring,
} from 'remotion';

export const SlideOpenEffect = () => {
	const LINE_X_RADIUS = 1;

	const {fps, width, height} = useVideoConfig();
	const frame = useCurrentFrame();
	const rawProgress = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});
	const progress = rawProgress + frame / 1000 - 0.1;
	const lineProgress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	const lineExplode = spring({
		fps,
		frame: frame - 5,
		config: {
			damping: 200,
		},
	});
	const LINE_Y_RADIUS = interpolate(lineExplode, [0, 1], [500, height]);

	const currentStrokeWidth = interpolate(
		lineExplode,
		[0, 1],
		[6, width + LINE_X_RADIUS]
	);

	const lineX =
		Math.sin((progress * Math.PI) / 2 + Math.PI / 4) *
			LINE_X_RADIUS *
			lineProgress +
		width / 2;

	const lineY =
		Math.cos((progress * Math.PI) / 2 + Math.PI / 4) *
			LINE_Y_RADIUS *
			lineProgress +
		height / 2;

	const line2X =
		Math.sin((progress * Math.PI) / 2 + Math.PI + Math.PI / 4) *
			LINE_X_RADIUS *
			lineProgress +
		width / 2;

	const line2Y =
		Math.cos((progress * Math.PI) / 2 + Math.PI + Math.PI / 4) *
			LINE_Y_RADIUS *
			lineProgress +
		height / 2;

	return (
		<AbsoluteFill>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<path
					d={`
            M ${lineX - currentStrokeWidth / 2} ${lineY}
            L ${line2X - currentStrokeWidth / 2} ${line2Y}
            L ${line2X + currentStrokeWidth / 2} ${line2Y}
            L ${lineX + currentStrokeWidth / 2} ${lineY}
            `}
					fill="#F0CB46"
				/>
			</svg>
		</AbsoluteFill>
	);
};
