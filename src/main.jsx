import '../sass/main.scss'

import { StrictMode,useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const Card = ({font}) => {
  const defaultFont = font.fonts[0];
  const name = defaultFont.name;
  const count = font.count;
  console.log(font)
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
    <div className="card" style={{fontFamily:name}}>
      <div className="font-name">
       {font.name}
      <div className="font-content">
        <div className="font-data">
          <div className="font-count">{count}</div>
          <div className="font-format">{defaultFont.format}</div>
        </div>
        <div className="font-controls">
          <div className="btn-save">save</div>
          <div className="btn-export">export</div>
          <div className="btn-edit">edit</div>
        </div>

      </div>
      </div>
      <div className="font-preview">
        Some random text to preview the font
      </div>

    </div>
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
