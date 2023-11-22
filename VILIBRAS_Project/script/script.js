function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
  
    fullName.textContent = data.name
    sub.textContent = data.sub
    given_name.textContent = data.given_name
    family_name.textContent = data.family_name
    email.textContent = data.email
    verifiedEmail.textContent = data.email_verified
    picture.setAttribute("src", data.picture)
  }
  



  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "218193870614-qeina7unn9k0oubqi6ac0scf74u3d0kk.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), {
      theme: "filled_black",
      size: "large",
      type: "standard",
      shape: "pill",
      locale: "pt-BR",
      logo_alignment: "left",
    } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

  }
window.addEventListener('load', function() {
    const foto = document.getElementById('foto');
    foto.style.transform = 'scale(2) rotate(345deg)';
});

window.addEventListener("load", function() {
  document.body.classList.add("blend-effect");
})

  