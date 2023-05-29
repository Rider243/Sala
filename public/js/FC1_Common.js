

var info_lifter_1_detail=[];
var info_lifter_2_detail=[];
var info_lifter_3_detail=[];
var info_lifter_4_detail=[];
var info_lifter_5_detail=[];
var info_lifter_6_detail=[];
var info_lifter_tong_detail=[];


var date_time_lifter_1_detail=[];




////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
// var myVar = setInterval(myTimer, 500);
// function myTimer()
// {
// socket.emit("Client-send-data", "Request data client");
// }
////////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc/ghi dữ liệu lên IO Field


// function fn_Main_IOField_IO(tag, IOField, tofix)
// {
// socket.on(tag, function(data){
//    if (tofix == 0 & Main_data_edditting != true)
//    {
//        document.getElementById(IOField).value = data;
//    }
//    else if(Main_data_edditting != true)
//    {
//        document.getElementById(IOField).value = data.toFixed(tofix);
//    }
// });
// }   

// // Chương trình con đọc dữ liệu lên IO Field
// function fn_IOFieldDataShow(tag, IOField, tofix){
// socket.on(tag, function(data){
//    if(tofix == 0){
//        document.getElementById(IOField).value = data;
//    } else{
//    document.getElementById(IOField).value = data.toFixed(tofix);
//    }
// });
// }




 

// function fn_SymbolStatus_1(ObjectID, SymName, Tag)
// {
 
// var imglink_0 = "/images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
// var imglink_1 = "/images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
// var imglink_2 = "/images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
// var imglink_3 = "/images/Symbol/" + SymName + "_3.png"; // Trạng thái tag = 3
// var imglink_4 = "/images/Symbol/" + SymName + "_4.png"; // Trạng thái tag = 4
// var imglink_5 = "/images/Symbol/" + SymName + "_5.png"; // Trạng thái tag = 5
// socket.on(Tag, function(data){
//    if (data == 0)
//    {
//        document.getElementById(ObjectID).src = imglink_0;
//    }
//    else if (data == 1)
//    {
//        document.getElementById(ObjectID).src = imglink_1;
//    }
//    else if (data == 2)
//    {
//        document.getElementById(ObjectID).src = imglink_2;
//    }
//    else if (data == 3)
//    {
//        document.getElementById(ObjectID).src = imglink_3;
//    }
//    else if (data == 4)
//    {
//        document.getElementById(ObjectID).src = imglink_4;
//    }
//    else
//    {
//        document.getElementById(ObjectID).src = imglink_5;
//    }
// });
// }


// function fn_SymbolStatus_gif(ObjectID, SymName, Tag)
// {
// var imglink_0 = "/images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
// var imglink_1 = "/images/Symbol/" + SymName + "_1.gif"; // Trạng thái tag = 1



// socket.on(Tag, function(data){
//    if (data == 0)
//    {
//        //  document.getElementById(ObjectID).style.display ="block";
//         document.getElementById(ObjectID).src = imglink_0;
//    }
//    else if (data == 1)
//    {
//        // document.getElementById(ObjectID).style.display ="block";
//        document.getElementById(ObjectID).src = imglink_1;
//    }

// });
// }





// Tìm kiếm SQL lỗi theo khoảng thời gian
function fn_SQL_By_Time_info_lifter()
{
    var val = [document.getElementById('dtpk_Search_Start').value,
               document.getElementById('dtpk_Search_End').value];
    socket.emit('msg_SQL_ByTime_info_lifter', val);
    socket.on('SQL_ByTime_info_lifter', function(data){
        fn_table_info_lifter(data); // Show sdata
    });
}


