"use client";
export function AuthPage({ isSign }: { isSign: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded-2xl">
        <div className="p-2">
          <input type="text" placeholder="Email"></input>
        </div>
        <div className="p-2">
          <input type="password" placeholder="Password"></input>
        </div>
        <div className="pt-2">
          <button onClick={() => {}}>{isSign ? "Signin" : "Sign up"}</button>
        </div>
      </div>
    </div>
  );
}
