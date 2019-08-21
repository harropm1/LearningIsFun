"use strict";
/*This ready function loads when the page loads.
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page
*/
$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseId");
    $("#courseid").val(courseid);

    /* when the user clicks the add me button, it calls the function sendContact */
    $("#addMe").on("click", sendStudentInfo);
    
    /* when the user clicks the cancel button, it sends them back to the details page for that specific course */
    $("#cancel").on("click", function ()
    {
        $("#cancel").prop("href", "details.html?courseId=" + courseid);
    });

    /* when the user clicks the back to courses button, it sends them back to the courses page */
    $("#backToCourses").on("click", function ()
    {
        $("#backToCourses").prop("href", "courses.html");
    });
});

/* This function posts the user's submissions from the input boxes to register them for a course 
* After the post happens, it populates a message that says "See you soon!"
*/
function sendStudentInfo()
{
    //defining courseid so it can be added to the link below
    let urlParams = new URLSearchParams(location.search);
    let courseid = urlParams.get("courseId");
    $("#courseid").val(courseid);

    //validate data. if it is invalid, display the error message
    let studentNameInput = $("#studentname").val();
    let emailInput = $("#email").val();
    let pattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (studentNameInput.trim() == "" || !pattern.test(emailInput))
    {
        $("#msgDiv").html("Please valid enter student information.");
    }

    // if there are no errors, register student
    else
    {
        $.post("/api/register", $("#registerForm").serialize(), function (data)
        {
            console.log($("#registerForm").serialize());
            $("#msgDiv").html("See you soon!");
            $("#addMe").prop("disabled", true);
            $("#cancel").hide();
            $("#backToDetails").show();
            $("#backToDetails").prop("href", "details.html?courseId=" + courseid);
        });
    }
    return false;
}