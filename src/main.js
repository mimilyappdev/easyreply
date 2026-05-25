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
let currentTone = localStorage.getItem('er_tone') || 'formal'
let dlUrl = ''
let dlPassword = ''
let previewBase = ''

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
    btn.className = 'dir-chip ' + dir.id + (dir.id === currentDirectionId ? ' active' : '')
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

  dir.buttons.forEach((btn, idx) => {
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
        <button class="btn-action" data-action="move-up" data-id="${btn.id}" ${idx === 0 ? 'disabled' : ''}>↑</button>
        <button class="btn-action" data-action="move-down" data-id="${btn.id}" ${idx === dir.buttons.length - 1 ? 'disabled' : ''}>↓</button>
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
  const src = (currentTone === 'warm' && btn.textWarm) ? btn.textWarm : btn.text
  previewBase = tData(src)
  updatePreview()
  textarea.removeAttribute('readonly')
}

function updatePreview() {
  const textarea = document.getElementById('preview-textarea')
  let text = previewBase
  if (dlUrl || dlPassword) {
    const parts = []
    if (dlUrl) parts.push(`【ダウンロードURL】\n${dlUrl}`)
    if (dlPassword) parts.push(`【パスワード】\n${dlPassword}`)
    text = text ? text + '\n\n' + parts.join('\n') : parts.join('\n')
  }
  textarea.value = text
}

function setTone(tone) {
  currentTone = tone
  localStorage.setItem('er_tone', tone)
  document.getElementById('tone-formal').classList.toggle('active', tone === 'formal')
  document.getElementById('tone-warm').classList.toggle('active', tone === 'warm')
  if (selectedButtonId) {
    const btn = getButton(currentPhaseId, currentDirectionId, selectedButtonId)
    if (btn) showPreview(btn)
  }
}

// ── i18n APPLY ────────────────────────────────────
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    const translated = t(key)
    if (translated) el.textContent = translated
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder
    const translated = t(key)
    if (translated) el.placeholder = translated
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

// ── MY COLOR ─────────────────────────────────────
const MC_SEEDS = ['bg', 'surface', 'ui', 'accent', 'text']
const MC_LABELS = {
  bg:      { name: '背景ベース', hint: 'ページ背景' },
  surface: { name: 'サーフェス', hint: 'ヘッダー・プレビュー背景' },
  ui:      { name: 'UI',        hint: 'サイドバー・ボタン類' },
  accent:  { name: 'アクセント', hint: '受ける・Warm・強調色' },
  text:    { name: 'テキスト',   hint: '本文テキスト' },
}
const MC_DEFAULT = { bg: '#22274e', surface: '#0e133a', ui: '#151d5b', accent: '#656cb3', text: '#b0981c' }
let myColorSeeds = JSON.parse(localStorage.getItem('er_mycolor') || 'null') || { ...MC_DEFAULT }

function mixHex(c1, c2, t) {
  const n = s => parseInt(s, 16)
  const h = v => Math.round(v).toString(16).padStart(2, '0')
  const [r1,g1,b1] = [c1.slice(1,3),c1.slice(3,5),c1.slice(5,7)].map(n)
  const [r2,g2,b2] = [c2.slice(1,3),c2.slice(3,5),c2.slice(5,7)].map(n)
  return '#' + h(r1*(1-t)+r2*t) + h(g1*(1-t)+g2*t) + h(b1*(1-t)+b2*t)
}

function seedsToVars(s) {
  return {
    '--bg':              s.bg,
    '--header-bg':       s.surface,
    '--sidebar':         s.ui,
    '--sidebar-border':  mixHex(s.ui, '#ffffff', 0.18),
    '--white':           mixHex(s.surface, s.bg, 0.5),
    '--border':          mixHex(s.bg, '#ffffff', 0.15),
    '--text':            s.text,
    '--muted':           mixHex(s.text, s.bg, 0.4),
    '--accent':          s.accent,
    '--accent-light':    mixHex(s.accent, s.bg, 0.8),
    '--brand':           s.accent,
    '--deep':            mixHex(s.accent, '#ffffff', 0.3),
    '--accept':          s.accent,
    '--accept-light':    mixHex(s.accent, s.bg, 0.75),
    '--condition':       s.accent,
    '--condition-light': mixHex(s.accent, s.bg, 0.8),
    '--decline':         mixHex(s.ui, '#ffffff', 0.25),
    '--decline-light':   mixHex(s.bg, s.accent, 0.05),
    '--premium':         s.text,
    '--premium-light':   mixHex(s.surface, s.bg, 0.7),
  }
}

function updateMyColorSwatch() {
  const el = document.getElementById('mc-swatch')
  if (el) el.style.background = `linear-gradient(135deg,${myColorSeeds.surface} 50%,${myColorSeeds.bg} 50%)`
}

function initMyColorUI() {
  const container = document.getElementById('mycolor-seeds-ui')
  if (!container) return
  container.innerHTML = ''
  MC_SEEDS.forEach(id => {
    const { name, hint } = MC_LABELS[id]
    const row = document.createElement('div')
    row.className = 'mc-seed-row'
    row.innerHTML = `
      <div class="mc-seed-label">${name}<span class="mc-seed-hint">${hint}</span></div>
      <div class="mc-seed-input-row">
        <input type="color" id="mc-pick-${id}" value="${myColorSeeds[id]}">
        <input type="text" id="mc-hex-${id}" class="mc-hex-input" value="${myColorSeeds[id]}" maxlength="7">
      </div>`
    container.appendChild(row)

    const picker = document.getElementById(`mc-pick-${id}`)
    const hexIn  = document.getElementById(`mc-hex-${id}`)

    picker.addEventListener('input', () => {
      myColorSeeds[id] = picker.value
      hexIn.value = picker.value
      localStorage.setItem('er_mycolor', JSON.stringify(myColorSeeds))
      if (localStorage.getItem('er_theme') === 'mycolor') applyTheme('mycolor')
      updateMyColorSwatch()
    })
    hexIn.addEventListener('input', () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(hexIn.value)) {
        myColorSeeds[id] = hexIn.value
        picker.value = hexIn.value
        localStorage.setItem('er_mycolor', JSON.stringify(myColorSeeds))
        if (localStorage.getItem('er_theme') === 'mycolor') applyTheme('mycolor')
        updateMyColorSwatch()
      }
    })
  })
  updateMyColorSwatch()
}

