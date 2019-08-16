"use strict";

$(function ()
{
    let categories;

    $.getJSON("api/categories", function (data)
    {
        categories = data;
        for (let i = 0; i < categories.length; i++)
        {
            let categoryName = categories[i].Category;
            let newOption = $("<option>", { text: categoryName, value: categories[i].Value })
            $("#categorySelect").append(newOption);
        }
    });


    $("#categorySelect").on("change", function ()
    {
        let courses;
        if ($("#categorySelect").val() == "Choose one")
        {
            $("#tableBody").empty();
        }
        else
        {
            $.getJSON("/api/courses/bycategory/" + $("#categorySelect").val(), function (data)
            {
                courses = data;
                $("#tableBody").empty();
                createSearchByCategoryTable(courses);
            });
        }
    });
});

function createSearchByCategoryTable(coursesList)
{
    for (let i = 0; i < coursesList.length; i++)
    {
        insertTableData(coursesList[i]);
    }
}

function insertTableData(coursesList)
{
    let rowBeingEntered = "<tr><td>" + coursesList.CourseId +
        "</td><td>" + coursesList.Title +
        "</td><td>" + coursesList.StartDate +
        "</td><td><a target='rptTab' href='details.html?courseId=" + coursesList.CourseId +
        "'>Details</a></td></tr>";

    $("#tableBody").append(rowBeingEntered);
}