
import { createContext, useEffect, useState } from "react";
import { Gallery } from "../types/gallery";


export const GalleryContext = createContext({
  galleries: [] as Gallery[],
  getGalleries: async () => {

  },
  setGalleries: (galleries:Gallery[]) => {

  }
}) // The context model, much like creating a type or interface for your context object

export  const GalleryContextProvider = ({ children } : any) => {
  const [galleries, setGalleries] = useState([] as Gallery[])
  
  useEffect(() => {
    // INITIAL FETCHING WHEN THE APP IS LOADED
    // context.getGalleries()
  }, [])

  const context = {
    galleries,
    getGalleries: async () => {
      // EXAMPLE METHOD
      fetch('/api/art/galleries')
        .then(r=>r.json())
        .then(g=>{
          setGalleries(g)
        }
      )
    },
    setGalleries: (galleries:Gallery[]) => {
      // EXAMPLE METHOD
      setGalleries(galleries)
    }
  }

  return (
    <GalleryContext.Provider value={context}>
      { children }
    </GalleryContext.Provider>
  )
}
