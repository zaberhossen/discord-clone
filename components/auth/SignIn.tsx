"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { makeRequestWithBase } from "@/app/api/service/client";
import { API_ROUTES } from "@/app/api/routes";
import { AUTH } from "@/app/api/service/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

interface Idata {
  username: string;
  password: string;
}
interface searchParams {
  redirectUrl?: string;
}

const initialData: Idata = {
  username: "",
  password: ""
};
const schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "Email required" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid")
  })
  .passthrough();

export default function SignIn({
  searchParams
}: {
  searchParams: searchParams;
}) {
  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema)
  });
  const isLoading = form.formState.isSubmitting;
  const _onSubmit = (data: Idata) => {
    makeRequestWithBase({
      url: API_ROUTES.login,
      method: "POST",
      data: {
        username: data?.username,
        password: data?.password
      },
      loaderStatus: true
    })
      .then((res) => {
        console.log(res, "res");
        if (res) {
          AUTH.setAccessToken(res.access_token);
          AUTH.setRefreshToken(res.refresh_token);
          if (res?.user) {
            AUTH.setUserData(JSON.stringify(res.user));
          }
          window.location.href = searchParams?.redirectUrl
            ? "/?redirectUrl=" + searchParams?.redirectUrl
            : "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="max-w-sm w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(_onSubmit)}>
          <h1 className="mb-2 font-semibold text-xl">Sign In</h1>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter your email"
                      className="bg-zinc-300/50 border-0 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter your password"
                      className="bg-zinc-300/50 border-0 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
