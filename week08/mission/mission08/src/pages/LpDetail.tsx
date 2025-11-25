import { useParams } from 'react-router-dom'
import { useGetLpDetail } from '../hooks/queries/useGetLpDetail';
import LpComments from '../components/Comment/LpComments';
import { useState } from 'react';
import LpDetailView from '../components/LpDetailView';
import LpDetailEditing from '../components/LpDetailEditing';

const LpDetail = () => {
  const params = useParams();
  const {data, isPending, isError} = useGetLpDetail({lpId: Number(params.lpId)});
  const [isEdit, setIsEdit] = useState(false);

  if (isPending) {
    return <div className="text-white text-3xl">Loading...</div>
  }

  if (isError) {
    return <div className="text-white text-3xl">Error</div>
  }

  return (
    <>
      {!isEdit &&
        <LpDetailView 
          lp={data}
          onEdit={setIsEdit}
        />
      }
      {isEdit &&
        <LpDetailEditing 
          lp={data}
          onEdit={setIsEdit}
        />
      }
      <LpComments lpIdInput={Number(params.lpId)}/>
    </>
  )
}

export default LpDetail