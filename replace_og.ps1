$src = "C:\Users\Afreen\.gemini\antigravity-ide\brain\8a5c0ec9-9953-4747-93fb-5f96edabe76c\axcrivo_og_v3_1780691562609.png"

$targets = @(
    "src\app\opengraph-image.png",
    "src\app\twitter-image.png",
    "public\opengraph-image.png",
    "public\twitter-image.png",
    "public\og-image.png",
    "public\og-image-v2.png",
    "public\og-image-v3.png"
)

foreach ($t in $targets) {
    Copy-Item -Path $src -Destination $t -Force
    Write-Host "Replaced: $t"
}

Write-Host "All done."
