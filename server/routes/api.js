const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const City = require("../models/City");
const { default: axios } = require("axios");
const weatherCondistions={
  'clear sky':'https://png.pngtree.com/png-clipart/20210311/original/pngtree-kosais-yellow-sun-sprinkled-with-petals-png-image_6024316.png',
  'few clouds' : 'https://png.pngtree.com/png-vector/20210805/ourlarge/pngtree-3d-cloud-illustration-vector-png-image_3780086.jpg'
}
function getCityWhether(latitude, longitude,response) {
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b2267e3a46c00090e07b3c509ce0d8bd`
  ).then((result)=>{

    console.log(result.data);
    response.send({temperature:parseInt(result.data.main.temp-273.15),name:result.data.name,condition:result.data.weather[0].description,conditionPic:weatherCondistions[result.data.weather[0].description]})

  }).catch((err)=>console.log(err))
}

function getGeoCoding(cityName,response) {
  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=b2267e3a46c00090e07b3c509ce0d8bd`
    )
    .then((result) => {
        if(result.data[0])
        getCityWhether(result.data[0].lat,result.data[0].lon,response)
        else response.end()
    });
}

router.get("/city/:cityName", function (req, res) {
 const geoCode=getGeoCoding(req.params.cityName,res)


});
router.get("/cities", function (req, res) {
City.find({},function(error,cities)
{
  console.log(cities);
  res.send(cities)
})
});
router.post("/city", function (req, res) {
  City.findOne({name:req.body.name},function(error,city){
    if(city == null)
       {
        console.log(req.body);
        const newCity= new City({name:req.body.name,temperature:req.body.temperature,condition:req.body.condition,conditionPic:weatherCondistions[req.body.condition]})
        newCity.save()
       }
  })
res.end()
});
router.delete("/city/:cityName", function (req, res) {
City.deleteOne({
  name:req.params.cityName
}).then(function (){
res.end()
})


});

module.exports = router;
