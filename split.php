<?php
$lines = file('screencapture-hellosuperstar-2026-07-26-15_11_10.txt');
$app_top = implode("", array_slice($lines, 0, 115));
$app_bottom = implode("", array_slice($lines, 778, 857 - 778));
$app_content = $app_top . "\n<x-header />\n{{ \$slot }}\n<x-footer />\n" . $app_bottom;

file_put_contents('hellosuperstar-app/resources/views/components/layouts/app.blade.php', $app_content);
file_put_contents('hellosuperstar-app/resources/views/components/header.blade.php', implode("", array_slice($lines, 115, 159 - 115)));
file_put_contents('hellosuperstar-app/resources/views/components/footer.blade.php', implode("", array_slice($lines, 766, 778 - 766)));
