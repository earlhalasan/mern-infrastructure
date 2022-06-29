import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  // alternatively props above
  return (
    <main>
      <h1>Auth Page</h1>
      {/* // alternately props.setUser in {} */}
      <SignUpForm setUser={setUser} />
      <LoginForm setUser={setUser} />
    </main>
  );
}
