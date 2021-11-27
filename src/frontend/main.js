function receiveRenderers(sourceIds, thumbnails) {
	const selectorContainer = document.getElementById("src-selector-container");

	for (let i = 0; i < sourceIds.length; i++) {
		const sourceId = sourceIds[i];
		const thumbnail = thumbnails[i];

		const item = document.createElement("div");
		const img = Object.assign(
			document.createElement("img"),
			{ src: thumbnail }
		);

		item.appendChild(img);
		item.addEventListener("click", () => {
			selectorContainer.innerHTML = "";
			initializeRenderer(sourceId);
		});

		selectorContainer.appendChild(item);
	}
}

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