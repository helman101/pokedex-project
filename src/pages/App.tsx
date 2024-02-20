import '../style.scss'
import { TopScreen } from '../Components/TopScreen/TopScreen'
import { Middle } from '../Components/Middle/Middle'
import { Bottom } from '../Components/Bottom/Bottom'

export const App = () => {
  return (
    <main className='game-font p-1'>
      <TopScreen />
      <Middle />
      <Bottom />
    </main>
  )
}
