import { useState } from 'react'
import Portfolio from './component/portfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div style={{ background: "#050510", color: "#fff", minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .desk-nav { display: none !important; }
          .burger { display: flex !important; }
        }
        button:hover { filter: brightness(1.05); }
      *{
        margin: 0;
    padding: 0;
    box-sizing: border-box;
      }`
      }</style>
         <Portfolio />
    </div>

  )
}

export default App
