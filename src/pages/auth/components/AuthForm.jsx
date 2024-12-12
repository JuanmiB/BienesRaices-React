import React from 'react';

const AuthForm = ({ title, children, onSubmit }) => {
  return (
    <div className="py-10 flex flex-col items-center md:block">
      <h1 className="text-4xl my-10 font-extrabold text-center">
        Bienes <span className="font-normal">Raices</span>
      </h1>
      <section className="mt-8 mx-auto max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg">
          <h2 className="text-lg font-bold text-center">{title}</h2>
          <form className="space-y-5" onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;