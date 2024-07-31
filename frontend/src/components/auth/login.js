import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();
 
   const handleSubmit = async (event) => {
     event.preventDefault();
     setError('');
     try {
       const response = await api.post('auth/jwt/create/', {
         email,
         password,
       });
       localStorage.setItem('access_token', response.data.access);
       localStorage.setItem('refresh_token', response.data.refresh);
       api.defaults.headers.common['Authorization'] = `JWT ${response.data.access}`;
       navigate('/'); 
     } catch (error) {
       console.error('Login error', error);
       setError('wrong pass or email');
     }
   };
 
   return (
     <div>
       <h2>Вход</h2>
       {error && <p style={{color: 'red'}}>{error}</p>}
       <form onSubmit={handleSubmit}>
         <div>
           <label htmlFor="email">Email:</label>
           <input
             id="email"
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>
         <div>
           <label htmlFor="password">Pass:</label>
           <input
             id="password"
             type="password"
             placeholder="Pass"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
         </div>
         <button type="submit">Login</button>
       </form>
     </div>
   );
 };

export default Login;
