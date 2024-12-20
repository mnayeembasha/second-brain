import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../components/ui/button"
import axios from 'axios';
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input";
import { Navbar } from "../components/Navbar"
import { BACKEND_URL } from "../config"

const formSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[a-z]/, "Password must have at least one lowercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must have at least one special character (@, $, !, %, *, ?, &)"
    ),
})

export function SignIn() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;
      console.log( email, password);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {  email, password },{ withCredentials: true }
      );
      // console.log(response.data.message);
      console.log(response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <div className="min-h-screen font-satoshi">
      <Navbar/>
      <div className="flex flex-col justify-center items-center">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="enter your password" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex justify-center"> */}
        <Button type="submit">Submit</Button>
        {/* </div> */}
      </form>
    </Form>
    </div>
    </div>
  )
}

