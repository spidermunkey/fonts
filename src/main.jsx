import '../sass/main.scss'

import { StrictMode,useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const Card = ({font}) => {
  const defaultFont = font.fonts[0];
  const name = defaultFont.name;
  useEffect(() => {
    const getData = async () => {
      const testResponse = await fetch(`/api/fonts?name=${name}`)
      const buffer = await testResponse.arrayBuffer();
      const Font = new FontFace(name,buffer);
      await Font.load();
      document.fonts.add(Font);
    }
    getData()
  },[])
  return(
    <div className="card" style={{fontFamily:name}}>{font.name}</div>
  )
}

const Test = () => {
  const [fontData,updateFontData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const testResponse = await fetch('/api/fonts')
      updateFontData(await testResponse.json()) 
    }
    getData();
  },[])
  return (
    <div className="app">
      <div className="font-list">

      {fontData.length > 0 && fontData.map(font => {
        if (font.fonts.length > 0) {
          return <Card font={font}/>
        }
        else return false
      })}
      </div>

    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Test/>
    </StrictMode>
)
