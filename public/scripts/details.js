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

    $

    $("#backToDetails").on("click", function ()
    {
        $("#backToDetails").prop("href", "courses.html");
    });
    $("#editClass").on("click", function ()
    {
        $("#editClass").prop("href", "editcourse.html?courseId=" + object.CourseId);
    });
});

/* This function dynamically creates a table that includes all of the data about a specific course.
*
* @param - course = this is the data that is passed from the load function. It refers to each key value
*
*/
function insertTableData(course)
{
    let tableData = '<tr><td>Course Id</td><td>' + course.CourseId +
        '</td></tr><tr><td>Course Title</td><td>' + course.Title +
        '</td></tr><tr><td>Category</td><td>' + course.Category +
        '</td></tr><tr><td>Location</td><td>' + course.Location +
        '</td></tr><tr><td>Start Date</td><td>' + course.StartDate +
        '</td></tr><tr><td>End Date</td><td>' + course.EndDate +
        '</td></tr><tr><td>Meeting Times</td><td>' + course.Meets +
        '</td></tr><tr><td>Fee</td><td>$' + course.Fee +
        '</td></tr>';

    $("#tableBody").append(tableData);

    /* this part of the function loops through the registered students to add them to a new table.
    * if there is no one registered for the course, it also alerts that in the table as well.
    */
    if (course.Students.length == 0)
    {
        let noStudents = "<tr><td>No students enrolled</td><td>&nbsp;</td><td>&nbsp;</td></tr>";

        $("#studentTableBody").append(noStudents);
    }
    else
    {
        for (let i = 0; i < course.Students.length; i++)
        {
            let studentName = course.Students[i].StudentName;
            let email = course.Students[i].Email;

            let urlParams = new URLSearchParams(location.search);
            let courseId = urlParams.get("courseId");
            let uri = `unregisterstudent.html?courseId=${courseId}&studentName=${studentName}&email=${email}`;
            let encodedURI = encodeURI(uri);
            let htmlString = `
                <tr>
                    <td>${studentName}</td>
                    <td>${email}</td>
                    <td><a href='${encodedURI}' role='button' class='btn btn-success greenBackground' id='removeStudent'>Remove</a></td> 
                </tr>
                `;

            $("#studentTableBody").append(htmlString);
        }
    }
}