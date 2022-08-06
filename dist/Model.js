class City {
  constructor() {
    this.cityData = [];
  }
  async getDataFromDB() {
    let allCities = this.cityData;
    await $.get(`/cities`, function (cities) {
      cities.forEach((city) => {
        city.isSaved=true
        allCities.push(city);
      });
    });
  }
  async getCityData(cityName) {
    const allCities = this.cityData;
    return await $.get(`/city/${cityName}`, function (city) {
      if(city.name)
      allCities.push(city);
      console.log(allCities);
    });
  }
 async saveCity(city) {
    city.isSaved=true
    const allCities = this.cityData;
  await  $.ajax({
      method: "post",

      url: `/city`,
      data: city,
      success: function (data) {
      },
      error: function (xhr, text, error) {
        console.log(text);
      },
    });
  }
 async deleteCity(city) {
    let allCities = this;
    await $.ajax({
      method: "delete",

      url: `/city/${city.name}`,
      success: function (data) {
        allCities.cityData=allCities.cityData.filter((c)=>c.name!=city.name)
      },
      error: function (xhr, text, error) {
        console.log(text);
      },
    });
  }
}