// ── THEME ────────────────────────────────────────
const THEME_VARS = {
  default: {},
  dark: {
    // 5-seed dark theme (bg:#22274e surface:#0e133a ui:#151d5b accent:#656cb3 text:#b0981c)
    '--bg':              '#22274e',
    '--header-bg':       '#0e133a',
    '--sidebar':         '#151d5b',
    '--sidebar-border':  '#2a2f68',
    '--white':           '#1c2052',
    '--border':          '#2e3472',
    '--text':            '#b0981c',
    '--muted':           '#8a7c28',
    '--accent':          '#656cb3',
    '--accent-light':    '#2f3562',
    '--brand':           '#656cb3',
    '--deep':            '#9398ca',
    '--accept':          '#656cb3',
    '--accept-light':    '#2f3562',
    '--condition':       '#656cb3',
    '--condition-light': '#2f3562',
    '--decline':         '#4a508e',
    '--decline-light':   '#1e2350',
    '--premium':         '#b0981c',
    '--premium-light':   '#1e1c3c',
  }
}
const DEFAULT_VARS = {
  '--header-bg': '#2C4A5E', '--bg': '#F5F1EB', '--sidebar': '#EEF2F5',
  '--sidebar-border': '#D8E2EA', '--white': '#FFFFFF', '--border': '#D0D8E0',
  '--text': '#2A2A2A', '--muted': '#7A8A96', '--accent': '#3A7CA5',
  '--accent-light': '#E3EFF7', '--brand': '#3A6080', '--deep': '#1A3A52',
  '--accept': '#C8A030', '--accept-light': '#FFF8DC',
  '--condition': '#3A7CA5', '--condition-light': '#E3EFF7',
  '--decline': '#6B7F8C', '--decline-light': '#E8EDEF',
  '--premium': '#B8860B', '--premium-light': '#FFF8E7',
}

function applyTheme(id) {
  const root = document.documentElement
  Object.entries(DEFAULT_VARS).forEach(([k, v]) => root.style.setProperty(k, v))
  if (id === 'mycolor') {
    Object.entries(seedsToVars(myColorSeeds)).forEach(([k, v]) => root.style.setProperty(k, v))
  } else {
    Object.entries(THEME_VARS[id] || {}).forEach(([k, v]) => root.style.setProperty(k, v))
  }
  document.querySelectorAll('.theme-opt').forEach(el =>
    el.classList.toggle('active', el.dataset.theme === id))
  localStorage.setItem('er_theme', id)
}

// ── SETTINGS MODAL ───────────────────────────────
function openSettings() {
  document.getElementById('modal-settings').hidden = false
}
function closeSettings() {
  document.getElementById('modal-settings').hidden = true
}

// ── EVENTS ────────────────────────────────────────

// Edit mode toggle
document.getElementById('btn-edit-mode').addEventListener('click', () => {
  document.body.classList.toggle('edit-mode')
  const isOn = document.body.classList.contains('edit-mode')
  document.getElementById('btn-edit-mode').classList.toggle('icon-btn--active', isOn)
})

