import { useEffect, useState } from 'react'

export default function Home() {

  const [ tokenCount, setTokenCount ] = useState(0)
  const [ characterCount, setCharacterCount ] = useState(0)
  const [ input, setInput ] = useState("")
  const [ responseTime, setResponseTime ] = useState(null)
  const [ tokenizedText, setTokenizedText ] = useState([])

  const colors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
  ]

  useEffect(() => {
    if (input.length > 0){
      setCharacterCount(input.length) // count characters
      
    } else {
      setCharacterCount(0)
    }
  }, [input, characterCount])

  async function countTokens(text){

    const startTime = Date.now()

    try {
      const response = await fetch("https://gemini-tokenizer.onrender.com/count-tokens", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: text })
      })

      if (!response.ok){
        throw new Error('Error counting tokens')
      }

      const data = await response.json()
      setTokenCount(data.token_count)

      const endTime = Date.now()
      const elapsedTime = endTime - startTime
      setResponseTime(elapsedTime)
      console.log(elapsedTime)

    } catch (error) {
      console.error("Error: ", error)
    }
  }

  useEffect(() => {
    if (input){
      countTokens(input)
    } else {
      setTokenCount(0)
    }
  }, [input, tokenCount])

  function tokenizeText(text){
    const approximateTokenLength = Math.ceil(characterCount/tokenCount)
    const tokens = []
    for (let i = 0; i < characterCount; i += approximateTokenLength){
      tokens.push(text.slice(i, i + approximateTokenLength))
    }

    return tokens.map((token, index) => (
      <span
        key={index}
        className={`px-1 ${colors[index % colors.length]} rounded-md mx-1`}
      >
        {token}
      </span>
    ));
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative py-4 px-2">
      <h2 className="text-md text-gray-700 text-4xl font-bold mb-10">Gemini API Tokenizer</h2>
      <div className="flex flex-row items-center mb-4">
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-2 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Flash</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-2 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Flash8B</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-2 py-2 text-sm rounded-lg mr-2">Gemini 1.5 Pro</button>
        <button type="button" className="bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 hover:text-gray-700 px-2 py-2 text-sm rounded-lg">Text Embedding & Embedding</button>
      </div>
      <textarea placeholder="Write or paste your text here to count tokens and characters" value={input} onChange={e => setInput(e.target.value)} className="w-full focus:border-gray-900 sm:w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3 outline-none italic h-80 text-gray-700 font-semibold border-2 text-lg border-gray-500 rounded-xl p-2 mb-6">

      </textarea>
      <div className="flex flex-row items-center justify-start">
        <p className="mr-8 text-xl bg-gray-100 font-semibold rounded-md px-3 py-2">Tokens: {tokenCount}</p>
        <p className="text-xl bg-gray-100 font-semibold rounded-md px-3 py-2">Characters: {characterCount}</p>
      </div>
      <div className="flex flex-row justify-start w-full sm:w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3">
        <p className="mb-3 mt-6 text-xl font-bold">Tokenized version 👇</p>
      </div>
      <div id="tokenized_text" className="w-full sm:w-3/4 md:w-2/3 xl:w-1/2 2xl:w-1/3 h-80 overflow-auto p-2 bg-gray-50 rounded-xl">
       {
        input.length > 0 
        ? 
          <p className="flex flex-wrap italic text-gray-700 text-lg">{tokenizeText(input)}</p>
        : 
          <p className="italic text-gray-700 text-lg">Your tokenized text will appear here...</p>
       }
      </div>
      <div id="faqs" className="mt-8">
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
