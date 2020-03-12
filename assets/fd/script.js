const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('assets/fd/models/'),
  faceapi.nets.faceLandmark68Net.loadFromUri('assets/fd/models/'),
  faceapi.nets.faceRecognitionNet.loadFromUri('assets/fd/models/'),
  faceapi.nets.faceExpressionNet.loadFromUri('assets/fd/models/')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      console.log(detections);

    if(detections.length != 0)
    {
        document.body.style.backgroundColor = "green";
    }
    else
    {
        document.body.style.backgroundColor = "red";
    }
  }, 100)
})