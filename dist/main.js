const render = new Renderer();
const cities = new City();
let cityName = $('#city')

async function loadPage() {
  await cities.getDataFromDB()
  render.renderCities(cities.cityData);
}
async function  handleSearch()   {
  await cities.getCityData(cityName.val());
  render.renderCities(cities.cityData)
}
async function saveCity()
{
  const name=$(this).closest('.city').find('h3').html()
  const temperature=$(this).closest('.city').find('.temp').html()
  const condition=$(this).closest('.city').find('.condition').html()
  await cities.saveCity({name:name,temperature:temperature,condition:condition})
  render.renderCities(cities.cityData)
}
async function removeCity()
{
  console.log('wow');
  const name=$(this).closest('.city').find('h3').html()
  console.log(name);
  const temperature=$(this).closest('.city').find('.temp').html()
  const condition=$(this).closest('.city').find('.condition').html()
  await cities.deleteCity({name:name,temperature:temperature,condition:condition})
  render.renderCities(cities.cityData)
}
$(document).ready(loadPage);
$('body').on('click','.save',saveCity)
$('body').on('click','.delete',removeCity)
$("#search").on("click", handleSearch);
