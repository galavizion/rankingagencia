(function () {
  var canvas = document.createElement("canvas");
  var ctx    = canvas.getContext("2d");

  canvas.style.cssText = [
    "position:fixed", "inset:0", "width:100%", "height:100%",
    "z-index:0", "pointer-events:none", "opacity:1"
  ].join(";");
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  var W, H;

  var ORBS = [
    { color: "140,122,198", r: 280, x: 0, y: 0, vx: 0.18, vy: 0.12, a: 0.055 },
    { color: "200,79,146",  r: 220, x: 0, y: 0, vx: -0.14, vy: 0.16, a: 0.045 },
    { color: "46,196,165",  r: 180, x: 0, y: 0, vx: 0.10, vy: -0.18, a: 0.038 },
    { color: "140,122,198", r: 150, x: 0, y: 0, vx: -0.20, vy: -0.10, a: 0.030 },
    { color: "200,79,146",  r: 200, x: 0, y: 0, vx: 0.13, vy: 0.14, a: 0.028 },
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    ORBS[0].x = W * 0.75; ORBS[0].y = H * 0.20;
    ORBS[1].x = W * 0.15; ORBS[1].y = H * 0.70;
    ORBS[2].x = W * 0.85; ORBS[2].y = H * 0.60;
    ORBS[3].x = W * 0.40; ORBS[3].y = H * 0.30;
    ORBS[4].x = W * 0.55; ORBS[4].y = H * 0.80;
  }

  var frame = 0;
  function draw() {
    frame++;
    // Actualizar solo cada 2 frames (~30fps) para ahorrar CPU
    if (frame % 2 === 0) {
      ctx.clearRect(0, 0, W, H);

      ORBS.forEach(function (o) {
        o.x += o.vx;
        o.y += o.vy;
        // Rebotar suavemente en los bordes
        if (o.x < -o.r || o.x > W + o.r) o.vx *= -1;
        if (o.y < -o.r || o.y > H + o.r) o.vy *= -1;

        var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   "rgba(" + o.color + "," + o.a + ")");
        g.addColorStop(1,   "rgba(" + o.color + ",0)");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
