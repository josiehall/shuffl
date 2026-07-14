import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppV2 from './AppV2.jsx'
import Compare from './Compare.jsx'
import './index.css'

/*
 * Tiny query-based router so both brand versions can coexist:
 *   /            → v1 (card / deal branding)
 *   /?v=1        → v1
 *   /?v=2        → v2 (bold / monochromatic)
 *   /?compare    → both, side by side
 */
function pickView() {
  const params = new URLSearchParams(window.location.search)
  if (params.has('compare')) return <Compare />
  if (params.get('v') === '2') return <AppV2 />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{pickView()}</React.StrictMode>,
)
