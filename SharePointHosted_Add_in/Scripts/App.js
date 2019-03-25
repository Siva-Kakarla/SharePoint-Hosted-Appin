﻿'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();

        $("#loadButton").click(usingLoad);
    });

    function usingLoad() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web().get_parentWeb();
        context.load(web);
        context.executeQueryAsync(success, fail);

        function success() {
            var message = $("#message");
            message.text(web.get_title());
            message.append("<br/>");
            message.append(lists.get_count());
        }
        function fail(sender, args) {
            alert("Call failed. Error: " + args.get_message());
        }
    }

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}
