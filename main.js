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
  const ellipseButton = document.querySelector('#ellipse');
  const lineWidthButton = document.querySelector('#lineWidth');
  const colourButton = document.querySelector('#lineColour');

  let eventFunc;
  let eventFuncName;
  /*
  -------------------------------------
  ---------- FUNCTIONS ----------------
  -------------------------------------
  */
  const tools = {
    lineStyle: 10,
    lineColour: 'black',
    fill: false,
    lineWidth: 2,
    lineCap: 'round',
    drawRectangle: (e, render, ctx, startCoordinates) => {
      const width = e.clientX - startCoordinates.x;
      const height = e.clientY - startCoordinates.y;
      tools.setStyle(ctx);

      ctx.beginPath();
      if (render) tools.clearRendered(ctx);
      ctx.strokeRect(startCoordinates.x, startCoordinates.y, width, height);
      ctx.stroke();
      ctx.closePath();
    },

    freeDraw: (e, render, ctx) => {
      if (!render) return;

      tools.setStyle(ctx);

      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    },
    erase: (e, render, ctx) => {
      if (!render) return;

      ctx.lineWidth = tools.lineWidth;
      ctx.strokeStyle = '#fff';
      ctx.lineCap = 'round';

      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.moveTo(e.clientX, e.clientY);
      tools.setStyle(ctx);
    },

    ellipse: (e, render, ctx, startCoordinates) => {
      const { x, y } = startCoordinates;
      const radiusX = Math.abs(e.clientX - startCoordinates.x);
      const radiusY = Math.abs(e.clientY - startCoordinates.y);
      tools.setStyle(ctx);

      ctx.beginPath();
      if (render) tools.clearRendered(ctx);
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    },

    clearRendered(ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.stroke();
    },
    setStyle(ctx) {
      ctx.lineCap = tools.lineCap;
      ctx.strokeStyle = tools.lineColour;
      ctx.lineWidth = tools.lineWidth;
    }
  };

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

  //------ EVENT HANDLER FUNCTIONS------------
  const mouseDown = (e) => {
    console.log(tools.lineWidth, typeof tools.lineWidth);
    getContext().beginPath();
    painting = true;
    startCoordinates.x = e.clientX;
    startCoordinates.y = e.clientY;

    if (eventFuncName !== 'draw' && eventFuncName !== 'eraser') {
      canvas.setAttribute('class', 'hide');
      tempCanvas.setAttribute('class', 'display');
    }
    console.log(getContext());

    renderEvent(e, getContext());
  };

  const getContext = () => {
    let c;
    switch (eventFuncName) {
      case 'rectangle':
      case 'ellipse':
        return contextTemp;
      case 'draw':
      case 'eraser':
        return context;
    }
  };

  const mouseMove = (e) => {
    renderEvent(e, getContext());
  };

  const mouseUp = (e) => {
    painting = false;
    getContext().beginPath();
    paintPermanent(e);
    canvas.setAttribute('class', 'display');
    tempCanvas.setAttribute('class', 'hide');
  };

  /*
  -------------------------------------
  --------- INITIALIZERS --------------
  -------------------------------------
  */

  eventFunc = tools.drawRectangle;
  eventFuncName = 'rectangle';

  canvas.height = window.innerHeight * 0.85;
  canvas.width = window.innerWidth * 0.85;

  tempCanvas.height = window.innerHeight * 0.85;
  tempCanvas.width = window.innerWidth * 0.85;

  canvas.setAttribute('class', 'display');
  tempCanvas.setAttribute('class', 'hide');

  /*
  -------------------------------------
  --------- EVENT LISTENERS -----------
  -------------------------------------
  */

  window.addEventListener('resize', () => {
    canvas.height = document.querySelector('#App').style.height * 0.6;
    canvas.width = document.querySelector('#App').style.width * 0.6;

    tempCanvas.height = window.innerHeight * 0.5;
    tempCanvas.width = window.innerWidth * 0.5;
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

  lineWidthButton.addEventListener('input', () => {
    tools.lineWidth = Number.parseInt(lineWidthButton.value);
  });

  colourButton.addEventListener('input', () => {
    tools.lineColour = colourButton.value;
  });

  ellipseButton.addEventListener('click', () => {
    eventFunc = tools.ellipse;
    eventFuncName = 'ellipse';
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
