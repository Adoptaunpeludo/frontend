import { postData } from "../../api/client";


export const login = async (credentials) => {
    console.log(credentials);
    try {
        const response = await postData('/api/auth/login', credentials)
        
        if (response.status === 200) {

            console.log("Login successful");
        }


    } catch (error) {
        console.log(error.message);
    }

//  try {
//    const res = await fetch(
//      "https://backend.adoptaunpeludo.com/api/auth/register"
//    );
//  } catch (error) {
//    console.error("Error en el inicio de sesión:", error);
//    throw error;
//  }
};

export const logout = async () => {
  return Promise.resolve().then(() => {});
};
