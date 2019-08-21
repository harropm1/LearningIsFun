"use strict";

/*This ready function loads when the page loads.
* This JS file unregisters a student from a specific course, accessed from the details page.
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page and was carried over from the details page in the URL string.
* @param - studentName - string = this is pulled from the course that the user selected on the course page and was carried over from the details page in the URL string.
* @param - email - string = this is pulled from the course that the user selected on the course page and was carried over from the details page in the URL string.
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

    //this calls the function unregisterStudent when the remove button is clicked
    $("#removeBtn").on("click", unregisterStudent);

    //this links the back to details page button and sends it back to the details page for that course
    $("#backToDetails").on("click", function ()
    {
        $("#backToDetails").prop("href", "details.html?courseId=" + courseId);
    });

    //this links the cancel button and sends it back to the details page for that course
    $("#cancel").on("click", function ()
    {
        $("#cancel").prop("href", "details.html?courseId=" + courseId);
    });
});

/* this function first validates that the information that came in from details is still valid.
* Then it calls the post request for unregistering a student from the class. 
*/
function unregisterStudent()
{
    //validate data. if it is invalid, display the error message
    let studentNameInput = $("#studentname").val();
    let emailInput = $("#email").val();
    let pattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (studentNameInput.trim() == "" || !pattern.test(emailInput))
    {
        $("#msgDiv").html("Please valid enter student information.");
    }

    // if there are no errors, unregister student
    else
    {
        $.post("/api/unregister", $("#unregisterForm").serialize(), function (data)
        {
            $("#msgDiv").html("Student removed.");
            $("#removeBtn").hide();
            $("#cancel").hide();
            $("#backToDetails").show();
        });
    }
}