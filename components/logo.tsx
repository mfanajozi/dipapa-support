import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dipapa%20Logo_trans-dmNutniOCGYPWQ0AsHVkZt0CrWIEdY.png"
        alt="DIPAPA Logo"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  )
}

