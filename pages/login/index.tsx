import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../_app";

interface LoginDetails {
  username: string;
  password: string;
}

export const Index: React.FC = () => {
  const router = useRouter();
  const { setUser } = useContext<{
    user: LoginDetails;
    setUser: (user: LoginDetails) => {};
  }>(UserContext);

  const [formState, setFormState] = useState<LoginDetails>({
    username: "",
    password: "",
  });

  const onFormDataChanged = (e) => {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleLogin = () => {
    const { username, password } = formState;
    if (username === "admin" && password === "admin") {
      setUser(formState);
      const returnUrl = router.query.returnUrl || "/";
      router.push({ pathname: returnUrl as string });
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="app-form">
          <p>Welcome</p>
          <input
            name="username"
            type="username"
            placeholder="Username"
            onChange={onFormDataChanged}
          />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onFormDataChanged}
          />
          <br />
          <input type="button" value="Sign in" onClick={handleLogin} />
          <br />
          <a href="#">Forgot Password?</a>
        </div>

        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
