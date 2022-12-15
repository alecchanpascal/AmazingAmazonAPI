import React, { useState } from 'react';
import {Session} from "./routes";

const SignInPage = props => {
  const [state, setState] = useState({
    errors: []
  })

  const createSession = (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);

    Session.create({
      email: fd.get("email"),
      password: fd.get("password")
    }).then(data => {
      if (data.status === 404) {
        setState({
          errors: [{ message: "Wrong email or password" }]
        });
      } else {
        props.history.push("/auctions");
        if (typeof props.onSignIn === "function") {
          props.onSignIn();
        }
      }
    });
  }

  const { errors } = state;
  return (
    <div className="ui clearing segment Page">
      <h1 className="ui center aligned header">Sign In</h1>
      <div className="ui divider" />
      <form className="ui large form" onSubmit={createSession}>
        {errors.length > 0 ? (
          <div className="ui negative message">
            <div className="header">Failed to Sign In</div>
            <p>{errors.map(e => e.message).join(", ")}</p>
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="email">Email</label> <br />
          <input type="email" name="email" id="email" required />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label> <br />
          <input type="password" name="password" id="password" required />
        </div>

        <input
          className="ui right floated large orange button"
          type="submit"
          value="Sign In"
        />
      </form>
    </div>
  );
}

export default SignInPage