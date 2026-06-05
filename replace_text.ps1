$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    if ($content -match "Creator Assets" -or $content -match "Creator Asset") {
        $updated = $content -replace "Creator Assets", "Social Pages & Digital Assets"
        $updated = $updated -replace "Creator Asset", "Social Pages & Digital Assets"
        Set-Content -Path $file.FullName -Value $updated -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Done!"
