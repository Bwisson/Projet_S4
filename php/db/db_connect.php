<?php

$conn = mysqli_connect("localhost", "info7", "E8Z", "info7");
mysqli_set_charset($conn, "utf8");

function rs_to_table($rs)
{
    $tab = [];
    while ($row = mysqli_fetch_assoc($rs)) {
        $tab[] = $row;
    }
    return $tab;
}
