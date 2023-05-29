

const v8=require('v8');
console.log(v8.getHeapStatistics());


 
 
 
// Mảng xuất dữ liệu report Excel
var SQL_Excel_lifter_export = [];  // Dữ liệu nhập kho
 
var choice_export;
 
 
var kv_sql;
var select_type;
 

 
var obj_tag_value={};



// /////////////////////////++THIẾT LẬP KẾT NỐI WEB++/////////////////////////
var express = require("express");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(8080);
require('events').EventEmitter.defaultMaxListeners = 15;
require('events').EventEmitter.prototype._maxListeners = 100;
 
 
    
 

 


// Home calling
app.get("/", function(req, res){
    res.render("interface")
});

//////////////////////////////////drying/////////////////////////////////////////

app.get("/interface", function(req, res){
    res.render("interface")
});

app.get("/Sala/giamsat", function(req, res){
    res.render("Sala/giamsat")
});

app.get("/Sala/setting", function(req, res){
    res.render("Sala/setting")
});

app.get("/Sala/error", function(req, res){
    res.render("Sala/error")
});

app.get("/Sala/chart", function(req, res){
    res.render("Sala/chart")
});

app.get("/Sala/export", function(req, res){
    res.render("Sala/export")
});

app.get("/Sala/controlcenter", function(req, res){
    res.render("Sala/controlcenter")
});

app.get("/Sala/iolist", function(req, res){
    res.render("Sala/iolist")
});

 








// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');  
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)

conn_plc.initiateConnection({port: 102, host: '192.168.0.111', rack: 0, slot: 1}, PLC_connected); 


// Bảng tag trong Visual studio code

const plc_s7_tags_list = require('./my_module/plc_s7_tags_list');
const tags_list=plc_s7_tags_list.tags_list();

// GỬI DỮ LIỆu TAG CHO PLC


const plc_s7_tags_array = require('./my_module/plc_s7_tags_array');
const tags_array=plc_s7_tags_array.tags_array();


function PLC_connected(err) {
    if (typeof(err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function(tag) {return tags_list[tag];});  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems(tags_array);
}
// Đọc dữ liệu từ PLC và đưa vào array tags
 var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log(values); // Hiển thị giá trị để kiểm tra
    obj_tag_value=values;
}
// Hàm chức năng scan giá trị
function fn_read_data_scan(){
    conn_plc.readAllItems(valuesReady);
   console.log(kv_sql);
   console.log(select_type);
     
}
// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);


 

// Nhận các bức điện được gửi từ trình duyệt
io.on("connection", function(socket){
     
        socket.on("Client-send-choice_export", function(data){  
            choice_export=data; }
        );
    
            socket.on("Client-send-kv_sql", function(data){  
                kv_sql=data; }
        );


        socket.on("Client-send-select_type", function(data){  
            select_type=data; }
        );
    /////nơi nhận các bức điện
   

});



  


// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////

const plc_s7_fn_tag = require('./my_module/plc_s7_fn_tag')
function fn_tag(socket){
    plc_s7_fn_tag.fn_tag(socket, obj_tag_value)
}


// // /////////// GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT) ///////////////
io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
        fn_tag(socket);
    });

    fn_SQLSearch_ByTime_info_lifter();
    fn_Require_ExcelExport_info_lifter();
   
});



// Khởi tạo SQL
var mysql = require('mysql');
var sqlcon = mysql.createConnection(
{
  host: "localhost",
  user: "root",
  password: "123456",
  database: "SQL_PLC",
  dateStrings:true // Hiển thị không có T và Z
});




