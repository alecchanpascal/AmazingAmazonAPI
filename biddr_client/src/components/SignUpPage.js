import React from "react";
import {User} from "./routes";

const SignUpPage = props => {
  const { onSignUp } = props;

  const handleSubmit = event => {
    event.preventDefault();
    const { currentTarget: form } = event;
    const fd = new FormData(form);

    const newUser = {
      first_name: fd.get("first_name"),
      last_name: fd.get("last_name"),
      email: fd.get("email"),
      password: fd.get("password"),
      password_confirmation: fd.get("password_confirmation")
    };

    User.create(newUser).then(response => {
      if (response.id) {
        onSignUp();
        props.history.push("/auctions");
      }
    });
  };

  return (
    <main className="ui clearing segment Page">
      <h1>Sign Up</h1>
      <form className="ui large form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div className="field">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="field">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <button className="ui right floated orange button" type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
};

export default SignUpPage