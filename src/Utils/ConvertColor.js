import colors from "./colorCodes"
function ConvertColorToRGB(color) {
    //const colorCode = parseInt(color.slice(1), 16)
    let colorDetails={}
    
    try {
      const hexColorCode = color.slice(1)
      const {R,G,B}={
        R:parseInt(hexColorCode.substring(0, 2), 16),
        G: parseInt(hexColorCode.substring(2, 4), 16) ,
        B:parseInt(hexColorCode.substring(4, 6), 16) 
    }
    colorDetails={int:{r:R/255,g:G/255,b:B/255},rgb:{R,G,B},colorName:getColorName(R,G,B)}
     
    } catch (error) {
      colorDetails = { r: 0, g: 0, b: 0 }
    }
    return colorDetails
  }

  function getColorName(r,g,b) {
  
  for (const colorName in colors) {
    const colorRGB = colors[colorName];
    if (r === colorRGB[0] && g === colorRGB[1] && b === colorRGB[2]) {
      return colorName;
    }
  }
  return null;
}

  export default ConvertColorToRGB