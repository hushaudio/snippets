import React, { useState, useEffect, useContext } from 'react';

import { GalleryContext } from '../context/galleries';
import { Gallery as _Gallery } from '../types/gallery';

export default function Gallery({galleries}:{galleries:_Gallery[]}) {
  
  // Here we grab our contexxt object exported from the context/galleries.tsx file
  const galleriesContext = useContext(GalleryContext)

  // When this is called from the button it will use the context function getGalleries
  const getAllGalleries = () => {
    galleriesContext.getGalleries(galleries)
  }
  
  const [loadingId, setLoadingId] = useState(null as null|string)
  return (
    <button onClick={getAllGalleries}>
      
    </button>
  )
}
