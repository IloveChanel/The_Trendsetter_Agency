$base='https://fantastic-enchantment-production.up.railway.app'
$paths=@('/','/api','/api/analyze','/analyze','/analyze/resume','/v1/analyze','/analyze.php')
foreach($p in $paths){
  $url = $base + $p
  try{
    $r = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -TimeoutSec 10
    Write-Output "$url -> $($r.StatusCode)"
  } catch {
    if ($_.Exception.Response) { Write-Output "$url -> STATUS: $($_.Exception.Response.StatusCode.Value__)" } else { Write-Output "$url -> ERROR: $($_.Exception.Message)" }
  }
}
