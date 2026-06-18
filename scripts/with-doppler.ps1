# Resolves Doppler on Windows when PATH wasn't refreshed after winget install.
param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$env:Path = [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'User')

$cmd = Get-Command doppler -ErrorAction SilentlyContinue
$exe = if ($cmd) { $cmd.Source } else { $null }

if (-not $exe) {
  $candidates = @(
    "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Doppler.doppler_Microsoft.Winget.Source_8wekyb3d8bbwe\doppler.exe",
    "$env:LOCALAPPDATA\Microsoft\WinGet\Links\doppler.exe"
  )
  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      $exe = $candidate
      break
    }
  }
}

if (-not $exe) {
  Write-Error @"
Doppler CLI not found.

Install:
  winget install Doppler.doppler

Then either restart your terminal, or use the pnpm scripts:
  pnpm doppler:login
  pnpm doppler:setup
"@
  exit 1
}

& $exe @Args
exit $LASTEXITCODE
