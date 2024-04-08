// const form = document.getElementById('register_form');

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   const obj = {
//     first_name: form.first_name.value,
//     last_name: form.last_name.value,
//     email: form.email.value,
//     age: form.age.value,
//     password: form.password.value,
//   };

//   fetch('/api/sessions/register', {
//     method: 'POST',
//     body: JSON.stringify(obj),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }).then(result => {
//     if (result.status === 201) window.location.replace('/api/users/login');
//     else console.log('No se pudo realizar el registro.');
//   });
// });
