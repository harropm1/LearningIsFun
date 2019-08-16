"use strict";

$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    let object;
    $.getJSON("/api/register/" + courseId, function(data)
    {
        object = data;

        $("#courseid").prop("value", object.CourseId)
        
    });
});