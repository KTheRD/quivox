"use client";
import { Form, TextField } from "react-aria-components";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldError } from "../ui/fieldError";
import { Button } from "../ui/button";

export default function LoginForm() {
  return (
    <Form className="p-10 flex flex-col gap-4">
      <h1>Login</h1>
      <TextField name="email" type="email" isRequired>
        <Label>E-mail</Label>
        <Input placeholder="E-mail" />
        <FieldError />
      </TextField>
      <TextField name="password" type="password" isRequired>
        <Label>Password</Label>
        <Input placeholder="Password" />
        <FieldError />
      </TextField>
      <Button type="submit">Sign in</Button>
    </Form>
  );
}
