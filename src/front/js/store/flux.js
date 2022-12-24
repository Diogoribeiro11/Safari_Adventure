const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      datos: null,
      data: {},
      status: "",
      usuarios: [],
      user: {},
      packages: [],
      packagesDetails: null,
    },
    actions: {
      //-----------------------------------------------------------------------------------------------------------------------------
      //											 EXAMPLE FUNCTION
      //-----------------------------------------------------------------------------------------------------------------------------

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET USERS
      //-----------------------------------------------------------------------------------------------------------------------------

      getUsers: async () => {
        await fetch(
          "https://3001-logedi-safariadventure-51bcqx5vtpw.ws-eu80.gitpod.io/user"
        )
          .then((response) => response.json())
          .then((data) => console.log(data))
          .then((data) => setStore({ usuarios: data }))
          .catch((error) => console.log("error", error));
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 USER DETAILS
      //-----------------------------------------------------------------------------------------------------------------------------

      //Detalle user
      // verDetalle: async id => {
      // 	await fetch(`https://3001-logedi-safariadventure-51bcqx5vtpw.ws-eu80.gitpod.io/users/${id}`)
      // 		.then(response => response.json())
      // 		.then(data => {
      //       console.log(data)
      // 			setStore({ user: data })
      // 		})
      // 		.catch(error => console.log("error", error));
      // },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 LOGIN POST
      //-----------------------------------------------------------------------------------------------------------------------------

      setLogin: async (loginInfo) => {
        await fetch(
          "https://3001-logedi-safariadventure-51bcqx5vtpw.ws-eu80.gitpod.io/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            sessionStorage.setItem("token", data.token);
            setStore({ datos: data });
            console.log("From Flux", data);
          })
          .catch((error) => console.log("error", error));
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 GET PRIVATE DATA
      //-----------------------------------------------------------------------------------------------------------------------------

      privateData: async (id) => {
        try {
          const store = getStore();
          await fetch(
            `https://3001-logedi-safariadventure-51bcqx5vtpw.ws-eu80.gitpod.io/users/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.datos?.token}`,
              },
            }
          )
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setStore({ user: data });
            });
        } catch (error) {
          console.log("error", error);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 TOKEN
      //-----------------------------------------------------------------------------------------------------------------------------

      getToken: () => {
        const token = sessionStorage.getItem("token");
        if (token && token !== "" && token !== undefined) {
          setStore({ datos: token });
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 LOG OUT
      //-----------------------------------------------------------------------------------------------------------------------------

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ datos: null });
        //history.push('/')
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											 REGISTER POST
      //-----------------------------------------------------------------------------------------------------------------------------

      setRegister: (signupData) => {
        fetch(
          "https://3001-logedi-safariadventure-51bcqx5vtpw.ws-eu80.gitpod.io/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          }
        )
          .then((response) => response.json())
          //.then(result => console.log(result))
          .catch((error) => {
            console.log("Reg error", error);
          });
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											PACKAGES FUNCTION
      //-----------------------------------------------------------------------------------------------------------------------------

      getPackages: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "/packages");
          const data = await response.json();
          setStore({
            packages: data,
          });
        } catch (err) {
          console.log(err);
        }
      },

      //-----------------------------------------------------------------------------------------------------------------------------
      //											PACKAGES DETAILS FUNCTION
      //-----------------------------------------------------------------------------------------------------------------------------

      getPackagesDetails: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/packages/" + id
          );
          const data = await response.json();
          setStore({
            packagesDetails: data,
            packagesId: data.id,
          });
          return store.packagesId;
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
};

export default getState;
