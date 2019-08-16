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
            let newOption = $("<option>", { text: categoryName, value: categories[i].value })
            $("#categorySelect").append(newOption);
        }
    });


    $("#categorySelect").on("change", function ()
    {
        let courses;
        $.getJSON("/api/courses/bycategory/" + $("#categorySelect").val(), function (data)
        {
            courses = data;

            if ($("#categorySelect").val() == "Choose one")
            {
                $("#tableBody").empty();
            }
            else
            {
                $("#tableBody").empty();
                createSearchByCategoryTable(courses, $("#categorySelect").val());
            }
        });
    });
});

function createSearchByCategoryTable(list, selection)
{
    for (let i = 0; i < list.length; i++)
    {
        if (selection.value == list[i].Category)
        {
            insertTableData(list[i]);
        }
    }
}

function insertTableData(list)
{
    let rowBeingEntered = "<tr><td>" + list.CourseId +
     "</td><td>" + list.title + 
     "</td><td>" + list.StartDate + 
     "</td><td><a target='rptTab' href='details.html?courseId=" + list.CourseId + 
     "'>Details</a></td></tr>";

    $("#tableBody").append(rowBeingEntered);
}