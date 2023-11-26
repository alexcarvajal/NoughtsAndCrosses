import { useState } from "react"
import { DefaultLayout } from "../layout/Layout"
import { useAuth } from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/constants"
import { AuthResponseError } from "../types/types"


const SignUp = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorResponse, setErrorResponse] = useState("")
  const auth = useAuth()
  const goTo= useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      })
      if (response.ok) {
        console.log("User created correctly")
        setErrorResponse("")
        goTo("/")
      }
      else {
        console.log("Error creating user")
        const json = await response.json() as AuthResponseError
        setErrorResponse(json.body.error)
        return
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-full lg:py-0">
        <section className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8" >
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign Up</h1>
                {!!errorResponse && <p className="bg-red-200 text-red-700 p-2.5">{errorResponse} </p>}
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create user</button>
            </form>
          </div>

        </section>
      </div>
    </DefaultLayout>
  )
}

export default SignUp