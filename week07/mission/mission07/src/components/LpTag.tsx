import { useMemo, useState } from 'react'

type LpTagProps = {
  tags: string[],
  onTags: React.Dispatch<React.SetStateAction<string[]>>,
}

const LpTag = ({tags, onTags}: LpTagProps) => {
  const [lpTag, setLpTag] = useState("");

  const canSubmitLpTag = useMemo(() => !!lpTag, [lpTag]);

  const addTag = () => {
    const value = lpTag.trim();
    if (!value) return;

    onTags(prev => [...prev, value])
    setLpTag("");
  };

  const removeTagByIndex = (index:number) => {
    onTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-between'>
        <input 
          value={lpTag}
          onChange={(e) => setLpTag(e.target.value)}
          className='border border-gray-400 rounded-md p-2 w-[80%]'
          type="text" 
          placeholder='LpTag'
        />
        <button
          disabled={!canSubmitLpTag}
          onClick={addTag}
          className="bg-pink-700 w-[15%] hover:bg-pink-500 rounded-md disabled:bg-gray-400 disabled:hover:bg-gray-400"
        >
          Add
        </button>
      </div>
      <div className="flex gap-3">
        {tags?.map((tag, idx) => (
          <li 
            key={idx}
            className="border border-white rounded-md list-none p-1"
          >
            <span className="mr-2">
              #{tag}
            </span>
            <button
              onClick={() => removeTagByIndex(idx)}
            >X</button>
          </li>
        ))}
      </div>
    </div>
  )
}

export default LpTag