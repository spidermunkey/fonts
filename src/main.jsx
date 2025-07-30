import '../sass/main.scss'

import { StrictMode,useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const load = async font => {
    const defaultFont = font.fonts[0];
    console.log(defaultFont,font)
    try {
      const name = defaultFont.name;
      const testResponse = await fetch(`/api/fonts?name=${name}`)
      const buffer = await testResponse.arrayBuffer();
      const Font = new FontFace(name,buffer);
      await Font.load();
      document.fonts.add(Font);
      return testResponse;
    } catch(e){
      console.warn('error loading font data \n', font,'\n',e);
      return null;
    }

}

const FontListPending = () => {
  return(
    <div className="font-list-pending">
      ...loading fonts
    </div>
  )
}
const FontList = () => {
  const [fontData,updateFontData] = useState([])
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const testResponse = await fetch('/api/fonts')
      const data = await testResponse.json()
      const defaultLoaded = await Promise.all(data.map(load))
      setIsLoading(false)
      updateFontData(data)
    }
    getData();
  },[])
  return (
      <div className="font-list">
        <div className="font-list-header">
          {/* search / filter */}
        </div>
        
        {isLoading ? <FontListPending/>: fontData.length > 0 && fontData.map(font => {
          if (font.fonts.length > 0) {
            return <Card font={font}/>
          }
          else return false
        })}
      </div>

  )
}
const Card = ({font}) => {
  const defaultFont = font.fonts[0];
  const name = defaultFont.name;
  const count = font.count;
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
const Header = () => {
  return (
    <div className="dashboard-header">
      <div className="navigation-header">
        <div className="tool-bar">
            <div className="nav-bar">
                <a className="home" >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewbox="-3 -2 28 28" height="40px" width="40px" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M19.871 12.165l-8.829-9.758c-0.274-0.303-0.644-0.47-1.042-0.47-0 0 0 0 0 0-0.397 0-0.767 0.167-1.042 0.47l-8.829 9.758c-0.185 0.205-0.169 0.521 0.035 0.706 0.096 0.087 0.216 0.129 0.335 0.129 0.136 0 0.272-0.055 0.371-0.165l2.129-2.353v8.018c0 0.827 0.673 1.5 1.5 1.5h11c0.827 0 1.5-0.673 1.5-1.5v-8.018l2.129 2.353c0.185 0.205 0.501 0.221 0.706 0.035s0.221-0.501 0.035-0.706zM12 19h-4v-4.5c0-0.276 0.224-0.5 0.5-0.5h3c0.276 0 0.5 0.224 0.5 0.5v4.5zM16 18.5c0 0.276-0.224 0.5-0.5 0.5h-2.5v-4.5c0-0.827-0.673-1.5-1.5-1.5h-3c-0.827 0-1.5 0.673-1.5 1.5v4.5h-2.5c-0.276 0-0.5-0.224-0.5-0.5v-9.123l5.7-6.3c0.082-0.091 0.189-0.141 0.3-0.141s0.218 0.050 0.3 0.141l5.7 6.3v9.123z">
                        </path>
                    </svg>
                </a>
                <div class="menu-icon" >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" height="64px" width="64px">
                        <path d="M8.667,15h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,15,8.667,15z"></path>
                        <path d="M8.667,37h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,37,8.667,37z"></path>
                        <path d="M8.667,26h30c0.552,0,1-0.447,1-1s-0.448-1-1-1h-30c-0.552,0-1,0.447-1,1S8.114,26,8.667,26z"></path>
                    </svg>
                </div>

                <div className="search passive-search active">
                    <div className="search-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16px" width="16px">
                                  <path fill-rule="evenodd" d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"></path></svg>
                    </div>
                    <input className="active" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
const App = () => {
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
      <Header/>
      <FontList/>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App/>
  </StrictMode>
)
