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

        insertTableData(object);
        $("#register").prop("href", "register.html?courseId=" + object.CourseId);
    });

    $("#confirmEdit").on("click", function()
    {
        //make this put change
    });

    $("#cancelEdit").on("click", function()
    {
        //cancel the put change, then go back to details
        $("#cancelEdit").prop("href", "details.html?courseId=" + object.CourseId);
    });
});

/* This function dynamically creates a table that includes all of the data about a specific course.
*
* @param - course = this is the data that is passed from the load function. It refers to each key value
*
*/
function insertTableData(course)
{
    let tableData = '<tr><td>Course Id</td><td><input id="courseid" name="courseid" value="' + course.CourseId +
        '"></td></tr><tr><td>Course Title</td><td><input id="title" name="title" value="' + course.Title +
        '"></td></tr><tr><td>Category</td><td><input id="category" name="category" value="' + course.Category +
        '"></td></tr><tr><td>Location</td><td><input id="location" name="location" value="' + course.Location +
        '"></td></tr><tr><td>Start Date</td><td><input id="startDate" name="startDate" value="' + course.StartDate +
        '"></td></tr><tr><td>End Date</td><td><input id="endDate" name="endDate" value="' + course.EndDate +
        '"></td></tr><tr><td>Meeting Times</td><td><input id="meets" name="meets" value="' + course.Meets +
        '"></td></tr><tr><td>Fee</td><td><input id="fee" name="fee" value="$' + course.Fee +
        '"></td></tr><tr><td>Students Enrolled</td><td>&nbsp;</td></tr>';

    $("#coursetableBody").append(tableData);

    /* this part of the function loops through the registeredstudents to add them to the end of the table.
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