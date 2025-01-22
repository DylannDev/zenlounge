import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
  return (
    <section className="max-w-[550px] w-full mx-auto py-20 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue !</h1>
        <p className="text-center text-blue-light mb-6">
          Connectez-vous ou créez un compte pour réserver vos prestations.
        </p>
      </div>
      <AuthForm />
    </section>
  );
};

export default LoginPage;
