---
layout: single
title: "The PowerShell Profile"
excerpt: "One of PowerShell's most under-utilised admin assistants. <br> How to improve your PowerShell user Environment."
header:
  overlay_image: /assets/images/banner-images/remove-blogserver-marmoset.png
  overlay_filter: rgba(90, 104, 129, 0.75)
  teaser: /assets/images/default-teaser-image.png
  caption: "[**Luke Leigh**](https://www.linkedin.com/in/lukeleigh/)"
  # actions:
  #   - label: "More Info"
  #     url: "https://github.com/BanterBoy"
classes: wide
date: 2021-01-02T08:30:00
last_modified_at: 2021-01-02T08:30:00
categories:
  - Blog
tags:
  - PowerShell
  - Admin
  - Profile
---

<script src="https://formspree.io/js/formbutton-v1.0.0.min.js" defer></script>
<script>
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
/* customize formbutton here*/
  formbutton("create", {
    action: "https://formspree.io/xvowjgjd",
    buttonImg: "<i class='fas fa-envelope' style='font-size:20px'/>",
    theme: "minimal",
    title: "Contact Me!",
    fields: [
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        required: true,
        placeholder: "What's on your mind?",
      },
      { type: "submit" }
    ],
    styles: {
      fontFamily: "Roboto",
      fontSize: "1em",
      title: {
        background: "#999999",
      },
      button: {
        background: "#999999",
      }
    },
    initiallyVisible: false
  });
</script>

{: .text-right}
<span style="font-size:11px;"><button onclick="window.print()"><i class="fas fa-print" aria-hidden="true" style="color: black; margin-right:5px;"></i>Print</button></span>

# <i class="fas fa-book" aria-hidden="true" style="color: white; margin-right:5px;"></i> PowerShell you say....?

As this year has progressed and COVID-19 has increasingly changed the way we manage both our home and work lives, I am sure many administrators have found the requirement to use PowerShell to orchestrate their fleet of computers, servers and services more common than ever.

Many companies were forced into pandemic fuelled digital transformation in order to enable their workforce to continue to function. IT Departments will now find a mixture of their servers and services hosted both on-premise and hosted on some flavour of cloud platform; [Amazon Web Services][1]{:target="_blank"}, [Microsoft O365][2]{:target="_blank"} / [Microsoft Azure][3]{:target="_blank"} or [Google Cloud Platform][4]{:target="_blank"}

As a result, fixing everyday issues may now require a few more hoops to jump through before you can just open 'Active Directory Users & Computers' and hit "reset password".

The ability to be able to create your own bespoke tooling to be used for administration of frequently time consuming tasks makes PowerShell the perfect tool for every IT Admin's arsenal. Everyday user checks can be performed quickly and can be tuned to your own needs or your teams needs.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

# But PowerShell is painful...

As with any tool, there are a few things you need to configure in order to prevent your experience from being painful and a few tweaks that will make it far easier to use and a much more enjoyable experience. There are also a handful of basic commands that will generally get you out of trouble or help you get on the right track

## Execution Policy

The first hurdle most PowerShell users first need to overcome relates to the PowerShell execution policy. PowerShell's execution policy is a safety feature that controls the conditions under which PowerShell loads configuration files and runs scripts. This feature helps prevent the execution of malicious scripts.

On a Windows computer you can set an execution policy for the local computer, for the current user, or for a particular session. You can also use a Group Policy setting to set execution policies for computers and users.

Execution policies for the local computer and current user are stored in the registry. You don't need to set execution policies in your PowerShell profile. The execution policy for a particular session is stored only in memory and is lost when the session is closed.

The execution policy isn't a security system that restricts user actions. For example, users can easily bypass a policy by typing the script contents at the command line when they cannot run a script. Instead, the execution policy helps users to set basic rules and prevents them from violating them unintentionally.

Every user, whether a Local Administrator or not, can change the execution policy to allow them to run scripts as follows:-

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

Without configuring this setting, you will be unable to run any scripts or indeed your PowerShell Profile

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## PowerShell Profiles?

There are several articles scattered around the internet that already provide either a cursory overview of the PowerShell profiles or a detailed explanation of their functionality. Here are a handful of articles that will no doubt explain anything that I miss.

devblogs.microsoft.com - [Understanding the Six PowerShell Profiles][5]{:target="_blank"}<br>
docs.microsoft.com - [About Profiles][6]{:target="_blank"}<br>
deployhappiness.com - [What is the PowerShell Profile and Why Should I Care?][7]{:target="_blank"}<br>
red-gate.com - [Persistent PowerShell: The PowerShell Profile][8]{:target="_blank"}

By default your user account will not have any profile files created but it is a simple task to create your own. You can create a blank profile file by copying and pasting the following command:-
```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
```
### Creating your own Profile

Entering the environment variable $PROFILE, will show you the path for your blank profile.

 ```powershell
PS C:\> $profile
C:\Users\YOURUSERNAME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
 ```

### Ok, I have one, now what do I do?

You can very easily edit your profile by entering:-

```powershell
notepad $PROFILE
```

Your blank file will open and you can start adding features to your profile.

If you have an on-premise Exchange Servers, you can copy the following code, replacing [http://INTERNAL-EXCHANGE-URI/PowerShell/] with your servers address and this will enable you to use **`New-OnPremExchangeSession`** when you open your profile. No longer requiring you to copy and paste your current strings from your notepad repository of useful commands.

```powershell
function New-OnPremExchangeSession {
    param (
        [Parameter(ValueFromPipeline = $True,
            HelpMessage = "Enter preferred Exchange Server")]
        [ValidateSet('MAIL01', 'MAIL02') ]
        [string[]]$ComputerName
    )
    switch ($ComputerName) {
        MAIL01 {
            $Creds = Get-Credential
            $OnPremSession = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri http://INTERNAL-EXCHANGE-URI/PowerShell/ -Authentication Kerberos -Credential $Creds
            Import-PSSession $OnPremSession -DisableNameChecking
        }
        MAIL02 {
            $Creds = Get-Credential
            $OnPremSession = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri http://INTERNAL-EXCHANGE-URI/PowerShell/ -Authentication Kerberos -Credential $Creds
            Import-PSSession $OnPremSession -DisableNameChecking
        }
        default {
            $Creds = Get-Credential
            $OnPremSession = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri http://INTERNAL-EXCHANGE-URI/PowerShell/ -Authentication Kerberos -Credential $Creds
            Import-PSSession $OnPremSession -DisableNameChecking
        }
    }
}

function Remove-OnPremExchangeSession {
    Get-PSSession | Remove-PSSession
}
```



{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## Update PowerShell Help

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## Useful Commands

```powershell
CommandType     Name                  Version    Source
-----------     ----                  -------    ------
Cmdlet          Get-Help              3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Get-Member            3.1.0.0    Microsoft.PowerShell.Utility
Cmdlet          Get-Command           3.0.0.0    Microsoft.PowerShell.Core
Function        Find-Module           2.2.3      PowerShellGet
Cmdlet          Get-Module            3.0.0.0    Microsoft.PowerShell.Core
```

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## Functions

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## Aliases

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>




{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>


[1]: https://aws.amazon.com/
[2]: https://www.office.com/
[3]: https://azure.microsoft.com/
[4]: https://cloud.google.com/
[5]: https://devblogs.microsoft.com/scripting/understanding-the-six-powershell-profiles/
[6]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles
[7]: https://deployhappiness.com/what-is-the-powershell-profile-and-why-should-i-care/
[8]: https://www.red-gate.com/simple-talk/sysadmin/powershell/persistent-powershell-the-powershell-profile/

