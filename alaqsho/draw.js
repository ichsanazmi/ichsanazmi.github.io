  let canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  
function test_render() {
	document.body.removeChild(canvas);
var img = new Image();
// (PART B) ADD TEXT TO IMAGE
img.onload = async () => {
  // (B1) CREATE NEW CANVAS
  // let canvas = document.createElement("canvas"),
  // ctx = canvas.getContext("2d");
  // image.crossOrigin = "anonymous";

  // (B2) DRAW IMAGE ONTO CANVAS
  canvas.width = 1080;
  canvas.height = 1080;
  ctx.drawImage(img, 0, 0, 1080, 1080);

  // (B3) LOAD FONT
  let font = new FontFace("myFont", "url(Merriweather-Bold.ttf)");
  await font.load();
  document.fonts.add(font);

  // (B4) TEXT SETTINGS
  let txt = document.getElementById("nama").value;
  ctx.font = "30px myFont";
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgb(0, 0, 0)";

  // (B5) MEASURE TEXT & CENTER POSITION
  let txtdim = ctx.measureText(txt),
      txtwidth = txtdim.width,
      txtheight = txtdim.actualBoundingBoxAscent + txtdim.actualBoundingBoxDescent,
      x = Math.floor((canvas.width - txtwidth) / 2),
      //y = Math.floor((canvas.height - txtheight) / 2) + 30;
      y = 550;

  // (B6) DRAW TEXT ONTO CANVAS
  ctx.strokeText(txt, x, y);
  ctx.fillText(txt, x, y);

  // (B7) ADD CANVAS TO DOCUMENT
  document.body.appendChild(canvas);
};
// (PART C) GO!
img.crossOrigin="anonymous";
// img.src = "https://avatars.githubusercontent.com/u/8157119?s=64&v=4";
img.src = "SelamatIed.png";
};
function linkDownload() {
	
	const canvass = document.querySelector("canvas");
	var image = canvass.toDataURL();
	var aDownloadLink = document.createElement('a');
	// Add the name of the file to the link
	aDownloadLink.download = 'UcapanIed_Alihsan.png';
	// Attach the data to the link
	aDownloadLink.href = image;
	// Get the code to click the download link
	aDownloadLink.click();
};