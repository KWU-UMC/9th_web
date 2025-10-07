import react, { use } from "react";
import { useParams } from "react-router-dom";


const MovieDetailPage= (): Element => {
    const params = useParams();

    console.log(params);
    return (
        <div>
            MovieDetailPage
        </div>
    );
}

export default MovieDetailPage;