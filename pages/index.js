import { useEffect, useState } from 'react'

export default function Home() {

  const [ tokens, setTokens ] = useState(0)
  const [ characters, setCharacters ] = useState(0)
  const [ input, setInput ] = useState("")

  useEffect(() => {
    if (input.length > 0){
      setCharacters(input.length) // count characters
      setTokens(Math.floor(input.length/4)) // count tokens, each token is 4 characters
    } else {
      setCharacters(0)
      setTokens(0)
    }
  }, [input, characters, tokens])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center absolute py-4">
      <h2 className="text-md text-gray-700 text-4xl font-bold mb-4">Gemini API Tokenizer</h2>
      <div className="flex flex-row items-center mb-4">
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-3 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Flash</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-3 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Flash8B</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-3 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Pro</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-3 py-2 text-sm rounded-lg">Text Embedding & Embedding</button>
      </div>
      <textarea placeholder="Write or paste your text here to count tokens and characters" value={input} onChange={e => setInput(e.target.value)} className="w-1/3 outline-none italic h-80 text-gray-700 font-semibold border-2 text-lg border-gray-500 rounded-xl p-2 mb-6">

      </textarea>
      <div className="flex flex-row items-center justify-start">
        <p className="mr-8 text-xl bg-gray-200 rounded-md px-3 py-2">Tokens: {tokens}</p>
        <p className="text-xl bg-gray-200 rounded-md px-3 py-2">Characters: {characters}</p>
      </div>
      <div id="faq" className="mt-8">
        <div id="q1" className="mb-4">
          <p id="question1" className="text-xl font-bold mb-2">How are tokens counted?</p>
          <p id="answer1">A token is equivalent to about 4 characters of English text for Gemini models.</p>
        </div>
        <div id="q2" className="">
          <p id="question2" className="text-xl font-bold mb-2">Is there a token limit?</p>
          <div id="answer2">
          <p>Of course, and here is how it might be different from a Gemini model to another:</p>
          <ul className="mt-2" id="models">
            <li className="font-semibold text-gray-600">Gemini 1.5 Flash:</li>
            <div className="ml-4 flex flex-row items-center mb-2">
              <p className="mr-6">Input token limit: <span>1,048,576</span></p>
              <p>Output token limit: <span>8,192</span></p>
            </div>
            <li className="font-semibold text-gray-600">Gemini 1.5 Flash-8B:</li>
            <div className="ml-4 flex flex-row items-center mb-2">
              <p className="mr-6">Input token limit: <span>1,048,576</span></p>
              <p>Output token limit: <span>8,192</span></p>
            </div>
            <li className="font-semibold text-gray-600">Gemini 1.5 Pro:</li>
            <div className="ml-4 flex flex-row items-center mb-2">
              <p className="mr-6">Input token limit: <span>2,097,152</span></p>
              <p>Output token limit: <span>8,192</span></p>
            </div>
            <li className="font-semibold text-gray-600">Text Embedding and Embedding:</li>
            <div className="ml-4 flex flex-row items-center">
              <p className="mr-6">Input token limit: <span>2,048</span></p>
              <p>Output dimension size: <span>768</span></p>
            </div>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
