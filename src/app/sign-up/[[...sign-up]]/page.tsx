"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="grid w-full flex-grow items-center bg-white px-4 sm:justify-center">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8"
        >
          <header className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mx-auto size-10"
              viewBox="0 0 24 24"
            >
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              <rect width="20" height="14" x="2" y="6" rx="2"></rect>
            </svg>
            <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
              Create an account
            </h1>
          </header>

          <Clerk.GlobalError className="block text-sm text-red-600" />
          <Clerk.Field name="emailAddress">
            <Clerk.Label className="sr-only">Email</Clerk.Label>
            <Clerk.Input
              type="email"
              required
              placeholder="Email"
              className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
          </Clerk.Field>

          <Clerk.Field name="password">
            <Clerk.Label className="sr-only">Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              placeholder="Password"
              className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
          </Clerk.Field>

          <SignUp.Action submit asChild>
            <Button className="w-full font-bold">Sign Up</Button>
          </SignUp.Action>

          <div>
            <p className="mb-4 text-center text-sm/5 text-neutral-500">
              Or sign up with
            </p>
            <div className="space-y-2">
              <Clerk.Connection name="google" asChild>
                <Button
                  className="flex gap-2 w-full font-bold"
                  variant="outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="size-4"
                  >
                    <g clipPath="url(#a)">
                      <path
                        fill="currentColor"
                        d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h16v16H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  Sign up with Google
                </Button>
              </Clerk.Connection>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Clerk.Link
              navigate="sign-in"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
            >
              Sign in
            </Clerk.Link>
          </p>
        </SignUp.Step>

        <SignUp.Step
          name="verifications"
          className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8"
        >
          <SignUp.Strategy name="email_code">
            <header className="text-center">
              <h1 className="text-xl font-medium tracking-tight text-neutral-950">
                Verify your email
              </h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Field name="code">
              <Clerk.Label className="sr-only">Verification Code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                placeholder="Verification code"
                className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
              />
              <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
            </Clerk.Field>
            <SignUp.Action
              submit
              className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
            >
              Continue
            </SignUp.Action>
          </SignUp.Strategy>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Clerk.Link
              navigate="sign-in"
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
            >
              Sign in
            </Clerk.Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}
