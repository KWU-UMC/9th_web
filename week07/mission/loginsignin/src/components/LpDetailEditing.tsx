import { Check, Image, Trash } from "lucide-react";
import type { Lp } from "../types/lp"
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePatchLp } from "../hooks/mutations/usePatchLp";
import LpTag from "./LpTag";

type LpDetailEditingProps = {
  lp: Lp;
  onEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const schema = z.object({
  lpName: z.string().min(1),
  lpContent: z.string().min(1),
});

type LpFormFields = z.infer<typeof schema>;

const LpDetailEditing = ({lp, onEdit}: LpDetailEditingProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm<LpFormFields>({
    defaultValues: {lpName: lp.title, lpContent: lp.content},
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const {mutate:deleteLp} = useDeleteLp();
  const {mutate:patchLp} = usePatchLp();
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setThumbnail(lp.thumbnail ?? undefined);
    setTags(lp.tags.map(tag => tag.name));
  }, [lp]);

  const lpName = watch("lpName");
  const lpContent = watch("lpContent");
  const canSubmitLp = useMemo(() => !!lpName && !!lpContent && !isSubmitting, [lpName, lpContent, isSubmitting]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCompleteEdit: SubmitHandler<LpFormFields> = (data) => {
    if(!canSubmitLp) return;

    const body = {
      title: data.lpName,
      content: data.lpContent,
      thumbnail,
      tags,
      published: true,
    };


    patchLp({lpId:lp.id, body});
    onEdit(false);
  }

  const handleDeleteLp = () => {
    deleteLp({lpId: lp.id});
  }

  return (
    <div className='flex flex-col justify-center gap-5 py-5 px-15 bg-gray-700 rounded-xl text-white'>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{lp?.author?.name}</h1>
        <h1 className='text-sm'>{new Date(lp?.updatedAt).toLocaleDateString()}</h1>
      </div>
      <div className='flex justify-between items-center'>
        <input
          {...register('lpName')}
          type="text"
          className="border border-gray-400 rounded-md p-2 w-[75%]"
          placeholder="Lp Name"
        />
        <div className='flex gap-5'>
          <Image 
            className="cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <Check 
            onClick={handleSubmit(handleCompleteEdit)}
          />
          <Trash 
            onClick={handleDeleteLp}
          />
        </div>
      </div>
      <div className="relative">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            className="w-full max-h-[60vh] object-contain shadow-2xl"
            onClick={() => fileInputRef.current?.click()}
          />
        ): (
          <div
            className="w-full h-48 flex items-center justify-center border border-dashed border-gray-500 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            이미지를 클릭하거나 업로드하세요.
          </div>
        )}
        <input 
          className="sr-only"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <input
        {...register('lpContent')}
        type="text"
        className="border border-gray-400 rounded-md p-2 w-full"
        placeholder="Lp Content"
      />
      <div className='flex flex-col gap-3 justify-center'>
        <LpTag
          tags={tags}
          onTags={setTags}
        />
      </div>
    </div>
  )
}

export default LpDetailEditing
