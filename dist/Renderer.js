const main = $(".main");
class Renderer {
  renderCities(cities) {
    main.empty();
    let source = $("#first").html();
    let templete = Handlebars.compile(source);
    let newHTML = templete({ cities });
    main.append(newHTML);
  }
}
