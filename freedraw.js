// fillRect(x,y,width,height) -> draws a filled rectangle
// clearRect(x,y,width,height) -> empties an area in the shape of a rectagle making it transparent
// strokeRect(x,y,width,height) -> draws the outline of a rectangle

window.onload = () => {
    /*
    -------------------------------------
    ---------- VARIABLES ----------------
    -------------------------------------
    */
    let painting = false;
  
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector('#canvas');
  
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
  
  
    /*
    -------------------------------------
    --------- INITIALIZERS --------------
    -------------------------------------
    */
  
    canvas.height = window.innerHeight * .99;
    canvas.width = window.innerWidth * 0.85;
    
  
    /*
    -------------------------------------
    ---------- FUNCTIONS ----------------
    -------------------------------------
    */
  
    function stopPainting() {
      painting = false;
      ctx.beginPath();
    };
  
    function startPainting(e) {
      painting = true;
      draw(e);
    };
  
    function draw(e) {
      if (!painting) return;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    window.addEventListener('resize', () => {
      const canvas = document.querySelector('#canvas');
      canvas.height = window.innerHeight * 0.98;
      canvas.width = window.innerWidth * 0.85;
    });
  
    // canvas.addEventListener('click', draw);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', draw);
  };
  
