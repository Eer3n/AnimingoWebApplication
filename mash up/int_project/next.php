<?php

if ($_FILES["file"]["error"] > 0)
    echo "Error: " . $_FILES["image"]["error"] . "<br />";
else
{
    echo "Upload: " . $_FILES["image"]["name"] . "<br />";
    echo "Type: " . $_FILES["image"]["type"] . "<br />";
    echo "Size: " . ($_FILES["image"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["image"]["tmp_name"];
}