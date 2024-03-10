"use client";
import { Form, TextField } from "react-aria-components";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldError } from "../ui/fieldError";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormState } from "react-dom";
import { register } from "@/lib/actions";

export default function RegisterForm() {
  const [error, dispatch] = useFormState(register, undefined);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordErrors = [];

  if (password.length > 0) {
    if (password.length < 8) {
      passwordErrors.push("be at least 8 characters long.");
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      passwordErrors.push(
        "contain both uppercase and lowercase latin letters.",
      );
    }
    if (!/\d/.test(password)) {
      passwordErrors.push("contain at least one digit.");
    }
  }

  return (
    <Form
      action={dispatch}
      className="p-10 flex flex-col gap-4 min-h-full justify-center min-w-96"
    >
      <h1>Register</h1>
      <TextField name="name" type="text" isRequired>
        <Label>Username</Label>
        <Input placeholder="Username" />
        <FieldError>Username is required.</FieldError>
      </TextField>
      <TextField name="email" type="email" isRequired>
        <Label>E-mail</Label>
        <Input placeholder="E-mail" />
        <FieldError>
          {({ validationDetails }) =>
            validationDetails.valueMissing
              ? "E-mail is required."
              : "Invalid e-mail."
          }
        </FieldError>
      </TextField>
      <TextField
        name="password"
        type="password"
        isRequired
        value={password}
        onChange={setPassword}
        isInvalid={passwordErrors.length > 0}
      >
        <Label>Password</Label>
        <Input placeholder="Password" />
        <FieldError>
          {password.length === 0 ? (
            "Create a password"
          ) : (
            <>
              <span>Password must:</span>
              <ul className="list-disc">
                {passwordErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </>
          )}
        </FieldError>
      </TextField>
      <TextField
        name="repeat-password"
        type="password"
        isRequired
        value={repeatPassword}
        onChange={setRepeatPassword}
        isInvalid={repeatPassword.length > 0 && repeatPassword !== password}
      >
        <Label>Repeat password</Label>
        <Input placeholder="Repeat password" />
        <FieldError>
          {repeatPassword.length > 0
            ? "Passwords do not match."
            : "Please, repeat your password."}
        </FieldError>
      </TextField>
      <Button type="submit">Sign up</Button>
      {error && <div className="text-invalid">{error}</div>}
    </Form>
  );
}
