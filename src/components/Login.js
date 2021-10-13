import React from 'react';

const Login = (props) => {

    const {email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSingup,
        hasAccount,
        setAccount,
        emailError,
        passwordError}= props;

    return (
        <div className="login">
            <div className="loginContainer">
            <label>Usuario</label>
            <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
            <p className="errorMsg">{emailError}</p>

            <label>Contraseña</label>
            <input
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <p className="errorMsg">{passwordError}</p>


            <div className="btnContainer">
                {hasAccount ?(
                    <>
                    <button onClick={handleLogin}>Iniciar sesión</button>
                    <p>¿No tienes una cuenta? <span onClick={()=>setAccount(!hasAccount)}>Crear una</span></p>
                    </>
                ) : (
                <>
                    <button onClick={handleSingup}>Crear cuenta</button>
                    <p>¿Ya tienes una cuenta? <span onClick={()=>setAccount(!hasAccount)}>Iniciar sesión</span></p>
                    </>
                )
                }

            </div>
            </div>
            <div className="loginContainerForm"></div>
        </div>
      );
}
 
export default Login;