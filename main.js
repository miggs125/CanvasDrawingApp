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
  const fillColour = document.querySelector('#fillColour');
  const fillButton = document.querySelector('#fill');

  let eventFunc;
  let eventFuncName;
  /*
  -------------------------------------
  ---------- FUNCTIONS ----------------
  -------------------------------------
  */

  const fitToParent = (element) => {
    element.style.width = '100%';
    element.style.height = '100%';

    element.width = element.offsetWidth;
    element.height = element.offsetHeight;
  };

  const tools = {
    lineStyle: 10,
    lineColour: 'black',
    fill: false,
    lineWidth: 2,
    fillColour: '#fff',
    lineCap: 'round',
    drawRectangle: (render, ctx, startCoordinates) => {
      const width = currentPosition.x - startCoordinates.x;
      const height = currentPosition.y - startCoordinates.y;
      tools.setStyle(ctx);

      ctx.beginPath();
      if (render) tools.clearRendered(ctx);
      ctx.rect(startCoordinates.x, startCoordinates.y, width, height);
      if (tools.fill) ctx.fill();
      ctx.stroke();
      ctx.closePath();
    },

    freeDraw: (render, ctx) => {
      if (!render) return;

      tools.setStyle(ctx);

      ctx.lineTo(currentPosition.x, currentPosition.y);
      ctx.stroke();
    },
    erase: (render, ctx) => {
      if (!render) return;

      ctx.lineWidth = tools.lineWidth;
      ctx.strokeStyle = tools.fillColour;
      ctx.lineCap = 'butt';
      ctx.lineTo(currentPosition.x, currentPosition.y);
      ctx.stroke();
      ctx.moveTo(currentPosition.x, currentPosition.y);
      tools.setStyle(ctx);
    },

    ellipse: (render, ctx, startCoordinates) => {
      const { x, y } = startCoordinates;
      const radiusX = Math.abs(currentPosition.x - x);
      const radiusY = Math.abs(currentPosition.y - y);
      tools.setStyle(ctx);

      ctx.beginPath();
      if (render) tools.clearRendered(ctx);
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      if (tools.fill) ctx.fill();
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
      ctx.fillStyle = tools.fillColour;
    }
  };

  const setCurrentPosition = ({ clientX, clientY }) => {
    currentPosition.x = clientX - canvas.getBoundingClientRect().x;
    currentPosition.y = clientY - canvas.getBoundingClientRect().y;
  };

  const renderEvent = (e, c) => {
    if (!painting) return;
    setCurrentPosition(e);
    eventFunc(painting, c, startCoordinates);
  };

  const paintPermanent = (e) => {
    setCurrentPosition(e);
    eventFunc(painting, context, startCoordinates);
  };

  //------ EVENT HANDLER FUNCTIONS------------
  const mouseDown = (e) => {
    getContext().beginPath();
    painting = true;
    startCoordinates.x = e.clientX - canvas.getBoundingClientRect().x;
    startCoordinates.y = e.clientY - canvas.getBoundingClientRect().y;
    if (eventFuncName !== 'draw' && eventFuncName !== 'eraser') {
      tempCanvas.setAttribute('class', 'display');
    }

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

  fitToParent(canvas);
  fitToParent(tempCanvas);

  eventFunc = tools.drawRectangle;
  eventFuncName = 'rectangle';

  canvas.setAttribute('class', 'display');
  tempCanvas.setAttribute('class', 'hide');

  /*
  -------------------------------------
  --------- EVENT LISTENERS -----------
  -------------------------------------
  */

  window.addEventListener('resize', () => {
    fitToParent(canvas);
    fitToParent(tempCanvas);
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

  fillColour.addEventListener('input', () => {
    tools.fillColour = fillColour.value;
  });

  fillButton.addEventListener('input', () => {
    if (fillButton.checked === true) {
      tools.fill = true;
    } else {
      tools.fill = false;
    }
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
