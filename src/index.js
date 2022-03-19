const jimp = require('jimp')
const express = require('express')
const app = express()
app.get('/api/img', async (req, res) => {
       jimp.read("https://tr.rbxcdn.com/8847b5e730cfeedb0af8223fb0aa1726/150/150/AvatarHeadshot/Png/isCircular.png", async function (err, image) {
           let data = [{'dimensions': {'width': 0, 'height': 0}, 'colors': []}]
           data[0].dimensions.width = image.getWidth()
           data[0].dimensions.height = image.getHeight()
            for (let x = 0; x < image.getWidth(); x++) {
                for (let y = 0; y < image.getHeight(); y++) {
                    let colors = data[0].colors
                    let hex = await image.getPixelColor(x,y); 
                    let rgb = await jimp.intToRGBA(hex);
                    let dataArray = {'r': rgb['r'],'b': rgb['b'],'g': rgb['g'], 'x': x, 'y':y}
                    colors.push(dataArray)
                }
            }
            res.json(data) 
    });
    
    
})


app.listen(3000, () => {
    console.log('listening')
})
