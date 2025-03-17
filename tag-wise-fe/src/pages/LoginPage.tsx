import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <div className="relative bg-white h-screen">
      <div className="mx-auto max-w-8xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-20 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <img
              alt="Concentrix"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeJhkP_dt5zB6XcJfi0h9rM4BRwvMHJd6Pg&s"
              className="h-11"
            />

            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
              TagWise Management
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TagWise Management is a powerful, integrated, and secure tag
              management system that allows Operations Team 24/7 to easily
              manage and audit Adobe tags
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={handleLogin}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
