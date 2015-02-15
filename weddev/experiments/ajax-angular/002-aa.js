function loadXMLDoc(file) {
    var xmlhttp;
    var txt, x, xx, i;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();

    }
    var table = $("#booktable");
    table.empty();
    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var tr = $("<tr><th>Title</th>");
            tr.append("<th>Author</th>");
            tr.append("<th>Price</th>");
            tr.append("<th>Description</th></tr>");
            table.append(tr);
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("book");
            for (i = 0; i < x.length; i++) {
                var content = $("<tr>");
                xx = x[i].getElementsByTagName("title");
                console.log(xx);

                {
                    try {
                        content.append("<td>" + xx[0].firstChild.nodeValue + "</td>");
                    }
                    catch (er) {
                        content.append("<td> </td>");
                    }
                }
                xx = x[i].getElementsByTagName("author");
                {
                    try {
                        content.append("<td>" + xx[0].firstChild.nodeValue + "</td>");
                    }
                    catch (er) {
                        content.append("<td> </td>");
                    }
                }
                xx = x[i].getElementsByTagName("price");
                {
                    try {
                        content.append("<td>" + xx[0].firstChild.nodeValue + "</td>");
                    }
                    catch (er) {
                        content.append("<td> </td>");
                    }
                }
                xx = x[i].getElementsByTagName("description");
                {
                    try {
                        content.append("<td>" + xx[0].firstChild.nodeValue + "</td>");
                    }
                    catch (er) {
                        content.append("<td> </td>");
                    }
                }
                content.append("</tr>");
                table.append(content);
            }
        }
    }
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
    $("#btn").text("Hide table");
    $("#btn").attr("onclick","hideTable()");

}

function hideTable() {
    $("#booktable").empty();
    $("#btn").text("Click to retrieve book data");
    $("#btn").attr("onclick", "loadXMLDoc('books.xml')");
}