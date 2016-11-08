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
    for(var i = 0; i < leadership_names.length; i++) {
        var link = $('<div class="col-sm-6 col-xs-12"><a style="cursor: pointer" class="contactlink" id="lcontact_' + i + '">' + leadership_names[i] + '</a></div>');
        $("#leadership_emails").append(link);
    }
    $(".contactlink").mouseover(function() {
        var index = parseInt($(this).attr("id").split("_")[1], 10);
        $(this).attr("href", "mailto:s-" + leadership_emails[index] + "@bsd405.org");
    });
    $(".contactlink").mouseleave(function() {
        $(this).attr("href", "");
    });
});