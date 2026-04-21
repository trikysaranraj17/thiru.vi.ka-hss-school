$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host "Server started on http://localhost:8080"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath
    
    if ($path -eq '/') { $path = '/index.html' }
    
    $filePath = Join-Path 'c:\anti db' ($path.TrimStart('/').Replace('/', '\'))
    
    if (Test-Path $filePath) {
        $contentTypes = @{
            '.html' = 'text/html; charset=utf-8'
            '.css'  = 'text/css; charset=utf-8'
            '.js'   = 'application/javascript; charset=utf-8'
            '.svg'  = 'image/svg+xml'
            '.png'  = 'image/png'
            '.jpg'  = 'image/jpeg'
            '.jpeg' = 'image/jpeg'
            '.gif'  = 'image/gif'
            '.json' = 'application/json'
            '.toml' = 'text/plain'
        }
        $ext = [System.IO.Path]::GetExtension($filePath)
        $ct = $contentTypes[$ext]
        if (-not $ct) { $ct = 'application/octet-stream' }
        $response.ContentType = $ct
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $path")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    
    $response.Close()
}
