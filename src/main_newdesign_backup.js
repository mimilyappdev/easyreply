import i18next from 'i18next'
import ja from './i18n/ja.json'
import en from './i18n/en.json'
import { defaultData } from './data/defaultData.js'

// ── MODE ──────────────────────────────────────────
// 'free' | 'trial' | 'pro'
const MODE = 'pro'

const TRIAL_LIMITS = { saves: 3, phases: 1, directions: 1 }

// ── STATE ─────────────────────────────────────────
const storage = MODE === 'trial' ? sessionStorage : localStorage

let appData = null
let currentPhaseId = null
let currentDirectionId = null
let selectedButtonId = null
let editTarget = null // { type: 'button'|'phase'|'direction', phaseId, directionId, buttonId }

// Trial counters (memory only)
const trialCount = { saves: 0, phases: 0, directions: 0 }

// ── i18n ──────────────────────────────────────────
const lang = () => localStorage.getItem('er_lang') || 'ja'
const t = (key) => i18next.t(key)
const tData = (obj) => (typeof obj === 'object' ? obj[lang()] || obj.ja || '' : obj)

await i18next.init({
  lng: lang(),
  resources: {
    ja: { translation: ja },
    en: { translation: en }
  }
})

// ── DATA ──────────────────────────────────────────
function loadData() {
  const saved = storage.getItem('er_data')
  if (saved) {
    try { appData = JSON.parse(saved) } catch { appData = structuredClone(defaultData) }
  } else {
    appData = structuredClone(defaultData)
    storage.setItem('er_data', JSON.stringify(appData))
  }
}

function saveData() {
  storage.setItem('er_data', JSON.stringify(appData))
}

function getPhase(id) {
  return appData.phases.find(p => p.id === id)
}
function getDirection(phaseId, dirId) {
  return getPhase(phaseId)?.directions.find(d => d.id === dirId)
}
function getButton(phaseId, dirId, btnId) {
  return getDirection(phaseId, dirId)?.buttons.find(b => b.id === btnId)
}

// ── RENDER ────────────────────────────────────────
function renderAll() {
  renderPhaseTabs()
  renderDirectionChips()
  renderButtons()
  applyI18n()
}

function renderPhaseTabs() {
  const el = document.getElementById('phase-tabs')
  el.innerHTML = ''

  appData.phases.forEach(phase => {
    const btn = document.createElement('button')
    btn.className = 'phase-tab' + (phase.id === currentPhaseId ? ' active' : '')
    btn.dataset.id = phase.id

    const labelEl = document.createElement('span')
    labelEl.className = 'btn-label'
    labelEl.textContent = tData(phase.label)

    btn.appendChild(labelEl)

    if (MODE === 'pro') {
      const actions = document.createElement('span')
      actions.className = 'tab-actions'
      actions.innerHTML = `
        <button class="tab-action-btn" data-action="edit-phase" data-id="${phase.id}">✎</button>
        <button class="tab-action-btn delete" data-action="delete-phase" data-id="${phase.id}">✕</button>
      `
      btn.appendChild(actions)
    }

    btn.addEventListener('click', (e) => {
      if (e.target.dataset.action) return
      currentPhaseId = phase.id
      currentDirectionId = getPhase(phase.id).directions[0]?.id || null
      selectedButtonId = null
      renderAll()
    })

    el.appendChild(btn)
  })

  // Pro add controls
  const proControls = document.getElementById('pro-add-controls')
  if (MODE === 'pro') proControls.style.display = 'flex'
}

function renderDirectionChips() {
  const el = document.getElementById('direction-chips')
  el.innerHTML = ''

  const phase = getPhase(currentPhaseId)
  if (!phase) return

  phase.directions.forEach(dir => {
    const btn = document.createElement('button')
    btn.className = 'dir-chip' + (dir.id === currentDirectionId ? ' active' : '')
    btn.textContent = tData(dir.label)
    btn.addEventListener('click', () => {
      currentDirectionId = dir.id
      selectedButtonId = null
      renderButtons()
    })
    el.appendChild(btn)
  })
}

