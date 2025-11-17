import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { usePostCreateLp } from "../hooks/mutations/usePostCreateLp";
import LpTag from "./LpTag";

const schema = z.object({
  lpName: z.string().min(1),
  lpContent: z.string().min(1),
});

type LpFormFields = z.infer<typeof schema>;

type CreateLpModalProps ={
  onCloseCreateLp: React.Dispatch<React.SetStateAction<boolean>>
};

const CreateLpModal = ({onCloseCreateLp}: CreateLpModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm<LpFormFields>({
    defaultValues: {lpName: "", lpContent: ""},
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });
  const {mutate: createLp} = usePostCreateLp();
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onSubmit: SubmitHandler<LpFormFields> = (data) => {
    const body = {
      title: data.lpName,
      content: data.lpContent,
      thumbnail,
      tags,
      published: true,
    };

    createLp(body, {
      onSuccess:() => onCloseCreateLp(false),
    })
  };

  return (
    <div 
      className='inset-0 fixed z-50 flex items-center justify-center p-4' 
      onClick={() => onCloseCreateLp(false)}
    >
      <div className='absolute inset-0 bg-black/50 z-40' />
      <div 
        className='flex flex-col relative z-50 w-full max-w-[640px] max-h-[90vh] overflow-y-auto bg-gray-800 text-white p-5 gap-3 roundeld-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div />
          <button 
            className="mb-2 text-2xl"
            onClick={() => onCloseCreateLp(false)}
          >x</button>
        </div>
        <div className="relative">
          <div>
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
          </div>
          <input 
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="sr-only"
            accept="image/*"
          />
        </div>
        <input
          {...register('lpName')}
          className="border border-gray-400 rounded-md p-2"
          type="text"
          placeholder="Lp Name"
        />
        <input
          {...register('lpContent')}
          className="border border-gray-400 rounded-md p-2"
          type="text"
          placeholder="Lp Content"
        />
        <LpTag
          tags={tags}
          onTags={setTags}
        />
        <button
          disabled={!canSubmitLp}
          onClick={handleSubmit(onSubmit)}
          className="bg-pink-700 w-full h-10 hover:bg-pink-500 rounded-md disabled:bg-gray-400 disabled:hover:bg-gray-400"
        >
          Add Lp
        </button>
      </div>
    </div>
  )
}

export default CreateLpModal