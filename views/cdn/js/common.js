window.alert = function(title, content, showclose, buttons) {
    if(!buttons) buttons = [ { display: "Close", attrs: { "data-toggle": "modal", "data-target": "#alertmodal" } } ];
    if(!showclose) showclose = true;
    var alertModal = $("<div class=\"modal fade\" id=\"alertmodal\" tabindex=\"-1\" style=\"z-index: 1000000;\" role=\"dialog\">\
        <div class=\"modal-dialog\" role=\"document\">\
            <div class=\"modal-content\">\
                <div class=\"modal-header\">\
                    <h4 class=\"modal-title\" id=\"alerttitle\"></h4>\
                </div>\
                <div class=\"modal-body\" id=\"alertcontent\"></div>\
                <div class=\"modal-footer\" id=\"alertbuttons\"></div>\
            </div>\
        </div>\
    </div>");

    $("body").append(alertModal);
    $("#alerttitle").text(title);
    $("#alertcontent").text(content);
    if(!showclose) $("#closealert").remove();
    buttons.forEach(function(cur) {
        if(!cur.type) cur.type = "default";
        if(cur.attrs) {
            var attrstring = "";
            for(var attr in cur.attrs) {
                if(cur.attrs.hasOwnProperty(attr)) {
                    attrstring += " " + attr + "=" + cur.attrs[attr];
                }
            }
        }
        $("#alertbuttons").append("<button class=\"btn btn-" + cur.type + "\"" + attrstring + ">" + cur.display + "</button>");
    });
    $("#alertmodal").modal();
  
  	$("#alertmodal").on("hidden.bs.modal", function() {
    	$(this).remove();
	});
};

window.cookieconsent_options = {
    "message": "We store some data on your computer to ensure you get the best experience on our website",
    "dismiss": "I'm cool with that!",
    "learnMore": "Privacy Policy",
    "link": "\" data-toggle=\"modal\" data-target=\"#cookieinfo",
    "theme": "light-floating"
};