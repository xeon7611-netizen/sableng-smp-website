Add-Type -AssemblyName System.Drawing

$url = "http://localhost:5000/api/logo"
$rawPath = "C:\Users\xeon id\.gemini\antigravity\scratch\minecraft-server-website\server\data\raw_logo.jpg"
$outPngPath = "C:\Users\xeon id\.gemini\antigravity\scratch\minecraft-server-website\server\data\custom_logo.png"
$clientPublicPng = "C:\Users\xeon id\.gemini\antigravity\scratch\minecraft-server-website\client\public\custom_logo.png"

Write-Host "Downloading logo from $url..."
$wc = New-Object System.Net.WebClient
$wc.DownloadFile($url, $rawPath)
Write-Host "Downloaded raw logo to $rawPath"

$src = [System.Drawing.Bitmap]::FromFile($rawPath)
$width = $src.Width
$height = $src.Height
Write-Host "Image size: ${width}x${height}"

$dest = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $src.GetPixel($x, $y)
        $r = $pixel.R
        $g = $pixel.G
        $b = $pixel.B
        $maxC = [Math]::Max($r, [Math]::Max($g, $b))
        
        if ($maxC -lt 28) {
            # Pure black / near black background -> completely transparent
            $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($maxC -lt 60) {
            # Edge smoothing transition
            $alpha = [int](($maxC - 28) / (60 - 28) * 255)
            $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        } else {
            # Foreground vibrant logo colors intact
            $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
        }
    }
}

$src.Dispose()

$dest.Save($outPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Save($clientPublicPng, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()

Write-Host "Successfully generated transparent PNG logo at $outPngPath"
