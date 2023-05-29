




// ĐỒ THỊ TỐC ĐỘ 1
var colorDensity = '#ebdc34';
var colorDensity_PX_1 = '#FF0000';
var colorDensity_PX_2 = '#999FF0';
var colorDensity_PX_3 = '#999F0F';
var colorDensity_PX_4 = '#9990FF';
var colorDensity_PX_5 = '#990FFF';
var colorDensity_PX_6 = '#909FFF';

var interval = 500;  // chart update interval (in mili-seconds)

 
 

function fc2_Draw_Chart_total_lifter()
{
    var chartDiv = document.getElementById('chart_total_lifter_realtime');
    var data_Density_1 = 
    {
        x: [],
        y: [],  
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity },
        name: 'Tổng'
    };


    //////
    var data_Density_PX_1 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_1 },
        name: 'Lifter 1'
    };
    ////////////

    //////
    var data_Density_PX_2 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_2 },
        name: 'Lifter 2'
    };
    ////////////
    var data_Density_PX_3 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_3 },
        name: 'Lifter 3'
    };
    ////////////

    //////
    var data_Density_PX_4 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_4 },
        name: 'Lifter 4'
    };

    var data_Density_PX_5 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_5 },
        name: 'Lifter 5'
    };
    ////////////

    //////
    var data_Density_PX_6 = 
    {
        x: [],
        y: [],
        mode: 'lines',
        type: 'line',
        line: { color: colorDensity_PX_6 },
        name: 'Lifter 6'
    };
    ////////////
    ////////////


    var data = [data_Density_1, data_Density_PX_1,data_Density_PX_2,data_Density_PX_3,data_Density_PX_4,data_Density_PX_5,data_Density_PX_6];

    var layout = 
    {
        title: '',
        showlegend: true,
        legend: {
            orientation: 'h'
    },
        xaxis: 
        {
            title: '',
            showline: true,
            fixedrange: true,
        },
        yaxis:
         {
            title: '',
            // showline: true,
            // fixedrange: true,
            range: [0, 500],
            autotick: false,
            tick0: 0,
            dtick:100,
        },
        margin: { t: 20, l: 40, r: 40 }
    };

    var config = 
    {
        editable: false,
        displayModeBar: false,
        showEditInChartStudio: false,
        scrollZoom: false,
        displaylogo: false,
        toImageButtonOptions: {
            //format: 'svg', // one of png, svg, jpeg, webp
            filename: 'lifter',
            scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
        }
    };
    Plotly.newPlot(chartDiv, data, layout, chart_total_lifter);

    var Density_1 = null;
    var Density_PX_1 = null;
    var Density_PX_2 = null;
    var Density_PX_3 = null;
    var Density_PX_4 = null;
    var Density_PX_5 = null;
    var Density_PX_6 = null;
    var TimeNow = null;
    // socket.on('data_cb1', function (data)
    // {
    //     Density_1 = data;
    // });
    // socket.on('Max_cb1', function (data) 
    // {
    //     Density_PX_1 = data;
    // });

    // socket.on('Min_cb1', function (data) 
    // {
    //     Density_PX_2 = data;
    // });

    // socket.on('TimeNow', function (data) 
    // {
    //     TimeNow = data;
    // });

   



    setInterval(() => 
    {
      Density_1 = speed;
      Density_PX_1 = speed_2;
      Density_PX_2 = speed_3;
      Density_PX_3 = speed_4;
      Density_PX_4 = speed_5;
      Density_PX_5 = speed_6;
      Density_PX_6 = speed_7;
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
      var temp_datenow = new Date();
      var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
      TimeNow = timeNow;
     

        if (Density_1 == null  || TimeNow == null)
            return;

        if (data_Density_1.x.length >= 120) 
        {
            for (var i = 0; i < 20; i++) 
            {
                data_Density_1.x.shift();
                data_Density_1.y.shift();

                data_Density_PX_1.x.shift();
                data_Density_PX_1.y.shift();

                data_Density_PX_2.x.shift();
                data_Density_PX_2.y.shift();

                data_Density_PX_3.x.shift();
                data_Density_PX_3.y.shift();

                data_Density_PX_4.x.shift();
                data_Density_PX_4.y.shift();

                data_Density_PX_5.x.shift();
                data_Density_PX_5.y.shift();

                data_Density_PX_6.x.shift();
                data_Density_PX_6.y.shift();

            }
        }
        Plotly.extendTraces
        (
            chartDiv,
            {
                x: [[TimeNow],[TimeNow],[TimeNow],[TimeNow],[TimeNow],[TimeNow],[TimeNow]],
                y: [[Density_1],[Density_PX_1],[Density_PX_2],[Density_PX_3],[Density_PX_4],[Density_PX_5],[Density_PX_6]]
            },
            [0,1,2,3,4,5,6]
        );
    }, 1000);
}


