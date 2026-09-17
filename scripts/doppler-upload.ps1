$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$target = Join-Path $root 'doppler.env'
$example = Join-Path $root 'doppler.env.example'
$envFile = Join-Path $root '.env'

if (-not (Test-Path $target)) {
  if (Test-Path $envFile) {
    Write-Host '[doppler] Creating doppler.env from .env ...'
    Get-Content $envFile |
      Where-Object { $_ -match '^\s*[A-Z_][A-Z0-9_]*=' } |
      Set-Content $target
  } elseif (Test-Path $example) {
    Write-Host '[doppler] Creating doppler.env from doppler.env.example — fill values, then re-run pnpm doppler:upload'
    Copy-Item $example $target
    exit 1
  } else {
    Write-Error 'doppler.env not found. Copy doppler.env.example to doppler.env and add your secrets.'
    exit 1
  }
}

$withDoppler = Join-Path $PSScriptRoot 'with-doppler.ps1'
& $withDoppler secrets upload $target --config dev
exit $LASTEXITCODE
