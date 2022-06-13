
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
    
    galleries, // this is from our state variable created above (line 17) and can be accessed from anywhere in the app

    getGalleries: async () => { // this is how we would run a mutation on the state
      // EXAMPLE METHOD
      fetch('/api/art/galleries')
        .then(r=>r.json())
        .then(g=>{
          setGalleries(g)
        }
      )
    },
    
    setGalleries: (galleries:Gallery[]) => { // another example of mutating the state
      // EXAMPLE METHOD
      setGalleries(galleries)
    }

  }

  return (
    // pass the actual context functionality we built in the context variable (line 24) into the context component we created at the top (line 6)
    // and then include the children that the context will be wrapped around.  Context api essentially wraps your whole app in the context, allowing you to access the state of it anywhere
    <GalleryContext.Provider value={context}>
      { children }
    </GalleryContext.Provider>
  )
}
