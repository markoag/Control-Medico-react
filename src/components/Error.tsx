import { ReactNode } from "react";

export default function ErrorForm({children} : { readonly children: ReactNode}) {
  return (
    <p className="text-center my-4 bg-red-500 text-white p-3 uppercase text-sm rounded-sm">{children}</p>
  )
}
