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
}elseif ($postjson['aksi'] == 'cargar_lotes') {
    $data = array();

    $query = mysqli_query($mysqli2, "SELECT  id_predio, cta_predial, cve_catastral, pre_manzana, pre_lote 
                                    FROM predio_cat AS tabla1 
                                    LEFT JOIN enganche_cat AS tabla2 
                                    ON (tabla1.id_predio = tabla2.idPredio) 
                                    WHERE tabla2.idPredio is NULL 
                                    ORDER BY id_predio 
                                    ASC LIMIT $postjson[start], $postjson[limit]");

    while($rows = mysqli_fetch_array($query)){
        $data[] = array(
            'id_predio'         => $rows['id_predio'],
            'cta_predial'       => $rows['cve_catastral'],
            'pre_manzana'          => $rows['pre_manzana'],
            'pre_lote'   => $rows['pre_lote']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }
    echo $result;

}elseif ($postjson['aksi'] == 'cargar_datos_predio') {

    $query = mysqli_query($mysqli2, "SELECT pre_manzana, pre_lote 
                                    FROM predio_cat 
                                    WHERE id_predio = '$postjson[id]'");

    while($rows = mysqli_fetch_array($query)){
        $data = array(
            'pre_manzana'   => $rows['pre_manzana'],
            'pre_lote'      => $rows['pre_lote']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
}elseif ($postjson['aksi'] == 'reservar_lote'){
    $apartado = mysqli_fetch_array(mysqli_query($mysqli2, "SELECT idPredio from lotes_reservados_cat
        where idPredio = '$postjson[id_predio]'"));
    
    $contrato = mysqli_fetch_array(mysqli_query($mysqli2, "SELECT idPredio from enganche_cat
        where idPredio = '$postjson[id_predio]'"));


        if ($apartado['idPredio']==$postjson['id_predio']) {
            $result = json_encode(array('success' => false, 'msg' => 'Este lote ya esta reservado'));
        }elseif($contrato['idPredio']==$postjson['id_predio']){
            $result = json_encode(array('success' => false, 'msg' => 'Este lote ya tiene un contrato'));
        } else {

            

            $insert = mysqli_query($mysqli2, "INSERT INTO lotes_reservados_cat SET 
                idPredio       = '$postjson[id_predio]',
                nota          = '$postjson[nota]',
                usuario_alta      = '$postjson[usuario]',
                fecha_alta      = '$today'
                ");
                if ($insert) {
                    $result = json_encode(array('success' => true, 'msg' => 'Lote reservado'));
                } else{
                    $result = json_encode(array('success' => false, 'msg' => 'Error en el proceso', 'Error' => mysqli_error($mysqli2)));
                }
        }
        echo $result;
}elseif ($postjson['aksi'] == 'cargar_lotes_reservados') {
    $data = array();

    $query = mysqli_query($mysqli2, "SELECT  tabla2.id, tabla1.id_predio, tabla1.cta_predial, tabla1.cve_catastral, tabla1.pre_manzana, tabla1.pre_lote 
                                    FROM predio_cat AS tabla1 
                                    INNER JOIN lotes_reservados_cat AS tabla2 
                                    ON (tabla1.id_predio = tabla2.idPredio) 
                                    WHERE tabla2.usuario_alta = '$postjson[usuario]'
                                    ORDER BY tabla2.fecha_alta 
                                    ASC LIMIT $postjson[start], $postjson[limit]");

    while($rows = mysqli_fetch_array($query)){
        $data[] = array(
            'id'         => $rows['id'],
            'cta_predial'       => $rows['cve_catastral'],
            'pre_manzana'          => $rows['pre_manzana'],
            'pre_lote'   => $rows['pre_lote']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }
    echo $result;

}elseif ($postjson['aksi'] == 'quitar_reservado') {

    $query = mysqli_query($mysqli2, "DELETE from lotes_reservados_cat
                                    WHERE 
                                    id = '$postjson[id]'");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else{
        $result = json_encode(array('success' => false));
    }

    
    echo $result;
}elseif ($postjson['aksi'] == 'cargar_pagos') {
    $data = array();

    $query = mysqli_query($mysqli2, "SELECT  tabla5.id,tabla1.PrvNombre, tabla2.folio, tabla3.pre_manzana, tabla3.pre_lote, 
                                    tabla5.total, tabla5.usuario, tabla5.fecha_alta
                                    FROM proveedores_mpo AS tabla1 
                                    INNER JOIN enganche_cat AS tabla2 
                                    ON (tabla1.id_proveedor = tabla2.idProveedor) 
                                    INNER JOIN predio_cat AS tabla3
                                    ON (tabla2.idPredio = tabla3.id_predio) 
                                    INNER JOIN contrato_cat AS tabla4
                                    ON (tabla2.id = tabla4.idEnganche) 
                                    INNER JOIN historial_pagos_mensuales_cat AS tabla5
                                    ON (tabla4.id = tabla5.idContrato) 
                                    ORDER BY tabla5.id 
                                    DESC LIMIT $postjson[start], $postjson[limit]");

    while($rows = mysqli_fetch_array($query)){
        
        $data[] = array(
            'id'            => $rows['id'],
            'PrvNombre'   => $rows['PrvNombre'],
            'pre_manzana'          => $rows['pre_manzana'],
            'pre_lote'   => $rows['pre_lote'],
            'total'  => number_format((float)$rows['total'], 2, '.', ''),  //Esto se hace para formatear a 2 digitos
            'usuario' => $rows['usuario'],
            'fecha_alta'  => date_format(date_create($rows['fecha_alta']) , 'd/m/Y H:i:s')
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }
    echo $result;

}elseif ($postjson['aksi'] == 'cargar_pago') {
   

    $query = mysqli_query($mysqli2, "SELECT  tabla5.id,tabla1.PrvNombre, tabla3.pre_manzana, tabla3.pre_lote, 
                                    tabla5.total, tabla5.fecha_alta, tabla5.concepto
                                    FROM proveedores_mpo AS tabla1 
                                    INNER JOIN enganche_cat AS tabla2 
                                    ON (tabla1.id_proveedor = tabla2.idProveedor) 
                                    INNER JOIN predio_cat AS tabla3
                                    ON (tabla2.idPredio = tabla3.id_predio) 
                                    INNER JOIN contrato_cat AS tabla4
                                    ON (tabla2.id = tabla4.idEnganche) 
                                    INNER JOIN historial_pagos_mensuales_cat AS tabla5
                                    ON (tabla4.id = tabla5.idContrato) 
                                    WHERE tabla5.id = '$postjson[id]'");

    while($rows = mysqli_fetch_array($query)){
        
        $data = array(
            'id'            => $rows['id'],
            'PrvNombre'   => $rows['PrvNombre'],
            'pre_manzana'          => $rows['pre_manzana'],
            'pre_lote'   => $rows['pre_lote'],
            'total'  => number_format((float)$rows['total'], 2, '.', ''),  //Esto se hace para formatear a 2 digitos
            'fecha_alta'  => date_format(date_create($rows['fecha_alta']) , 'd/m/Y H:i:s') ,
            'concepto' => $rows['concepto']
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else{
        $result = json_encode(array('success' => false));
    }
    echo $result;

}elseif ($postjson['aksi'] == 'cargar_detalle_pago') {
    $data = array();

    $query = mysqli_query($mysqli2, "SELECT  tabla6.numeroMensualidad,tabla6.recargo, tabla6.subtotal
                                    FROM proveedores_mpo AS tabla1 
                                    INNER JOIN enganche_cat AS tabla2 
                                    ON (tabla1.id_proveedor = tabla2.idProveedor) 
                                    INNER JOIN predio_cat AS tabla3
                                    ON (tabla2.idPredio = tabla3.id_predio) 
                                    INNER JOIN contrato_cat AS tabla4
                                    ON (tabla2.id = tabla4.idEnganche) 
                                    INNER JOIN historial_pagos_mensuales_cat AS tabla5
                                    ON (tabla4.id = tabla5.idContrato) 
                                    INNER JOIN detalle_historial_pagos_mensuales_cat as tabla6
                                    ON (tabla5.id = tabla6.idHistorial)
                                    WHERE tabla5.id = '$postjson[id]'");

    while($rows = mysqli_fetch_array($query)){
        
        $data[] = array(
            'numeroMensualidad'            => $rows['numeroMensualidad'],
            'recargo'   => $rows['recargo'],
            'subtotal'  => number_format((float)$rows['subtotal'], 2, '.', '')  //Esto se hace para formatear a 2 digitos
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