function renderButtons() {
  const el = document.getElementById('button-list')
  el.innerHTML = ''

  const dir = getDirection(currentPhaseId, currentDirectionId)
  if (!dir) return

  dir.buttons.forEach(btn => {
    const item = document.createElement('button')
    item.className = 'content-btn' + (btn.id === selectedButtonId ? ' active' : '')
    item.dataset.id = btn.id

    const label = document.createElement('span')
    label.className = 'btn-label'
    label.textContent = tData(btn.label)
    item.appendChild(label)

    if (MODE === 'pro' || MODE === 'trial') {
      const actions = document.createElement('span')
      actions.className = 'btn-actions'
      actions.innerHTML = `
        <button class="btn-action" data-action="edit-btn" data-id="${btn.id}">✎</button>
        <button class="btn-action delete" data-action="delete-btn" data-id="${btn.id}">✕</button>
      `
      item.appendChild(actions)
    }

    item.addEventListener('click', (e) => {
      if (e.target.dataset.action) return
      selectedButtonId = btn.id
      showPreview(btn)
      renderButtons()
    })

    el.appendChild(item)
  })

  // Add button (Pro)
  const addBtn = document.getElementById('btn-add-button')
  addBtn.style.display = (MODE === 'pro' || MODE === 'trial') ? 'block' : 'none'
}

function showPreview(btn) {
  const textarea = document.getElementById('preview-textarea')
  textarea.value = tData(btn.text)
  textarea.removeAttribute('readonly')
}

// ── i18n APPLY ────────────────────────────────────
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    const translated = t(key)
    if (translated) el.textContent = translated
  })
  document.getElementById('btn-lang').textContent = lang() === 'ja' ? 'EN' : 'JP'
  document.documentElement.lang = lang()
}

// ── MODAL: EDIT ───────────────────────────────────
function openEditModal({ title, label = '', text = '', onSave }) {
  document.getElementById('modal-title').textContent = title
  document.getElementById('modal-label').value = label
  document.getElementById('modal-text').value = text
  document.getElementById('modal-edit').hidden = false
  editTarget = { onSave }
}

function closeEditModal() {
  document.getElementById('modal-edit').hidden = true
  editTarget = null
}

// ── MODAL: UNLOCK ─────────────────────────────────
function openUnlockModal(reason) {
  document.getElementById('modal-unlock').hidden = false
}

function closeUnlockModal() {
  document.getElementById('modal-unlock').hidden = true
}

// ── TRIAL GUARD ───────────────────────────────────
function checkTrialLimit(type) {
  if (MODE !== 'trial') return true
  if (trialCount[type] >= TRIAL_LIMITS[type]) {
    openUnlockModal(type)
    return false
  }
  return true
}

// ── ID GENERATOR ──────────────────────────────────
const genId = (prefix) => `${prefix}_${Date.now()}`

// ── EVENTS ────────────────────────────────────────

// Lang toggle
document.getElementById('btn-lang').addEventListener('click', () => {
  const next = lang() === 'ja' ? 'en' : 'ja'
  localStorage.setItem('er_lang', next)
  i18next.changeLanguage(next)
  renderAll()
})

