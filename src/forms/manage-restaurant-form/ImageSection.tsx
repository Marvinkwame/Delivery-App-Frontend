
import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormMessage, FormItem } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageSection = () => {
    const { control, watch } = useFormContext();

    const existingUrl = watch("imageUrl")
    return (
        <div className='space-y-2'>
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image (Will be displayed in the search results too)
                    NB: New image will overwrite thr existing one
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img src={existingUrl}
                            alt="restaurant image"
                            className="rounded object-cover h-full w-full"
                        />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className='bg-white'
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) => field.onChange(event.target.files ? event.target.files[0] : null)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default ImageSection