---
layout: single
title: "The PowerShell Profile"
excerpt: "How to improve your PowerShell user Environment.<br> One of PowerShell's most under-utilised admin assistants."
header:
    overlay_image: /assets/images/banner-images/remove-blogserver-marmoset.png
    overlay_filter: rgba(90, 104, 129, 0.75)
    teaser: /assets/images/default-teaser-image.png
toc: true
toc_label: Admin Assistant
toc_icon: user-secret
toc_sticky: true
date: 2021-01-02T08:30:00
last_modified_at: 2021-01-03T08:30:00
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

# <i class="fas fa-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> PowerShell you say....?

As this year has progressed and COVID-19 has increasingly changed the way we manage both our home and work lives, I am sure many administrators have found the requirement to use PowerShell to orchestrate their fleet of computers, servers and services more common than ever.

Many companies were forced into pandemic fuelled digital transformation in order to enable their workforce to continue to function. IT Departments will now find a mixture of their servers and services hosted both on-premise and hosted on some flavour of cloud platform; [Amazon Web Services][1]{:target="\_blank"}, [Microsoft O365][2]{:target="\_blank"} / [Microsoft Azure][3]{:target="\_blank"} or [Google Cloud Platform][4]{:target="\_blank"}

As a result, fixing everyday issues may now require a few more hoops to jump through before you can just open 'Active Directory Users & Computers' and hit "reset password".

The ability to be able to create your own bespoke tooling to be used for administration of frequently time consuming tasks makes PowerShell the perfect tool for every IT Admin's arsenal. Everyday user checks can be performed quickly and can be tuned to your own needs or your teams needs.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

# <i class="fas fa-user-injured" aria-hidden="true" style="color: white; margin-right:5px;"></i> But PowerShell is painful...

As with any tool, there are a few things you need to configure in order to prevent your experience from being painful and a few tweaks that will make it far easier to use and a much more enjoyable experience. There are also a handful of basic commands that will generally get you out of trouble or help you get on the right track

## <i class="fas fa-laptop-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> Execution Policy

The first hurdle most PowerShell users first need to overcome relates to the PowerShell execution policy. PowerShell's execution policy is a safety feature that controls the conditions under which PowerShell loads configuration files and runs scripts. This feature helps prevent the execution of malicious scripts.

On a Windows computer you can set an execution policy for the local computer, for the current user, or for a particular session. You can also use a Group Policy setting to set execution policies for computers and users.

Execution policies for the local computer and current user are stored in the registry. You don't need to set execution policies in your PowerShell profile. The execution policy for a particular session is stored only in memory and is lost when the session is closed.

The execution policy isn't a security system that restricts user actions. For example, users can easily bypass a policy by typing the script contents at the command line when they cannot run a script. Instead, the execution policy helps users to set basic rules and prevents them from violating them unintentionally.

Every user, whether a Local Administrator or not, can change the execution policy to allow them to run scripts as follows:-

```powershell
# Current User Policy
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser -Force

# Machine Policy - Requires Local Admin rights
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force
```

Without configuring this setting, you will be unable to run any scripts or indeed your PowerShell Profile

<span style="font-size:15px;">
*Further reading*<br>
docs.microsoft.com - [Set-ExecutionPolicy][9]{:target="_blank"}<br>
devblogs.microsoft.com - [Change PowerShell Script Execution Policy][10]{:target="_blank"}<br>
blog.itpro.tv - [SET-EXECUTIONPOLICY][11]{:target="_blank"}<br>
devblogs.microsoft.com - [Scripting Guy - Weekend Scripter][12]{:target="_blank"}
</span>

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## <i class="fas fa-door-open" aria-hidden="true" style="color: white; margin-right:5px;"></i> PowerShell Profiles?

There are several articles scattered around the internet that already provide either a cursory overview of the PowerShell profiles or a detailed explanation of their functionality. Here are a handful of articles that will no doubt explain anything that I miss.