// Đọc dữ liệu SQL lỗi theo thời gian
function fn_SQLSearch_ByTime_info_lifter(){

    console.log('le tan loc');

    console.log(choice_export);

    io.on("connection", function(socket){
        socket.on("msg_SQL_ByTime_info_lifter", function(data)
        {
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
            // Lấy thời gian tìm kiếm từ date time piker
            var timeS = new Date(data[0]); // Thời gian bắt đầu
            var timeE = new Date(data[1]); // Thời gian kết thúc
            // Quy đổi thời gian ra định dạng cua MySQL


 if (timeS == "Invalid Date"||timeE == "Invalid Date") 
{
    
    var sqltable_Name = "plc_data_5"; // Tên bảng
    //////////////////////////////
    if (choice_export=='info_lifter_export') 
    {
        if(select_type=='null'||select_type=='day')
        {
                   

            Query1 =    ` SELECT 
            DATE(date_time) AS date, 
            MAX(CASE WHEN device_name = 'BN01' THEN speed END) AS lifter_01,
            MAX(CASE WHEN device_name = 'BN02' THEN speed END) AS lifter_02,
            MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_03,
            MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_04,
            MAX(CASE WHEN device_name = 'BN05' THEN speed END) AS lifter_05,
            MAX(CASE WHEN device_name = 'QU01' THEN speed END) AS lifter_06,
            MAX(CASE WHEN device_name = 'BN06' THEN speed END) AS lifter_tong
            FROM sql_plc.plc_data_5
            WHERE date_time  
            GROUP BY DATE(date_time)
            HAVING lifter_01 IS NOT NULL 
            AND lifter_02 IS NOT NULL 
            AND lifter_03 IS NOT NULL 
            AND lifter_04 IS NOT NULL 
            AND lifter_06 IS NOT NULL
            AND lifter_tong IS NOT NULL;` 

        }

       else if (select_type=='month')

        {
           console.log('tanloc');
           Query1 =   ` SELECT 
           DATE_FORMAT(date, '%Y-%m')  AS date, 
           SUM(lifter_01) AS lifter_01, 
           SUM(lifter_02) AS lifter_02, 
           SUM(lifter_03) AS lifter_03, 
           SUM(lifter_04) AS lifter_04, 
           SUM(lifter_05) AS lifter_05, 
           SUM(lifter_06) AS lifter_06,
           SUM(lifter_tong) AS lifter_tong

         FROM (
           SELECT 
             DATE(date_time) AS date, 
               MAX(CASE WHEN device_name = 'BN01' THEN speed END) AS lifter_01, 
               MAX(CASE WHEN device_name = 'BN02' THEN speed END) AS lifter_02, 
               MAX(CASE WHEN device_name = 'BN03' THEN speed END) AS lifter_03, 
               MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_04, 
               MAX(CASE WHEN device_name = 'BN05' THEN speed END) AS lifter_05, 
               MAX(CASE WHEN device_name = 'QU01' THEN speed END) AS lifter_06,
               MAX(CASE WHEN device_name = 'BN06' THEN speed END) AS lifter_tong
           FROM sql_plc.plc_data_5
            WHERE date_time 
           GROUP BY DATE(date_time)
         ) t
         GROUP BY DATE_FORMAT(date, '%Y-%m');`
        }

    

        // if (kv_sql!='null'&&select_type!='null')
        // {
       


        
        //     Query1 =    ` SELECT 
        //                     DATE(date_time) AS date, 
        //                     MAX(CASE WHEN device_name = 'BN01' THEN speed END) AS lifter_01,
        //                     MAX(CASE WHEN device_name = 'BN02' THEN speed END) AS lifter_02,
        //                     MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_03,
        //                     MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_04,
        //                     MAX(CASE WHEN device_name = 'BN05' THEN speed END) AS lifter_05,
        //                     MAX(CASE WHEN device_name = 'QU01' THEN speed END) AS lifter_06,
        //                     MAX(CASE WHEN device_name = 'BN06' THEN speed END) AS lifter_tong
        //                     FROM sql_plc.plc_data_5
        //                     WHERE date_time  
        //                     GROUP BY DATE(date_time)
        //                     HAVING lifter_01 IS NOT NULL 
        //                     AND lifter_02 IS NOT NULL 
        //                     AND lifter_03 IS NOT NULL 
        //                     AND lifter_04 IS NOT NULL 
        //                     AND lifter_05 IS NOT NULL 
        //                     AND lifter_06 IS NOT NULL
        //                     AND lifter_tong IS NOT NULL;` 

        // }

        console.log('câu lệnh là '+Query1);
        console.log(kv_sql);
        console.log(select_type);
    }



    // if (choice_export=='info_burner_export') 
    // {
    //     if(kv_sql!='null'&&select_type=='null')
    //     {
    //         Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ kv_sql.toString();
    //     }

    //     if (kv_sql!='null'&&select_type!='null')
    //     {
           
    //         Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ kv_sql.toString()+ " " +"and"+ " "+ 
    //         select_type.toString() ;  
    //     }
    // }




////////////////////////////////////////
   
    


    var Query = Query1 +";";
    console.log('tencsdl '+sqltable_Name);
    console.log('tanloc'+Query);
    console.log('tanloc2'+Query1);
    console.log('lựa chọn '+choice_export);
}

else {
            var Query1;

            var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T"," ")	+ "'";
            var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T"," ") + "'";
            var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)
 
            var sqltable_Name = "plc_data_5"; // Tên bảng
             
            if (choice_export=='info_lifter_export') 
            {
                if(select_type=='day')
                {
     

                       
                    Query1 =    ` SELECT 
                    DATE(date_time) AS date, 
                    MAX(CASE WHEN device_name = 'BN01' THEN speed END) AS lifter_01,
                    MAX(CASE WHEN device_name = 'BN02' THEN speed END) AS lifter_02,
                    MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_03,
                    MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_04,
                    MAX(CASE WHEN device_name = 'BN05' THEN speed END) AS lifter_05,
                    MAX(CASE WHEN device_name = 'QU01' THEN speed END) AS lifter_06,
                    MAX(CASE WHEN device_name = 'BN06' THEN speed END) AS lifter_tong
                    FROM sql_plc.plc_data_5
                    WHERE date_time BETWEEN` +timeR+
                    `GROUP BY DATE(date_time)
                    HAVING lifter_01 IS NOT NULL 
                    AND lifter_02 IS NOT NULL 
                    AND lifter_03 IS NOT NULL 
                    AND lifter_04 IS NOT NULL 
                    AND lifter_05 IS NOT NULL
                    AND lifter_06 IS NOT NULL 
                    AND lifter_tong IS NOT NULL;`

                }

                else if (select_type=='month')
                
                {

                    Query1 =     `SELECT 
                    DATE_FORMAT(date, '%Y-%m')  AS date,  
                    SUM(lifter_01) AS lifter_01, 
                    SUM(lifter_02) AS lifter_02, 
                    SUM(lifter_03) AS lifter_03, 
                    SUM(lifter_04) AS lifter_04, 
                    SUM(lifter_05) AS lifter_05, 
                    SUM(lifter_06) AS lifter_06,
                    SUM(lifter_tong) AS lifter_tong
         
                  FROM (
                    SELECT 
                      DATE(date_time) AS date, 
                        MAX(CASE WHEN device_name = 'BN01' THEN speed END) AS lifter_01, 
                        MAX(CASE WHEN device_name = 'BN02' THEN speed END) AS lifter_02, 
                        MAX(CASE WHEN device_name = 'BN03' THEN speed END) AS lifter_03, 
                        MAX(CASE WHEN device_name = 'BN04' THEN speed END) AS lifter_04, 
                        MAX(CASE WHEN device_name = 'BN05' THEN speed END) AS lifter_05, 
                        MAX(CASE WHEN device_name = 'QU01' THEN speed END) AS lifter_06,
                        MAX(CASE WHEN device_name = 'BN06' THEN speed END) AS lifter_tong
                    FROM sql_plc.plc_data_5
                    WHERE date_time BETWEEN` +timeR+
                    `GROUP BY DATE(date_time)
                  ) t
                  GROUP BY DATE_FORMAT(date, '%Y-%m');`

                }
    
           
            }

            // if (choice_export=='info_burner_export') 
            // {
            //     if(kv_sql!='null'&&select_type=='null')
            //     {
            //         Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ kv_sql.toString()+" " +"and"+ " "+ dt_col_Name + " BETWEEN ";             
            //     }
    
            //     if (kv_sql!='null'&&select_type!='null')
            //     {
                   
            //         Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ kv_sql.toString()+ " " +"and"+ " "+ 
            //         select_type.toString() +" " +"and"+ " "+ dt_col_Name + " BETWEEN ";  
            //     }
            // }
            

            var Query = Query1 ;
            console.log(Query);
    }
            
            sqlcon.query(Query, function(err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    const objectifyRawPacket = row => ({...row});
                    const convertedResponse = results.map(objectifyRawPacket);
                    SQL_Excel_lifter_export = convertedResponse; // Xuất báo cáo Excel
                    socket.emit('SQL_ByTime_info_lifter', convertedResponse);
                } 
            });
        });
    });
 
}









    

    
    
    


     
 
 


 

