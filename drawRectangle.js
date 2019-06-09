/*
  DRAW RECTANGLE FUNCTION EVENT LISTENERS AND LOGIC 
*/


// fillRect(x,y,width,height) -> draws a filled rectangle
// clearRect(x,y,width,height) -> empties an area in the shape of a rectagle making it transparent
// strokeRect(x,y,width,height) -> draws the outline of a rectangle

// const drawRectangle = () => {
//   const width = currentPosition.x - startCoordinates.x;
//   const height = currentPosition.y - startCoordinates.y;

//   ctx.lineWidth = 10;
//   ctx.lineCap = 'round';

//   ctx.beginPath();
//   ctx.rect(startCoordinates.x, startCoordinates.y, width, height);
//   ctx.stroke();
// }

window.onload = () => {
    /*
    -------------------------------------
    ---------- VARIABLES ----------------
    -------------------------------------
    */
  let painting = false;

    const currentPosition = {
        x:0,
        y:0,
    };
    
    let startCoordinates = {
      x: 0,
      y: 0,
    }
  
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
  
    function setStartCoordinates({clientX, clientY}) {
      startCoordinates.x = clientX;
      startCoordinates.y = clientY;
      painting = true;
    }
  
    function drawRectangle(e) {
      if (!painting) return;
  
      const width = e.clientX - startCoordinates.x;
      const height = e.clientY - startCoordinates.y;

      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.stroke(); 
      ctx.strokeRect(startCoordinates.x, startCoordinates.y, width, height);
      ctx.stroke(); 
    }
  
    function setCurrentPosition({clientX, clientY}) {
      currentPosition.x = clientX;
      currentPosition.y = clientY;
      painting = false;
    }
  
    window.addEventListener('resize', () => {
      const canvas = document.querySelector('#canvas');
      canvas.height = window.innerHeight * 0.98;
      canvas.width = window.innerWidth * 0.85;
    });


    canvas.addEventListener('click', () => {
      console.log(startCoordinates.x, startCoordinates.y );
      console.log(currentPosition.x, currentPosition.y);
      // drawRectangle();
    });
    canvas.addEventListener('mousedown', setStartCoordinates);
    canvas.addEventListener('mouseup', setCurrentPosition);
    canvas.addEventListener('mousemove', drawRectangle);
  };
  
  
  