// 描画オブジェクトの初期化
var imgCanvas = document.getElementById('img-canvas');
var gridCanvas = document.getElementById('grid-canvas');

var imgCtx = imgCanvas.getContext('2d');
var gridCtx = gridCanvas.getContext('2d');

// Canvasの初期化
var canvasWidth = 0;
var canvasHeight = 0;

imgCanvas.width = canvasWidth;
imgCanvas.height = canvasHeight;
gridCanvas.width = canvasWidth;
gridCanvas.height = canvasHeight;

// アップロードファイルに関する初期化
var file = document.getElementById('file');
var uploadImgSrc;


function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {
    // canvas内の要素をクリアする
    imgCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    gridCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;
    img.onload = function() {
      imgCanvas.height = img.height;
      imgCanvas.width  = img.width;
      gridCanvas.height = img.height;
      gridCanvas.width = img.width;
      canvasHeight = gridCanvas.height;
      canvasWidth = gridCanvas.width;

      // Canvasに描画する
      imgCtx.drawImage(img, 0, 0);
    }
}

// グリッドを引くボタンを ON にしたときに，グリッドを白色で引く
document.getElementsByClassName("switch__input")[0].onclick = () => makeGrid('white');
// グリッドの色を白に指定したときに，グリッドを白色で引く
document.getElementsByClassName("button-white")[0].onclick = () => makeGrid('white');
// グリッドの色を黒に指定した時に，グリッドを黒色で引く
document.getElementsByClassName("button-black")[0].onclick = () => makeGrid('black');

// グリッド線を color 色で描画する
function makeGrid(color) {
  // キャンバスをリセットする
  gridCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  // 「グリッドを表示」が ON なら，グリッドを描画する
  const checkbox = document.getElementsByClassName('switch__input')[0]
  if (checkbox.checked) {
    makeVerticalGrid(color);
    makeHorizontalGrid(color);
  }
}

const gridLength = 100;

// 垂直方向のグリッドを color 色で引く
function makeVerticalGrid(color) {
  gridCtx.strokeStyle = color;
  gridCtx.fillStyle = color;

  for (let i=0; i<=canvasHeight/gridLength; i++) {
    gridCtx.lineWidth = 2;
    if (i%3 == 0) {
      gridCtx.lineWidth = 5
      putGridNumber(color, i/3, 5, i*gridLength + 5)
    }
    putLine(fromX=0, fromY=i*gridLength, toX=canvasWidth, toY=i*gridLength);
  }
}

// 水平方向のグリッドを color 色で引く
function makeHorizontalGrid(color) {
  gridCtx.strokeStyle = color;
  gridCtx.fillStyle = color;

  for (let j=0; j<=canvasWidth/gridLength; j++) {
    gridCtx.lineWidth = 2;
    if (j%3 == 0) {
      gridCtx.lineWidth = 5;
      putGridNumber(color, j/3, j*gridLength + 5, 5);
    }
    putLine(fromX=j*gridLength, fromY=0, toX=j*gridLength, toY=canvasHeight);
  }
}

// (x, y) に color 色の num という数字を描画する
function putGridNumber(color, num, x, y) {
  gridCtx.font = "48px serif";
  gridCtx.textBaseline = "hanging";
  gridCtx.fillText(`${num}`, x, y);
}

// (fromX, fromY) から (toX, toY) に直線を引く
function putLine(fromX, fromY, toX, toY) {
  gridCtx.beginPath();
  gridCtx.moveTo(fromX, fromY);
  gridCtx.lineTo(toX, toY);
  gridCtx.stroke();
}