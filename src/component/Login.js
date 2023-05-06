// import React, { useContext, useState } from "react";
// import { TailSpin } from "react-loader-spinner";
// import { Link, useNavigate } from "react-router-dom";
// import {query, where, getDocs} from 'firebase/firestore'
// import { usersRef } from "../firebase/Firebase";
// import { Appstate } from "../App";
// import bcrypt from 'bcryptjs'
// import swal from "sweetalert";

// const Login = () => {
//   const navigate = useNavigate();
//   const useAppstate = useContext(Appstate);
//   const [form, setForm] = useState({
//     mobile: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);

//   const login = async () => {
//     setLoading(true);
//     try {
//       const quer = query(usersRef, where('mobile', '==', form.mobile))
//       const querySnapshot = await getDocs(quer);

//       querySnapshot.forEach((doc) => {
//         const _data = doc.data();
//         const isUser = bcrypt.compareSync(form.password, _data.password);
//         if(isUser) {
//           useAppstate.setLogin(true);
//           useAppstate.setUserName(_data.name);
//           new swal({
//             title: "Logged In",
//             icon: "success",
//             buttons: false,
//             timer: 3000
//           })
//           navigate('/')
//           // console.log(quer)
//         } else {
//           new swal({
//             title: "Invalid Credentials",
//             icon: "error",
//             buttons: false,
//             timer: 3000
//           })
//         }
//       })
//     } catch (error) {
//       swal({
//         title: error.message,
//         icon: "error",
//         buttons: false,
//         timer: 3000
//       })
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="w-full flex flex-col mt-8 items-center">
//       <h1 className="text-xl font-bold">Login</h1>
//       <div class="p-2 w-full md:w-1/3">
//         <div class="relative">
//           <label for="message" class="leading-7 text-sm text-gray-300">
//             Mobile No.
//           </label>
//           <input
//             type={"number"}
//             id="message"
//             name="message"
//             value={form.mobile}
//             onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//             class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//           />
//         </div>
//       </div>
//       <div class="p-2 w-full md:w-1/3">
//         <div class="relative">
//           <label for="message" class="leading-7 text-sm text-gray-300">
//             Password
//           </label>
//           <input
//             id="message"
//             name="message"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//           />
//         </div>
//       </div>
//       <div class="p-2 w-full">
//         <button
//         onClick={login}
//           class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
//         >
//           {loading ? <TailSpin height={25} color="white" /> : "Login"}
//         </button>
//       </div>
//       <div>
//         <p>Do not have account? <Link to={'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../firebase/Firebase";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  
  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);
  
      let isUserFound = false;
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          isUserFound = true;
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
        }
      })
  
      if (isUserFound) {
        swal({
          title: "Logged In",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        navigate('/')
      } else {
        swal({
          title: "Invalid Credentials",
          icon: "error",
          buttons: false,
          timer: 3000
        })
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <h1 className="text-xl font-bold">Login</h1>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="mobile" class="leading-7 text-sm text-gray-600">
            Mobile No.
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="name"
            name="name"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full">
        <button
          onClick={login}
          class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>
          Do not have an account?{" "}
          <Link to={"/signup"}>
            {" "}
            <span className="text-blue-500 cursor-pointer">SignUp</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
