import React from "react";
import Button from "../../components/atoms/controlls/Button";

export default function Login() {
  return (
    <div>
      <Button text="Click me" onClick={() => console.log("hi")}></Button>
    </div>
  );
}
