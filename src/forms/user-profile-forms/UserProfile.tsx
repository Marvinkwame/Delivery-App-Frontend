
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '@/types'
import { useEffect } from 'react'


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, {
        message: "Name must be at least 1 character long"
    }),
    addressLine1: z.string().min(1, {
        message: "AddressLine is required"
    }),
    city: z.string().min(1, {
        message: "City is required"
    }),
    country: z.string().min(1, {
        message: "country is required"
    })
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    currentUser: User;
}

const UserProfile = ({ isLoading, onSave, currentUser }: Props) => {
    const { user } = useAuth0()

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    })

    useEffect(() => {
        form.reset(currentUser)
    }, [currentUser, form])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-4 bg-gray-50 rounded-md md:p-10">
                <div>
                    <h2 className="text-4xl font-bold">User Profile Form</h2>
                    <FormDescription className="text-xl mb-4">
                        View and change your profile information
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} value={user?.email} disabled className='bg-white' />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {
                    isLoading ? <LoadingButton /> : <Button type="submit" className="bg-green-500 mt-4">Submit</Button>
                }
            </form>
        </Form>
    )
}

export default UserProfile