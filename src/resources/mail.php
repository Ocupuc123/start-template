<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>

<body>
    <div style="margin-top:15%; text-align: center;">
        <?php
        $dt = date("d-m-Y, H:i:s");
        $url = $_SERVER["HTTP_REFERER"];
        $ip = $_SERVER["REMOTE_ADDR"];
        $name = urldecode($_POST['name']);
        $phone = urldecode($_POST['phone']);
        $to = 'to@mail.ru';
        $title = "Заполнена контактная форма на сайте $url";
        $from = 'from@mail.ru';
        $message = "
    <html>
    <body>
    <center>
          <table style='width: 100%; border-collapse: collapse;'>
            <tr>
                <td style='background-color: #f8f8f8;padding: 10px; border: #e9e9e9 1px solid;'><b>Имя:</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;width:75%;'> $name</td>
            </tr>
            <tr>
                <td style='background-color: #f8f8f8;padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон:</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;width:75%;'>$phone</td>
            </tr>
         </table>
       </center>
   </body>
   </html>
  ";
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From: " . $from . "\r\n";
        mail($to, $title, $message, $headers);
        ?>
    </div>
</body>

</html>