// function bangtai()



// {

// io.on("connection", function(socket){

//     if (Start==true) 
//     {
//         socket.emit("Start",Start);
//     }

//     if (Stop==true) {
//         socket.emit("Stop",Stop);
//     }
     

//     if (Add_car==true) {
//         position=0;
//         position++;
//         total_car++;
//         socket.emit("position",position);
//         socket.emit("total_car",total_car);
//     }

//     if (Remove==true) {
//         total_car--;
//         socket.emit("total_car",total_car);
//     }

// }); 

// }

// setInterval(() => {bangtai()
    
// }, 1000);



// /////////////////////////////// BÁO CÁO EXCEL ///////////////////////////////



const Excel = require('exceljs');
const { CONNREFUSED } = require('dns');
function fn_excelExport()

{




    // =====================CÁC THUỘC TÍNH CHUNG=====================
        // Lấy ngày tháng hiện tại
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let day = date_ob.getDay();
        var dayName = '';
        if(day == 0){dayName = 'Chủ nhật,'}
        else if(day == 1){dayName = 'Thứ hai,'}
        else if(day == 2){dayName = 'Thứ ba,'}
        else if(day == 3){dayName = 'Thứ tư,'}
        else if(day == 4){dayName = 'Thứ năm,'}
        else if(day == 5){dayName = 'Thứ sáu,'}
        else if(day == 6){dayName = 'Thứ bảy,'}
        else{};
    // Tạo và khai báo Excel
    let workbook = new Excel.Workbook()
    let worksheet =  workbook.addWorksheet('Báo cáo sản xuất', {
      pageSetup:{paperSize: 9, orientation:'landscape'},
      properties:{tabColor:{argb:'FFC0000'}},
    });
    // Page setup (cài đặt trang)
    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup.margins = {
      left: 0.3, right: 0.25,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };
       // =====================THẾT KẾ HEADER=====================
    // Logo công ty
    const imageId1 = workbook.addImage({
        filename: 'public/images/222222-01.png',
        extension: 'png',
      });
    worksheet.addImage(imageId1, 'A1:B3');
    // Thông tin công ty
    worksheet.getCell('C1').value = 'Công ty tổ hợp cơ khí';
    worksheet.getCell('C1').style = { font:{bold: true,size: 16,color: { argb: '3a80d5' }},alignment: {vertical: 'middle'}} ;
    worksheet.getCell('C2').value = 'Địa chỉ:  Thaco Chu Lai';
    worksheet.getCell('C3').value = 'Hotline: + 090 180 64 11';
    // Tên báo cáo
    worksheet.getCell('A5').value = 'BÁO CÁO SẢN XUẤT';
    worksheet.mergeCells('A5:H5');
    worksheet.getCell('A5').style = { font:{name: 'Times New Roman', bold: true,size: 16,color: { argb: '3a80d5' }},alignment: {horizontal:'center',vertical: 'middle'}} ;
     
  
    // Ngày in biểu
    worksheet.getCell('H6').value = "Ngày in biểu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    worksheet.getCell('H6').style = { font:{bold: false, italic: true},alignment: {horizontal:'right',vertical: 'bottom',wrapText: false}} ;
     
    // Tên nhãn các cột
    var rowpos = 8;
    var collumName;

    


    // if(choice_export="info_burner_export")
    //     {
    //         collumName = ["STT","Thời gian" ,"Tên thiết bị","Nhiệt độ","Lưu lượng"];
    //     }


    if(choice_export=="info_lifter_export")
        {
            collumName = ["date","Lifter 1", "Lifter 2","Lifter 3","Lifter 4", "Lifter 5","Lifter 6","Lifter tổng"];
        }
    if (choice_export=="info_burner_export")
        {
            collumName = ["STT","Thời gian", "Khu vực","Tên thiết bị","Nhiệt độ"];
        }



    worksheet.spliceRows(rowpos, 1, collumName);
     
    // =====================xl=====================
    // Dump all the data into Excel
    var rowIndex = 0;
    SQL_Excel_lifter_export.forEach
    ((e, index) => 
    {
            // row 1 is the header.
            rowIndex =  index + rowpos;
            // worksheet1 collum

            
        if(choice_export=="info_lifter_export")
        {


            worksheet.columns = 
                [
                {key: 'date'},
                {key: 'lifter_01'},
                {key: 'lifter_02'},
                {key: 'lifter_03'},
                {key: 'lifter_04'},
                {key: 'lifter_05'},
                {key: 'lifter_06'},
                {key: 'lifter_tong'}
                ]
        }

        
        if (choice_export=="info_burner_export")
        {


            worksheet.columns = 
                [
                {key: 'STT'},
                {key: 'date_time'},
                {key: 'kv'},
                {key: 'device_name'},
                {key: 'speed'}
                ]
        }

   

            worksheet.addRow({
                STT: {
                    formula: index + 1
                },
                ...e
                })
    })


    console.log(choice_export);
    // Lấy tổng số hàng
    const totalNumberOfRows = worksheet.rowCount; 
    // // Tính tổng
    worksheet.addRow([
        'Tổng cộng:',
       
 
      {formula: `=sum(B${rowpos + 1}:B${totalNumberOfRows})`},
      {formula: `=sum(C${rowpos + 1}:C${totalNumberOfRows})`}, 
      {formula: `=sum(D${rowpos + 1}:D${totalNumberOfRows})`},
      {formula: `=sum(E${rowpos + 1}:E${totalNumberOfRows})`},
      {formula: `=sum(F${rowpos + 1}:F${totalNumberOfRows})`},
      {formula: `=sum(G${rowpos + 1}:G${totalNumberOfRows})`},
      {formula: `=sum(H${rowpos + 1}:H${totalNumberOfRows})`},
      
    ])
    // Style cho hàng total (Tổng cộng)
    worksheet.getCell(`A${totalNumberOfRows+1}`).style = { font:{bold: true,size: 12},alignment: {horizontal:'center',}} ;
    // Tô màu cho hàng total (Tổng cộng)
    const total_row = ['A','B', 'C', 'D', 'E','F','G','H']
    total_row.forEach((v) => {
        worksheet.getCell(`${v}${totalNumberOfRows+1}`).fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'f2ff00' }}
    })
     
     
    // =====================STYLE CHO CÁC CỘT/HÀNG=====================
    // Style các cột nhãn
    const HeaderStyle = ['A','B', 'C', 'D', 'E','F','G','H']
    HeaderStyle.forEach((v) => 
    {
        worksheet.getCell(`${v}${rowpos}`).style = { font:{bold: true},alignment: {horizontal:'center',vertical: 'middle',wrapText: true}} ;
        worksheet.getCell(`${v}${rowpos}`).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        }
    })
    // Cài đặt độ rộng cột
    worksheet.columns.forEach((column, index) => {
        column.width = 15;
    })
    // Set width header
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
     
    // ++++++++++++Style cho các hàng dữ liệu++++++++++++
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      var datastartrow = rowpos;
      var rowindex = rowNumber + datastartrow;
      const rowlength = datastartrow + SQL_Excel_lifter_export.length
      if(rowindex >= rowlength+1)
      {rowindex = rowlength+1}

      const insideColumns = ['A','B', 'C', 'D', 'E','F','G','H']

    // Tạo border
      insideColumns.forEach((v) => {
          // Border
        worksheet.getCell(`${v}${rowindex}`).border = {
          top: {style: 'thin'},
          bottom: {style: 'thin'},
          left: {style: 'thin'},
          right: {style: 'thin'}
        },
        // Alignment
        worksheet.getCell(`${v}${rowindex}`).alignment = {horizontal:'center',vertical: 'middle',wrapText: true}
      })
    })
     
     
    // =====================THẾT KẾ FOOTER=====================
    worksheet.getCell(`H${totalNumberOfRows+2}`).value = 'Ngày …………tháng ……………năm 20………';
    worksheet.getCell(`H${totalNumberOfRows+2}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'right',vertical: 'middle',wrapText: false}} ;
     
    worksheet.getCell(`A${totalNumberOfRows+3}`).value = 'Giám đốc';
    worksheet.getCell(`A${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`A${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
    worksheet.getCell(`A${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
     
    worksheet.getCell(`E${totalNumberOfRows+3}`).value = 'Trưởng ca';
    worksheet.getCell(`E${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`E${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
    worksheet.getCell(`E${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
     
    worksheet.getCell(`H${totalNumberOfRows+3}`).value = 'Người in biểu';
    worksheet.getCell(`H${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`H${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
    worksheet.getCell(`H${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
 

    // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
    // Export Link

    
    var currentTime = year + "_" + month + "_" + date + "_" + hours + "h" + minutes + "m" + seconds + "s";
    var saveasDirect = "/Report/Report_" + currentTime + ".xlsx";
    SaveAslink = saveasDirect; // Send to client
    var booknameLink = "public/" + saveasDirect;
    
    var Bookname = "Report_" + currentTime + ".xlsx";
    // Write book name
    workbook.xlsx.writeFile(booknameLink)
    
    // Return
    return [SaveAslink, Bookname]
 
} // Đóng fn_excelExport


// =====================TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT=====================
// Hàm chức năng truyền nhận dữ liệu với trình duyệt
function fn_Require_ExcelExport_info_lifter(){
    io.on("connection", function(socket){
        socket.on("msg_Excel_Report_lifter_export", function(data)
        {
            const [SaveAslink1, Bookname] = fn_excelExport();
            var data = [SaveAslink1, Bookname];
            socket.emit('send_Excel_Report_lifter_export', data);
        });
    });
}


// function fn_Require_ExcelExport_info_lifter(){
//     io.on("connection", function(socket){
//         socket.on("msg_Excel_Report_error_device", function(data)
//         {
//             const [SaveAslink1, Bookname] = fn_excelExport();
//             var data = [SaveAslink1, Bookname];
//             socket.emit('send_Excel_Report_error_device', data);
//         });
//     });
// }





