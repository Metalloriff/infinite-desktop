async function initializeRenderer(sourceId) {
	const video = document.getElementById("video");

	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			mandatory: {
				chromeMediaSource: "desktop",
				chromeMediaSourceId: sourceId
			}
		}
	}).then(stream => {
		video.srcObject = stream;
		video.play();
	});
}