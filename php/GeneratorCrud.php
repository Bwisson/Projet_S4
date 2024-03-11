<?php
include("./db/db_connect.php");
function ShowCreateCrud($name, $table, $columns)
{
    echo "function create$name(\$conn";
    echo (!empty($columns) ? ", $" . implode(", $", $columns) : "");
    echo ")\n{";
    echo "\n    \$sql = \"INSERT INTO `$table` (";
    echo (!empty($columns) ? "`" . implode("`, `", $columns) . "`" : "Array");;
    echo ") VALUES (";
    echo (!empty($columns) ? "'$" . implode("', '$", $columns) . "'" : "Array");
    echo ")\";";
    echo "\n    \$res = mysqli_query(\$conn, \$sql);";
    echo "\n    return \$res;\n}\n";

    echo "\n function delete$name(\$conn,  \$id)\n{";
    echo "\n    \$sql = \"DELETE FROM `$table` WHERE `id`=\$id\";";
    echo "\n    \$res = mysqli_query(\$conn, \$sql);";
    echo "\n    return \$res;\n}\n";

    echo "function update$name(\$conn, \$id,";
    echo (!empty($columns) ? "\$" . implode(", \$", $columns) : "");
    echo ")\n{";

    $setClauses = [];
    foreach ($columns as $column) {
        $setClauses[] = " `$column`='\$$column'";
    }
    echo "    \$sql = \"UPDATE `$table` SET  ";
    echo   implode(',', $setClauses);
    echo " WHERE `id` = \$id\";";
    echo "    \$res = mysqli_query(\$conn, \$sql);";
    echo "    return \$res;";
    echo "}\n";

    echo "\nfunction list$name(\$conn)\n{";
    echo "\n    \$sql = \"SELECT * FROM `$table`\";";
    echo "\n    \$res = mysqli_query(\$conn, \$sql);";
    echo "\n    \$rs = rs_to_table(\$res);";
    echo "\n    return \$rs;\n}\n";
}


//ShowCreateCrud("Object", "Objet", ["code_barre", "nom", "categorie", "couleur", "taille"]);
//ShowCreateCrud("Modele", "Modele", ["id", "nom", "prenom", "genre", "tarif_horaire"]);
//ShowCreateCrud("Atelier", "Atelier", ["id", "nom", "type"]);
