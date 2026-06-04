import Link from "next/link";

import type { ReactNode } from "react";



type Variant = "primary" | "secondary" | "outline";



const styles: Record<Variant, string> = {

  primary:

    "bg-[#ff6600] text-black shadow-sm hover:bg-[#ff8533] font-semibold",

  secondary: "bg-zinc-100 text-black hover:bg-white font-semibold",

  outline:

    "border border-zinc-500 bg-zinc-900/70 text-white hover:border-[#ff6600]/60 hover:bg-[#ff6600]/10",

};



type BaseProps = {

  children: ReactNode;

  variant?: Variant;

  className?: string;

};



export function ButtonLink({

  href,

  external,

  children,

  variant = "primary",

  className = "",

}: BaseProps & { href: string; external?: boolean }) {

  const cls = `inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm transition ${styles[variant]} ${className}`;



  if (external) {

    return (

      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>

        {children}

      </a>

    );

  }



  return (

    <Link href={href} className={cls}>

      {children}

    </Link>

  );

}



export function Button({

  children,

  variant = "primary",

  className = "",

  type = "button",

  disabled,

  onClick,

}: BaseProps & {

  type?: "button" | "submit";

  disabled?: boolean;

  onClick?: () => void;

}) {

  return (

    <button

      type={type}

      disabled={disabled}

      onClick={onClick}

      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm transition disabled:opacity-60 ${styles[variant]} ${className}`}

    >

      {children}

    </button>

  );

}

