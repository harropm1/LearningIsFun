"use strict";

$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseId");
    $("#courseid").val(courseid);

    $("#addMe").on("click", sendContact);
    $("#cancel").on("click", function()
    {
        $("#cancel").prop("href", "details.html?courseId=" + courseid);
    });
    $("#backToCourses").on("click", function()
    {
        $("#backToCourses").prop("href", "courses.html");
    });
});

function sendContact()
{
    $.post("/api/register", $("#registerForm").serialize(), function(data)
    {
        $("#msgDiv").html("See you soon!");
    });
    return false;
}