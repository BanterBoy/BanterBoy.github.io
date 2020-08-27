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
    placeholder="your@email.com"
>
<textarea
    type="text"
    name="content"
    rows="10"
    placeholder="What's on your mind?"
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
    fontFamily: "Roboto";
    fontSize: "0.75em";
    width: 100%;
    border-style: transparent;
    border-width: 3px;
    border-radius: 3px;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
    outline-color: #808080;
    transition: box-shadow .2s ease;
    vertical-align: middle;
}

form.wj-contact input[type="submit"] {
    background-color: #b6c6e3;
    border: 3px solid transparent;
    border-radius: 3px;
    color: #ffffff;
    fontFamily: "Roboto";
    fontSize: "0.50em";
    height: 50%;
    outline: none;
    margin: 0.3em 0 0 0;
    padding: 0.3em;
}
</style>
