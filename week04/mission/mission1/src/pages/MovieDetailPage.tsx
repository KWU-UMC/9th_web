import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { MovieDetail } from '../types/movieDetail';
import { useMovieDetailFetch } from "../hooks/useMovieDetailFetch";

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const {movieData} = useMovieDetailFetch(movieId);

    return (
        <div className="bg-white text-black font-sans p-8 max-w-4xl mx-auto">
            {movieData && (
                <div className="space-y-8">
                    <header className="flex gap-8 items-start">
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className="w-60 border-2" />
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold">{movieData.title}</h1>
                            <p className="text-lg text-gray-600">{movieData.tagline}</p>
                            <div className="flex gap-2">
                                {movieData.genres.map(g => (
                                    <span key={g.id} className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-sm">{g.name}</span>
                                ))}
                            </div>
                            <p className="text-lg">★ 평점: {movieData.vote_average.toFixed(1)}</p>
                        </div>
                    </header>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">줄거리</h2>
                        <p className="text-base leading-relaxed">{movieData.overview}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">등장인물</h2>
                        <div className="flex flex-wrap gap-4">
                            {movieData.cast.slice(0, 5).map(person => (
                                <div key={person.id} className="text-center w-32 border border-gray-300 p-2 rounded">
                                    <img 
                                        src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300.png?text=No+Image'} 
                                        alt={person.name} 
                                        className="w-full h-40 object-cover mb-2" 
                                    />
                                    <p className="font-bold text-sm">{person.name}</p>
                                    <p className="text-xs text-gray-500">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4">관련 이미지</h2>
                        <div className="flex flex-wrap gap-4">
                            {movieData.images.slice(0, 6).map((img, index) => (
                                <img 
                                    key={index} 
                                    src={`https://image.tmdb.org/t/p/w500${img.file_path}`} 
                                    alt={`관련 이미지 ${index + 1}`} 
                                    className="w-60 rounded border border-gray-300"
                                />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}