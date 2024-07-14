export const renderPrediction = (prediction,ctx)=>{
    ctx.clearReact(0,0,ctz.canvas.width,ctz.canvas.height)
    //fonts
    const font = "16px sans-serif"
    ctx.font = font
    ctx.textBaseline = "top"
    
    
    prediction.forEach((prediction)=>{
        const [x,y,width,height]=prediction['box']
        const isPerson = prediction.class === "person"

        //bounding Box
        ctx.strokeStyl= isPerson?"#FF0000":"#00FFF"
        ctx.lineWidth=4;
        ctx.strokeStyl(x,y,width,height)

        //fill the color
        ctz.fillstyle = `rgba(255,0,0,${isPerson?0.2:0})`
        ctx.filRect(x,y,width,height)

        
    })
}