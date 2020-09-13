// import { on } from '../helpers/utils'
// import cssClasses from '../helpers/cssClasses'

/**
 * Global variables
 */
const selectors = {
  
}

const slotItems = ['cherry', 'apple', 'club', 'gold']

let selectedSlot = '_0'

export default () => {

  /**
   * Node selectors
   */
  const nodes = {
    cols: [...document.querySelectorAll('.col')],
    spinBtn: document.querySelector('.spin'),
  }

  /**
   * Set listeners
   */
  function setListeners() {
    nodes.spinBtn.addEventListener('click', () => {
      resetReel()
      buildReel()
      spinReel()
    })
  }

  const uuid = () => {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  const getRandomArrayItem = arr => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const buildReel = () => {
    for (let i = 1; i <= 15; i++) {
      const slot = createSlot()
      
      nodes.cols[0].appendChild(slot)
    }
  }

  const createSlot = () => {
    const type = getRandomArrayItem(slotItems)
    const el = document.createElement('DIV')
    el.classList.add('slot', `slot-${type}`)
    el.dataset.id = uuid()
    el.innerHTML = type
    
    return el
  }

  const chosenSlot = () => {
    
  }

  const spinReel = () => {
    // nodes.spinBtn.style.pointerEvents = 'none'
    // nodes.spinBtn.style.opacity = '0.5'
    
    const randomNum = randomIntFromInterval(10, slotItems.length)
    const distance = 100 * randomNum
    
    selectedSlot = nodes.cols[0].querySelectorAll('.slot')[randomNum].dataset.id
    
    console.log('selected=', selectedSlot)
    
    setTimeout(() => {
      console.log('spinning...')
    
      nodes.cols[0].style.transition = 'transform 1s ease-in-out'
      nodes.cols[0].style.transform = `translateZ(0) translateY(${distance}%)`
    }, 50)
  }

  const resetReel = () => {
    const slots = nodes.cols[0].querySelectorAll('.slot')
    
    slots.forEach(slot => {
      if (slot.dataset.id != `${selectedSlot}`) {
        nodes.cols[0].removeChild(slot)
      }
    })
    
    nodes.cols[0].style.transition = 'none'
    nodes.cols[0].style.transform = 'translateZ(0) translateY(0)'
  }

  /**
   * Initialise component
   */
  function init() {
    buildReel()
    setListeners()
  }

  return Object.freeze({
    init,
  })
}