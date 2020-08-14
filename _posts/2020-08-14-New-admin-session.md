---
layout: posts
author_profile: true
read_time: true
comments: true
share: true
related: true
categories:
  - Blog
  - PowerShell
tags:
  - PowerShell
  - Admin
---


```powershell

# Function        Test-IsAdmin
function Test-IsAdmin {
	<#
	.Synopsis
	Tests if the user is an administrator
	.Description
	Returns true if a user is an administrator, false if the user is not an administrator
	.Example
	Test-IsAdmin
	#>
	$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
	$principal = New-Object Security.Principal.WindowsPrincipal $identity
	$principal.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}


# Function        New-AdminShell
function New-AdminShell {
	<#
	.Synopsis
	Starts an Elevated PowerShell Console.

	.Description
	Opens a new PowerShell Console Elevated as Administrator. If the user is already running an elevated
	administrator shell, a message is displayed in the console session.

	.Example
	New-AdminShell

	#>

	$Process = Get-Process | Where-Object { $_.Id -eq "$($PID)" }
	if (Test-IsAdmin = $True) {
		Write-Warning -Message "Admin Shell already running!"
	}
	else {
		if ($Process.Name -eq "powershell") {
			Start-Process -FilePath "powershell.exe" -Verb runas -PassThru
		}
		if ($Process.Name -eq "pwsh") {
			Start-Process -FilePath "pwsh.exe" -Verb runas -PassThru
		}
	}
}


# Function        New-AdminTerminal
function New-AdminTerminal {
	<#
	.Synopsis
	Starts an Elevated Microsoft Terminal.

	.Description
	Opens a new Microsoft Terminal Elevated as Administrator. If the user is already running an elevated
	Microsoft Terminal, a message is displayed in the console session.

	.Example
	New-AdminShell

	#>

	if (Test-IsAdmin = $True) {
		Write-Warning -Message "Admin Shell already running!"
	}
	else {
		Start-Process "wt.exe" -ArgumentList "-p pwsh" -Verb runas -PassThru
	}
}


# Function        Show-IsAdminOrNot

function Show-IsAdminOrNot {
	$IsAdmin = Test-IsAdmin
	if ( $IsAdmin -eq "False") {
		Write-Warning -Message "Admin Privileges!"
	}
	else {
		Write-Warning -Message "User Privileges"
	}
}


#--------------------
# Display running as Administrator in WindowTitle

$whoami = whoami /Groups /FO CSV | ConvertFrom-Csv -Delimiter ','
$MSAccount = $whoami."Group Name" | Where-Object { $_ -like 'MicrosoftAccount*' }
$LocalAccount = $whoami."Group Name" | Where-Object { $_ -like 'Local' }

#$MSAccount.Split('\')[1]
#$env:USERNAME

if ((Test-IsAdmin) -eq $true) {
	if (($MSAccount)) {
		$host.UI.RawUI.WindowTitle = "$($MSAccount.Split('\')[1]) - Admin Privileges"
	}
	else {
		$host.UI.RawUI.WindowTitle = "$($LocalAccount) - Admin Privileges"
	}
}	
else {
	if (($LocalAccount)) {
		$host.UI.RawUI.WindowTitle = "$($MSAccount.Split('\')[1]) - User Privileges"
	}
	else {
		$host.UI.RawUI.WindowTitle = "$($LocalAccount) - User Privileges"
	}
}	

#--------------------
# Profile Starts here!
Show-IsAdminOrNot
Write-Host ""

```

