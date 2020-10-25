// import func from './func';

const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

const faceDetector = new window.FaceDetector();

ctx.strokeStyle = '#ffc600';
ctx.lineWidth = '2px';

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
    });
    video.srcObject = stream;
    await video.play();
    // size the canvas
    console.log(video.videoWidth, video.videoHeight);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
} 

async function detect() {
    const faces = await faceDetector.detect(video);
    // console.log(faces.length);
    // ask the browser when the next animation frame is and run detect for us
    faces.forEach(drawFace) 
    requestAnimationFrame(detect);
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    ctx.strokeRect(width, height, top, left);
}

populateVideo().then(detect);
