// import axios from 'axios';
// import './authorization.style.css';


// const onSubmitForm = async (event)=>{
//     event.preventDefault();
//     const loginForm = event.target.closest('#loginForm');
//     const userName = loginForm.querySelector('#username').value;
//     const password = loginForm.querySelector('#password').value;
//     console.log(userName,password);
//     try{
//         const res = await axios({
//             method:'POST',
//             url:'http://localhost:5000/v1/users/login',
//             data:{
//                 username:userName,
//                 password
//             }
//         })
//         console.log(res);

//         if(res.status == 200){
//             document.cookie=`jwt=${res.data.token}`
//             window.location.href = "http://localhost:3000/"
//         }
//     }catch{
//         alert('username or password is wrong, try again!');
//     }
// }

// export const Authorization = ()=>{
//     return (
//         <div>
//             <form id="loginForm" onSubmit={onSubmitForm}>
//                 <input id="username" type="text" />
//                 <input  type="password" name="" id="password" />
//                 <input type="submit" />
//             </form>
//         </div>
//     )
// }