const tools = {
    drawRectangle: (e, render, ctx, startCoordinates) => {
      const width = e.clientX - startCoordinates.x;
      const height = e.clientY - startCoordinates.y;
      
      if (!render) {
        ctx.rect(startCoordinates.x, startCoordinates.y, width, height);
        ctx.stroke();
        return;
      }
  
  
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
  
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.stroke();
      ctx.strokeRect(startCoordinates.x, startCoordinates.y, width, height);
      ctx.stroke();
    },
    freeDraw: (e, render, ctx) => {
        console.log(e, render, ctx);
        if (!render) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
    
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
}

export {tools};
