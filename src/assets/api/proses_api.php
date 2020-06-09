<?php
Header("Access-Control-Allow-Origin: *");
Header("Access-Control-Allow-Credentials: true");
Header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
Header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
Header("Content-Type: application/json; charset=utf-8");

include 'config.php';


$postjson = json_decode(file_get_contents("php://input"), true);

$today = date('Y-m-d H:i:s');

if ($postjson['aksi'] == 'proses_register') {

    $cekemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_address from tb_users
     where email_address = '$postjson[email_address]'"));

    if ($cekemail['email_address']==$postjson['email_address']) {
        $result = json_encode(array('success' => false, 'msg' => 'Este email ya esta registrado'));
    } else {
        $password = md5($postjson['password']);

        $fecha = $postjson['date_birth'];
        $fixed = date('Y-m-d', strtotime($fecha));//Conversion de fecha en formato iso 8601 a date para insertar en mysql

        $insert = mysqli_query($mysqli, "INSERT INTO tb_users SET 
            your_name       = '$postjson[your_name]',
            gender          = '$postjson[gender]',
            date_birthday      = '$fixed',
            email_address   = '$postjson[email_address]',
            password        = '$password',
            created_at      = '$today'
            ");
            if ($insert) {
                $result = json_encode(array('success' => true, 'msg' => 'Registro realizado'));
            } else{
                $result = json_encode(array('success' => false, 'msg' => 'Error en el registro', 'Error' => mysqli_error($mysqli)));

            }
    }
        echo $result;
}elseif ($postjson['aksi'] == 'proses_login') {
    $password = md5($postjson['password']);
    $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * from tb_users
     where email_address = '$postjson[email_address]' 
     AND password = '$password'"));

    $data = array(
        'id_user'       => $logindata['id_user'],
        'your_name'       => $logindata['your_name'],
        'gender'          => $logindata['gender'],
        'date_birthday'   => $logindata['date_birthday'],
        'email_address'   => $logindata['email_address']
    );
    if ($logindata) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
} elseif ($postjson['aksi'] == 'load_user') {
    $data = array();

    $query = mysqli_query($mysqli, "SELECT * from tb_users 
                                    ORDER BY id_user 
                                    DESC LIMIT $postjson[start], $postjson[limit]");

    while($rows = mysqli_fetch_array($query)){
        $data[] = array(
            'id_user'         => $rows['id_user'],
            'your_name'       => $rows['your_name'],
            'gender'          => $rows['gender'],
            'date_birthday'   => $rows['date_birthday'],
            'email_address'   => $rows['email_address']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
}elseif ($postjson['aksi'] == 'del_user') {

    $query = mysqli_query($mysqli, "DELETE from tb_users
                                    WHERE 
                                    id_user = '$postjson[id]'");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
}elseif ($postjson['aksi'] == 'proses_crud') {

    $password = md5($postjson['password']);

    $cekpass = mysqli_fetch_array(mysqli_query($mysqli, "SELECT password from tb_users
        where id_user = '$postjson[id]'"));

    if ($postjson['password'] == "") {
        $password = $cekpass['password'];
    }else{
        $password = md5($postjson['password']);
    }
    
    if ($postjson['action'] == 'Create') {
       
        $cekemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT email_address from tb_users
        where email_address = '$postjson[email_address]'"));


        if ($cekemail['email_address']==$postjson['email_address']) {
            $result = json_encode(array('success' => false, 'msg' => 'Este email ya esta registrado'));
        } else {

            $fecha = $postjson['date_birth'];
            $fixed = date('Y-m-d', strtotime($fecha));//Conversion de fecha en formato iso 8601 a date para insertar en mysql

            $insert = mysqli_query($mysqli, "INSERT INTO tb_users SET 
                your_name       = '$postjson[your_name]',
                gender          = '$postjson[gender]',
                date_birthday      = '$fixed',
                email_address   = '$postjson[email_address]',
                password        = '$password',
                created_at      = '$today'
                ");
                if ($insert) {
                    $result = json_encode(array('success' => true, 'msg' => 'realizado'));
                } else{
                    $result = json_encode(array('success' => false, 'msg' => 'Error en el proceso', 'Error' => mysqli_error($mysqli)));
                }
        }
    }else{
        $fecha = $postjson['date_birth'];
        $fixed = date('Y-m-d', strtotime($fecha));//Conversion de fecha en formato iso 8601 a date para insertar en mysql

        $updt = mysqli_query($mysqli, "UPDATE tb_users SET 
            your_name       = '$postjson[your_name]',
            gender          = '$postjson[gender]',
            date_birthday   = '$fixed',
            password        = '$password' WHERE id_user = '$postjson[id]'
        ");
        if ($updt) {
            $result = json_encode(array('success' => true, 'msg' => 'realizado'));
        } else{
            $result = json_encode(array('success' => false, 'msg' => 'Error en el proceso', 'Error' => mysqli_error($mysqli)));
        }
    }
    echo $result;
}elseif ($postjson['aksi'] == 'load_single_data') {

    $query = mysqli_query($mysqli, "SELECT * from tb_users 
                                    WHERE id_user = '$postjson[id]'");

    while($rows = mysqli_fetch_array($query)){
        $data = array(
            'your_name'       => $rows['your_name'],
            'gender'          => $rows['gender'],
            'date_birthday'   => $rows['date_birthday'],
            'email_address'   => $rows['email_address']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
}

?>