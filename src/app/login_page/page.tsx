'use client'

import React, { useEffect } from 'react'
import {toast} from 'react-toastify'
import { useFormik } from 'formik'
import axios from 'axios'
import { loginValidationSchema } from '../Schemas/login_validation_schema';
import useAuthStore from '@/store/use_auth_store';
import { useState } from 'react'
import { useRouter} from 'next/navigation'

export default function login_page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const {setAuthStore, objectId} = useAuthStore()

  const handleLoginAccount = async (username: string, password: string) => {
    try{
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/api/auth/login',{
    username: username,
      password: password,
    });
    console.log(response?.data?.data?.email);
    // Mentrigger method 'setAuthStore dan mengirimkan argument email yang didapat dari response login
    setAuthStore({
      _objectId: response?.data?.data?.objectId,
      _username: response?.data?.data?.name,
      _email: response?.data?.data?.email,
    });
    toast.success('Login account successfully!')
    router.push('/');
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  const onSessionLoginAccount = async () => {
    const response = await axios.post('http://localhost:3000/api/auth/session_login',
      {
        objectId,
      }
    );

    setAuthStore({
      _objectId: response?.data?.data?.objectId,
      _username: response?.data?.data?.name,
      _email: response?.data?.data?.email
    })
  }

  const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: loginValidationSchema,
      onSubmit: (values) => {handleLoginAccount(values?.username, values?.password);

      },
  });

  // ComponentDidUpdate
  useEffect(() => {
    /*
      useEffect disini dipanggil 2x saat halaman pertama kali diakses, dan saat
      objectId useAuthStore terisi dari localStorage.

      Maka untuk menghindari pemanggilan onSessionLoginAccount 2x, diberi pengkondisian.
      Sehingga onSessionLoginAccount baru dipanggil ketika objectId nya sudah terisi
    */
   console.log('useEffect:::');
   if(objectId){
    onSessionLoginAccount();
   }
  })
  
  return (
    <div className='flex justify-center p-10'>
      <div className='w-[500px]'>
        <h1 className='text-2xl font-bold '>Login Account</h1>
        <form 
        onSubmit={formik?.handleSubmit}>
          <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>What is your name?</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type here'
                name='username'
                onChange={formik?.handleChange}
                value={formik?.values?.username}
              />
              <p className='label'>Optional</p>
            </fieldset>
            <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>What is your name?</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type here'
                name='password'
                onChange={formik?.handleChange}
                value={formik?.values?.password}
              />
              <p className='label'>Optional</p>
            </fieldset>
            <button 
            type='submit'
            disabled={isLoading}
            className='btn btn-outline mt-5'>Login Account</button>
        </form>
      </div>
    </div>
  )
}
