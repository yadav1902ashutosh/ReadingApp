import React, { useState } from 'react'
import ProfileHeader from './ProfileHeader'

function Profile() {
  const [notification, setNotification] = useState(null)

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  const handleInscribeEntry = () => {
    showNotification("Folio entry quill ready. Inscribing new entry...")
  }

  const handleLedgerClick = () => {
    showNotification("Archival ledger accessed. Scriptorium logs synchronized.")
  }

  return (
    <div className="min-h-screen pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary font-label text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-xl border border-primary-fixed-dim/30 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">history_edu</span>
          <span>{notification}</span>
        </div>
      )}
      <ProfileHeader 
        onInscribeEntry={handleInscribeEntry}
        onLedgerClick={handleLedgerClick}
      />
    </div>
  )
}

export default Profile