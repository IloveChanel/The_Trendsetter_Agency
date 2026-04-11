$body = @{resume='Experienced software engineer...'; job='Senior backend developer'} | ConvertTo-Json
try {
    $r = Invoke-RestMethod -Uri 'https://fantastic-enchantment-production.up.railway.app/api/analyze' -Method Post -Body $body -ContentType 'application/json' -TimeoutSec 15
    Write-Output 'RESPONSE_JSON:'
    $r | ConvertTo-Json -Depth 5
} catch {
    Write-Output 'ERROR:'
    Write-Output $_.Exception.Message
    if ($_.Exception.Response) {
        Write-Output "STATUS: $($_.Exception.Response.StatusCode.Value__)"
        Write-Output $_.Exception.Response.StatusDescription
    }
}
