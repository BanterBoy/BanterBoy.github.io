---
permalink: /contact-form.html
title: "Contact Me!"
excerpt: "Please fill in the form below"
classes: wide
header:
  overlay_image: /assets/images/hangout_snapshot_Pencil.jpg
  overlay_filter: rgba(90, 104, 129, 0.7)
---

<!-- 
     After implementing this contact form make sure
     1. you have defined "email: youremail@email.com" in _config.yml file.
     2. you verify your form on formspree.io.
-->

<form
    class="wj-contact"
    action="https://formspree.io/xvowjgjd"
    method="POST"
>

<input
    type="text"
    name="email"
    placeholder="Email Address"
>
<textarea
    type="text"
    name="content"
    rows="10"
    placeholder="Message"
></textarea>
<input
    type="hidden"
    name="_next"
    value="<REDIRECTION LINK> "
    >
<input
    type="hidden"
    name="_subject"
    value="New Contact Form Submission">
<input
    type="text"
    name="_gotcha"
    style="display:none"
>
<input
    type="submit"
    value="Submit"
>

<style>
form.wj-contact input[type="text"], form.wj-contact textarea[type="text"] {
    width: 100%;
    vertical-align: middle;
    margin-top: 0.2em;
    margin-bottom: 0.5em;
    padding: 0.5em;
    font-family: monospace, sans-serif;
    font-weight: lighter;
    border-style: transparent;
    outline-color: #2e83e6;
    border-width: 1px;
    border-radius: 1px;
    transition: box-shadow .2s ease;
}

form.wj-contact input[type="submit"] {
    outline: none;
    color: white;
    background-color: #2e83e6;
    border-radius: 3px;
    padding: 0.2em;
    margin: 0.1em 0 0 0;
    border: 1px solid transparent;
    height: auto;
}
</style>
