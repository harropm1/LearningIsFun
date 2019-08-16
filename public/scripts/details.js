"use strict"; 

$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    let object;
    $.getJSON("api/courses/" + courseId, function(data)
    {
        object = data;

        insertTableData(object);
        $("#register").prop("href", "register.html?courseId=" + object.CourseId)
    });
});

function insertTableData(course)
{
    let tableData = '<tr><td>Course Id</td><td>' + course.CourseId +
        '</td></tr><tr><td>Course Title</td><td>' + course.Title +
        '</td></tr><tr><td>Category</td><td>' + course.Category +
        '</td></tr><tr><td>Location</td><td>' + course.Location +
        '</td></tr><tr><td>Start Date</td><td>' + course.StartDate +
        '</td></tr><tr><td>End Date</td><td>' + course.EndDate +
        '</td></tr><tr><td>Meeting Times</td><td>' + course.Meets +
        '</td></tr><tr><td>Fee</td><td>$' + course.Fee +
        '</td></tr><tr><td>Students Enrolled</td><td>' + course.Students +
        '</td></tr>';

    $("#tableBody").append(tableData);
}