function drawchart()
{
    setTimeout(() => {
        chart_details_fan_1() ;
    }, 1000);
}
function fn_table_info_lifter(data){


    info_lifter_1_detail.length=0;
    info_lifter_2_detail.length=0;
    info_lifter_3_detail.length=0;
    info_lifter_4_detail.length=0;
    info_lifter_5_detail.length=0;
    info_lifter_6_detail.length=0;
    info_lifter_tong_detail.length=0;
    date_time_lifter_1_detail.length=0;

if(data){
   $("#table_info tbody").empty(); 
   var len_1 = data.length;

   var txt = "<tbody>";
   if(len_1 > 0)
   {
     

       for( i= len_1-1 ;i>=0;i--)
       {
           
             
               txt += "<tr><td>"+data[i].date
               
               +"</td><td>"+data[i].lifter_01

               +"</td><td>"+data[i].lifter_02

               +"</td><td>"+data[i].lifter_03

               +"</td><td>"+data[i].lifter_04

               +"</td><td>"+data[i].lifter_05

               +"</td><td>"+data[i].lifter_06

               +"</td><td>"+data[i].lifter_tong           

               +"</td></tr>";
        
         
          
      info_lifter_1_detail.push(data[i].lifter_01);
      info_lifter_2_detail.push(data[i].lifter_02);
      info_lifter_3_detail.push(data[i].lifter_03);
      info_lifter_4_detail.push(data[i].lifter_04);
      info_lifter_5_detail.push(data[i].lifter_05);
      info_lifter_6_detail.push(data[i].lifter_06);
      info_lifter_tong_detail.push(data[i].lifter_tong);
      
      date_time_lifter_1_detail.push(data[i].date);
           
         
}

if(txt != ""){
txt +="</tbody>"; 
$("#table_info").append(txt);
       }
        
   }
}   


}

function drawchart()
{
    setTimeout(() => {
        chart_details_lifter() ;
    }, 1000);
}

function chart_details_lifter()
{

         console.log("lần 1");
      
     
        // Generate values

        var x1Values = [];
        var x2Values = [];
        var x3Values = [];
        var x4Values = [];
        var x5Values = [];
        var x6Values = [];
        var x7Values = [];

        var y1Values = [];
        var y2Values = [];
        var y3Values = [];
        var y4Values = [];
        var y5Values = [];
        var y6Values = [];
        var y7Values = [];
      

      
            


        x1Values.push(...date_time_lifter_1_detail);
        x2Values.push(...date_time_lifter_1_detail);
        x3Values.push(...date_time_lifter_1_detail);
        x4Values.push(...date_time_lifter_1_detail);
        x5Values.push(...date_time_lifter_1_detail);
        x6Values.push(...date_time_lifter_1_detail);
        x7Values.push(...date_time_lifter_1_detail);


        y1Values.push(...info_lifter_1_detail);
        y2Values.push(...info_lifter_2_detail);
        y3Values.push(...info_lifter_3_detail);
        y4Values.push(...info_lifter_4_detail);
        y5Values.push(...info_lifter_5_detail);
        y6Values.push(...info_lifter_6_detail);
        y7Values.push(...info_lifter_tong_detail);
        
        
       

        // Define Data
        var data = [
        {x: x1Values, y: y1Values,mode:'lines+markers', name: 'Lifter 1',hoverinfo:'x+y', nticks: 30,fixedrange: true },
        {x: x2Values, y: y2Values, mode:"lines+markers", name: 'Lifter 2',hoverinfo:'x+y', nticks: 30,fixedrange: true},
        {x: x3Values, y: y3Values, mode:"lines+markers", name: 'Lifter 3',hoverinfo:'x+y', nticks: 30,fixedrange: true},
        {x: x4Values, y: y4Values,mode:'lines+markers', name: 'Lifter 4',hoverinfo:'x+y', nticks: 30 ,fixedrange: true},
        {x: x5Values, y: y5Values, mode:"lines+markers", name: 'Lifter 5',hoverinfo:'x+y', nticks: 30,fixedrange: true},
        {x: x6Values, y: y6Values, mode:"lines+markers", name: 'Lifter 6',hoverinfo:'x+y', nticks: 30,fixedrange: true},
        {x: x7Values, y: y7Values, mode:"lines+markers", name: 'Final rail',hoverinfo:'x+y', nticks: 30,fixedrange: true}
        ];

        //Define Layout
       // var layout = {title: "Biểu đồ thông số quạt"};

        var layout = {
            title: "Biểu đồ thông số lifter",
            yaxis:
         {
           
            // showline: true,
            // fixedrange: true,
            range: [0, info_lifter_tong_detail],
            autotick: false,
            tick0: 0,
            dtick:100,
        },
          };

        // Display using Plotly
        Plotly.newPlot("chart_total_lifter", data, layout);
        console.log(x1Values);            
}







