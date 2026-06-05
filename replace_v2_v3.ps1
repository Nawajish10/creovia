$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    if ($content -match "og-image-v2") {
        $updated = $content -replace "og-image-v2\.png", "og-image-v3.png"
        Set-Content -Path $file.FullName -Value $updated -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Done!"
