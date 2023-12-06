import React from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate  } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const Login = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        FullName: yup.string().required(" *Full Name"),
        password: yup.string().required(" *Password"),
    });
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    async function chack() {
        let user=document.getElementById("name").value;
        let password1=document.getElementById("password").value;
       fetch(`http://localhost:4000/users?username=${user}&website=${password1}`)
        .then((response) => response.json())
        .then((data) => {
            const user = data[0];
          if (data.length !== 0) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate(`/Home/${user.id}`);
          } })
    }
    return (
        <div className='contact'>
            <form onSubmit={handleSubmit(chack)} >
                <input type="text" placeholder='enter your Name' id='name'{...register("FullName")} /><br/>
                <input type="password" placeholder='password' id='password'{...register("password")} /><br/>
                <input type="submit"{...register("submit")} className='submit' />
            </form>





        </div>
    )
}
export default Login;
