---
layout: single
title: "PSCovid19Stats"
excerpt: "A PowerShell Module used to extract data from the NovelCOVID API"
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/covid19-image.png
toc: true
toc_label: Contents
toc_icon: book-medical
toc_sticky: true
categories:
  - Blog
  - PowerShell
tags:
  - COVID
  - Module
  - PowerShell
---

# <i class="fas fa-head-side-mask" aria-hidden="true" style="color: white; margin-right:5px;"></i> Overview

A PowerShell Module that can be used to extract data from the NovelCOVID API (github.com/NovelCOVID/API). ![image-left](/assets/images/postman-logo-small.png){: .align-left} The API has been supplied by Postman as part of the ***"Postman COVID-19 API Resource Center"***. Click [here][1]{:target="_blank"} to view the Postman Resource Centre.

> "During the present novel coronavirus (COVID-19) pandemic, those on the front lines—including health care professionals, researchers, and government experts—need quick, easy access to real-time critical data. This type of information exchange is what APIs do best, and as an API-first company, Postman is committed to providing whatever assistance we can in this area."

# <i class="fas fa-laptop-code" aria-hidden="true" style="color: white; margin-right:5px;"></i> Creating a Module

I decided to create this module after reading the [blog post - COV-ID-19 PowerShell Prompt][2]{:target="_blank"} that popped up in the random click-fest of reading everything about the coronavirus. Perhaps too much time stuck indoors obsessing about what is happening around the world. Their idea was quite inspirational and resulted in the following when launching a new PowerShell Session.

![CovidPrompt](https://www.powershell.co.at/wp-content/uploads/2020/03/CovId19Prompt.png)

## Why?

The article and instructions were very simple but IMHO there were a few too many steps to follow and I wanted to make the module more accessible and if possible, provide more functionality in doing so.

After some more research but focussing on any available API's, I found that PostMan had provided a huge collection of API's in an attempt to make it quick and easy access to real-time critical data.

![PostMan Collection](/assets/images/postman-logo-small.png) [PostMan Collection][3]{:target="_blank"}

## <i class="fas fa-question" aria-hidden="true" style="color: white; margin-right:5px;"></i>How?

Having looked through the documentation for several API's, I decided on using the [NovelCOVID API][4]{:target="_blank"} as this appeared to have all the extra features I was looking for. A combination of the [API documentation and Postman][5]{:target="_blank"}, made creating the PowerShell module relatively easy.

# Give it a Spin

To make this more accessible and easy to install, I uploaded the module to the [PowerShell Gallery][6]{:target="_blank"}. This will also make it much easier for everyone to update, should any changes be made to the Module. Anyone new to this method, should check out my post on the [gallery](/blog/powershell/Its-official-I-am-old/)

## Installation

With this in mind, you now have two options when it comes to installation.

### <i class="fas fa-images" aria-hidden="true" style="color: white; margin-right:5px;"></i>1) Install Module from Gallery

<https://www.powershellgallery.com/packages/PSCovid19Stats>

```powershell
Install-Module -Name PSCovid19Stats
or
Install-Module -Name PSCovid19Stats -Scope CurrentUser
```

### <i class="fas fa-download" aria-hidden="true" style="color: white; margin-right:5px;"></i>2) Download from GitHub

You can check out the code on GitHub by viewing the [PSCovidStats repository][7]{:target="_blank"}

Alternatively, you can download the repository directly from this [link][8]{:target="_blank"}

#### Import the Module

Once you've downloaded the repo place the PSCovid19Stats folder in any path in your ``$PSModulePath``. I recommend copying it to either ``C:\Program Files\WindowsPowerShell\Modules`` or ``C:\Users\<Username>\Documents\WindowsPowerShell\Modules``.

Once it's in one of those paths you can either import it manually by ``Import-Module PSCovid19Stats`` or rely on auto-module loading.

## Once Installed

After you have installed and imported the module, you can use the following command to view all of the commands available within this module.

```powershell
PS C:\GitRepos> Get-Command -Module PSCovid19Stats

CommandType     Name                         Version    Source
-----------     ----                         -------    ------
Function        Get-CovidCountriesStats      1.0.3      PSCovid19Stats
Function        Get-CovidCountryStats        1.0.3      PSCovid19Stats
Function        Get-CovidHistoricalData      1.0.3      PSCovid19Stats
Function        Get-CovidjhucsseData         1.0.3      PSCovid19Stats
Function        Get-CovidStateStats          1.0.3      PSCovid19Stats
Function        Get-CovidWorldStats          1.0.3      PSCovid19Stats
Function        Show-CountryCodes            1.0.3      PSCovid19Stats
```

I added the option to display a list of country codes as there are 249 in the [ISO Standard][9]{:target="_blank"}. **Get-CovidCountryStats**, generates the list of countries dynamically from the JSON made available at the [DataHub resource][10]{:target="_blank"}, enabling you to use tab complete to select the relevant country. This same resource is used in **Show-CountryCodes** to output a complete list of countries and their codes.

![Tab Complete](https://psciscomeraki.lukeleigh.com/assets/images/CountryTabComplete.png)

![COVID-19 Example](https://psciscomeraki.lukeleigh.com/assets/images/pscovidscrnsht.png)

Update - I have updated the module to include Comment Based Help
{: .notice}

***Example***

```powershell
PS C:\GitRepos> Get-Help Get-CovidCountryStats

NAME
    Get-CovidCountryStats

SYNOPSIS
    Command used to extract data (Country Stats) from the NovelCOVID API
    (github.com/NovelCOVID/API)

SYNTAX
    Get-CovidCountryStats -Country <String> [<CommonParameters>]

DESCRIPTION
    Command used to extract data (Country Stats) from the NovelCOVID API
    (github.com/NovelCOVID/API)
    Returns data of a specific country.

RELATED LINKS
    https://github.com/BanterBoy/PSCovid19Stats/wiki/Get-CovidCountryStats

REMARKS
    To see the examples, type: "get-help Get-CovidCountryStats -examples".
    For more information, type: "get-help Get-CovidCountryStats -detailed".
    For technical information, type: "get-help Get-CovidCountryStats -full".
    For online help, type: "get-help Get-CovidCountryStats -online"
```

[License](/LICENSE)

{: .text-center}
<a href="#" class="btn btn--info btn--small">Back to Top</a>

[1]: https://covid-19-apis.postman.com/
[2]: https://www.powershell.co.at/cov-id-19-powershell-prompt/
[3]: https://covid-19-apis.postman.com/
[4]: https://github.com/NovelCOVID/API
[5]: https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest
[6]: https://www.powershellgallery.com
[7]: https://github.com/BanterBoy/PSCovid19Stats
[8]: https://github.com/BanterBoy/PSCovid19Stats/archive/master.zip
[9]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[10]: https://datahub.io/core/country-list

