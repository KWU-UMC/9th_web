import { useState } from "react";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import { Check, Settings } from "lucide-react";
import { usePatchUsers } from "../hooks/mutations/usePatchUsers";
import { useAuth } from "../context/AuthContext";


const MyPage = () => {
  const {accessToken} = useAuth();
  const {data} = useGetMyInfo(accessToken);
  const {mutate} = usePatchUsers();
  const [isEdit, setIsEdit] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | undefined>(undefined);
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState<string | undefined>(undefined);

  const handleEdit = () => {
    if(!data) return;
    
    setNewName(data?.name);
    setNewAvatar(data?.avatar);
    setNewBio(data?.bio ? data.bio : "없음");

    setIsEdit(true);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handlePatchUser = () => {
    const body = {
      name: newName,
      bio: newBio,
      avatar: newAvatar,
    };

    mutate(body, {
      onSuccess: () => setIsEdit(false),
    })
  }

  return (
    <div className="flex flex-col justify-center items-center text-white mt-10">
      {!isEdit && 
        <div className="flex gap-5">
          <img 
            className="border border-white w-[150px] h-[150px] rounded-[100%] text-center"
            src={data?.avatar} 
            alt="avatar" 
          />
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex justify-between items-center gap-2">
              <h1 className="text-3xl">{data?.name}</h1>
              <Settings 
                onClick={handleEdit}
              />
            </div>
            <h1 className="text-xl">{data?.bio ? data.bio : "없음"}</h1>
            <h1 className="text-xl">{data?.email}</h1>
          </div>
        </div>
      }
      {isEdit && 
        <div className="flex gap-5">
          <input 
            className="border border-white w-[150px] h-[150px] rounded-[100%] text-center"
            type="file"
            onChange={handleAvatarChange}
          />
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex justify-between items-center gap-2">
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text" 
                className="text-3xl border border-white rounded-md"
              />
              <Check 
                onClick={handlePatchUser}
              />
            </div>
            <input 
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              type="text"
              className="text-3xl border border-white rounded-md"
            />
            <h1 className="text-xl">{data?.bio ? data.bio : "없음"}</h1>
            <h1 className="text-xl">{data?.email}</h1>
          </div>
        </div>
      }
    </div>
  )
}

export default MyPage