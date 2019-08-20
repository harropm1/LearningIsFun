"use strict";

/*This ready function calls the insert table data function.
* It also adds a register button that connects a user to the register page for this course
*
* @param - courseId - string = this is pulled from the course that the user selected on the course page
*/
$(function ()
{
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("courseId");

    /* this is the call to the server */
    let object;
    $.getJSON("api/courses/" + courseId, function (data)
    {
        object = data;

        insertData(object);
    });

    $("#confirmEdit").on("click", function ()
    {
        let isok = validateForm();
        if (isok == false)
        {
            return;
        }
        $.ajax(
            {
                url: '/api/courses/',
                method: 'PUT',
                data: $("#editCourseForm").serialize(),
                done: function () 
                {
                    alert("Update Successful!");
                },
                fail: function ()
                {
                    alert("Something went wrong.");
                }
            });
        //make this the put change
    });

    $("#cancelEdit").on("click", function ()
    {
        $("#cancelEdit").prop("href", "details.html?courseId=" + object.CourseId);
    });
});

/* This function adds the original data from the details page into the input.
*
* @param - course = this is the data that is passed from the load function. It refers to each key value pair
*
*/
function insertData(course)
{
    $("#courseid").val(course.CourseId)
    $("#title").val(course.Title)
    $("#category").val(course.Category)
    $("#location").val(course.Location)
    $("#startdate").val(course.StartDate)
    $("#enddate").val(course.EndDate)
    $("#meets").val(course.Meets)
    $("#fee").val(course.Fee)

    /* this part of the function loops through the registered students to add them to the end of the table.
    * if there is no one registered for the course, it also alerts that in the table as well.
    */
    if (course.Students.length == 0)
    {
        let noStudents = "<tr><td>No students enrolled</td><td>&nbsp;</td></tr>";

        $("#studentTableBody").append(noStudents);
    }
    else
    {
        for (let i = 0; i < course.Students.length; i++)
        {
            let studentName = course.Students[i].StudentName;
            let email = course.Students[i].Email;
            let studentsRow = "<tr><td>" + studentName + "</td><td>" + email + "</td><td><a role='button' class='btn btn-success greenBackground' id='removeStudent' href='#'>Remove Student</a></td></tr>";

            $("#studentTableBody").append(studentsRow);
        }
    }
}