"use strict";

function validateForm()
{
    let errMsg = [];

    //course id error
    if ($("#courseid").val().trim() == "")
    {
        errMsg[errMsg.length] = "Course ID is required";
    }

    //title error
    if ($("#title").val().trim() == "")
    {
        errMsg[errMsg.length] = "Title is required";
    }

    //category error
    if ($("#category").val().trim() == "Choose one")
    {
        errMsg[errMsg.length] = "Category is required";
    }

    //location error
    if ($("#location").val().trim() == "")
    {
        errMsg[errMsg.length] = "Location is required";
    }

    //start and end date variables
    let startDate = $("#startdate").val();
    let endDate = $("#enddate").val();
    let datePattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    //start and end date errors
    if (startDate.trim() == "")
    {
        errMsg[errMsg.length] = "Start Date is required";
    }
    if (datePattern.test(startDate.trim()) == false)
    {
        errMsg[errMsg.length] = "Start Date must be in a MM/DD/YY format";
    }
    if (endDate.trim() == "")
    {
        errMsg[errMsg.length] = "End Date is required";
    }
    if (datePattern.test(endDate.trim()) == false)
    {
        errMsg[errMsg.length] = "End Date must be in a MM/DD/YY format";
    }

    //meets error
    if ($("#meets").val().trim() == "")
    {
        errMsg[errMsg.length] = "Meeting Time is required";
    }

    //fee error
    if ($("#fee").val().trim() == "")
    {
        errMsg[errMsg.length] = "Fee is required";
    }

    if (errMsg.length == 0)
    {
        return true;
    }

    $("#errorMessages").empty();
    for(let i=0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#errorMessages"));
    }
    return false;
}