// Export
document.getElementById('btn-export').addEventListener('click', () => {
  const json = JSON.stringify(appData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'easyreply_data.json'
  a.click()
})

// Add button
document.getElementById('btn-add-button').addEventListener('click', () => {
  if (!checkTrialLimit('saves')) return
  openEditModal({
    title: t('button.add_button'),
    onSave: ({ label, text }) => {
      const dir = getDirection(currentPhaseId, currentDirectionId)
      if (!dir) return
      dir.buttons.push({
        id: genId('custom'),
        label: { ja: label, en: '' },
        type: 'static',
        text: { ja: text, en: '' }
      })
      if (MODE === 'trial') trialCount.saves++
      saveData()
      renderButtons()
    }
  })
})

// Add phase
document.getElementById('btn-add-phase').addEventListener('click', () => {
  if (!checkTrialLimit('phases')) return
  openEditModal({
    title: t('button.add_phase'),
    onSave: ({ label }) => {
      const newPhase = {
        id: genId('phase'),
        label: { ja: label, en: '' },
        directions: [{
          id: genId('dir'),
          label: { ja: '方向1', en: 'Direction 1' },
          buttons: []
        }]
      }
      appData.phases.push(newPhase)
      currentPhaseId = newPhase.id
      currentDirectionId = newPhase.directions[0].id
      if (MODE === 'trial') trialCount.phases++
      saveData()
      renderAll()
    }
  })
})

// Add direction
document.getElementById('btn-add-direction').addEventListener('click', () => {
  if (!checkTrialLimit('directions')) return
  openEditModal({
    title: t('button.add_direction'),
    onSave: ({ label }) => {
      const phase = getPhase(currentPhaseId)
      if (!phase) return
      const newDir = { id: genId('dir'), label: { ja: label, en: '' }, buttons: [] }
      phase.directions.push(newDir)
      currentDirectionId = newDir.id
      if (MODE === 'trial') trialCount.directions++
      saveData()
      renderAll()
    }
  })
})

// Modal: delegate edit/delete actions
document.addEventListener('click', (e) => {
  const action = e.target.dataset.action
  const id = e.target.dataset.id
  if (!action) return

  if (action === 'edit-btn') {
    const btn = getButton(currentPhaseId, currentDirectionId, id)
    if (!btn) return
    openEditModal({
      title: '編集',
      label: tData(btn.label),
      text: tData(btn.text),
      onSave: ({ label, text }) => {
        if (MODE === 'trial' && !btn._edited) {
          if (!checkTrialLimit('saves')) return
          btn._edited = true
          trialCount.saves++
        }
        btn.label[lang()] = label
        btn.text[lang()] = text
        saveData()
        renderButtons()
        if (selectedButtonId === id) showPreview(btn)
      }
    })
  }

  if (action === 'delete-btn') {
    const dir = getDirection(currentPhaseId, currentDirectionId)
    if (!dir) return
    dir.buttons = dir.buttons.filter(b => b.id !== id)
    if (selectedButtonId === id) {
      selectedButtonId = null
      document.getElementById('preview-textarea').value = ''
    }
    saveData()
    renderButtons()
  }

  if (action === 'edit-phase') {
    const phase = getPhase(id)
    if (!phase) return
    openEditModal({
      title: 'フェーズを編集',
      label: tData(phase.label),
      onSave: ({ label }) => {
        phase.label[lang()] = label
        saveData()
        renderPhaseTabs()
      }
    })
  }

  if (action === 'delete-phase') {
    if (appData.phases.length <= 1) return
    appData.phases = appData.phases.filter(p => p.id !== id)
    if (currentPhaseId === id) {
      currentPhaseId = appData.phases[0].id
      currentDirectionId = appData.phases[0].directions[0]?.id || null
    }
    saveData()
    renderAll()
  }
})

// Modal save
document.getElementById('modal-save').addEventListener('click', () => {
  const label = document.getElementById('modal-label').value.trim()
  const text = document.getElementById('modal-text').value
  if (!label) return
  editTarget?.onSave({ label, text })
  closeEditModal()
})

// Modal cancel
document.getElementById('modal-cancel').addEventListener('click', closeEditModal)
document.getElementById('modal-edit').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeEditModal()
})

// Unlock modal
document.getElementById('unlock-cancel').addEventListener('click', closeUnlockModal)
document.getElementById('modal-unlock').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeUnlockModal()
})

// Copy
document.getElementById('btn-copy').addEventListener('click', () => {
  const text = document.getElementById('preview-textarea').value
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy')
    btn.classList.add('copied')
    btn.textContent = t('button.copied')
    setTimeout(() => {
      btn.classList.remove('copied')
      btn.textContent = t('button.copy')
    }, 1800)
  })
})

// ── INIT ──────────────────────────────────────────
loadData()
currentPhaseId = appData.phases[0]?.id || null
currentDirectionId = appData.phases[0]?.directions[0]?.id || null
renderAll()
