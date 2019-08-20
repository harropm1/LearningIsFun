"use strict";

$(function ()
{
    let categories;

    /* generates the dropdown */
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
});

function validateForm()
{
    let inputs = $("input[type='text']".val());
    let startDate = $("#startdate").val();
    let endDate = $("#enddate").val();
    let datePattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;

    if (!datePattern.test(startDate) || !datePattern.test(endDate))
    {
        $("#msgDiv").html("Please enter course inform");
    }

    for (let i = 0; i < inputs.length; i++)
    {
        if (inputs[i].trim() == "")
        {
            $("#msgDiv").html("Please enter course information.");
        }
    }
}

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