$(function() {
    var leadership_names = [
        "Keian Freshwater (Team Captain)",
        "Conor Miles (Outreach/Human Resources)",
        "Jacob Brouwer (Robot Lead)",
        "Eric Kline (Business)",
        "Jonathan Schladetzky (Logistics)",
        "Amanda Manea (Scouting)",
        "Timothy Eng (Digital Outreach/Programming)"
    ];
    var leadership_emails = [
        "freshwaterk",
        "milesc",
        "brouwerj",
        "klineer",
        "schladetzkyj",
        "maneaa",
        "engt"
    ];
    var website_names = [
        "Timothy Eng"
    ];
    var website_emails = [
        "engt"
    ];
    var all_names = [];
    all_names["l"] = leadership_names;
    all_names["w"] = website_names;
    var all_emails = [];
    all_emails["l"] = leadership_emails;
    all_emails["w"] = website_emails;
    function genLinks(linkname, divname) {
        var namearr = all_names[linkname];
        for(var i = 0; i < namearr.length; i++) {
            var link = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink" id="' + linkname + 'contact_' + i + '">' + namearr[i] + '</a></div>');
            $("#" + divname).append(link);
        }
        $(".contactlink").mouseover(function() {
            var id = $(this).attr("id");
            var emailarr = all_emails[id[0]];
            var index = parseInt(id.split("_")[1], 10);
            $(this).attr("href", "mailto:s-" + emailarr[index] + "@bsd405.org");
        });
        $(".contactlink").mouseleave(function() {
            $(this).attr("href", "");
        });
    }
    var headmentorcontact = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink2" id="lcontact_' + leadership_names.length + '">Mrs. Herzog, Team Administrator</a></div>');
    $("#leadership_emails").append(headmentorcontact);
     $(".contactlink2").mouseover(function() {
        $(this).attr("href", "mailto:herzogk@bsd405.org");
    });
    $(".contactlink2").mouseleave(function() {
        $(this).attr("href", "");
    });
    $(".newtablink").click(function() {
        window.open($(this).attr("href"));
    });
    genLinks("l",  "leadership_emails");
    genLinks("w",  "website_emails");
});