<span style="font-size:15px;">
*Further reading*<br>
devblogs.microsoft.com - [Understanding the Six PowerShell Profiles][5]{:target="_blank"}<br>
docs.microsoft.com - [About Profiles][6]{:target="_blank"}<br>
deployhappiness.com - [What is the PowerShell Profile and Why Should I Care?][7]{:target="_blank"}<br>
red-gate.com - [Persistent PowerShell: The PowerShell Profile][8]{:target="_blank"}
</span>

### <i class="fas fa-hat-wizard" aria-hidden="true" style="color: white; margin-right:5px;"></i> Creating your own Profile

By default your user account will not have any profile files created but it is a simple task to create your own. You can create a blank profile file by copying and pasting the following command:-

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
```

Entering the environment variable $PROFILE, will show you the path for your blank profile.

```powershell
PS C:\> $profile
C:\Users\YOURUSERNAME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
```

### <i class="fas fa-thumbs-up" aria-hidden="true" style="color: white; margin-right:5px;"></i> OK, I have one, now what do I do?

You can very easily edit your profile by entering:-

```powershell
PS C:\> notepad $PROFILE
```

Your blank file will open and you can start adding features to your profile.

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

#### <i class="fas fa-user-ninja" aria-hidden="true" style="color: white; margin-right:5px;"></i> Example Exchange Functions

If you have an on-premise Exchange Servers, you can copy the following code, replacing **`http://INTERNAL-EXCHANGE-URI/PowerShell/`** with your servers address.

_This will enable you to use_ **`New-OnPremExchangeSession`** _when you open your profile. No longer requiring you to copy and paste your current strings from your notepad repository of useful commands._

Example Exchange Functions

<iframe src="data:text/html;charset=utf-8,%3Cscript%20src%3D%22https%3A%2F%2Fgist.github.com%2FBanterBoy%2Ff46265efe806b95acd6126de4dc59b04.js%22%3E%3C%2Fscript%3E" style="
    margin: 0;
    padding: 0;
    width: 100%;
    height: 500px;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 12px;
    background-color: white;
    overflow: scroll;
"></iframe>

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

#### <i class="fas fa-user-ninja" aria-hidden="true" style="color: white; margin-right:5px;"></i> Example PowerShell Profile

This example adds logic to the profile enabling you to run a particular section of your profile by pressing and holding LeftCtrl/LeftShift/None keys prior to running your PowerShell Session. Selecting one of these options will provide a different set of functions when the Shell starts. This has enabled me to separate Work and Home Functions and also load a session with the noprofile switch from within a single profile.

_If you use this example, you will need replacing_ `http://INTERNAL-EXCHANGE-URI/PowerShell/` _with your servers address._

Example PowerShell Profile

<iframe src="data:text/html;charset=utf-8,%3Cscript%20src%3D%22https%3A%2F%2Fgist.github.com%2FBanterBoy%2F65b11469a46757727ef929f3925668a6.js%22%3E%3C%2Fscript%3E" style="
    margin: 0;
    padding: 0;
    width: 100%;
    height: 500px;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 12px;
    background-color: white;
    overflow: scroll;
"></iframe>

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

<br>

#### <i class="fas fa-user-ninja" aria-hidden="true" style="color: white; margin-right:5px;"></i> Example Notes

-   _As you can see from these examples, utilising your PowerShell profile can enable you to speed up the process of using your currently saved Functions by placing them in your profile to enable them to auto-load each time you start a New Session._

-   _I would recommend that you do not run any code obtained from the internet without understanding what it will do._

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

---

## <i class="fas fa-terminal" aria-hidden="true" style="color: white; margin-right:5px;"></i> Useful Commands

```powershell
CommandType     Name                  Version    Source
-----------     ----                  -------    ------
Cmdlet          Get-Help              3.0.0.0    Microsoft.PowerShell.Core
Cmdlet          Get-Member            3.1.0.0    Microsoft.PowerShell.Utility
Cmdlet          Get-Command           3.0.0.0    Microsoft.PowerShell.Core
Function        Find-Module           2.2.3      PowerShellGet
Cmdlet          Get-Module            3.0.0.0    Microsoft.PowerShell.Core
```

