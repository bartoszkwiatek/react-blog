import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faLink,
  faPowerOff,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

function initFontAwesome() {
  library.add(faLink)
  library.add(faUser)
  library.add(faPowerOff)
  library.add(faAngleLeft)
  library.add(faAngleDoubleLeft)
  library.add(faAngleDoubleRight)
  library.add(faAngleRight)
}

export default initFontAwesome
