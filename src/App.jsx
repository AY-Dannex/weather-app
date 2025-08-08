import React, {useState, useEffect} from 'react'
import Weather from "./components/weather";
import BGLoad from './components/BgLoader';
import background from '/background.jpg'

function App() {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = background
    img.onload = () => {
      // setImgLoaded(true)/
    }
  }, [])
  return (
    <div className="container" style={{backgroundImage: imgLoaded ? `url(${background})` : "none"}}>
      {imgLoaded ? <Weather /> : <BGLoad/>}
    </div>
  );
}

export default App;
