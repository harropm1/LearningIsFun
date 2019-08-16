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
});