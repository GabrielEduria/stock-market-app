import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";


const Header = () => {
  return (
    <header className="sticky top-0 header"> 
      <div className="container header-wrapper">
        <Link href="/">
           <Image 
            src="/public/assets/icons/logo.svg" 
            alt="Signalist logo" 
            width={180}
            height={40} 
            className="h-15 w-auto cursor-pointer" 
           />
        </Link>
         <nav className="hidden sm:block">
              <NavItems />
        </nav>
        <UserDropdown />
      </div>
    </header>
  )
}

export default Header;