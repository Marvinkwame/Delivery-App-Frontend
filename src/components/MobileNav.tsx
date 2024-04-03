import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';


const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-4xl ' />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='py-4'>
                        <span>
                            {isAuthenticated ? (
                                <span>{`Hello ${user?.email}`}</span>
                            ) :
                                (<span>Flavour Swift</span>)}
                        </span>
                    </SheetTitle>
                </SheetHeader>
                <Separator />
                <SheetDescription className='flex mt-8 gap-4 flex-col flex-1'>
                    {isAuthenticated ?
                        (<MobileNavLinks />) :
                        (
                            <Button 
                            onClick={() => loginWithRedirect()}
                            className="flex-1 font-bold text-2xl ">Log In</Button>
                        )
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav