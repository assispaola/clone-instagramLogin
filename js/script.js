const init = () => {


  // validação input email
  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = regex.test(input.value);

    // condição de validação do email
    if (!emailTest) {
      submitLogin.setAttribute('disabled', 'disabled');
      inputEmail.classList.add('error');
    } else {
      submitLogin.removeAttribute('disabled');
      inputEmail.classList.remove('error');
    }
  }

  // validaçãp input senha
  const validateSenha = (event) => {
    const input = event.currentTarget;

    // condição de validação da senha
    if (input.value.length < 8) {
      submitLogin.setAttribute('disabled', 'disabled');
      inputSenha.classList.add('error');
    } else {
      submitLogin.removeAttribute('disabled');
      inputSenha.classList.remove('error');
    }
  }


  // variáveis de inputs
  const inputEmail = document.querySelector('.email');
  const inputSenha = document.querySelector('.password');
  const submitLogin = document.querySelector('.btn-login')


  // chamando o evento validação email
  inputEmail.addEventListener('input', validateEmail);
  // chamando o evento validação senha
  inputSenha.addEventListener('input', validateSenha);

  // variável p/ texto status de erro na validação
  const errorHandler = () => {
    submitLogin.classList.remove('sucess');
    submitLogin.textContent = "⚠️ Invalid email or password"
  }

  // variável p/ texto status de sucesso na validação
  const succesHandler = () => {
    submitLogin.classList.add('sucess');
    submitLogin.classList.remove('error');
    submitLogin.textContent = "✅ Sucess Login"
  }




  if (submitLogin) {
    submitLogin.addEventListener('click', (event) => {
      event.preventDefault();

      submitLogin.textContent = "...LOADING"

      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail.value,
          password: inputSenha.value,
        })

      }).then((response) => {
        if(response.status !== 200) {
          errorHandler();
        } else {
          succesHandler();
        }
      }).catch(() => {
        errorHandler();
      }) 
    })

  }
}

window.onload = init;