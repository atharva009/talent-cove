import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

function App() {

  return (
    <>
      <MantineProvider>
          <h1 className="text-8xl font-bold underline">
            Hello world!
          </h1>
    </MantineProvider>
    </>
  )
}

export default App
