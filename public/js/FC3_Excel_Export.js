// Gửi yêu cầu xuất Excel qua index.js
function fn_excel(){
    var linktext = "";
    var bookname = "";
    socket.emit("msg_Excel_Report", true);
    socket.on('send_Excel_Report',function(data){
        linktext = data[0];
        bookname = data[1];
        // Delay save as
        var delayInMilliseconds = 1000; //Delay 1 second
        setTimeout(function() {
            saveAs(linktext, bookname);
        }, delayInMilliseconds);          
    }); 
}


// Gửi yêu cầu xuất Excel qua index.js
function fn_excel_error_device()
{
    var linktext_error_device = "";
    var bookname_error_device = "";
    socket.emit("msg_Excel_Report_choice", "error_export");
    socket.emit("msg_Excel_Report_error_device", true);
    socket.on('send_Excel_Report_error_device',
    function(data)
    {
        linktext_error_device = data[0];
        bookname_error_device = data[1];
        // Delay save as
        var delayInMilliseconds_error_device = 1000; //Delay 1 second
        setTimeout(function() {
            saveAs(linktext_error_device, bookname_error_device);
        }, delayInMilliseconds_error_device);          
    }
    ); 
}

function fn_excel_lifter_export()
{
    var linktext_error_device = "";
    var bookname_error_device = "";
    socket.emit("msg_Excel_Report_choice", "info_burner_export");
    socket.emit("msg_Excel_Report_lifter_export", true);
    socket.on('send_Excel_Report_lifter_export',
    function(data)
    {
        linktext_error_device = data[0];
        bookname_error_device = data[1];
        // Delay save as
        var delayInMilliseconds_error_device = 1000; //Delay 1 second
        setTimeout(function() {
            saveAs(linktext_error_device, bookname_error_device);
        }, delayInMilliseconds_error_device);          
    }
    ); 
}