"use strict";

$(function ()
{
    let categories;

    /* generates the category dropdown */
    $.getJSON("api/categories", function (data)
    {
        categories = data;
        for (let i = 0; i < categories.length; i++)
        {
            let categoryName = categories[i].Category;
            let newOption = $("<option>", { text: categoryName, value: categoryName })
            $("#category").append(newOption);
        }
    });

    $("#addCourse").on("click", createCourse);

    $("#cancel").on("click", function ()
    {
        document.location.href = "courses.html";
    });
});

function createCourse()
{
    let isok = validateForm();
    if (isok == false)
    {
        return;
    }

    $.post("/api/courses", $("#addCourseForm").serialize(), function (data)
    {
        $("#msgDiv").html("Class added! Have fun!");
        $("#addCourse").hide();
        $("#cancel").hide();
        $("#backToCourses").show();
        $("#backToCourses").prop("href", "courses.html");
    });
}