There are plenty of different CmdLets, Functions and Modules to play with but there are a handful of commands that will be the most useful. Microsoft recommend that you make very good use of the help function and the PowerSHell founder [Jeff Snover][14]{:target="\_blank"}, goes so far as to say that you should master this command

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

### <i class="fas fa-sync" aria-hidden="true" style="color: white; margin-right:5px;"></i> Update PowerShell Help

When you first use PowerShell, the local copy of the PowerShell help topics when accessed for the first-time has to be downloaded. It's recommended to periodically update the help system because there can be updates to the help content from time to time. The Update-Help cmdlet is used to update the help topics. It requires internet access by default and for you to be running PowerShell elevated as an administrator.

```powershell
Running the folowing commands will download an updated version of the help files.

PS C:\> Update-Help -Force
```

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

### <i class="fas fa-medkit" aria-hidden="true" style="color: white; margin-right:5px;"></i> Get-Help

This is by far my most used command. There are a huge number of commands available in PowerShell and it would be impossible to learn them all. As PowerShell has provided a uniform way to use commands and their switches, using the help for each new command.

```powershell
Take for example, our old DOS favourite `DIR`
This command has been replaced by Get-Childitem

PS C:\GitRepos> Get-Alias -Name DIR

CommandType     Name
-----------     ----
Alias           dir -> Get-ChildItem
```

Using Get-Help, you can easily find out how to use the command by looking at examples contained within `Get-ChildItem` help.

```powershell
PS C:\> Get-Help Get-ChildItem -Examples

NAME
    Get-ChildItem

SYNOPSIS
    Gets the items and child items in one or more specified locations.


    --- Example 1: Get child items from a file system directory ---

    Get-ChildItem -Path C:\Test

    Directory: C:\Test

    Mode                LastWriteTime         Length Name
    ----                -------------         ------ ----
    d-----        2/15/2019     08:29                Logs
    -a----        2/13/2019     08:55             26 anotherfile.txt
    -a----        2/12/2019     15:40         118014 Command.txt
    -a----         2/1/2019     08:43            183 CreateTestFile.ps1
    -ar---        2/12/2019     14:31             27 ReadOnlyFile.txt
```

You may just want to view a single parameter.

```powershell
PS C:\> Get-Help Get-ChildItem -Parameter Directory

-Directory <System.Management.Automation.SwitchParameter>
    To get a list of directories, use the Directory parameter or the Attributes parameter with the Directory property. You can use the Recurse parameter with Directory .

    Required?                    false
    Position?                    named
    Default value                False
    Accept pipeline input?       False
    Accept wildcard characters?  false
```

Please experiment with `Get-Help` and read the articles below as your ability to get started with any new commands can only benefit from your practice.

<span style="font-size:15px;">
*Further reading*<br>
[Microsoft - The Help System][13]{:target="_blank"}<br>
[Microsoft - Get-Help][15]{:target="_blank"}<br>
[How To Get More Help with PowerShell Cmdlets][16]{:target="_blank"}<br>
[Using the PowerShell Help Command Get-Help][17]{:target="_blank"}
</span>

{: .text-right}
<span style="font-size:11px;"><a href="#"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a></span>

## Conclusion

If you have made it to the end of the article, well done, I hope it has been useful. There are many different things that can be achieved with PowerShell, supercharge your PowerShell Session and make those stored functions more useful.

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
[9]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy
[10]: https://devblogs.microsoft.com/scripting/powertip-change-powershell-script-execution-policy/
[11]: https://blog.itpro.tv/set-executionpolicy-powershell-cmdlet/
[12]: https://devblogs.microsoft.com/scripting/hey-scripting-guy-weekend-scripter-the-scripting-wife-sets-the-script-execution-policy/
[13]: https://docs.microsoft.com/en-us/powershell/scripting/learn/ps101/02-help-system
[14]: http://www.jsnover.com/Docs/MonadManifesto.pdf
[15]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/get-help
[16]: https://redmondmag.com/articles/2018/07/17/get-more-help-with-powershell-cmdlets.aspx
[17]: https://adamtheautomator.com/powershell-help-command-get-help/
