// Expresión regulares para validar los campos
const nombreApellidoRegex = /^[A-Za-zÁ-Úá-ú]+$/; // Solo letras y acentos
const cedulaRegex = /^\d+$/; // Solo números
const passwordRegex = /^\d{12,}$/; // Al menos 12 números

// Seleccionar los elementos del formulario
const createUserForm = document.querySelector("#form-register");
const createNameInput = document.querySelector("#create-name-input");
const createLastnameInput = document.querySelector("#create-lastname-input");
const createCedulaInput = document.querySelector("#create-id-input");
const createCelularInput = document.querySelector("#create-phone-input");
const createEmailInput = document.querySelector("#create-Email-input");
const createUsernameInput = document.querySelector("#create-username-input");
const createPasswordInput = document.querySelector("#create-password-input");

// Agregar el event listener al formulario
createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Validar que no haya campos vacíos
  if (
    !createNameInput.value ||
    !createLastnameInput.value ||
    !createCedulaInput.value ||
    !createCelularInput.value ||
    !createEmailInput.value ||
    !createUsernameInput.value ||
    !createPasswordInput.value
  ) {
    alert("Por favor, complete todos los campos");
    return;
  } else {
    // Validar nombre y apellido
    if (!nombreApellidoRegex.test(createNameInput.value) || !nombreApellidoRegex.test(createLastnameInput.value)) {
      alert("Nombre y apellido deben contener solo letras");
      return;
    }

    // Validar cédula
    if (!cedulaRegex.test(createCedulaInput.value)) {
      alert("La cédula debe contener solo números");
      return;
    }

    // Validar contraseña
    if (!passwordRegex.test(createPasswordInput.value)) {
      alert("La contraseña debe contener al menos 12 números");
      return;
    }

    try {
      const newUser = {
        nombre: createNameInput.value,
        apellido: createLastnameInput.value,
        cedula: createCedulaInput.value,
        celular: createCelularInput.value,
        correo: createEmailInput.value,
        usuario: createUsernameInput.value,
        password: createPasswordInput.value,
        verified: false
      };

      console.log(newUser);

      // Envío de la información del usuario a través de Axios
      axios
        .post("https://chicharronera.onrender.com/newuser", newUser)
        .then((info) => {
          if (info.status && info.status == 201) {
            location.href = '../iniciarsesion/index.html'
          }
        })
        .catch((e) => {
          if (e.response && e.response.status == 404) {
            alert('Este usuario ya existe!');
          }
          console.log(e);
        });

    } catch (error) {
      // Mostrar mensaje de error
      alert("Error al registrar el usuario");
      console.log(error);
    }
  }
});