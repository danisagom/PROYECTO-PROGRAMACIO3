const ValidationsLogin = ({ email, password, confirmPassword }) => {
  const errores = {};

  if (!email || !email.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errores.email = "El email no es válido";
  }

  if (!password || !password.trim()) {
    errores.password = "La contraseña es obligatoria";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    errores.password = "Mínimo 8 caracteres, incluyendo letras y números";
  }

  if (confirmPassword !== undefined) {
    if (!confirmPassword.trim()) {
      errores.confirmPassword = "Confirmar contraseña es obligatorio";
    } else if (password !== confirmPassword) {
      errores.confirmPassword = "Las contraseñas no coinciden";
    }
  }

  return errores;
};

export default ValidationsLogin;
