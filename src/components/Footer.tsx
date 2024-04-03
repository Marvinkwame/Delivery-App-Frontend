

const Footer = () => {
    return (
        <div className='py-6 bg-green-950'>
            <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4'>
                <div className='w-[90%]'>
                    <h4 className='text-white font-bold text-4xl mb-4'>FlavorSwift</h4>
                    <p className='text-gray-400 text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, architecto.
                    </p>
                    <div className="flex items-center justify-between">

                    </div>
                </div>

                <div className='grid gap-4'>
                    <h4 className='text-white text-2xl'>Company</h4>
                    <ul className='text-gray-400 grid gap-4 text-base'>
                        <li>About</li>
                        <li>Delivery Inofrmation</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className='grid gap-2'>
                    <h4 className='text-white text-2xl'>Account</h4>
                    <ul className='text-gray-400 grid gap-4 text-base'>
                        <li>Sign In</li>
                        <li>View Cart</li>
                        <li>My Wishlist</li>
                    </ul>
                </div>

                <div className='grid gap-4'>
                    <h4 className='text-white text-2xl'>Address</h4>
                    <ul className='text-gray-400 grid gap-4 text-base'>
                        <li>Greater Kasoa</li>
                        <li>+233453433</li>
                        <li>flavorswift@gmail.com</li>
                        <li>7:00AM - 8:OOPM</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer