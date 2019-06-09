const tools = {
  lineWidth: 3,
  drawRectangle: (e, render, ctx, startCoordinates) => {
    const width = e.clientX - startCoordinates.x;
    const height = e.clientY - startCoordinates.y;
    ctx.lineWidth = tools.lineWidth;
    ctx.lineCap = 'round';

    if (!render) {
      ctx.rect(startCoordinates.x, startCoordinates.y, width, height);
      ctx.stroke();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.strokeRect(startCoordinates.x, startCoordinates.y, width, height);
    ctx.stroke();
  },

  freeDraw: (e, render, ctx) => {
    if (!render) return;

    ctx.lineWidth = tools.lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.moveTo(e.clientX, e.clientY);
  },
  erase: (e, render, ctx) => {
    if(!render) return;

    ctx.lineWidth = tools.lineWidth;
    ctx.strokeStyle = '#fff'
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.moveTo(e.clientX, e.clientY);
  }
};


window.onload = () => {
  /*
  -------------------------------------
  ---------- VARIABLES ----------------
  -------------------------------------
  */

  let painting = false;

  const currentPosition = {
    x: 0,
    y: 0
  };

  let startCoordinates = {
    x: 0,
    y: 0
  };

  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector('#canvas');

  
  /** @type {HTMLCanvasElement} */
  const tempCanvas = document.querySelector('#tempCanvas');

  /** @type {CanvasRenderingContext2D} */
  const context = canvas.getContext('2d');

  /** @type {CanvasRenderingContext2D} */
  const contextTemp = tempCanvas.getContext('2d');

  const squareButton = document.querySelector('#square');
  const drawButton = document.querySelector('#draw');
  const eraserButton = document.querySelector('#eraser');

  let eventFunc = tools.drawRectangle;
  let eventFuncName = 'rectangle';

  /*
  -------------------------------------
  --------- INITIALIZERS --------------
  -------------------------------------
  */

 canvas.height = window.innerHeight *.85;
 canvas.width = window.innerWidth * .85;

 tempCanvas.height = window.innerHeight *.85;
 tempCanvas.width = window.innerWidth * .85;

  canvas.setAttribute('class', 'display');
  tempCanvas.setAttribute('class', 'hide');

  /*
  -------------------------------------
  ---------- FUNCTIONS ----------------
  -------------------------------------
  */

  const setCurrentPosition = ({ clientX, clientY }) => {
    currentPosition.x = clientX;
    currentPosition.y = clientY;
  };

  const renderEvent = (e, c) => {
    if (!painting) return;
    setCurrentPosition(e);
    eventFunc(e, painting, c, startCoordinates);
  };

  const paintPermanent = (e) => {
    setCurrentPosition(e);
    eventFunc(e, painting, context, startCoordinates);
  };

  const mouseDown = (e) => {
    getContext().beginPath();
    painting = true;
    startCoordinates.x = e.clientX;
    startCoordinates.y = e.clientY;
    
    if (eventFuncName === 'rectangle') {
      canvas.setAttribute('class', 'hide');
      tempCanvas.setAttribute('class', 'display');
    }
    console.log(getContext())

    renderEvent(e, getContext());
  };

  const getContext = () => {
    let c;
    switch (eventFuncName) {
      case 'rectangle':
        return contextTemp;
      case 'draw':
      case 'eraser':
        return context;
    }
  }

  const mouseMove = (e) => {
    renderEvent(e, getContext())
  }

  const mouseUp = (e) => { 
    painting = false;
    getContext().beginPath();
    paintPermanent(e);
    canvas.setAttribute('class', 'display');
    tempCanvas.setAttribute('class', 'hide');
  };

  /*
  -------------------------------------
  --------- EVENT LISTENERS -----------
  -------------------------------------
  */

  window.addEventListener('resize', () => {
    canvas.height = window.innerHeight *.5;
    canvas.width = window.innerWidth * .5;

    tempCanvas.height = window.innerHeight *.5;
    tempCanvas.width = window.innerWidth * .5;
  });

  tempCanvas.addEventListener('mousedown', mouseDown);
  canvas.addEventListener('mousedown', mouseDown);

  canvas.addEventListener('mouseup', mouseUp);
  tempCanvas.addEventListener('mouseup', mouseUp);

  tempCanvas.addEventListener('mousemove', mouseMove);
  canvas.addEventListener('mousemove', mouseMove);

  squareButton.addEventListener('click', () => {
    eventFunc = tools.drawRectangle;
    eventFuncName = 'rectangle';
  });

  drawButton.addEventListener('click', () => {
    eventFunc = tools.freeDraw;
    eventFuncName = 'draw';
  });

  eraserButton.addEventListener('click', () => {
    eventFunc = tools.erase;
    eventFuncName = 'eraser';
  });
};
