// DrawTriangle.js (c) 2012 matsuda
function main() {
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  var v1 = new Vector3([2.25, 2.25]);
  drawVector(v1, 'red');
}

function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  var originX = 200;
  var originY = 200;

  var scale = 20;

  var x = originX + v.elements[0] * scale;
  var y = originY - v.elements[1] * scale;

  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleDrawEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  var x1 = parseFloat(document.getElementById('xv1').value);
  var y1 = parseFloat(document.getElementById('yv1').value);

  var x2 = parseFloat(document.getElementById('xv2').value);
  var y2 = parseFloat(document.getElementById('yv2').value);

  var v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, 'red');

  var v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, 'blue');
}

function handleDrawOperationEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  var x1 = parseFloat(document.getElementById('xv1').value);
  var y1 = parseFloat(document.getElementById('yv1').value);
  var v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, 'red');

  var x2 = parseFloat(document.getElementById('xv2').value);
  var y2 = parseFloat(document.getElementById('yv2').value);
  var v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, 'blue');

  var operation = document.getElementById('operation').value;
  var scalar = parseFloat(document.getElementById('scalar').value);

  if (operation === 'add') {
    let v3 = new Vector3([0, 0, 0]).set(v1).add(v2);
    drawVector(v3, 'green');
  } else if (operation === 'sub') {
    let v3 = new Vector3([0, 0, 0]).set(v1).sub(v2);
    drawVector(v3, 'green');
  } else if (operation === 'mul') {
    let v3 = new Vector3([0, 0, 0]).set(v1).mul(scalar);
    let v4 = new Vector3([0, 0, 0]).set(v2).mul(scalar);
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (operation === 'div') {
    if (scalar !== 0) {
      let v3 = new Vector3([0, 0, 0]).set(v1).div(scalar);
      let v4 = new Vector3([0, 0, 0]).set(v2).div(scalar);
      drawVector(v3, 'green');
      drawVector(v4, 'green');
    }
  } else if (operation === 'magnitude') {
    console.log(`Magnitude v1: ${v1.magnitude()}`);
    console.log(`Magnitude v2: ${v2.magnitude()}`);
  } else if (operation === 'normalize') {
    let v3 = new Vector3([0, 0, 0]).set(v1).normalize();
    let v4 = new Vector3([0, 0, 0]).set(v2).normalize();
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  } else if (operation === 'angle') {
    //dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
    const dotProduct = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) {
      console.log('Angle: undefined');
      return;
    }

    const cosTheta = dotProduct / (mag1 * mag2);
    const angle = Math.acos(cosTheta) * (180 / Math.PI);
    console.log('Angle:', angle);
  } else if (operation === 'area') {
    const crossProduct = Vector3.cross(v1, v2);
    const areaTriangle = crossProduct.magnitude() / 2;
    console.log('Area of the triangle: ', areaTriangle);
  }
}
