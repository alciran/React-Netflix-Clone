import React, {useEffect, useState} from "react";
import MovieList from "./hooks/Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default function App() {
  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ blackHeader, setBlackHeader ] = useState(false);

  useEffect(() =>{
    const loadAll = async () => {
      let list = await MovieList.getHomeList();
      setMovieList(list);

      // pegando filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1) );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await MovieList.getMovieInfo(chosen.id, 'tv');
      console.log(chosenInfo)
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
       if(window.scrollY > 10){
          setBlackHeader(true);
       }else{
        setBlackHeader(false);
       }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scrol', scrollListener);
    }

  }, []
  )

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData}/> }

      <section className="lists">
        {movieList.map((item, key) => (
         <MovieRow  key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito para ambiente de teste 
        <span role="img" aria-label="carinha felix"> 😎</span>
      </footer>

      {movieList.length <= 0 &&
      <div className="loading" >
        <img src="https://images.says.com/uploads/story_source/source_image/599933/19bb.gif" alt="Carregando"/>
      </div>}
    </div>
  )
}