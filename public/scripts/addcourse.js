"use strict";

/* This is the ready function to add a course to the course list. */
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

    //when the user clicks the add course button, it calls the function createCourse
    $("#addCourse").on("click", createCourse);

    //this links the cancel button and sends it back to the general courses page
    $("#cancel").on("click", function ()
    {
        document.location.href = "courses.html";
    });
});

/* This function allows the user to add a class into the course array. */
function createCourse()
{
    //calls the validation function from validate.js. if it doesn't return any errors, it continues to the next step
    let isok = validateForm();
    if (isok == false)
    {
        return;
    }

    //this is the post request to add the class into the course array
    $.post("/api/courses", $("#addCourseForm").serialize(), function (data)
    {
        $("#msgDiv").html("Class added! Have fun!");
        $("#addCourse").hide();
        $("#cancel").hide();
        $("#backToCourses").show();
        $("#backToCourses").prop("href", "courses.html");
    });
}