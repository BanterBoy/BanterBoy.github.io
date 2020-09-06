---
layout: single
title: "Post Template"
excerpt: "Page style and content will likely change due to testing"
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
  teaser: /assets/images/default-teaser-image.png
classes: wide
date: 2020-01-01T08:30:00
last_modified_at: 2020-08-27T08:30:00
categories:
  - Template
tags:
  - 
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

# <icon class="fas fa-book"></icon> Some Guide

PowerShell 5.1 is the first version to come in two editions of "Desktop" and "Core". The "Desktop" edition is the continuation of the traditional Windows PowerShell that runs on full .NET Framework stack. The "Core" edition runs on .NET Core and is bundled with Windows Server 2016 Nano Server. In exchange for smaller footprint, the latter lacks some features such as the cmdlets to manage clipboard or join a computer to a domain, WMI version 1 cmdlets, Event Log cmdlets and profiles. This was the final version of PowerShell made exclusively for Windows.
Cmdlets are specialized commands in the PowerShell environment that implement specific functions. These are the native commands in the PowerShell stack. Cmdlets follow a Verb-Noun naming pattern, such as Get-ChildItem, helping to make them self-descriptive.

Here is a link to [PowerShell Gallery][1]{:target="_blank"}

Modules allow script developers and administrators to partition and organize their Windows PowerShell code in self-contained, reusable units. Code from a module executes in its own self-contained context and does not affect the state outside of the module. Modules also enable you to define a restricted runspace environment by using a script.

PowerShell implements the concept of a pipeline, which enables piping the output of one cmdlet to another cmdlet as input. For example, the output of the Get-Process cmdlet could be piped to the Where-Object to filter any process that has less than 1 MB of paged memory, and then to the Sort-Object cmdlet (e.g., to sort the objects by handle count), and then finally to the Select-Object cmdlet to select just the first 10 (i.e., the 10 processes based on handle count).

Because all PowerShell objects are .NET objects, they share a .ToString() method, which retrieves the text representation of the data in an object. In addition, PowerShell allows formatting definitions to be specified, so the text representation of objects can be customized by choosing which data elements to display, and in what manner. However, in order to maintain backwards compatibility, if an external executable is used in a pipeline, it receives a text stream representing the object, instead of directly integrating with the PowerShell type system.

Object members can be accessed using . notation, as in C# syntax. PowerShell provides special variables, such as $args, which is an array of all the command line arguments passed to a function from the command line, and $_, which refers to the current object in the pipeline.

PowerShell allows any .NET methods to be called by providing their namespaces enclosed in brackets ( For example,
::WriteLine("PowerShell").
Objects are created using the New-Object cmdlet. Calling methods of .NET objects is accomplished by using the regular . notation.

PowerShell accepts strings, both raw and escaped. A string enclosed between single quotation marks is a raw string while a string enclosed between double quotation marks is an escaped string. PowerShell treats straight and curly quotes as equivalent.

For error handling, PowerShell provides a .NET-based exception-handling mechanism. In case of errors, objects containing information about the error (Exception object) are thrown, which are caught using the try ... catch construct (although a trap construct is supported as well). PowerShell can be configured to silently resume execution, without actually throwing the exception; this can be done either on a single command, a single session or perpetually.

The PowerShell scripting language supports binary prefix notation similar to the scientific notation supported by many programming languages in the C-family.

<details>
<summary>Heading</summary>
<ul>
<li> markdown list 1</li>
<ul>
<li> nested list 1</li>
<li> nested list 2</li>
</ul>
<li> markdown list 2</li>
</ul>
</details>

Object members can be accessed using . notation, as in C# syntax. PowerShell provides special variables, such as $args, which is an array of all the command line arguments passed to a function from the command line, and $_, which refers to the current object in the pipeline.
{: .notice}

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.


{: .text-center}
<a href="#" class="btn btn--info btn--small"><i class="fas fa-caret-up" aria-hidden="true" style="color: white; margin-right:5px;"></i>Back to Top</a>

[1]: http://powershellgallery.com

