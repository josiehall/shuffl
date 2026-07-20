import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './AppV2.jsx'
import EmployersPage from './EmployersPage.jsx'
import './index.css'

/*
 * Two-page site, routed on pathname (no router dependency needed):
 *   /           → candidate homepage
 *   /employers  → employer page
 *
 * Navigation between them uses normal <a href> links (a full page load), which
 * keeps things simple for a two-page marketing site. `vercel.json` rewrites all
 * paths to index.html so /employers still resolves on a hard refresh.
 */
function Root() {
  const path = window.location.pathname.replace(/\/+$/, '')
  const isEmployers = path === '/employers'

  // Support deep links like /#how coming from the employers page.
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [])

  return isEmployers ? <EmployersPage /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
