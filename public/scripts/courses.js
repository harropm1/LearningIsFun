"use strict";

/*This ready function does three things. First it calls categories to dynamically load a dropdown.
* Next, it loads a table of available courses based on what the user selected.
* Third, it loads all of the available courses, if the user clicked that button.
*
* @param - data - in each case, this refers to the data from the server.js
*/
$(function ()
{
    let categories;

    $("thead").hide();
    $("#addClass").hide();

    /* generates the dropdown */
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

    /* generates a table by category selection */
    $("#categorySelect").on("change", function ()
    {
        let courses;
        if ($("#categorySelect").val() == "Choose one")
        {
            $("thead").hide();
            $("#addClass").hide();
            $("#tableBody").empty();
        }
        else
        {
            $("thead").show();
            $("#addClass").show();
            $.getJSON("/api/courses/bycategory/" + $("#categorySelect").val(), function (data)
            {
                courses = data;
                $("#tableBody").empty();
                createSearchByCategoryTable(courses);
            });
        }
    });

    /* generates a table with all courses */
    let allCourses;
    $("#viewAll").on("click", function()
    {
        $("thead").show();
        $("#addClass").show();
        $.getJSON("/api/courses", function (data)
        {
            allCourses = data;
            $("#tableBody").empty();
            createSearchByCategoryTable(allCourses);
        })
    })
});

/* This function loops through the entire course list from server.js to know what to put into the table 
*
* @param - coursesList = this is what is passed from the ready functions and the server
*/
function createSearchByCategoryTable(coursesList)
{
    for (let i = 0; i < coursesList.length; i++)
    {
        insertTableData(coursesList[i]);
    }
}

/* This function creates the table with a small amount of data.
* It is used in both the all courses table and selection courses table.
*
* @param - coursesList = this is what is passed from the ready functions and the server
*/
function insertTableData(coursesList)
{
    let rowBeingEntered = "<tr><td>" + coursesList.CourseId +
        "</td><td>" + coursesList.Title +
        "</td><td>" + coursesList.StartDate +
        "</td><td><a target='_self' class='green' href='details.html?courseId=" + coursesList.CourseId +
        "'>Details</a></td></tr>";

    $("#tableBody").append(rowBeingEntered);
}