// Lang toggle
document.getElementById('btn-lang').addEventListener('click', () => {
  const next = lang() === 'ja' ? 'en' : 'ja'
  localStorage.setItem('er_lang', next)
  i18next.changeLanguage(next)
  renderAll()
})

// Settings open
document.getElementById('btn-settings').addEventListener('click', openSettings)
document.getElementById('bnav-settings').addEventListener('click', openSettings)
document.getElementById('modal-settings-close').addEventListener('click', closeSettings)
document.getElementById('modal-settings').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeSettings()
})

// Theme select
document.getElementById('theme-list').addEventListener('click', (e) => {
  const opt = e.target.closest('.theme-opt')
  if (opt) applyTheme(opt.dataset.theme)
})

// Export (settings modal)
document.getElementById('settings-export').addEventListener('click', () => {
  const json = JSON.stringify(appData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'easyreply_data.json'
  a.click()
})

// Reset (settings modal)
document.getElementById('settings-reset').addEventListener('click', () => {
  if (!confirm('全データをデフォルトに戻しますか？\n（カスタマイズした内容はすべて消えます）')) return
  storage.removeItem('er_data')
  location.reload()
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

  if (action === 'move-up') {
    const dir = getDirection(currentPhaseId, currentDirectionId)
    if (!dir) return
    const idx = dir.buttons.findIndex(b => b.id === id)
    if (idx <= 0) return
    ;[dir.buttons[idx - 1], dir.buttons[idx]] = [dir.buttons[idx], dir.buttons[idx - 1]]
    saveData()
    renderButtons()
  }

  if (action === 'move-down') {
    const dir = getDirection(currentPhaseId, currentDirectionId)
    if (!dir) return
    const idx = dir.buttons.findIndex(b => b.id === id)
    if (idx < 0 || idx >= dir.buttons.length - 1) return
    ;[dir.buttons[idx], dir.buttons[idx + 1]] = [dir.buttons[idx + 1], dir.buttons[idx]]
    saveData()
    renderButtons()
  }

  if (action === 'delete-btn') {
    if (!confirm('このボタンを削除しますか？')) return
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
    if (!confirm('このフェーズを削除しますか？')) return
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

// DL area (PC inline)
document.getElementById('dl-url').addEventListener('input', (e) => {
  dlUrl = e.target.value.trim()
  document.getElementById('modal-dl-url').value = dlUrl
  updatePreview()
  updateDlBtn()
})
document.getElementById('dl-pw').addEventListener('input', (e) => {
  dlPassword = e.target.value.trim()
  document.getElementById('modal-dl-pw').value = dlPassword
  updatePreview()
  updateDlBtn()
})

// DL modal (mobile)
function closeDlModal() {
  dlUrl = document.getElementById('modal-dl-url').value.trim()
  dlPassword = document.getElementById('modal-dl-pw').value.trim()
  document.getElementById('dl-url').value = dlUrl
  document.getElementById('dl-pw').value = dlPassword
  document.getElementById('modal-dl').setAttribute('hidden', '')
  updatePreview()
  updateDlBtn()
}
function updateDlBtn() {
  document.getElementById('btn-dl-open').classList.toggle('has-data', !!(dlUrl || dlPassword))
}
document.getElementById('btn-dl-open').addEventListener('click', () => {
  document.getElementById('modal-dl-url').value = dlUrl
  document.getElementById('modal-dl-pw').value = dlPassword
  document.getElementById('modal-dl').removeAttribute('hidden')
})
document.getElementById('modal-dl-close').addEventListener('click', closeDlModal)
document.getElementById('modal-dl').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeDlModal()
})

// ── BOTTOM NAV TAB SWITCHING ─────────────────────
document.querySelectorAll('.bnav-item[data-sp-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.spTab
    const left = document.getElementById('sp-left-panel')
    const right = document.getElementById('sp-right-panel')
    document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    if (tab === 'left') {
      left.classList.add('sp-active')
      right.classList.remove('sp-active')
    } else {
      right.classList.add('sp-active')
      left.classList.remove('sp-active')
    }
  })
})

// Tone toggle
document.getElementById('tone-formal').addEventListener('click', () => setTone('formal'))
document.getElementById('tone-warm').addEventListener('click', () => setTone('warm'))

// ── INIT ──────────────────────────────────────────
loadData()
initMyColorUI()
applyTheme(localStorage.getItem('er_theme') || 'default')
setTone(currentTone)
currentPhaseId = appData.phases[0]?.id || null
currentDirectionId = appData.phases[0]?.directions[0]?.id || null
renderAll()
