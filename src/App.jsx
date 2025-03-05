import { useState, useRef } from 'react'

function App() {

  const [inputval, setInputval] = useState("")
  const ref = useRef()

  const handleClick = () => {
    let ul = document.querySelector(".alltodos")
    ul.innerHTML += `<li class="bg-[#550036] text-white py-1 px-2 rounded-lg w-[250px] font-bold mb-2">${inputval}</li>`
    ref.current.value = "";
  }
  

  return (
    <>
      <section>
        <div className="bg-[#550036] text-center text-white font-bold text-3xl p-2">Manage all Your Todos at One Place</div>

        <div className='flex md:flex-row flex-col justify-center items-center gap-2 mt-8'>
          <label className='text-[#550036] font-bold' htmlFor="">Enter a todo: </label>
          <input
            ref={ref}
            onChange={(e) => setInputval(e.target.value)}
            value={inputval}
            type="text"
            className='border-1 border-black py-1 pl-2 rounded-lg'
          />
          <button onClick={handleClick} className='bg-[#550036] text-white font-bold rounded-lg py-1 px-2 '>Save</button>
        </div>

        <div className='flex flex-col justify-center items-center gap-2 w-full'>
          <h1 className='font-bold text-2xl underline text-[#550036] mt-4'>Your Todos:</h1>
          <ul className='alltodos'>
            
          </ul>
        </div>

      </section>
    </>
  )
}

export default App
