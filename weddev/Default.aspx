<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />
    <link rel="stylesheet" href="experiments/jquery/css/jquery-ui.css" />
    <script src="experiments/jquery/js/jquery.js"></script>
    <script src="experiments/jquery/js/jquery-ui.js"></script>

    <title>Habiba's Home Page</title>
    <link rel="stylesheet" type="text/css" href="experiments\css\style.css">
    <style>
        body {
            background-image: url(experiments/background.jpg);
            background-size: cover;
            background-attachment: fixed;
        }
    </style>
</head>

<body>

    <h1>
        <center> Welcome to Habiba's Home Page</center>
    </h1>

    <div class="pad">

        <form id="form1" runat="server">

            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="search/" target="_blank">Search</a></li>
                <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li><a href="textview/" target="_blank">TextView</a></li>
                <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                <li><a href="blog/" target="_blank">Blog</a></li>
            </ul>
        </form>
    </div>
    <div>
        <img src="habiba.jpg" height="400px" width="280px" class="photo" />
    </div>
    <div>
        <p class="text">
            I am Habiba Shaik, graduate student at College of Computer and Information Science.
            I have taken this web development course under Professor Jose to refresh my knowledge with web development 
            and also to learn technologies like MEAN stack, MongoDB and styling webpages.   
            I did my undergraduation in Computer Science from Bapatla Engineering College in India.
            Before coming to Northeastern I have worked in a HR and Payroll product implementation team for ADP India for almost 3 years.
            My areas of interest are programming and Databases.
        </p>
    </div>
    <div>
        <p>
            Know more about me <a rel="canonical" href="http://www.linkedin.com/in/habibashaik/">here</a>
        </p>
    </div>
    <%--<script>
        $(function () {
            var html = $('#expdata').html();
            var text = $("<label style='border:solid;border-radius:50px;border-color:black;color:black;font-size:20pt;padding:30px;text-decoration:none;align-content:center;font-family:buxton sketch;'>Experiments</label>");
            $('#exper').effect("fade", 3000, changetotext);

            function changetotext() {
                $('#expdata', this).html(text);
                $('#exper').effect("fade", 3000, changetoimage);
            };

            function changetoimage() {
                $('#expdata', this).html(html);
                $('#exper').effect("fade", 3000, changetotext);
            };
        })

    </script>--%>

    <ul style="display:inline-block;list-style:none">
        <li style="display:inline-block;width:150px;height:160px">
            <a href="story/index.htm?../experiments/html/story.txt" target="_blank" id="exper">
                <span id="expdata">
                    <img src="experiments/experiment.jpg" width="130" height="130" /></span></a>
        </li>
        <li style="display:inline-block;">
            <a href="https://github.com/habibask/cs5610-habibask" target="_blank">
                <img id="git" width="130" height="130" src="github.png" /></a>
        </li>
    </ul>


</body>
</html>
