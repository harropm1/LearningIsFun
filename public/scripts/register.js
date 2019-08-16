"use strict";

$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseId");
    $("#courseid").val(courseid);

    $("#addMe").on("click", sendContact);

    /* $("#cancel").prop("href", "details.html?courseId=" + object.courseid) */
});

function sendContact()
{
    $.post("/api/register", $("#registerForm").serialize(), function(data)
    {
        $("#msgDiv").html("See you soon!");
    });
    return false;
}