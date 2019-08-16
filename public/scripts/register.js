"use strict";

$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseId");
    $("#courseid").val(courseid);

    let object;
    $.getJSON("/api/register/" + courseid, function(data)
    {
        object = data;
    });

    $("#addMe").on("click", function()
    {
        sendContact();
        $("#addMe").prop("href", "details.html?courseId=" + object.CourseId) 
    });
    



    $("#cancel").prop("href", "details.html?courseId=" + object.CourseId)
});

function sendContact()
{
    $.post("/api/register/", $("#registerForm").serialize(), function(data)
    {
        $("#msgDiv").html(data)
    });
    return false;
}