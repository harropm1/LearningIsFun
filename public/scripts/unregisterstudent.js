"use strict";

/*This ready function loads when the page loads.
* This JS file unregisters a student.
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page
*/
$(function ()
{
    //searching the url
    let urlParams = new URLSearchParams(location.search);

    //filling the input boxes on the page
    let courseId = urlParams.get("courseId");
    $("#courseid").val(courseId);
    let studentName = urlParams.get("studentName");
    $("#studentname").val(studentName);
    let email = urlParams.get("email");
    $("#email").val(email);

    $("#removeBtn").on("click", unregisterStudent);

    //this links the back to details page button and sends it back to the details page
    $("#backToDetails").on("click", function ()
    {
        $("#backToDetails").prop("href", "details.html?courseId=" + courseId);
    });

    //this links the cancel button and sends it back to the details page
    $("#cancel").on("click", function ()
    {
        $("#cancel").prop("href", "details.html?courseId=" + courseId);
    });
});

function unregisterStudent()
{
    let studentNameInput = $("#studentname").val();
    let emailInput = $("#email").val();
    let pattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (studentNameInput.trim() == "" || !pattern.test(emailInput))
    {
        $("#msgDiv").html("Please valid enter student information.");
    }

    else
    {
        $.post("/api/unregister", $("#unregisterForm").serialize(), function (data)
        {
            console.log("I got to this point");

            $("#msgDiv").html("Student removed");
            $("#removeBtn").hide();
            $("#cancel").hide();
            $("#backToDetails").show();
        });
    }
}