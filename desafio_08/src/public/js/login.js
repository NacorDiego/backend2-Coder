const form = document.getElementById('login_form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const obj = {
    email: form.email.value,
    password: form.password.value,
  };

  fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(result => {
    if (result.status === 200) {
      window.location.replace('/');
    } else {
      console.error('Correo o contraseña incorrectos.');
    }
  });
});
